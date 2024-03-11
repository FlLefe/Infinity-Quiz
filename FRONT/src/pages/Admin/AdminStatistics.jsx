import { useContext, useEffect, useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import useFetch from "../../hooks/useFetch";
import { getAllStatisticAdmin } from "../../services/QuizApi";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import handleSearch from "../../utils/HandleSearch";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/Pagination/Pagination";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./AdminStatistics.scss";

export default function AdminHome() {
  const { userData } = useContext(AuthContext);
  const { data, loading, error } = useFetch(getAllStatisticAdmin, userData.token);
  const [filteredDataList, setFilteredDataList] = useState([]);

  const itemsPerPage = 30;

  useEffect(() => {
    if (data) {
      setFilteredDataList(data);
    }
  }, [data]);

  const { currentPage, currentItems, paginate } = usePagination(filteredDataList, itemsPerPage);

  let totals = {
    totalPromptPrice: 0,
    totalPromptTokens: 0,
    totalResponsePrice: 0,
    totalResponseTokens: 0,
    grandTotalPrice: 0,
    grandTotalTokens: 0
  };
  
  filteredDataList.forEach((data) => {
    const { prompt_price, prompt_tokens, response_price, response_tokens, total_price, total_tokens } = data;
    totals.totalPromptPrice += parseFloat(prompt_price);
    totals.totalPromptTokens += parseFloat(prompt_tokens);
    totals.totalResponsePrice += parseFloat(response_price);
    totals.totalResponseTokens += parseFloat(response_tokens);
    totals.grandTotalPrice += parseFloat(total_price);
    totals.grandTotalTokens += parseFloat(total_tokens);
  });


  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>Une erreur s'est produite lors du chargement des données.</p>;
  }

  return (
      <div className='adminContainer'>
      <h2>Statistiques</h2>
        <div className="handleSearch">
        <SearchBar
          data={data}
          setFilteredDataList={setFilteredDataList}
          paginate={paginate}
          searchKey="user_id"
        />
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={filteredDataList.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
        <h2>Statistiques :</h2>
        <table className='adminStatsContainer'>
          <thead>
              <tr>
                  <th>Prix prompt</th>
                  <th>Nombre token du prompt</th>
                  <th>Prix de la réponse</th>
                  <th>Nombre token de la réponse</th>
                  <th>Prix total</th>
                  <th>Nombre total de token</th>
                  <th>L'id de l'auteur</th>
                  <th>Voir l'auteur</th>
              </tr>
          </thead>
          <tbody>
              <tr className="totalStats">
                  <td>{totals.totalPromptPrice.toFixed(3)} $</td>
                  <td>{totals.totalPromptTokens}</td>
                  <td>{totals.totalResponsePrice.toFixed(3)} $</td>
                  <td>{totals.totalResponseTokens}</td>
                  <td>{totals.grandTotalPrice.toFixed(3)} $</td>
                  <td>{totals.grandTotalTokens}</td>
                  <td colSpan="2">Total</td>
              </tr>
              {data ? (
                  currentItems.map((data, index) => (
                      <tr key={index} className='adminCardStat'>
                          <td>{data.prompt_price} $</td>
                          <td>{data.prompt_tokens}</td>
                          <td>{data.response_price} $</td>
                          <td>{data.response_tokens}</td>
                          <td>{data.total_price} $</td>
                          <td>{data.total_tokens}</td>
                          <td>{data.user_id}</td>
                          <td>
                              <Link to={`/admin/user/${data.user_id}`}>
                                  <button>Voir l'auteur</button>
                              </Link>
                          </td>
                      </tr>
                  ))
              ) : (
                  <tr>
                      <td colSpan="8">Rien à afficher.</td>
                  </tr>
              )}
          </tbody>
        </table>
      </div>
  );
}
