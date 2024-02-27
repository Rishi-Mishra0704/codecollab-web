"use client";
import Editor from "@/components/Editor";
import FileFolder from "@/components/FileFolder";
import TerminalController from "@/components/Terminal";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  return (
    <>
      <FileFolder />
      <Editor />
      <TerminalController />
    </>
  );
}
