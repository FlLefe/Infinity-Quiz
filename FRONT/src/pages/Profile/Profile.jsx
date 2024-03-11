import { Link, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { getProfile, updateProfile } from "../../services/QuizApi";
import { useContext, useEffect, useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { AuthContext } from "../../contexts/AuthContext";
import "./Profile.scss";
import { toast } from 'react-toastify';
import { APIError } from "../../utils/ApiError";

export default function Profile() {

  const { handleUpdateNickname, handleLogout, userData, handleUpdateProfilePicture } = useContext(AuthContext);
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(getProfile, userData.token);
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingPicture, setIsEditingPicture] = useState(false);
  const [nickname, setNickname] = useState('');

  {/* Init given structure of the new password */}
  const [passwordData, setPasswordData] = useState({
    lastPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  {/* Init state to manage disable / enable for edit password button */}
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  {/* Push every pictures possibility for editPictureProfile */}
  const profilePictures = [];
  for (let i = 1; i <= 20; i++) {
    profilePictures.push(`profil_picture${i}.png`);
  } 

  useEffect(() => {
      if (data) { 
          setNickname(data.nickname); 
      }
  }, [data]);

  {/* Function to setNickname with regex test */}
  const handleNicknameChange = (e) => {
      const inputNickname = e.target.value;
      if (/^[a-zA-Z0-9]{3,18}$/.test(inputNickname)) {
          setNickname(inputNickname);
      }
  };

  {/* Patch nickname */}
  const handleUpdateNicknameClick = async () => {
      try {
          await updateProfile(userData.token, { nickname: nickname });
          handleUpdateNickname(nickname); {/* Update it in authcontext */}
          toast.success("Pseudo modifié")
          setIsEditingNickname(false);
      } catch (error) {
        if (!APIError(error, handleLogout, navigate)) {
          toast.error("Erreur lors de la mise à jour de votre profil");
        }
        setIsEditingNickname(false);
      }
  };

  {/* Patch profile_picture */}
  const handlePictureUpdateClick = async (picture) => {
    try {
      await updateProfile(userData.token, { profile_picture: picture });
      handleUpdateProfilePicture(picture); {/* Update it in authcontext */}
      toast.success("Image de profil modifiée")
      setIsEditingPicture(false);
    } catch (error) {
      if (!APIError(error, handleLogout, navigate)) {
        toast.error("Erreur lors de la mise à jour de votre profil");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  {/* Manage state of password update button */}
  useEffect(() => {
    const { lastPassword, newPassword, confirmNewPassword } = passwordData;
    setIsButtonDisabled(!(lastPassword && newPassword && confirmNewPassword && newPassword === confirmNewPassword));
  }, [passwordData]);

  const handlePasswordUpdateClick = async () => {
    try {
      await updateProfile(userData.token, passwordData);
      setPasswordData({
        lastPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      });
      toast.success("Mot de passe modifié")
      setIsEditingPassword(false);
    } catch (error) {
      if (!APIError(error, handleLogout, navigate)) {
        toast.error(error.message);
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
      <div className='profileContainer'>
        <h1>Mon profil</h1>
        <div className="profilePictureContainer">
          <div>
            <img className='profilePagePicture' src={`/profil/${userData.profile_picture}`} alt='' />
            <button className='profilePictureBtn' onClick={() => setIsEditingPicture(!isEditingPicture)}>
              {isEditingPicture ? <img className="editIcon" src='/icons/edit-pen.svg' alt="Icone d'édition"></img> : <img className="editIcon" src='/icons/edit-pen.svg' alt="Icone d'édition"></img>
              }
            </button>
          </div>
          {isEditingPicture && (
            <div className="profilePicturesContainer">
              {profilePictures.map((picture, index) => (
                <img
                  key={index}
                  src={`/profil/${picture}`}
                  alt={`Profile Picture ${index + 1}`}
                  onClick={() => handlePictureUpdateClick(picture)}
                />
              ))}
            </div>
          )}
        </div>
        <p className='email'>Email :  {data.email}</p>
        <p className="prompt">Quiz par IA restant : {data.prompt}</p>

          {data &&
            <div className='pseudoContainer'>
              {isEditingNickname ? (
                <div className="editPseudo">
                  <input
                      type='text'
                      value={nickname}
                      onChange={handleNicknameChange}
                  />
                  <div>
                    <button onClick={handleUpdateNicknameClick}>
                      Modifier
                    </button>
                    <button onClick={() => setIsEditingNickname(false)}>
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p>Pseudo : {nickname}</p>
                  <button className="editPseudoBtn" onClick={() => setIsEditingNickname(true)}>
                    Modifier le pseudo
                  </button>
                </>
              )}
            </div>
          }
          {isEditingPassword && (
            <div className='editPasswordContainer'>
              <input
                type='password'
                placeholder='Ancien mot de passe'
                name='lastPassword'
                value={passwordData.lastPassword}
                onChange={handleInputChange}
              />
              <input
                type='password'
                placeholder='Nouveau mot de passe'
                name='newPassword'
                value={passwordData.newPassword}
                onChange={handleInputChange}
              />
              <input
                type='password'
                placeholder='Confirmer le nouveau mot de passe'
                name='confirmNewPassword'
                value={passwordData.confirmNewPassword}
                onChange={handleInputChange}
              />
              <div>
                <button
                  onClick={handlePasswordUpdateClick}
                  disabled={isButtonDisabled}
                >
                  Valider
                </button>
                <button className='editPasswordBtn' onClick={() => setIsEditingPassword(!isEditingPassword)}>
                  Annuler
                </button>
              </div>
            </div>
          )}
          {!isEditingPassword &&
              <button className='editPasswordBtn' onClick={() => setIsEditingPassword(!isEditingPassword)}>
                  Modifier le mot de passe
              </button>
          }

          
          <Link to={"/"} className='disconectBtn' onClick={handleLogout}>Déconnexion</Link>
        </div>
  );
}