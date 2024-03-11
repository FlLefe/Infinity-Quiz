import { useContext, useEffect, useState } from "react";
import ListAdminQuiz from "../../components/Admin/ListAdminQuiz/ListAdminQuiz";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import useFetch from "../../hooks/useFetch";
import { getAllQuizAdmin } from "../../services/QuizApi";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/Pagination/Pagination";
import SearchBar from "../../components/SearchBar/SearchBar";
import { AuthContext } from "../../contexts/AuthContext";
import "./AdminQuiz.scss";
export default function AdminQuiz() {
  const { userData } = useContext(AuthContext);
  const { data, loading, error } = useFetch(getAllQuizAdmin, userData.token);
  const [filteredDataList, setFilteredDataList] = useState([]);

  const itemsPerPage = 50;

  useEffect(() => {
    if (data) {
      setFilteredDataList(data);
    }
  }, [data]);

  const { currentPage, currentItems, paginate } = usePagination(filteredDataList, itemsPerPage);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>Une erreur s'est produite lors du chargement des données.</p>;
  }

  return (
      <div className='adminContainer'>
        <h2>Quiz</h2>
        <div className="handleSearch">
          <SearchBar
          data={data}
          setFilteredDataList={setFilteredDataList}
          paginate={paginate}
          searchKey="theme"
        />
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={filteredDataList.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </div>
        <ListAdminQuiz dataList={currentItems} />
      </div>
  );
}
