import React from 'react';

interface FilterProps {
    onFilterChange: (filter: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
    return (
        <div className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            <button onClick={() => onFilterChange('all')} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">All</button>
            <button onClick={() => onFilterChange('read')} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Read</button>
            <button onClick={() => onFilterChange('unread')} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Unread</button>
        </div>
    );
};

export default Filter;