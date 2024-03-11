import { useEffect, useState } from "react";
import { createUser, getAllNicknames } from "../../services/QuizApi";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.scss";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  {
    /* Get all nicknames from DB */
  }
  const { data, loading, error } = useFetch(getAllNicknames);

  const [formValid, setFormValid] = useState(false);

  {
    /* States for dynamic signup form */
  }
  const [nicknameText, setNicknameText] = useState("");
  const [nicknameClassName, setNicknameClassName] = useState("");

  const [emailText, setEmailText] = useState("");
  const [emailClassName, setEmailClassName] = useState("");

  const [passwordText, setPasswordText] = useState("");
  const [passwordClassName, setPasswordClassName] = useState("");

  const [confirmPasswordText, setConfirmPasswordText] = useState("");
  const [confirmPasswordClassName, setConfirmPasswordClassName] = useState("");

  {
    /* Manage enable / disable state for signup button */
  }
  useEffect(() => {
    setFormValid(
      nicknameClassName === "valid" &&
        emailClassName === "valid" &&
        passwordClassName === "valid" &&
        confirmPasswordClassName === "valid"
    );
  }, [nicknameClassName, emailClassName, passwordClassName, confirmPasswordClassName]);

  const [signupData, setSignupData] = useState({
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  {
    /* Manage input for data + text information */
  }
  const handleInputSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "nickname") {
      if (value === "") {
        setNicknameClassName("invalid");
      } else if (/^[a-zA-Z0-9]{3,18}$/.test(value)) {
        const nicknameExists = data.some((item) => item.nickname === value);
        if (nicknameExists) {
          setNicknameText("Ce pseudo est déjà pris");
          setNicknameClassName("invalid");
        } else {
          setNicknameText("");
          setNicknameClassName("valid");
        }
      } else {
        setNicknameText("Votre pseudo doit faire entre 3 et 18 caractères");
        setNicknameClassName("invalid");
      }
    }

    if (name === "email") {
      if (value === "") {
        setEmailClassName("invalid");
      } else if (/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        setEmailText("");
        setEmailClassName("valid");
      } else {
        setEmailText("Adresse email non valide");
        setEmailClassName("invalid");
      }
    }

    if (name === "password") {
      if (value === "") {
        setPasswordClassName("invalid");
      } else if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)) {
        setPasswordText("");
        setPasswordClassName("valid");
      } else {
        setPasswordText(
          "Minimum 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial"
        );
        setPasswordClassName("invalid");
      }
    }

    if (name === "confirmPassword") {
      if (value === "") {
        setConfirmPasswordClassName("invalid");
      } else if (value === signupData.password) {
        setConfirmPasswordText("");
        setConfirmPasswordClassName("valid");
      } else {
        setConfirmPasswordText("Les mots de passe ne correspondent pas");
        setConfirmPasswordClassName("invalid");
      }
    }
  };

  {
    /* Signup Click function */
  }
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUser(signupData);
      toast.success("Votre compte est enregistré, vous pouvez vous connecter");
      navigate("/signin");
    } catch (error) {
      toast.warn(error.message);
    }
  };

  {
    /* Render red / green circles + text */
  }
  function renderValidationIcon(className, text) {
    return (
      <div>
        {className === "valid" ? (
          <FontAwesomeIcon icon={faCheckCircle} className={className} />
        ) : (
          <>
            <FontAwesomeIcon icon={faTimesCircle} className={className} />
            <p className='signupCheck'>{text}</p>
          </>
        )}
      </div>
    );
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>Une erreur s'est produite lors du chargement des données.</p>;
  }

  return (
    <>
      <div className='signupContainer'>
        {/* signUp form  */}

        <form onSubmit={handleSignup}>
            <h2>S'inscrire</h2>

            {/* Email input  */}
            <div className='field'>
              <p>Email</p>
              <input
                type='text'
                name='email'
                placeholder='Votre email'
                value={signupData.email}
                onChange={handleInputSignupChange}
                required
              />
              {(emailText || emailClassName) &&
                signupData.email !== "" &&
                renderValidationIcon(emailClassName, emailText)}
            </div>
            {/* Nickname input  */}
            <div className='field'>
              <p>Votre pseudo</p>
              <input
                type='text'
                name='nickname'
                placeholder='Pseudo'
                value={signupData.nickname}
                onChange={handleInputSignupChange}
                required
              />
              {(nicknameText || nicknameClassName) &&
                signupData.nickname !== "" &&
                renderValidationIcon(nicknameClassName, nicknameText)}
            </div>
            {/* Password input  */}
            <div className='field'>
              <p>Mot de passe</p>
              <input
                type='password'
                name='password'
                placeholder='Mot de passe'
                value={signupData.password}
                onChange={handleInputSignupChange}
                required
              />
              {(passwordText || passwordClassName) &&
                signupData.password !== "" &&
                renderValidationIcon(passwordClassName, passwordText)}
            </div>
            {/* Confirm password input */}
            <div className='field'>
              <p>Confirmation mot de passe</p>
              <input
                type='password'
                name='confirmPassword'
                placeholder='Confirmation'
                value={signupData.confirmPassword}
                onChange={handleInputSignupChange}
                required
              />
              {(confirmPasswordText || confirmPasswordClassName) &&
                signupData.confirmPassword !== "" &&
                renderValidationIcon(confirmPasswordClassName, confirmPasswordText)}
            </div>
            <div>
              <button type='submit' disabled={!formValid}>
                S'inscrire
              </button>
            </div>
        </form>
      </div>
      <div className='linkToSigninContainer'>
          <p>Tu as deja un compte ?</p>
          <Link className='linkToSignin' to={"/signin"}>
            Se connecter
          </Link>
        </div>
    </>
  );
}
