"use client";
import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

type MessageType = "CHAT" | "JOIN" | "LEAVE";

interface ChatMessage {
  sender: string;
  content: string;
  messageType: MessageType;
}

const Chat2 = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [username, setUsername] = useState("");
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState("");

  const stompClient = useRef<Client | null>(null);

  const connect = () => {
    const socket = new SockJS("http://localhost:8080/ws");

    const client: Client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str), //log to console
      onConnect: () => {
        setConnected(true);

        // Subscribe to topic
        client.subscribe("/topic/public", (payload) => {
          const msg: ChatMessage = JSON.parse(payload.body);
          setMessages((prev) => [...prev, msg]);
        });

        // Send JOIN message
        client.publish({
          destination: "/app/chat.addUser",
          body: JSON.stringify({
            sender: username,
            messageType: "JOIN",
          }),
        });
      },
      onDisconnect: () => {
        setConnected(false);
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
    });

    client.activate();
    stompClient.current = client;
  };

  const disconnect = () => {
    if (stompClient.current && stompClient.current.active) {
      stompClient.current.deactivate(); // ✅ modern way
      setConnected(false);
    }
  };

  const sendMessage = () => {
    if (stompClient.current && message.trim() !== "") {
      const chatMessage: ChatMessage = {
        sender: username,
        content: message,
        messageType: "CHAT",
      };

      stompClient.current.publish({
        destination: "/app/chat.sendMessage",
        body: JSON.stringify(chatMessage),
      });

      setMessage("");
    }
  };

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      console.log("Connecting as:", username); // ✅ debug log
      connect();
    } else {
      console.warn("Username is empty");
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-gray-700 shadow-lg rounded-lg p-6">
        {!connected ? (
          <form onSubmit={handleUsernameSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Join the Chat</h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded font-semibold transition"
            >
              Connect
            </button>
          </form>
        ) : (
          <>
            <div className="h-96 overflow-y-auto border rounded p-4 bg-grey-500 mb-4">
              {messages.map((msg, index) => (
                <div key={index} className="mb-2 text-sm">
                  <span className="font-semibold text-yellow-600">{msg.sender}</span>
                  {msg.messageType === "JOIN" ? (
                    <span className="text-white italic"> joined the chat</span>
                  ) : msg.messageType === "LEAVE" ? (
                    <span className="text-gray-500 italic"> left the chat</span>
                  ) : (
                    <span>: {msg.content}</span>
                  )}
                </div>
              ))}
            </div>
  
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button
                onClick={sendMessage}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold transition"
              >
                Send
              </button>
            </div>
  
            <button
              onClick={disconnect}
              className="mt-4 text-red-500 hover:text-red-700 text-sm underline"
            >
              Disconnect
            </button>
          </>
        )}
      </div>
    </div>
  );
  
};

export default Chat2;
