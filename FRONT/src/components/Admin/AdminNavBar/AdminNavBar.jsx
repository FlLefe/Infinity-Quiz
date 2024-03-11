import { useContext } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import "./AdminNavBar.scss";

export default function AdminNavBar() {

    const { isLoggedIn, userData } = useContext(AuthContext);

    if (!isLoggedIn || userData.role !== "admin") {
        return <Navigate to="/" />;
      }

    return (
        
            <nav className='adminNavBar'>
            <NavLink to={"/admin"} className='navLink'>Statistiques</NavLink>
            <NavLink to={"/admin/quiz"} className='navLink'>List des quiz</NavLink>
            <NavLink to={"/admin/user"} className='navLink'>Liste des utilisateurs</NavLink>
            <NavLink to={"/admin/banword"} className='navLink'>Listes des banwords</NavLink>
            </nav>

       
    );
}