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
    <div className={`${isDarkMode ? 'bg-black' : 'bg-white'} min-h-screen transition-colors duration-300`}>
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
      <div className={`px-4 sm:px-6 py-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Showing {filteredPrompts.length} of {prompts.length} prompts
        {searchTerm && ` for "${searchTerm}"`}
        {category !== 'All' && ` in ${category}`}
      </div>
      
      {/* Prompts Grid */}
      <div className="px-4 sm:px-4 lg:px-6 py-4 sm:py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-4 lg:gap-6 max-w-7xl mx-auto">
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
            <div className="col-span-full text-center py-8 sm:py-12">
              <div className={`text-lg sm:text-xl mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>No prompts found</div>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {searchTerm 
                  ? `No results for "${searchTerm}". Try a different search term.`
                  : 'No prompts available for this category.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <footer className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} text-center py-4 sm:py-6 mt-8 sm:mt-12`}>
        <div className="max-w-4xl mx-auto px-4">
          <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Developed by{' '}
            <a 
              href="https://www.elitedigitalsolutions.tech/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`font-semibold transition-colors duration-200 underline touch-manipulation ${
                isDarkMode 
                  ? 'text-white hover:text-gray-300 decoration-gray-600 hover:decoration-white' 
                  : 'text-black hover:text-gray-700 decoration-gray-400 hover:decoration-black'
              }`}
            >
              Elite Digitals
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
