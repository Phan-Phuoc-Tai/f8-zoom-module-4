"use client";
import dynamic from "next/dynamic";
import ReactQuill, { DeltaStatic } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
interface EditorProps {
  value: DeltaStatic;
  onChange: (...event: DeltaStatic[]) => void;
}
const QuillEditor = dynamic(() => import("react-quill-new"), {
  ssr: false,
});
export default function CustomEditor({ value, onChange }: EditorProps) {
  return (
    <div className="editor-wrapper">
      <QuillEditor
        value={value}
        onChange={(value, delta, source, editor) => {
          onChange(editor.getContents());
        }}
      />
    </div>
  );
}
