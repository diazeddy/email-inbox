import React, { useState } from 'react';
import axios from 'axios';

interface SearchProps {
    onSearchResults: (emails: any[]) => void;
}

const Search: React.FC<SearchProps> = ({ onSearchResults }) => {
    const [query, setQuery] = useState('');

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await axios.get(`http://localhost:3000/api/emails/search?q=${query}`);
        onSearchResults(response.data);
    };

    return (
        <form onSubmit={handleSearch} className="mb-4 flex space-x-2">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded"
                placeholder="Search emails by name, title, or content"
            />
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Search</button>
        </form>
    );
};

export default Search;