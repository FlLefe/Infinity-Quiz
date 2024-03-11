import { useContext, useEffect, useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { addBanwordAdmin, getAllBanwordAdmin } from "../../services/QuizApi";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/Pagination/Pagination";
import SearchBar from "../../components/SearchBar/SearchBar";
import ListAdminBanword from "../../components/Admin/ListAdminBanword/ListAdminBanword";
import { AuthContext } from "../../contexts/AuthContext";
import "./AdminBanword.scss";
import { APIError } from "../../utils/ApiError";
import { toast } from "react-toastify";

export default function AdminBanword() {
  const { userData, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(getAllBanwordAdmin, userData.token);
  const [filteredDataList, setFilteredDataList] = useState([]);
  const [newBanword, setNewBanword] = useState("");

  const itemsPerPage = 50;

  useEffect(() => {
    if (data) {
      setFilteredDataList(data);
    }
  }, [data]);

  const { currentPage, currentItems, paginate } = usePagination(filteredDataList, itemsPerPage);

  const handleInputChange = (e) => {
    setNewBanword(e.target.value);
  };

  const handleAddBanword = async () => {
    try {
      await addBanwordAdmin(userData.token, { label: newBanword });

      const updatedList = await getAllBanwordAdmin(userData.token);
      setFilteredDataList(updatedList);
      setNewBanword("");
    } catch (error) {
      if (!APIError(error, handleLogout, navigate)) {
        toast.error("Erreur lors de l'ajout");
      }
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>Une erreur s'est produite lors du chargement des données.</p>;
  }

  return (
    <div className='adminContainer'>
      <h2>Banwords</h2>
      <div className="handleSearch">
        <SearchBar
          data={data}
          setFilteredDataList={setFilteredDataList}
          paginate={paginate}
          searchKey="label"
        />
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={filteredDataList.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
      <input
        className='addBanwordInput'
        type='text'
        value={newBanword}
        onChange={handleInputChange}
        placeholder='Nouveau banword'
      />
      <button className='addBanwordBtn' onClick={handleAddBanword}>
        Ajouter
      </button>
      <ListAdminBanword dataList={currentItems} />
    </div>
  );
}
