require('dotenv').config();
const mongoose = require('mongoose');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require('express');
const SearchHistory = require('./models/SearchHistory');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const PORT = 3000;

app.use(
    cors({
        origin : process.env.FRONTEND_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials : true,
    })
)

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('MongoDB connected successfully hehe');
})
.catch(err => {
  console.error('Ayo Error connecting to MongoDB:', err);
});

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Route to save search history
app.post('/api/saveSearchHistory', async (req, res) => {
    const { searchTerm } = req.body;

    try {
        const newSearch = new SearchHistory({
            searchTerm,
        });
        
        await newSearch.save();
        res.status(200).json({ message: 'Search history saved successfully!' });
    } catch (err) {
        console.error('Error saving search history:', err);
        res.status(500).json({ message: 'Error saving search history' });
    }
});

// Route to get all search histories
app.get('/api/searchHistory', async (req, res) => {
  try {
      const searchHistories = await SearchHistory.find({});
      res.status(200).json(searchHistories);
  } catch (err) {
      console.error('Error fetching search histories:', err);
      res.status(500).json({ message: 'Error fetching search histories' });
  }
});

app.get('/api/fetchArticles', async (req, res) => {
  const term = req.query.q; // Get search term from query parameters
  try {
      const response = await fetch(`https://newsapi.org/v2/everything?q=${term}&pageSize=10&apiKey=${process.env.VITE_NEWS_API_KEY}`);
      const data = await response.json();
      res.json(data);
  } catch (error) {
      console.error('Error fetching articles:', error);
      res.status(500).json({ error: 'Failed to fetch articles' });
  }
});



// Start the server
app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
