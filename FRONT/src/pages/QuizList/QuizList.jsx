import { useContext, useEffect, useState } from "react";
import List from "../../components/List/List";
import QuizListSearch from "../../components/QuizListSearch/QuizListSearch";
import useFetch from "../../hooks/useFetch";
import { getAllQuiz } from "../../services/QuizApi";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Pagination from "../../components/Pagination/Pagination";
import usePagination from "../../hooks/usePagination";
import { AuthContext } from "../../contexts/AuthContext";
import "./QuizList.scss";

export default function QuizList() {
  const { userData } = useContext(AuthContext);
  const { data, loading, error } = useFetch(getAllQuiz, userData.token);
  const [filteredDataList, setFilteredDataList] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);

  // number of quiz per page
  const itemsPerPage = 8;

  // Copy data in filteredList
  useEffect(() => {
    if (data) {
      setFilteredDataList(data);
    }
  }, [data]);

  const handleFilterChange = (isChecked, filterType) => {
    let updatedFilters = [...activeFilters];
    if (isChecked) {
      updatedFilters.push(filterType);
    } else {
      updatedFilters = updatedFilters.filter(filter => filter !== filterType);
    }
    setActiveFilters(updatedFilters);
  };

  const { currentPage, currentItems, paginate } = usePagination(filteredDataList, itemsPerPage);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>Une erreur s'est produite lors du chargement des quiz.</p>;
  }

  return (
    <div className='quizListContainer'>
      <div className='quizListSearchContainer'>
        <QuizListSearch
          data={data}
          setFilteredDataList={setFilteredDataList}
          paginate={paginate}
          searchKey="theme"
          activeFilters={activeFilters}
        />
        <div className='checkboxContainer'>
        <label>
                  <input
                    type='checkbox'
                    onChange={(e) => handleFilterChange(e.target.checked, "withScore")}
                  />
                  Quiz déjà réalisés
                </label>
                <label>
                  <input
                    type='checkbox'
                    onChange={(e) => handleFilterChange(e.target.checked, "withoutScore")}
                  />
                  Quiz jamais réalisés
                </label>
                <label>
                  <input
                    type='checkbox'
                    onChange={(e) => handleFilterChange(e.target.checked, "easy")}
                  />
                  Facile
                </label>
                <label>
                  <input
                    type='checkbox'
                    onChange={(e) => handleFilterChange(e.target.checked, "medium")}
                  />
                  Moyen
                </label>
                <label>
                  <input
                    type='checkbox'
                    onChange={(e) => handleFilterChange(e.target.checked, "difficult")}
                  />
                  Difficile
                </label>
        </div>
      </div>
      <List quizList={currentItems} />
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredDataList.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}
