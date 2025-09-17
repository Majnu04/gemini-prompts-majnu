import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PromptCard = ({ prompt, updateTrendingCount, index }) => {
  const [copied, setCopied] = useState(false);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt.promptText);
      setCopied(true);
      updateTrendingCount(prompt.id);
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = prompt.promptText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      updateTrendingCount(prompt.id);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="bg-gray-900 dark:bg-white border border-gray-800 dark:border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-gray-700 dark:hover:border-gray-300 transition-all duration-300 mx-auto max-w-sm sm:max-w-none"
    >
      {/* Image Container */}
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
        <img 
          src={prompt.image} 
          alt={prompt.title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            // Fallback to gradient if image fails to load
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-200 dark:to-gray-300 hidden items-center justify-center">
          <div className="text-white dark:text-black text-center p-4">
            <h3 className="text-base sm:text-lg font-bold mb-2">{prompt.title}</h3>
            <span className="inline-block px-3 py-1 bg-black dark:bg-white bg-opacity-50 dark:bg-opacity-90 rounded-full text-sm border border-gray-600 dark:border-gray-400">
              {prompt.category}
            </span>
          </div>
        </div>
        {/* Category Badge */}
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
          <span className="bg-black dark:bg-white bg-opacity-80 dark:bg-opacity-90 text-white dark:text-black px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium border border-gray-600 dark:border-gray-400">
            {prompt.category}
          </span>
        </div>
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black dark:from-white via-transparent to-transparent opacity-60 dark:opacity-40"></div>
      </div>
      
      {/* Content */}
      <div className="p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-bold text-white dark:text-black mb-2 leading-tight">{prompt.title}</h3>
        <p className="text-gray-300 dark:text-gray-600 text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed">{prompt.description}</p>
        
        {/* Prompt Text Preview */}
        <div className="bg-gray-800 dark:bg-gray-100 border border-gray-700 dark:border-gray-300 rounded-lg p-2 sm:p-3 mb-3 sm:mb-4">
          <p className="text-gray-400 dark:text-gray-500 text-xs mb-1">Prompt Preview:</p>
          <p className="text-gray-200 dark:text-gray-700 text-xs sm:text-sm line-clamp-3 leading-relaxed">{prompt.promptText}</p>
        </div>
        
        {/* Copy Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={copyPrompt}
          className={`w-full py-3 sm:py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 border text-sm sm:text-base touch-manipulation ${
            copied
              ? 'bg-green-600 text-white border-green-600'
              : 'bg-white dark:bg-black text-black dark:text-white border-white dark:border-black hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-lg'
          }`}
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="hidden sm:inline">Copy Prompt</span>
              <span className="sm:hidden">Copy</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PromptCard;