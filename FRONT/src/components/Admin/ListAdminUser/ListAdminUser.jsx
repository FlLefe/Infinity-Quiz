import { Link } from "react-router-dom";
import "./ListAdminUser.scss";

export default function ListAdminUser({ dataList }) {
  return (
    <table className='adminUserContainer'>
      <thead>
          <tr>
              <th>Pseudo</th>
              <th>Email</th>
              <th>Actions</th>
          </tr>
      </thead>
      <tbody>
          {dataList ? (
              dataList.map((data, index) => (
                  <tr key={index}>
                      <td>{data.nickname}</td>
                      <td>{data.email}</td>
                      <td>
                          <Link to={`/admin/user/${data.id}`}>
                              <button>Modifier</button>
                          </Link>
                      </td>
                  </tr>
              ))
          ) : (
              <tr>
                  <td colSpan="3">Rien à afficher.</td>
              </tr>
          )}
      </tbody>
    </table>
  );
}
