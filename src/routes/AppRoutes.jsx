import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Home from "../pages/Home";
import HostGame from "../pages/HostGame";
import MyGames from "../pages/MyGames";
import Participants from "../pages/Participants";
import GameDetail from "../pages/GameDetail";
import Register from "../pages/Register";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Landing page */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />


        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/game/:gameId" element={<GameDetail />} />
          <Route path="/host" element={<HostGame />} />
          <Route path="/my-games" element={<MyGames />} />
          <Route path="/participants/:gameId" element={<Participants />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}