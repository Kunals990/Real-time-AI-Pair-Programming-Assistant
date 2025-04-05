// "use client";
import Link from "next/link";

export default function Navbar() {
    return (
      <nav className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold">AI Pair Programming Assistant</h1>
        <div>
          <Link href="/" className="px-4 hover:text-gray-300">Home</Link>
          <Link href="/editor" className="px-4 hover:text-gray-300">Editor</Link>
          <Link href="/chat" className="px-4 hover:text-gray-300">Chat</Link>
          <Link href="/ai-chat" className="px-4 hover:text-gray-300">AI Chat</Link>
        </div>
      </nav>
    );
  }