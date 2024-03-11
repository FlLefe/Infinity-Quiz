import { Link } from "react-router-dom";
import "./ListAdminQuiz.scss";
export default function ListAdminQuiz({ dataList }) {
  return (
    <table className='adminQuizContainer'>
    <thead>
        <tr>
            <th>Thème</th>
            <th>Difficulté</th>
            <th>Id de l'auteur</th>
            <th>Rate</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        {dataList ? (
            dataList.map((data, index) => (
                <tr key={index}>
                    <td>{data.theme}</td>
                    <td>{data.difficulty}</td>
                    <td>{data.author_id}</td>
                    <td>{data.rate}</td>
                    <td>
                        <Link to={`/admin/quiz/${data.id}`}>
                            <button>Modifier</button>
                        </Link>
                    </td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan="5">Rien à afficher.</td>
            </tr>
        )}
    </tbody>
</table>
  );
}
