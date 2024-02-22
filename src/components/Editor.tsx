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
  { value: 'monokai', label: 'Monokai' },
  { value: 'github', label: 'GitHub' },
  { value: 'dracula', label: 'Dracula' },
];

const CodeEditor: React.FC = () => {
  const [language, setLanguage] = useState<string>('javascript');
  const [theme, setTheme] = useState<string>('monokai');
  const [code, setCode] = useState<string>('');

  const selectedLanguageLabel = supportedLanguages.find(lang => lang.value === language)?.label || 'Select Language';
  const selectedThemeLabel = supportedThemes.find(t => t.value === theme)?.label || 'Select Theme';

  // Declare WebSocket instance using useRef hook
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Connect to WebSocket server
    ws.current = new WebSocket('ws://localhost:8000/ws');

    // Set up event listeners
    ws.current.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      // Handle received message, e.g., update Ace Editor content
      setCode(message.content);
    };

    ws.current.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    // Clean up WebSocket connection
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const handleCodeChange = (newCode: string) => {
    // Send code changes to WebSocket server
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const message = {
        username: 'user123', // Set username as needed
        content: newCode,
      };
      ws.current.send(JSON.stringify(message));
    }
  };

  return (
    <Container fluid>
      <Row className="mt-3">
        <Col>
          <Row>
            <Col>
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="language-dropdown">
                  {selectedLanguageLabel}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {supportedLanguages.map(lang => (
                    <Dropdown.Item
                      key={lang.value}
                      onClick={() => setLanguage(lang.value)}
                    >
                      {lang.label}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col>
              <Dropdown className="ml-3">
                <Dropdown.Toggle variant="primary" id="theme-dropdown">
                  {selectedThemeLabel}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {supportedThemes.map(theme => (
                    <Dropdown.Item
                      key={theme.value}
                      onClick={() => setTheme(theme.value)}
                    >
                      {theme.label}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <AceEditor
            mode={language}
            theme={theme}
            name="code-editor"
            editorProps={{ $blockScrolling: true, fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace' }}
            width="100%"
            showGutter={true}
            fontSize={16}
            value={code}
            onChange={handleCodeChange}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default CodeEditor;
