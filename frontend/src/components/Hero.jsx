import React, { useState } from 'react'
import SearchResults from './SearchResults';
import { addSearchTerm } from '../api-client';

const Hero = () => {
const [searchTerm, setSearchTerm] = useState('');
const [results, setResults] = useState([]);

const [isLoading, setIsLoading] = useState(false);
  
  const handleSearch = async() => {
    if (!searchTerm) {
      alert("Please enter a search term.");
      return;
    }
    setIsLoading(true);

    // Fetch data from APIs
    const fetchedResults = await fetchData(searchTerm);
    setResults(fetchedResults);

    try {
      const response = await addSearchTerm(searchTerm);
    } catch (error) {
      console.error('Error saving search history:', error);
    }
    setIsLoading(false);

    //console.log('Results:', fetchedResults);
  };

  const fetchData = async (term) => {
    const results = [];

    // Fetch YouTube Data (YouTube API Key Needed)
    const youtubeResults = await fetchYouTubeData(term);
    results.push(...youtubeResults);

    // Fetch Articles (Use a relevant API)
    const articleResults = await fetchArticles(term);
    results.push(...articleResults);

    // Fetch Academic Papers (Use a relevant API)
    const paperResults = await fetchAcademicPapers(term);
    results.push(...paperResults);

    // Fetch Blogs (Use a relevant API)
    const blogResults = await fetchBlogs(term);
    results.push(...blogResults);


    return results;
  };

  //YouTube Data API key v3
  const fetchYouTubeData = async (term) => {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    
    const searchResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${term}&key=${apiKey}`);
    const searchData = await searchResponse.json();

    // Step 2: Extract video IDs
    const videoIds = searchData.items.map(item => item.id.videoId).join(',');
    
    // Step 3: Fetch video details including statistics
    const videoResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&maxResults=10&id=${videoIds}&key=${apiKey}`);
    const videoData = await videoResponse.json();

    //console.log('YouTube Data:', data);
    return videoData.items.map(item => ({
        type: 'youtube video',
        title: item.snippet.title,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        thumbnail: item.snippet.thumbnails.default.url,
        url: `https://www.youtube.com/watch?v=${item.id}`,
        likes: item.statistics.likeCount || 0,  // Likes count
        comments: item.statistics.commentCount || 0,  // Comments count
        views: item.statistics.viewCount || 0,  // Views count
    }));
  };

  // News API key
  // const fetchArticles = async (term) => {
  //   const apiKey = import.meta.env.VITE_NEWS_API_KEY;
  //   const pageSize = 10; // Limit to 10 results
  //   const response = await fetch(`https://newsapi.org/v2/everything?q=${term}&pageSize=${pageSize}&apiKey=${apiKey}`);
  //   const data = await response.json();
  
  //   // Map the results to include title, description, and URL
  //   return data.articles.map(article => ({
  //       type: 'article',
  //       title: article.title,
  //       url: article.url,
  //       description: article.description,
  //       thumbnail: article.urlToImage,
  //       publishedAt: article.publishedAt,
  //       author: article.author
  //   }));
  // };

  const fetchArticles = async (term) => {
    const apiKey = import.meta.env.VITE_NEWS_API_KEY; 
    const pageSize = 10; 

    try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${term}&pageSize=${pageSize}&apiKey=${apiKey}`, {
            method: 'GET',
            headers: {
                'Upgrade-Insecure-Requests': '1',
                'Accept': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.articles) {
            throw new Error('No articles found');
        }

        return data.articles.map(article => ({
            type: 'article',
            title: article.title,
            url: article.url,
            description: article.description,
            thumbnail: article.urlToImage,
            publishedAt: article.publishedAt,
            author: article.author
        }));
    } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
    }
};


  //arXiv API
  const fetchAcademicPapers = async (term) => {
    const response = await fetch(`http://export.arxiv.org/api/query?search_query=${encodeURIComponent(term)}&start=0&max_results=10`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch academic papers');
    }
  
    const textData = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(textData, 'application/xml');
    
    const entries = xmlDoc.getElementsByTagName('entry');
  
    // Map the results to include title and URL
    const papers = [];
    for (let i = 0; i < entries.length; i++) {
      papers.push({
        type: 'paper',
        title: entries[i].getElementsByTagName('title')[0].textContent,
        url: entries[i].getElementsByTagName('id')[0].textContent,
        description: entries[i].getElementsByTagName('summary')[0].textContent,  // Paper abstract/summary
        author: Array.from(entries[i].getElementsByTagName('author')).map(author => author.getElementsByTagName('name')[0].textContent)[0],  // List of authors
        publishedAt: entries[i].getElementsByTagName('published')[0].textContent,  // Publication date
        thumbnail:'/academic_paper.jpg'
      });
    }
  
    return papers;
  };
  

  //Dev.to API
  const fetchBlogs = async (term) => {
    const response = await fetch(`https://dev.to/api/articles?tag=${encodeURIComponent(term)}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }
  
    const data = await response.json();
    
    // Map the results to include title and URL
    return data.map(blog => ({
      type: 'blog',
      title: blog.title,
      url: blog.url,
      description: blog.description,
      likes: blog.positive_reactions_count,
      publishedAt: blog.published_at,
      thumbnail: '/blog.webp'
    }));
  };

  return (
    <>
    <div className='flex flex-col sm:flex-row justify-center mt-10 p-3'>
        <div className='w-[40%]'>
            <p className="text-6xl text-gray-600 mb-6 font-semibold">Discover, Rank, and <span className='text-green-800'>Explore</span> the Best Content Across the Web</p>
            <div className='flex justify-between'>
                <input 
                    id="search"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-3/4 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Search..."
                />

                <button
                onClick={handleSearch}
                className="w-1/5 bg-green-600 text-white py-2 rounded-lg hover:bg-green-500 transition duration-300"
                >
                Search
                </button>
            </div>
        </div>
        <div>
            <img src="/hero_img.webp" alt="" className='rounded-full'/>
        </div>
    </div>
    {
        isLoading && <div className='text-center mt-10'>
            {/* <img src="/loading.gif" alt="" className='mx-auto'/> */}
            <p className='text-gray-500 mt-5'>Your Results are Loading...</p>
        </div>
        
    }
    {
        results.length>0 && <SearchResults results={results}/>
    }
    </>
  )
}

export default Hero