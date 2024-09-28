# Proof of Concept (POC) Project Documentation

## Overview

This project was developed as part of the internship application for Revoltronx, focusing on their Technokrax project. The goal was to build a search function that retrieves relevant YouTube videos, articles, academic papers, and blog posts based on a given search term and ranks them by views, likes, and relevance.

## Approach

The search function integrates multiple APIs to fetch and rank results from various content sources:

- **YouTube Data API**: Fetches YouTube video links and associated metadata, including views and likes.
- **NEWS API**: Provides article links from reputable sources.
- **Dev.to API**: Provides blog post links from reputable sources.
- **arXiv API**: Retrieves academic papers based on the search term.

The results can be then ranked according to views, likes, and relevance to ensure the user receives the most pertinent and popular content.

### Technologies Used

1. **Backend Framework**: Node.js was chosen for its fast execution, ease of use with APIs, and scalability and integrating with MongoDB.
2. **APIs**:
   - YouTube Data API: Used to retrieve YouTube video information (views, likes, etc.).
   - NEWS API: For fetching articles.
   - Dev.to API: For fetching blog posts.
   - arXiv API: For retrieving academic papers in response to search queries.
3. **Frontend**: A simple React.js interface allows users to input a search term and view the results.
4. **Ranking Algorithm**: A custom ranking system was implemented to order results based on views, likes, and relevance.
5. **Database (MongoDB)**: For storing the search results.

### Key Functionality

1. **YouTube Integration**: Using the YouTube Data API, the application fetches YouTube videos related to the search term, then ranks them by views and likes. Each result includes the video title, description, URL, views, likes, and comments.

2. **Article Integration**: The NEWS API pulls relevant articles for the search term.

3. **Blog Integration**: The Dev.to API pulls relevant articles for the search term.

4. **Academic Paper Integration**: The arXiv API fetches academic papers based on the search term, returning metadata such as title and URL.

5. **Ranking System**:

   - YouTube videos are ranked by a combination of views, likes and comments.
   - Articles, blogs, and papers are ranked by relevance to the search term.

6. **Filters**: Users can filter results by content type (YouTube videos, articles, academic papers, or blogs), allowing for more tailored searches.

## Challenges and Solutions

1. **API Rate Limits**: The APIs used have rate limits. To manage this, caching strategies and API call optimizations were considered but not fully implemented for this POC.

2. **Result Ranking**: Balancing views, likes, and relevance in the ranking system was challenging. After several iterations, the final algorithm gave more weight to views and likes for YouTube videos, while articles, blogs, and papers were ranked primarily by relevance.

3. **Handling Multiple API Integrations**: Managing responses from multiple APIs and displaying them seamlessly in the UI required careful handling of asynchronous API calls and merging the data effectively.

## Enhancements and Future Scope

1. **More Filtering**: More sophisticated filters could be added, allowing users to sort results by additional criteria (e.g., by date, specific content sources, etc.).

2. **More Content**: Adding more content categories such as podcasts, case studies, or news publications could enrich the search results and make the platform even more comprehensive.

## Conclusion

This POC demonstrates a robust search function that integrates YouTube, article, academic paper, and blog search APIs into a unified experience. It ranks results based on views, likes, and relevance, providing users with a useful tool to find and sort content effectively.
