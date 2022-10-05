/** 
 * This file contains all the constants required by the Code Editor/Playground.
 * 
 * Sample Usage: To import bash source, do the following:
 * 
 * import * as codeConstants from 'Editor/CodeEditor/Constants.js';
 * const sources = codeConstants.sources;
 * */ 

import * as templates from './Templates.js';

export const sources = {
    45: templates.assemblySource,
    46: templates.bashSource,
    47: templates.basicSource,
    48: templates.cSource,
    49: templates.cSource,
    50: templates.cSource,
    51: templates.csharpSource,
    52: templates.cppSource,
    53: templates.cppSource,
    54: templates.cppSource,
    55: templates.lispSource,
    56: templates.dSource,
    57: templates.elixirSource,
    58: templates.erlangSource,
    44: templates.executableSource,
    59: templates.fortranSource,
    60: templates.goSource,
    61: templates.haskellSource,
    62: templates.javaSource,
    63: templates.javaScriptSource,
    64: templates.luaSource,
    65: templates.ocamlSource,
    66: templates.octaveSource,
    67: templates.pascalSource,
    68: templates.phpSource,
    43: templates.plainTextSource,
    69: templates.prologSource,
    70: templates.pythonSource,
    71: templates.pythonSource,
    72: templates.rubySource,
    73: templates.rustSource,
    74: templates.typescriptSource,
    75: templates.cSource,
    76: templates.cppSource,
    77: templates.cobolSource,
    78: templates.kotlinSource,
    79: templates.objectiveCSource,
    80: templates.rSource,
    81: templates.scalaSource,
    82: templates.sqliteSource,
    83: templates.swiftSource,
    84: templates.vbSource,
    85: templates.perlSource,
    86: templates.clojureSource,
    87: templates.fsharpSource,
    88: templates.groovySource,
    1001: templates.cSource,
    1002: templates.cppSource,
    1003: templates.c3Source,
    1004: templates.javaSource,
    1005: templates.javaTestSource,
    1006: templates.mpiccSource,
    1007: templates.mpicxxSource,
    1008: templates.mpipySource,
    1009: templates.nimSource,
    1010: templates.pythonForMlSource,
    1011: templates.bosqueSource,
    1012: templates.cppTestSource,
    1013: templates.cSource,
    1014: templates.cppSource,
    1015: templates.cppTestSource,
    1021: templates.csharpSource,
    1022: templates.csharpSource,
    1023: templates.csharpTestSource,
    1024: templates.fsharpSource
};

export const fileNames = {
    45: "main.asm",
    46: "script.sh",
    47: "main.bas",
    48: "main.c",
    49: "main.c",
    50: "main.c",
    51: "Main.cs",
    52: "main.cpp",
    53: "main.cpp",
    54: "main.cpp",
    55: "script.lisp",
    56: "main.d",
    57: "script.exs",
    58: "main.erl",
    44: "a.out",
    59: "main.f90",
    60: "main.go",
    61: "main.hs",
    62: "Main.java",
    63: "script.js",
    64: "script.lua",
    65: "main.ml",
    66: "script.m",
    67: "main.pas",
    68: "script.php",
    43: "text.txt",
    69: "main.pro",
    70: "script.py",
    71: "script.py",
    72: "script.rb",
    73: "main.rs",
    74: "script.ts",
    75: "main.c",
    76: "main.cpp",
    77: "main.cob",
    78: "Main.kt",
    79: "main.m",
    80: "script.r",
    81: "Main.scala",
    82: "script.sql",
    83: "Main.swift",
    84: "Main.vb",
    85: "script.pl",
    86: "main.clj",
    87: "script.fsx",
    88: "script.groovy",
    1001: "main.c",
    1002: "main.cpp",
    1003: "main.c3",
    1004: "Main.java",
    1005: "MainTest.java",
    1006: "main.c",
    1007: "main.cpp",
    1008: "script.py",
    1009: "main.nim",
    1010: "script.py",
    1011: "main.bsq",
    1012: "main.cpp",
    1013: "main.c",
    1014: "main.cpp",
    1015: "main.cpp",
    1021: "Main.cs",
    1022: "Main.cs",
    1023: "Test.cs",
    1024: "script.fsx"
};

export const languageIdTable = {
    1001: 1,
    1002: 2,
    1003: 3,
    1004: 4,
    1005: 5,
    1006: 6,
    1007: 7,
    1008: 8,
    1009: 9,
    1010: 10,
    1011: 11,
    1012: 12,
    1013: 13,
    1014: 14,
    1015: 15,
    1021: 21,
    1022: 22,
    1023: 23,
    1024: 24
}

export const extraApiUrl = '';
export const languageApiUrlTable = {
    1001: extraApiUrl,
    1002: extraApiUrl,
    1003: extraApiUrl,
    1004: extraApiUrl,
    1005: extraApiUrl,
    1006: extraApiUrl,
    1007: extraApiUrl,
    1008: extraApiUrl,
    1009: extraApiUrl,
    1010: extraApiUrl,
    1011: extraApiUrl,
    1012: extraApiUrl,
    1013: extraApiUrl,
    1014: extraApiUrl,
    1015: extraApiUrl,
    1021: extraApiUrl,
    1022: extraApiUrl,
    1023: extraApiUrl,
    1024: extraApiUrl
}

export const competitiveProgrammingInput = "\
3\n\
3 2\n\
1 2 5\n\
2 3 7\n\
1 3\n\
3 3\n\
1 2 4\n\
1 3 7\n\
2 3 1\n\
1 3\n\
3 1\n\
1 2 4\n\
1 3\n\
";
