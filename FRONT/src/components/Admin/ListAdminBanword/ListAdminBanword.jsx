import { Link } from "react-router-dom";
import "./ListAdminBanword.scss";

export default function ListAdminBanword({ dataList }) {
  return (
    <table className='adminBanwordContainer'>
      <thead>
          <tr>
              <th>Mot</th>
              <th>Actions</th>
          </tr>
      </thead>
      <tbody>
          {dataList ? (
              dataList.map((data, index) => (
                  <tr key={index}>
                      <td>{data.label}</td>
                      <td>
                          <Link to={`/admin/banword/${data.id}`}>
                              <button>Modifier</button>
                          </Link>
                      </td>
                  </tr>
              ))
          ) : (
              <tr>
                  <td colSpan="2">Rien à afficher.</td>
              </tr>
          )}
      </tbody>
    </table>
  );
}
