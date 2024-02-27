import React, { useState } from "react";
import { Row, Col, Dropdown } from "react-bootstrap";

interface Language {
  value: string;
  label: string;
}

interface Theme {
  value: string;
  label: string;
}

interface LanguageThemeProps {
  selectedLanguageLabel: string;
  selectedThemeLabel: string;
  supportedLanguages: Language[];
  supportedThemes: Theme[];
  handleThemeChange: (selectedTheme: string) => void;
  handleLanguageChange: (selectedLanguage: string) => void;
}

const LanguageTheme: React.FC<LanguageThemeProps> = ({
  selectedLanguageLabel,
  selectedThemeLabel,
  supportedLanguages,
  supportedThemes,
}) => {
  const [theme, setTheme] = useState<string>("monokai");
  const [language, setLanguage] = useState<string>("javascript");
  return (
    <Row className="mt-3">
      <Col>
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="language-dropdown">
            {selectedLanguageLabel}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {supportedLanguages.map((lang) => (
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
  );
};

export default LanguageTheme;
