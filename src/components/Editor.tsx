import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-swift";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/mode-kotlin";
import "ace-builds/src-noconflict/mode-dart";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-nord_dark";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/theme-pastel_on_dark";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-sqlserver";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/theme-tomorrow_night_blue";
import "ace-builds/src-noconflict/theme-tomorrow_night_bright";
import "ace-builds/src-noconflict/theme-tomorrow_night_eighties";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-vibrant_ink";
import "ace-builds/src-noconflict/theme-xcode";
import LanguageTheme from "./LanguageTheme";

interface EditorProps {
  fileContent: string;
}
interface Language {
  value: string;
  label: string;
}

const supportedLanguages: Language[] = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "golang", label: "Go" },
  { value: "ruby", label: "Ruby" },
  { value: "c_cpp", label: "C/C++" },
  { value: "csharp", label: "C#" },
  { value: "php", label: "PHP" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "typescript", label: "TypeScript" },
  { value: "swift", label: "Swift" },
  { value: "markdown", label: "Markdown" },
  { value: "json", label: "JSON" },
  { value: "xml", label: "XML" },
  { value: "sql", label: "SQL" },
  { value: "yaml", label: "YAML" },
  { value: "kotlin", label: "Kotlin" },
  { value: "dart", label: "Dart" },
];

interface Theme {
  value: string;
  label: string;
}

const supportedThemes: Theme[] = [
  { value: "monokai", label: "Monokai" },
  { value: "github", label: "GitHub" },
  { value: "dracula", label: "Dracula" },
  { value: "nord_dark", label: "Nord Dark" },
  { value: "one_dark", label: "One Dark" },
  { value: "pastel_on_dark", label: "Pastel On Dark" },
  { value: "solarized_dark", label: "Solarized Dark" },
  { value: "solarized_light", label: "Solarized Light" },
  { value: "sqlserver", label: "SQL Server" },
  { value: "terminal", label: "Terminal" },
  { value: "textmate", label: "TextMate" },
  { value: "tomorrow", label: "Tomorrow" },
  { value: "tomorrow_night", label: "Tomorrow Night" },
  { value: "tomorrow_night_blue", label: "Tomorrow Night Blue" },
  { value: "tomorrow_night_bright", label: "Tomorrow Night Bright" },
  { value: "tomorrow_night_eighties", label: "Tomorrow Night Eighties" },
  { value: "twilight", label: "Twilight" },
  { value: "vibrant_ink", label: "Vibrant Ink" },
  { value: "xcode", label: "Xcode" },
];
const CodeEditor: React.FC<EditorProps> = ({ fileContent }) => {
  const [language, setLanguage] = useState<string>("javascript");
  const [theme, setTheme] = useState<string>("monokai");
  const [code, setCode] = useState<string>("");

  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    setCode(code);

    // Connect to WebSocket server
    ws.current = new WebSocket("ws://localhost:8000/ws");

    // Set up event listeners
    ws.current.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      // Update local state with new code received from the server
      setCode(message.content);
    };

    ws.current.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    // Clean up WebSocket connection
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const handleLanguageChange = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
  };

  const selectedLanguageLabel =
    supportedLanguages.find((lang) => lang.value === language)?.label ||
    "Select Language";
  const selectedThemeLabel =
    supportedThemes.find((t) => t.value === theme)?.label || "Select Theme";

  const handleThemeChange = (selectedTheme: string) => {
    setTheme(selectedTheme);
  };

  const handleCodeChange = (newCode: string) => {
    // Send code changes to WebSocket server
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const message = {
        username: "user123", // Set username as needed
        content: newCode,
      };
      ws.current.send(JSON.stringify(message));
    }
  };

  return (
    <Container fluid>
      <LanguageTheme
        supportedLanguages={supportedLanguages}
        supportedThemes={supportedThemes}
        handleLanguageChange={handleLanguageChange}
        handleThemeChange={handleThemeChange}
        selectedThemeLabel={selectedThemeLabel}
        selectedLanguageLabel={selectedLanguageLabel}
      />

      <Row className="mt-3">
        <Col>
          <AceEditor
            mode={language}
            theme={theme}
            name="code-editor"
            editorProps={{ $blockScrolling: true }}
            width="100%"
            showGutter={true}
            fontSize={16}
            value={code !== "" ? code : fileContent}
            onChange={handleCodeChange}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CodeEditor;
