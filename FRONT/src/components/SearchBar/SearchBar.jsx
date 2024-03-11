import { useState } from "react";
import './SearchBar.scss';

export default function SearchBar({ data, setFilteredDataList, paginate, searchKey }) {
    const [searchText, setSearchText] = useState("");

    const handleInputChange = (value) => {
        setSearchText(value);
        handleSearch(value);
    };

    const handleClearSearch = () => {
        setSearchText("");
        handleSearch("");
    };

    const handleSearch = (searchText) => {
        const filteredList = data.filter((item) =>
            item[searchKey].toString().toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredDataList(filteredList);
        paginate(1);
    };

    return (
        <div className="searchBarContainer">
            <input
                type="text"
                className="searchBar"
                value={searchText}
                placeholder="Rechercher..."
                onChange={(e) => handleInputChange(e.target.value)}
            />
            {searchText && (
                <button className="clearButton" onClick={handleClearSearch}>
                    <img src='/icons/x.svg' alt='Icone de croix'></img>
                </button>
            )}
        </div>
    );
}