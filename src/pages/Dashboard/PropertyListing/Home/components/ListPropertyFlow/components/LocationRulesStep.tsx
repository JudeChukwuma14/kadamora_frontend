import React, { useEffect, useRef, useState } from 'react';

import styles from './LocationRulesStep.module.css';
import { usePropertyListingForm } from '../formContext';
import Input from '@components/forms/Input';

const LocationRulesStep: React.FC = () => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [selectionKey, setSelectionKey] = useState(0); // Force re-render for active states
    const { state, updateField } = usePropertyListingForm();

    useEffect(() => {
        if (editorRef.current && editorRef.current.innerText !== state.houseRule) {
            editorRef.current.innerText = state.houseRule;
        }
    }, [state.houseRule]);

    const handleCommand = (command: string, value?: string) => {
        if (editorRef.current) {
            editorRef.current.focus();

            // For list commands, we need special handling
            if (command === 'insertUnorderedList' || command === 'insertOrderedList') {
                const selection = window.getSelection();
                if (selection && selection.rangeCount > 0) {
                    // Check if we're already in a list
                    let element = selection.anchorNode?.parentElement;
                    let isInList = false;
                    while (element && element !== editorRef.current) {
                        if (element.tagName === 'UL' || element.tagName === 'OL') {
                            isInList = true;
                            break;
                        }
                        element = element.parentElement;
                    }

                    if (isInList) {
                        // If we're in a list, remove the list formatting
                        document.execCommand('outdent', false);
                    } else {
                        // If we're not in a list, create one
                        document.execCommand(command, false, value);
                    }
                } else {
                    document.execCommand(command, false, value);
                }
            } else {
                document.execCommand(command, false, value);
            }
        }
    };

    const syncHouseRule = () => {
        if (!editorRef.current) return;
        const text = editorRef.current.innerText.trim();
        updateField('houseRule', text);
    };

    const handleInput = () => {
        syncHouseRule();
        setSelectionKey((prev) => prev + 1);
    };

    const handleSelectionChange = () => {
        setSelectionKey((prev) => prev + 1);
    };

    const isActive = (command: string) => {
        try {
            return document.queryCommandState(command);
        } catch (e) {
            return false;
        }
    };

    const isListActive = (listType: 'ol' | 'ul') => {
        if (editorRef.current) {
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
                let element = selection.anchorNode?.parentElement;
                while (element && element !== editorRef.current) {
                    if (element.tagName === listType.toUpperCase()) {
                        return true;
                    }
                    element = element.parentElement;
                }
            }
        }
        return false;
    };

    return (
        <div className="space-y-6">
            {/* Location Field */}
            <div>
                <Input
                    title="Location"
                    placeholder="Enter location"
                    value={state.location}
                    onChange={(event) => updateField('location', event.target.value)}
                />
            </div>

            {/* House Rules Rich Text Editor */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">House Rule</label>
                <div className="border border-gray-300 rounded-md overflow-hidden bg-white">
                    {/* Toolbar */}
                    <div className="flex items-center gap-1 p-2 bg-gray-50 border-b border-gray-200">
                        <button
                            type="button"
                            onClick={() => handleCommand('bold')}
                            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                                isActive('bold') ? 'bg-gray-200' : ''
                            }`}
                            title="Bold"
                        >
                            <span className="font-bold text-sm">B</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => handleCommand('italic')}
                            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                                isActive('italic') ? 'bg-gray-200' : ''
                            }`}
                            title="Italic"
                        >
                            <span className="italic text-sm">I</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => handleCommand('underline')}
                            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                                isActive('underline') ? 'bg-gray-200' : ''
                            }`}
                            title="Underline"
                        >
                            <span className="underline text-sm">U</span>
                        </button>

                        <div className="w-px h-6 bg-gray-300 mx-1"></div>

                        <select
                            onChange={(e) => handleCommand('fontSize', e.target.value)}
                            className="text-sm border-none bg-transparent px-2 py-1 rounded hover:bg-gray-200"
                            title="Font Size"
                        >
                            <option value="1">Small</option>
                            <option value="3" selected>
                                Normal
                            </option>
                            <option value="5">Large</option>
                            <option value="7">Huge</option>
                        </select>

                        <div className="w-px h-6 bg-gray-300 mx-1"></div>

                        <button
                            type="button"
                            onClick={() => handleCommand('insertOrderedList')}
                            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                                isListActive('ol') ? 'bg-gray-200' : ''
                            }`}
                            title="Ordered List"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V6H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={() => handleCommand('insertUnorderedList')}
                            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                                isListActive('ul') ? 'bg-gray-200' : ''
                            }`}
                            title="Bullet List"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z" />
                            </svg>
                        </button>

                        <div className="w-px h-6 bg-gray-300 mx-1"></div>

                        <button
                            type="button"
                            onClick={() => handleCommand('justifyLeft')}
                            className="p-2 rounded hover:bg-gray-200 transition-colors"
                            title="Align Left"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zM2 7a1 1 0 011-1h10a1 1 0 110 2H3a1 1 0 01-1-1zM2 11a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zM2 15a1 1 0 011-1h10a1 1 0 110 2H3a1 1 0 01-1-1z" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={() => handleCommand('justifyCenter')}
                            className="p-2 rounded hover:bg-gray-200 transition-colors"
                            title="Align Center"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zM4 15a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={() => handleCommand('justifyRight')}
                            className="p-2 rounded hover:bg-gray-200 transition-colors"
                            title="Align Right"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zM6 7a1 1 0 011-1h10a1 1 0 110 2H7a1 1 0 01-1-1zM2 11a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zM6 15a1 1 0 011-1h10a1 1 0 110 2H7a1 1 0 01-1-1z" />
                            </svg>
                        </button>
                    </div>

                    {/* Editor */}
                    <div
                        ref={editorRef}
                        contentEditable
                        onInput={handleInput}
                        onMouseUp={handleSelectionChange}
                        onKeyUp={handleSelectionChange}
                        className={`${styles.editor} min-h-30 p-3 text-sm leading-relaxed focus:outline-none`}
                        suppressContentEditableWarning={true}
                        data-placeholder="Enter rules"
                        data-selection-key={selectionKey} // Use selectionKey to avoid lint warning
                        onFocus={(e) => {
                            if (e.target.textContent === '') {
                                e.target.setAttribute('data-empty', 'true');
                            }
                        }}
                        onBlur={(e) => {
                            e.target.removeAttribute('data-empty');
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default LocationRulesStep;
