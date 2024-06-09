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
        <form onSubmit={handleSearch}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search emails by name, title, or content"
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default Search;