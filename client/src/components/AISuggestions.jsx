import React from 'react';

const AISuggestions = ({ suggestion, onApply, onDismiss, loading, onGenerate }) => {
    return (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-100 mb-4">
            <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-semibold text-indigo-800 flex items-center">
                    <span className="text-lg mr-2">✨</span> AI Suggestion
                </h4>
                <div className="space-x-2">
                    {!suggestion && (
                        <button
                            onClick={onGenerate}
                            disabled={loading}
                            className="text-xs bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                        >
                            {loading ? 'Thinking...' : 'Generate Reply'}
                        </button>
                    )}
                </div>
            </div>

            {suggestion && (
                <div className="animate-fadeIn">
                    <p className="text-gray-700 text-sm italic mb-3 bg-white p-3 rounded-lg border border-indigo-50 shadow-sm">
                        "{suggestion}"
                    </p>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => onApply(suggestion)}
                            className="flex-1 bg-white border border-indigo-200 text-indigo-600 text-xs font-medium py-1.5 rounded-md hover:bg-indigo-50 transition-colors"
                        >
                            Insert
                        </button>
                        <button
                            onClick={onDismiss}
                            className="px-3 bg-white border border-gray-200 text-gray-500 text-xs font-medium py-1.5 rounded-md hover:bg-gray-50 transition-colors"
                        >
                            Dismiss
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AISuggestions;
