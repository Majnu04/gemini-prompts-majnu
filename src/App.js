import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from './components/Header';
import FilterControls from './components/FilterControls';
import PromptCard from './components/PromptCard';
import TrendingSection from './components/TrendingSection';

function App() {
  const [prompts, setPrompts] = useState([]);
  const [filteredPrompts, setFilteredPrompts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [trendingCounts, setTrendingCounts] = useState({});

  // Load data on component mount
  useEffect(() => {
    fetch('/prompts.json')
      .then(response => response.json())
      .then(data => {
        setPrompts(data);
        setFilteredPrompts(data);
      })
      .catch(error => console.error('Error loading prompts:', error));

    // Load trending counts from localStorage
    const savedTrendingCounts = localStorage.getItem('trendingCounts');
    if (savedTrendingCounts) {
      setTrendingCounts(JSON.parse(savedTrendingCounts));
    }

    // Set initial theme
    document.documentElement.classList.add('dark');
  }, []);

  // Filter prompts based on search term and category
  useEffect(() => {
    let result = prompts;
    
    if (category !== 'All') {
      result = result.filter(p => p.category === category);
    }
    
    if (searchTerm) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.promptText.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredPrompts(result);
  }, [searchTerm, category, prompts]);

  // Theme toggle function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Update trending count when a prompt is copied
  const updateTrendingCount = (promptId) => {
    const newCounts = {
      ...trendingCounts,
      [promptId]: (trendingCounts[promptId] || 0) + 1
    };
    setTrendingCounts(newCounts);
    localStorage.setItem('trendingCounts', JSON.stringify(newCounts));
  };

  return (
    <div className="bg-gray-900 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <Helmet>
        <title>Gemini Prompts Vault - AI Image Generation Prompts</title>
        <meta name="description" content="Discover and copy high-quality AI prompts for image generation. Perfect for Gemini, DALL-E, Midjourney, and other AI tools." />
        <meta name="keywords" content="AI prompts, image generation, Gemini, DALL-E, Midjourney, artificial intelligence, creative prompts" />
        <meta property="og:title" content="Gemini Prompts Vault - AI Image Generation Prompts" />
        <meta property="og:description" content="Discover and copy high-quality AI prompts for image generation." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      
      <TrendingSection prompts={prompts} trendingCounts={trendingCounts} />
      
      <FilterControls 
        setSearchTerm={setSearchTerm} 
        setCategory={setCategory} 
        category={category}
        searchTerm={searchTerm}
      />
      
      {/* Results count */}
      <div className="px-4 py-2 text-gray-400 text-sm">
        Showing {filteredPrompts.length} of {prompts.length} prompts
        {searchTerm && ` for "${searchTerm}"`}
        {category !== 'All' && ` in ${category}`}
      </div>
      
      {/* Prompts Grid */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPrompts.length > 0 ? (
          filteredPrompts.map((prompt, index) => (
            <PromptCard 
              key={prompt.id} 
              prompt={prompt} 
              index={index}
              updateTrendingCount={updateTrendingCount}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 text-xl mb-2">No prompts found</div>
            <p className="text-gray-500">
              {searchTerm 
                ? `No results for "${searchTerm}". Try a different search term.`
                : 'No prompts available for this category.'
              }
            </p>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-700 text-center py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-lg font-semibold text-white mb-2">Gemini Prompts Vault</h3>
          <p className="text-gray-400 text-sm">
            Discover and copy AI prompts for your creative projects. Built with React and Tailwind CSS.
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <span className="text-gray-500 text-xs">
              {prompts.length} Total Prompts
            </span>
            <span className="text-gray-500 text-xs">
              {Object.values(trendingCounts).reduce((a, b) => a + b, 0)} Total Copies
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
