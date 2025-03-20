package com.kunalS.programmingAssistant.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Code {
    private String source_code;
    private int language_id;
    private String stdin;


}
