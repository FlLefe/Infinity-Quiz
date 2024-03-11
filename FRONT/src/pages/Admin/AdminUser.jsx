import { useContext, useEffect, useState } from "react";
import ListAdminUser from "../../components/Admin/ListAdminUser/ListAdminUser";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import useFetch from "../../hooks/useFetch";
import { getAllUserAdmin } from "../../services/QuizApi";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/Pagination/Pagination";
import SearchBar from "../../components/SearchBar/SearchBar";
import { AuthContext } from "../../contexts/AuthContext";
import "./AdminUser.scss";

export default function AdminUser() {
  const { userData } = useContext(AuthContext);
  const { data, loading, error } = useFetch(getAllUserAdmin, userData.token);
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
      <h2>Utilisateurs</h2>
      <div className="handleSearch">
        <SearchBar
          data={data}
          setFilteredDataList={setFilteredDataList}
          paginate={paginate}
          searchKey="nickname"
        />
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={filteredDataList.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
      <ListAdminUser dataList={currentItems} />
    </div>
  );
}
