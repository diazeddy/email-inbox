import React from 'react';

interface FilterProps {
    onFilterChange: (filter: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
    return (
        <div className="filter">
            <button onClick={() => onFilterChange('all')}>All</button>
            <button onClick={() => onFilterChange('read')}>Read</button>
            <button onClick={() => onFilterChange('unread')}>Unread</button>
        </div>
    );
};

export default Filter;