import { useContext, useState } from "react";
import { signinUser } from "../../services/QuizApi";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./Signin.scss";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const { handleLogin } = useContext(AuthContext);

  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });

  {
    /* Manage signin inputs */
  }
  const handleInputSigninChange = (e) => {
    const { name, value } = e.target;
    setSigninData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  {
    /* signin click function */
  }

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await signinUser(signinData);
      handleLogin(response);
      navigate("/quiz/all");
    } catch (error) {
      toast.warn(error.message);
    }
  };

  return (
    <>
      <div className='signinContainer'>
        {/* signin form */}

        <form onSubmit={handleSignin}>
            <h2>Connexion</h2>
            {/* Email input  */}
            <div className='field'>
              <p>Email</p>
              <input
                type='text'
                name='email'
                placeholder='Votre email'
                value={signinData.email}
                onChange={handleInputSigninChange}
                required
              />
            </div>
            {/* Password input  */}
            <div className='field'>
              <p>Mot de passe</p>
              <input
                type='password'
                name='password'
                placeholder='Mot de passe'
                value={signinData.password}
                onChange={handleInputSigninChange}
                required
              />
            </div>
            <div>
              <button type='submit'>
                Se connecter
              </button>
            </div>
        </form>
      </div>
      <div className="linkToSignupContainer">
        <p>Tu n'as pas de compte ?</p>
          <Link className='linkToSignup' to={"/signup"}>
            Créer un compte
          </Link>
      </div>
      
    </>
  );
}
