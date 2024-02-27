import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import AceEditor from "react-ace";
import { supportedLanguages, supportedThemes } from "../utils/imports";

interface EditorProps {
  fileContent: string;
  fileExtension: string;
}

const CodeEditor: React.FC<EditorProps> = ({ fileContent, fileExtension }) => {
  const [language, setLanguage] = useState<string>("javascript");
  const [theme, setTheme] = useState<string>("monokai");
  const [code, setCode] = useState<string>("");

  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
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

  const getModeForExtension = (extension: string): string => {
    // Map file extension to corresponding Ace Editor mode
    switch (extension) {
      case "js":
        return "javascript";
      case "py":
        return "python";
      case "java":
        return "java";
      case "go":
        return "golang";
      case "rb":
        return "ruby";
      case "cpp":
      case "c":
        return "c_cpp";
      case "cs":
        return "csharp";
      case "php":
        return "php";
      case "html":
        return "html";
      case "css":
        return "css";
      case "ts":
        return "typescript";
      case "swift":
        return "swift";
      case "md":
        return "markdown";
      case "json":
        return "json";
      case "xml":
        return "xml";
      case "sql":
        return "sql";
      case "yaml":
        return "yaml";
      case "kt":
        return "kotlin";
      case "dart":
        return "dart";
      default:
        return "text"; // Use plain text mode as default
    }
  };

  const mode = getModeForExtension(fileExtension);
  const selectedThemeLabel =
    supportedThemes.find((t) => t.value === theme)?.label || "Select Theme";


  return (
    <Container fluid>
      <Row className="mt-3">
        <Col>
          <Dropdown className="ml-3">
            <Dropdown.Toggle variant="primary" id="theme-dropdown">
              {selectedThemeLabel}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {supportedThemes.map((theme) => (
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

      <Row className="mt-3">
        <Col>
          <AceEditor
            mode={mode}
            theme={theme}
            name="code-editor"
            editorProps={{ $blockScrolling: true }}
            width="100%"
            showGutter={true}
            fontSize={16}
            value={code !== "" ? code : fileContent}
            onChange={(newCode) => {
              // Send code changes to WebSocket server
              if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                const message = {
                  content: newCode,
                };
                ws.current.send(JSON.stringify(message));
              }
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CodeEditor;
