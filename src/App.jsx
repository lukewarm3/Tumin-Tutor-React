import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import PageLayout from "./Layouts/PageLayout";
import useAuthStore from "./store/authStore";
import { Navigate } from "react-router-dom";

function App() {
  const authUser = useAuthStore((state) => state.user);

  return (
    <>
      <PageLayout>
        <Routes>
          <Route
            path="/"
            element={
              authUser?.logInAsStudent || authUser?.logInAsTutor ? (
                <HomePage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={
              !authUser?.logInAsStudent && !authUser?.logInAsTutor ? (
                <LoginPage />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </PageLayout>
    </>
  );
}

export default App;
