const mongoose = require('mongoose');

const searchHistorySchema = new mongoose.Schema({
    searchTerm: {
        type: String,
        required: true,
    },
    dateSearched: {
        type: Date,
        default: Date.now,
    },
});

const SearchHistory = mongoose.model('search_history', searchHistorySchema);
module.exports = SearchHistory;
