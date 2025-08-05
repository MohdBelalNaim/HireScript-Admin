import React, { useState, useRef, useEffect } from "react";

const RichTextEditor = ({
  value = "",
  onChange,
  placeholder = "Start writing...",
}) => {
  const [content, setContent] = useState(value);
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.innerHTML) {
      const selection = window.getSelection();
      const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
      const isEditorFocused = editorRef.current.contains(
        document.activeElement
      );

      editorRef.current.innerHTML = content;

      if (isEditorFocused && range) {
        try {
          selection.removeAllRanges();
          selection.addRange(range);
        } catch (e) {
          const newRange = document.createRange();
          newRange.selectNodeContents(editorRef.current);
          newRange.collapse(false);
          selection.removeAllRanges();
          selection.addRange(newRange);
        }
      }
    }
  }, [content]);

  useEffect(() => {
    if (value !== content) {
      setContent(value);
    }
  }, [value]);

  const handleContentChange = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      setContent(newContent);
      if (onChange) {
        onChange(newContent);
      }
    }
  };

  const applyFormat = (command, value = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    setTimeout(() => handleContentChange(), 50);
  };

  const applyHeading = (headingType) => {
    editorRef.current?.focus();
    const tag = headingType === "p" ? "div" : headingType;
    document.execCommand("formatBlock", false, `<${tag}>`);
    setTimeout(() => handleContentChange(), 50);
  };

  const applyList = (listType) => {
    editorRef.current?.focus();
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const parentElement =
        range.commonAncestorContainer.nodeType === Node.TEXT_NODE
          ? range.commonAncestorContainer.parentElement
          : range.commonAncestorContainer;

      const existingList = parentElement.closest("ul, ol");
      if (existingList) {
        const isOrdered = existingList.tagName === "OL";
        const isUnordered = existingList.tagName === "UL";

        if (
          (listType === "insertOrderedList" && isOrdered) ||
          (listType === "insertUnorderedList" && isUnordered)
        ) {
          document.execCommand("outdent", false, null);
          setTimeout(() => handleContentChange(), 50);
          return;
        }
      }
    }

    document.execCommand(listType, false, null);
    setTimeout(() => handleContentChange(), 50);
  };

  const applyFontSize = (size) => {
    const sizeMap = {
      "10px": "1",
      "12px": "2",
      "14px": "3",
      "16px": "4",
      "18px": "5",
      "24px": "6",
      "32px": "7",
    };
    const execSize = sizeMap[size] || "4";
    document.execCommand("fontSize", false, execSize);
    editorRef.current?.focus();
    setTimeout(() => handleContentChange(), 10);
  };

  const insertLink = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0 && !selection.isCollapsed) {
      const url = prompt("Enter URL:");
      if (url) applyFormat("createLink", url);
    } else {
      alert("Please select text first to create a link.");
    }
  };

  const insertImage = () => {
    const url = prompt("Enter image URL:");
    if (url) applyFormat("insertImage", url);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      document.execCommand(e.shiftKey ? "outdent" : "indent", false, null);
      setTimeout(() => handleContentChange(), 50);
    }

    if (e.key === "Enter") {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const parent =
          range.commonAncestorContainer.nodeType === Node.TEXT_NODE
            ? range.commonAncestorContainer.parentElement
            : range.commonAncestorContainer;
        const heading = parent.closest("h1, h2, h3, h4, h5, h6");

        if (
          heading &&
          range.collapsed &&
          range.endOffset === heading.textContent.length
        ) {
          e.preventDefault();
          document.execCommand("insertHTML", false, "<br><div><br></div>");
          setTimeout(() => handleContentChange(), 50);
        }
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const clipboardData = e.clipboardData || window.clipboardData;
    const htmlData = clipboardData.getData("text/html");
    const plainText = clipboardData.getData("text/plain");

    if (htmlData) {
      // Insert HTML directly to preserve formatting
      document.execCommand("insertHTML", false, htmlData);
    } else {
      // Fallback: plain text
      document.execCommand("insertText", false, plainText);
    }

    // Update content after paste
    setTimeout(() => handleContentChange(), 50);
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-3 border-b border-gray-200 bg-gray-50">
        {/* Formatting buttons */}
        <button
          onClick={() => applyFormat("bold")}
          className="px-3 py-2 border rounded"
        >
          B
        </button>
        <button
          onClick={() => applyFormat("italic")}
          className="px-3 py-2 border rounded"
        >
          I
        </button>
        <button
          onClick={() => applyFormat("underline")}
          className="px-3 py-2 border rounded"
        >
          U
        </button>
        <button
          onClick={() => applyFormat("strikeThrough")}
          className="px-3 py-2 border rounded"
        >
          S
        </button>

        <select
          onChange={(e) => applyFontSize(e.target.value)}
          className="px-2 py-1 border rounded"
          defaultValue="16px"
        >
          <option value="10px">10px</option>
          <option value="12px">12px</option>
          <option value="14px">14px</option>
          <option value="16px">16px (Default)</option>
          <option value="18px">18px</option>
          <option value="24px">24px</option>
          <option value="32px">32px</option>
        </select>

        <select
          onChange={(e) => {
            if (e.target.value) {
              applyHeading(e.target.value);
              e.target.value = "";
            }
          }}
          className="px-2 py-1 border rounded"
        >
          <option value="">Headings</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
          <option value="h5">Heading 5</option>
          <option value="h6">Heading 6</option>
          <option value="p">Normal</option>
        </select>

        <button
          onClick={() => applyList("insertUnorderedList")}
          className="px-3 py-2 border rounded"
        >
          • List
        </button>
        <button
          onClick={() => applyList("insertOrderedList")}
          className="px-3 py-2 border rounded"
        >
          1. List
        </button>

        <button
          onClick={() => applyFormat("justifyLeft")}
          className="px-3 py-2 border rounded"
        >
          ⬅️
        </button>
        <button
          onClick={() => applyFormat("justifyCenter")}
          className="px-3 py-2 border rounded"
        >
          ↔️
        </button>
        <button
          onClick={() => applyFormat("justifyRight")}
          className="px-3 py-2 border rounded"
        >
          ➡️
        </button>
        <button
          onClick={() => applyFormat("justifyFull")}
          className="px-3 py-2 border rounded"
        >
          ⬌
        </button>

        <button onClick={insertLink} className="px-3 py-2 border rounded">
          🔗
        </button>
        <button onClick={insertImage} className="px-3 py-2 border rounded">
          🖼️
        </button>

        <input
          type="color"
          onChange={(e) => applyFormat("foreColor", e.target.value)}
          className="w-8 h-8 border rounded"
        />
        <input
          type="color"
          onChange={(e) => applyFormat("backColor", e.target.value)}
          className="w-8 h-8 border rounded"
        />

        <button
          onClick={() => applyFormat("removeFormat")}
          className="px-3 py-2 border rounded"
        >
          🧹
        </button>
        <button
          onClick={() => applyFormat("undo")}
          className="px-3 py-2 border rounded"
        >
          ↶
        </button>
        <button
          onClick={() => applyFormat("redo")}
          className="px-3 py-2 border rounded"
        >
          ↷
        </button>
      </div>

      {/* Editor area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleContentChange}
        onBlur={handleContentChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        className="min-h-[400px] p-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset 
  [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl [&_h4]:text-lg 
  [&_ul]:list-disc [&_ol]:list-decimal [&_li]:ml-6 min-h-[400px] p-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
        suppressContentEditableWarning={true}
        data-placeholder={placeholder}
      />

      {/* Character count */}
      <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50 border-t">
        Characters: {content.replace(/<[^>]*>/g, "").length}
      </div>
    </div>
  );
};

export default RichTextEditor;
