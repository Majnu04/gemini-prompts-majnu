import React from 'react';

const FilterControls = ({ setSearchTerm, setCategory, category, searchTerm }) => {
  const categories = ['All', 'Men', 'Women', 'Couples'];

  return (
    <div className="p-4 bg-gray-800 dark:bg-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
      {/* Category Buttons */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              category === cat
                ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
          >
            {cat} Prompts
          </button>
        ))}
      </div>
      
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search prompts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 bg-gray-700 dark:bg-gray-600 text-white placeholder-gray-400 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 w-64"
        />
      </div>
    </div>
  );
};

export default FilterControls;