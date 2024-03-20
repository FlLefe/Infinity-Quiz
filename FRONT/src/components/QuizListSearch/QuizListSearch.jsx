import { useEffect, useState } from "react";
import './QuizListSearch.scss';

export default function QuizListSearch({ data, setFilteredDataList, paginate, searchKey, scoreFilter, difficultyFilter }) {
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        handleSearch(searchText);
    }, [searchText, scoreFilter, difficultyFilter]);

    const handleInputChange = (value) => {
        setSearchText(value);
    };

    const handleClearSearch = () => {
        setSearchText("");
    };

    const handleSearch = (searchText) => {
        let filteredList = data.filter((item) =>
            item[searchKey].toString().toLowerCase().includes(searchText.toLowerCase())
        );

        if(scoreFilter){
            scoreFilter === "withScore" ? filteredList = filteredList.filter((quiz) => quiz.score !== null) : filteredList = filteredList.filter((quiz) => quiz.score === null)      
        } 

        if(difficultyFilter){
            filteredList = filteredList.filter((quiz) => quiz.difficulty === difficultyFilter)    
        } 

        setFilteredDataList(filteredList);
        paginate(1);
    };

    return (
        <div className="QuizListSearchContainer">
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