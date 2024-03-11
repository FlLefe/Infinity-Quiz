import React, { useContext } from "react";
import QuizDb from "./pages/QuizDb/QuizDb";
import QuizList from "./pages/QuizList/QuizList";
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import NavBar from "./components/NavBar/NavBar";
import QuizIa from "./pages/QuizIa/QuizIa";
import Landing from "./pages/Landing/Landing";
import AdminQuiz from "./pages/Admin/AdminQuiz";
import AdminStatistics from "./pages/Admin/AdminStatistics";
import AdminNavBar from "./components/Admin/AdminNavBar/AdminNavBar";
import AdminUser from "./pages/Admin/AdminUser";
import AdminBanword from "./pages/Admin/AdminBanword";
import EditAdminBanword from "./components/Admin/EditAdminBanword/EditAdminBanword";
import EditAdminUser from "./components/Admin/EditAdminUser/EditAdminUser";
import EditAdminQuiz from "./components/Admin/EditAdminQuiz/EditAdminQuiz";
import Profile from "./pages/Profile/Profile";
import About from "./pages/About/About";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { AuthContext } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SoftBan from "./pages/SoftBan/SoftBan";
import "./App.scss"
import QuizLanding from "./pages/QuizLanding/QuizLanding";

function App() {
  const { isLoggedIn, userData } = useContext(AuthContext);
  const isAdmin = userData.role === "admin";

  return (
    <Router>
      <NavBar />
      <div className="mainContainer">
      <Routes>
        {/* Public pages */}
        <Route path='/' element={<Landing />} />
        <Route path='/quiz/top/:id' element={<QuizLanding />} />
        <Route path='/quiz/generate' element={isLoggedIn ? <QuizIa /> : <Navigate to='/signin' />} />
        <Route path='/quiz/all' element={isLoggedIn ? <QuizList /> : <Navigate to='/signin' />} />
        <Route path='/quiz/:id' element={<QuizDb />} />
        <Route path='/signin' element={!isLoggedIn ? <Signin /> : <Navigate to='/' />} />
        <Route path='/signup' element={!isLoggedIn ? <Signup /> : <Navigate to='/' />} />
        <Route path='/profile' element={isLoggedIn ? <Profile /> : <Navigate to='/signin' />} />
        <Route path='/about' element={<About />} />
        <Route path='/softban' element={<SoftBan />} />

        {/* Admin pages */}
        {isAdmin && (
          <>
            <Route
              path='/admin'
              element={
                <>
                  <AdminNavBar />
                  <AdminStatistics />
                </>
              }
            />
            <Route
              path='/admin/quiz'
              element={
                <>
                  <AdminNavBar />
                  <AdminQuiz />
                </>
              }
            />
            <Route
              path='/admin/quiz/:id'
              element={
                <>
                  <AdminNavBar />
                  <EditAdminQuiz />
                </>
              }
            />
            <Route
              path='/admin/user'
              element={
                <>
                  <AdminNavBar />
                  <AdminUser />
                </>
              }
            />
            <Route
              path='/admin/user/:id'
              element={
                <>
                  <AdminNavBar />
                  <EditAdminUser />
                </>
              }
            />
            <Route
              path='/admin/banword'
              element={
                <>
                  <AdminNavBar />
                  <AdminBanword />
                </>
              }
            />
            <Route
              path='/admin/banword/:id'
              element={
                <>
                  <AdminNavBar />
                  <EditAdminBanword />
                </>
              }
            />
          </>
        )}

        {/* 404 page */}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      </div>
      <ToastContainer
        className='custom-toast-container'
        position='top-right'
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
