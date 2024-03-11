import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "./NavBar.scss";

export default function NavBar() {
  const { isLoggedIn, userData } = useContext(AuthContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useNavigate(); // Permet d'actualiser la navBar a la connexion

  return (
    <>
      <nav className={`navBar ${menuOpen ? 'open' : ''}`}>
        <div className={`menu-links ${menuOpen ? 'open' : ''}`}>

        <NavLink to={"/"} className='logoSvg' onClick={closeMenu}>
          <img src='/Logo-bleu-plein.png' alt='Logo principal Infinity Quiz' />
        </NavLink>
        <NavLink to={"/quiz/all"} className='navLink' onClick={closeMenu}>
          Liste des quiz
        </NavLink>
        <NavLink to={"/about"} className='navLink' onClick={closeMenu}>
         A propos
        </NavLink>
        
        {isLoggedIn ? (
          <>
            <NavLink to={"/quiz/generate"} className='navLink' onClick={closeMenu}>
              Générateur de quiz
            </NavLink>
            {userData.role === "admin" && (
              <NavLink to={"/admin"} className='navLink admin' onClick={closeMenu}>
                Admin
              </NavLink>
            )}
            <div className='navProfile'>
              <NavLink className='navLink' to={"/profile"}  onClick={closeMenu}>{userData.nickname}</NavLink>
              <img className='navBarPicture' src={`/profil/${userData.profile_picture}`} alt='Image de profil' />
            </div>
          </>
        ) : (
          <NavLink to={"/signin"} className='navLink ' onClick={closeMenu}>
            Connexion / Inscription
          </NavLink>
        )}
        </div>
      </nav>
      <img src="/icons/menuburger.svg" className="menu-burger" alt="Icone pour le menu" onClick={toggleMenu} />
    </>
  );
}
