import React, { useState } from 'react';
import { Copy, Download, FileCode, Check } from 'lucide-react';
import { copyToClipboard, downloadCSS } from '../utils/scrollbarUtils';

interface ExportPanelProps {
  css: string;
}

export const ExportPanel: React.FC<ExportPanelProps> = ({ css }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(css);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    downloadCSS(css);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <FileCode className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
          Export CSS
        </h2>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleCopy}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
              copied
                ? 'bg-green-500 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy CSS
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium text-sm sm:text-base"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>

        <div className="relative">
          <pre className="bg-gray-900 text-gray-100 p-3 sm:p-4 rounded-lg overflow-x-auto text-xs sm:text-sm border border-gray-700 max-h-64 sm:max-h-80">
            <code>{css}</code>
          </pre>
          <div className="absolute top-2 right-2">
            <span className="inline-block bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
              CSS
            </span>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-lg p-3 sm:p-4">
          <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-2">
            📋 Usage Instructions
          </h3>
          <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-200 mb-2">
            Add this CSS to your stylesheet to apply the custom scrollbar styling:
          </p>
          <ul className="text-xs sm:text-sm text-amber-800 dark:text-amber-200 space-y-1">
            <li>• Copy the CSS code above</li>
            <li>• Paste it into your main CSS file or style section</li>
            <li>• The styles will apply to all scrollable elements</li>
            <li>• For specific elements, replace the selectors as needed</li>
          </ul>
        </div>
      </div>
    </div>
  );
};