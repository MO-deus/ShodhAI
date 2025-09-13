import React, { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { Compartment } from "@codemirror/state";

const languageExtensions = {
    javascript: javascript(),
    python: python(),
    java: java(),
    cpp: cpp(),
};

export default function CodeEditor({ language = "javascript", code = "", onChange }) {
    const editorRef = useRef();
    const viewRef = useRef();
    const langCompartment = useRef(new Compartment());

    // Initialize editor
    useEffect(() => {
        if (!editorRef.current) return;

        const state = EditorState.create({
            doc: code,
            extensions: [
                basicSetup,
                langCompartment.current.of(languageExtensions[language] || javascript()),
                EditorView.updateListener.of((v) => {
                    if (v.docChanged) {
                        onChange?.(v.state.doc.toString());
                    }
                }),
            ],
        });

        viewRef.current = new EditorView({
            state,
            parent: editorRef.current,
        });

        return () => viewRef.current.destroy();
    }, []); // only once

    // Update language dynamically
    useEffect(() => {
        if (viewRef.current) {
            viewRef.current.dispatch({
                effects: langCompartment.current.reconfigure(
                    languageExtensions[language] || javascript()
                ),
            });
        }
    }, [language]);

    // Update code from parent
    useEffect(() => {
        if (viewRef.current) {
            const currentCode = viewRef.current.state.doc.toString();
            if (code !== currentCode) {
                viewRef.current.dispatch({
                    changes: { from: 0, to: currentCode.length, insert: code },
                });
            }
        }
    }, [code]);

    return (
        <div
            ref={editorRef}
            className="h-96 border rounded-lg overflow-y-auto bg-gray-50"
        />
    );
}
