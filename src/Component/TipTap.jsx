import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";


const TipTap = ({
  value = "<p>Start writing...</p>",
  onChange,
  placeholder = "Start writing...",
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Image,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (onChange) onChange(html);
    },
  });

  if (!editor) return null;

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-3 border-b border-gray-200 bg-gray-50">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-2 border rounded ${
            editor.isActive("bold") ? "bg-gray-200" : ""
          }`}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-2 border rounded ${
            editor.isActive("italic") ? "bg-gray-200" : ""
          }`}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-3 py-2 border rounded ${
            editor.isActive("underline") ? "bg-gray-200" : ""
          }`}
        >
          U
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-3 py-2 border rounded ${
            editor.isActive("strike") ? "bg-gray-200" : ""
          }`}
        >
          S
        </button>
      </div>

      {/* Editor area */}
      <EditorContent
        editor={editor}
        className="min-h-[400px] p-6 focus:outline-none prose prose-sm max-w-none"
      />

      {/* Character count */}
      <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50 border-t">
        Characters: {editor.storage.characterCount?.characters() || editor.getText().length}
      </div>
    </div>
  );
};

export default TipTap;
