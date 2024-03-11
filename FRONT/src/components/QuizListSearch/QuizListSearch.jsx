import { useEffect, useState } from "react";
import './QuizListSearch.scss';

export default function QuizListSearch({ data, setFilteredDataList, paginate, searchKey, activeFilters }) {
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        handleSearch(searchText);
    }, [searchText, activeFilters]);

    const handleInputChange = (value) => {
        setSearchText(value);
    };

    const handleClearSearch = () => {
        setSearchText("");
    };

    const handleSearch = (searchText) => {
        const filteredList = data.filter((item) =>
            item[searchKey].toString().toLowerCase().includes(searchText.toLowerCase())
        );

        let filteredWithActiveFilters = filteredList;
        if (activeFilters.length > 0) {
            activeFilters.forEach(filterType => {
                switch (filterType) {
                    case "withScore":
                        filteredWithActiveFilters = filteredWithActiveFilters.filter((quiz) => quiz.score !== null);
                        break;
                    case "withoutScore":
                        filteredWithActiveFilters = filteredWithActiveFilters.filter((quiz) => quiz.score === null);
                        break;
                    case "easy":
                        filteredWithActiveFilters = filteredWithActiveFilters.filter((quiz) => quiz.difficulty === 'Facile');
                        break;
                    case "medium":
                        filteredWithActiveFilters = filteredWithActiveFilters.filter((quiz) => quiz.difficulty === 'Moyen');
                        break;
                    case "difficult":
                        filteredWithActiveFilters = filteredWithActiveFilters.filter((quiz) => quiz.difficulty === 'Difficile');
                        break;
                    default:
                        break;
                }
            });
        }

        setFilteredDataList(filteredWithActiveFilters);
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