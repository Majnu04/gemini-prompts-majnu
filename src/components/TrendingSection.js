import React from 'react';

const TrendingSection = ({ prompts, trendingCounts }) => {
  // Get top 3 trending prompts based on copy counts
  const trendingPrompts = prompts
    .map(prompt => ({
      ...prompt,
      copyCount: trendingCounts[prompt.id] || 0
    }))
    .sort((a, b) => b.copyCount - a.copyCount)
    .slice(0, 3)
    .filter(prompt => prompt.copyCount > 0);

  if (trendingPrompts.length === 0) {
    return null;
  }

  return (
    <div className="p-4 bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <h2 className="text-xl font-bold text-white">🔥 Trending Prompts</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {trendingPrompts.map((prompt, index) => (
            <div key={prompt.id} className="bg-gray-900 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-all duration-200">
              <div className="flex items-start justify-between mb-2">
                <span className="text-white font-bold text-lg">#{index + 1}</span>
                <span className="bg-gray-800 border border-gray-600 text-white text-xs px-2 py-1 rounded-full">
                  {prompt.copyCount} copies
                </span>
              </div>
              <h3 className="text-white font-semibold mb-1">{prompt.title}</h3>
              <p className="text-gray-300 text-sm">{prompt.category}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingSection;