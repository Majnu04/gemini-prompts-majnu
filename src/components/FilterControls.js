import React from 'react';

const FilterControls = ({ setSearchTerm, setCategory, category, searchTerm }) => {
  const categories = ['All', 'Men', 'Women', 'Couples'];

  return (
    <div className="px-4 py-3 sm:px-6 sm:py-4 bg-gray-900 dark:bg-gray-100 border-b border-gray-800 dark:border-gray-200 flex flex-col gap-4">
      {/* Category Buttons */}
      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium transition-all duration-200 border text-sm sm:text-base touch-manipulation ${
              category === cat
                ? 'bg-white dark:bg-black text-black dark:text-white border-white dark:border-black shadow-lg transform scale-105'
                : 'bg-transparent text-gray-300 dark:text-gray-600 border-gray-600 dark:border-gray-400 hover:bg-gray-800 dark:hover:bg-gray-200 hover:text-white dark:hover:text-black hover:border-gray-500 dark:hover:border-gray-500'
            }`}
          >
            <span className="hidden sm:inline">{cat} Prompts</span>
            <span className="sm:hidden">{cat}</span>
          </button>
        ))}
      </div>
      
      {/* Search Input */}
      <div className="relative w-full max-w-md mx-auto sm:mx-0 sm:max-w-none sm:w-80">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search prompts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 sm:py-2 bg-gray-800 dark:bg-gray-100 text-white dark:text-black placeholder-gray-400 dark:placeholder-gray-500 rounded-lg border border-gray-600 dark:border-gray-300 focus:border-white dark:focus:border-black focus:ring-2 focus:ring-white dark:focus:ring-black focus:outline-none transition-all duration-200 text-base sm:text-sm"
        />
      </div>
    </div>
  );
};

export default FilterControls;