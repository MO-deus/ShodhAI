import React, { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";

const languageExtensions = {
    javascript: javascript(),
    python: python(),
    java: java(),
    cpp: cpp(),
};

export default function CodeEditor({ language = "javascript", code = "", onChange }) {
    const editorRef = useRef();

    useEffect(() => {
        if (!editorRef.current) return;

        const state = EditorState.create({
            doc: code,
            extensions: [
                basicSetup,
                languageExtensions[language] || javascript(),
                EditorView.updateListener.of((v) => {
                    if (v.docChanged) {
                        const doc = v.state.doc.toString();
                        onChange?.(doc);
                    }
                }),
            ],
        });

        const view = new EditorView({
            state,
            parent: editorRef.current,
        });

        return () => view.destroy();
    }, [language]); // reinitialize when language changes

    return <div ref={editorRef} className="h-80 border rounded-lg" />;
}
