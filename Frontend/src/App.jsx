import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "./layouts/Layout";
import Dashboard from "./pages/dashboard/dashboard";
import Leads from "./pages/leads/Leads";
import Deals from "./pages/deals/Deals";
import Activities from "./pages/activities/Activities";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import LeadDetail from "./pages/leads/LeadDetails";
import Loading from "./components/Loading";
import DealDetail from "./pages/deals/DealDetail";
import ActivityDetail from "./pages/activities/ActivityDetail";
import Users from "./pages/user/User";

const App = () => {

  const { user, authLoading } = useContext(AppContext);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <Routes>

        {/* If logged in → redirect login/register */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/leads/:id" element={<LeadDetail />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/deals/:id" element={<DealDetail />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/activities/:id" element={<ActivityDetail />} />

          {/* Admin Only Example */}
          <Route
            path="/admin-users"
            element={
              <RoleRoute allowedRoles={["admin"]}>
                <Users/>
              </RoleRoute>
            }
          />
        </Route>

        {/* Catch unknown routes */}
        <Route
          path="*"
          element={<Navigate to={user ? "/" : "/login"} />}
        />

      </Routes>
    </>
  );
};

export default App;
