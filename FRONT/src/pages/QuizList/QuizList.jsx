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
  const [difficultyCheckBox, setDifficultyCheckBox] = useState(null);
  const [scoreCheckBox, setScoreCheckBox] = useState(null);

  // number of quiz per page
  const itemsPerPage = 8;

  // Copy data in filteredList
  useEffect(() => {
    if (data) {
      setFilteredDataList(data);
    }
  }, [data]);

  function handleDifficultyChange(difficulty){
    if(difficulty !== difficultyCheckBox){
      setDifficultyCheckBox(difficulty)
    }else {
      setDifficultyCheckBox(null)
    }
  }

  function handleScoreChange(score){
    if(score !== scoreCheckBox){
      setScoreCheckBox(score)
    }else {
      setScoreCheckBox(null)
    }
  }

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
          difficultyFilter={difficultyCheckBox}
          scoreFilter={scoreCheckBox}
        />
        <div className='checkboxContainer'>
        <label>
                  <input
                    type='checkbox'
                    checked={scoreCheckBox === "withScore"}
                    onChange={() => handleScoreChange("withScore")}
                  />
                  Quiz déjà réalisés
                </label>
                <label>
                  <input
                    type='checkbox'
                    checked={scoreCheckBox === "withoutScore"}
                    onChange={() => handleScoreChange("withoutScore")}
                  />
                  Quiz jamais réalisés
                </label>
                <label>
                  <input
                    checked={difficultyCheckBox === "Facile"}
                    type='checkbox'
                    onChange={() => handleDifficultyChange("Facile")}
                  />
                  Facile
                </label>
                <label>
                  <input
                    checked={difficultyCheckBox === "Moyen"}
                    type='checkbox'
                    onChange={() => handleDifficultyChange("Moyen")}
                  />
                  Moyen
                </label>
                <label>
                  <input
                    checked={difficultyCheckBox === "Difficile"}
                    type='checkbox'
                    onChange={() => handleDifficultyChange("Difficile")}
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
