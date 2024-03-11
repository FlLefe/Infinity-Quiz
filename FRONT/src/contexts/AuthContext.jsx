import { createContext, useState } from 'react';
import { Navigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  {/* State isLoggedIn with the boolean result of token */}
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  {/* init userData with localstorage data or null */}
  const [userData, setUserData] = useState({
    token: localStorage.getItem('token')? localStorage.getItem('token') : null,
    nickname: localStorage.getItem('nickname')? localStorage.getItem('nickname') : null,
    profile_picture: localStorage.getItem('nickname')? localStorage.getItem('profile_picture') : null,
    role: localStorage.getItem('role')? localStorage.getItem('role') : null
  });

  {/* Login function to setItem localstorage data and SetUserData */}
  const handleLogin = (signinResponse) => {
    localStorage.setItem('token', signinResponse.token);
    localStorage.setItem('nickname', signinResponse.nickname);
    localStorage.setItem('profile_picture', signinResponse.profile_picture);
    localStorage.setItem('role', signinResponse.role);
    setIsLoggedIn(true);
    setUserData({
      token: signinResponse.token,
      nickname: signinResponse.nickname,
      profile_picture: signinResponse.profile_picture,
      role: signinResponse.role
    });
  };

  {/* Login function to removeItem localstorage data and SetUserData to null */}
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nickname');
    localStorage.removeItem('profile_picture');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setUserData({
      token: null,
      nickname: null,
      profile_picture: null,
      role: null
    });
    <Navigate to="/signin" />
  };

  {/* Update nickname localStorage / userData */}
  const handleUpdateNickname = (newNickname) => {
    localStorage.removeItem('nickname');
    localStorage.setItem('nickname', newNickname);
    setUserData(prevUserData => ({
      ...prevUserData,
      nickname: newNickname
    }));
  };

  {/* Update profile_picture localStorage / userData */}
  const handleUpdateProfilePicture = (newProfilePicture) => {
    localStorage.removeItem('profile_picture');
    localStorage.setItem('profile_picture', newProfilePicture);
    setUserData(prevUserData => ({
      ...prevUserData,
      profile_picture: newProfilePicture
    }));
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData, handleLogin, handleLogout, handleUpdateNickname, handleUpdateProfilePicture }}>
      {children}
    </AuthContext.Provider>
  );
};