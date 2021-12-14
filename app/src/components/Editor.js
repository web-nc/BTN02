import React, { useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function RichTextEditor({ editorState, setEditorState }) {
  const editorRef = useRef();
  const [hasFocus, setHasFocus] = useState(false);

  return (
    <div className={hasFocus ? "rich-editor hasFocus" : "rich-editor"} onClick={() => editorRef.current.focusEditor()}>
      <Editor
        ref={editorRef}
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        placeholder="Chi tiết.."
        editorStyle={{ maxHeight: "8rem", minHeight: "6rem" }}
        onEditorStateChange={(state) => setEditorState(state)}
        onFocus={() => setHasFocus(!hasFocus)}
        onBlur={() => setHasFocus(!hasFocus)}
        toolbar={{
          options: ["inline", "blockType", "fontSize", "list", "textAlign", "colorPicker", "history"],
          inline: {
            options: ["bold", "italic", "underline", "strikethrough", "monospace"],
          },
          list: {
            options: ["unordered", "ordered"],
          },
          textAlign: {
            options: ["left", "center", "right"],
          },
        }}
      />

      <div className="rich-editor-borderline" />
    </div>
  );
}
