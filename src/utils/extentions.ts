export const getModeForExtension = (extension: string): string => {
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
        return "text"; 
    }
  };