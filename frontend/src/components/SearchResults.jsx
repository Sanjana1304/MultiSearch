import React, { useState } from 'react'
import CardScroller from './CardScroller';

const SearchResults = ({ results }) => {
    console.log("final",results);

    //content type filters
    const [filters, setFilters] = useState({
        youtube: true,
        article: true,
        paper: true,
        blog: true,
    });

     // Sorting option state
     const [sortBy, setSortBy] = useState('likes'); // Default to sorting by likes

    const youtubeResults = results.slice(0, 10);
    const articleResults = results.slice(10, 20);
    const paperResults = results.slice(20, 30);
    const blogResults = results.slice(30, 40);

    const filteredYoutubeResults = filters.youtube ? youtubeResults : [];
    const filteredArticleResults = filters.article ? articleResults : [];
    const filteredPaperResults = filters.paper ? paperResults : [];
    const filteredBlogResults = filters.blog ? blogResults : [];
    
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: checked,
        }));
    };

    // Sort YouTube results based on the selected criteria
    const sortedYoutubeResults = filteredYoutubeResults.sort((a, b) => {
        switch (sortBy) {
            case 'likes':
                return b.likes - a.likes; // Assuming `likes` is a number
            case 'views':
                return b.views - a.views; // Assuming `views` is a number
            case 'comments':
                return b.comments - a.comments; // Assuming `comments` is a number
            case 'general':
                return b.likes -a.likes && b.views-a.views && b.comments-a.comments;
            default:
                return 0; // No sorting
        }
    });

    const sortedBlogResults = filteredBlogResults.sort((a, b) => {
        switch (sortBy) {
            case 'likes':
                return b.likes - a.likes; // Assuming `likes` is a number
            default:
                return 0; // No sorting
    }})

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

  return (
    <div className='p-3 px-4 w-[85%] mx-auto mt-10'>
        <h1 className='font-semibold text-3xl text-green-800'>Search Results</h1>

        {
            <div className='flex border'>
                <div className='w-[20%] border p-5 font-semibold text-green-700'>
                    <p className='mb-3'><i className='font-normal'>View</i></p>
            
                    <input 
                         type="checkbox"
                         id="youtube"
                         name="youtube"
                         checked={filters.youtube}
                         onChange={handleCheckboxChange}
                    />
                    <label> Youtube</label><br/>
                    
                    <input
                        type="checkbox"
                        id="article"
                        name="article"
                        checked={filters.article}
                        onChange={handleCheckboxChange}
                    />
                    <label> Article</label><br/>
                    
                    <input
                        type="checkbox"
                        id="paper"
                        name="paper"
                        checked={filters.paper}
                        onChange={handleCheckboxChange}
                    />
                    <label> Paper</label><br/>
                    
                    <input
                        type="checkbox"
                        id="blog"
                        name="blog"
                        checked={filters.blog}
                        onChange={handleCheckboxChange}
                    />
                    <label> Blog</label><br/>

                     {/* Sorting Options */}
                     <h2 className='font-semibold mt-4'>Sort by:</h2>
                    <label>
                        <input
                            type="radio"
                            value="likes"
                            checked={sortBy === 'likes'}
                            onChange={handleSortChange}
                        />
                        Likes
                    </label><br />
                    <label>
                        <input
                            type="radio"
                            value="views"
                            checked={sortBy === 'views'}
                            onChange={handleSortChange}
                        />
                        Views
                    </label><br />
                    <label>
                        <input
                            type="radio"
                            value="comments"
                            checked={sortBy === 'comments'}
                            onChange={handleSortChange}
                        />
                        Comments
                    </label>

                    <label>
                        <input
                            type="radio"
                            value="general"
                            checked={sortBy === 'general'}
                            onChange={handleSortChange}
                        />
                        General
                    </label>

                </div>

                <div className='w-[70%]'>
                    {
                        !filteredYoutubeResults.length &&
                        !filteredArticleResults.length &&
                        !filteredPaperResults.length &&
                        !filteredBlogResults.length &&
                        <div className='text-center p-10'>
                            <h1 className='font-semibold text-2xl'>No Results Found</h1>
                        </div>
                    }
                    {
                        sortedYoutubeResults.length > 0 &&
                        <>
                        <h1 className='font-semibold p-2 px-6 text-xl'>YouTube Results</h1>
                        <CardScroller cards={sortedYoutubeResults} typee={'youtube'}/>
                        </>
                    }

                    {
                        filteredArticleResults.length > 0 &&
                        <>
                        <h1 className='font-semibold p-2 px-6 text-xl'>Article Results</h1>
                        <CardScroller cards={filteredArticleResults}/>
                        </>
                    }

                    {
                        filteredPaperResults.length > 0 &&
                        <>
                        <h1 className='font-semibold p-2 px-6 text-xl'>Academic Paper Results</h1>
                        <CardScroller cards={filteredPaperResults}/>
                        </>
                    }
                    {
                        

                    }

                    {
                        sortedBlogResults.length > 0 &&
                        <>
                        <h1 className='font-semibold p-2 px-6 text-xl'>Blog Results</h1>
                        <CardScroller cards={sortedBlogResults}/>
                        </>
                    }

                </div>
                
            </div>
        }

        
    </div>
  )
}

export default SearchResults