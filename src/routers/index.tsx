import React from "react";

import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useTransition } from "react-spring";
import { useAppSelector } from "../app/hooks";
import { globalSelector } from "../app/selector";
import Loading from "../components/Loading/Loading";

import { PageUrl } from "../configuration/enum";
import Auth from "../pages/Auth";
import AuthLogin from "../pages/Auth/template/AuthLogin";
import AuthSignup from "../pages/Auth/template/AuthSignup";
import PrivateRoute from "./PrivateRoute";
import AuthRoles from "../pages/Auth/template/AuthRoles";
import PrivateOutlet from "./PrivateOutlet";
import AdminRoute from "./AdminRoute";
import AdminHome from "../pages/admin";
import Home from "../pages/Home";
import useLoading from "../utils/hooks/useLoading";
import Chat from "../pages/Chat";
import ChatBox from "../pages/Chat/template/ChatBox";
import Profile from "../pages/Profile";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MCP from "../pages/MCP";
import Dashboard from "../pages/admin/template/Dashboard";
import StaffManagement from "../pages/admin/template/StaffManagement";
import MCPManagement from "../pages/admin/template/MCPManagement";
import VehicleManagement from "../pages/admin/template/VehicleManagement";
const Routers = () => {
  const globalState = useAppSelector(globalSelector);
  const { isLoading } = globalState;

  const loadingTransitions = useTransition(isLoading, {
    from: { opacity: 1 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: isLoading,
  });

  useLoading();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Loading transitions={loadingTransitions} />
      <Router>
        <ToastContainer />
        <Routes>
          <Route path={PageUrl.AUTH} element={<Auth />}>
            <Route path={PageUrl.LOGIN} element={<AuthLogin />} />
            <Route path={PageUrl.SIGNUP} element={<AuthSignup />} />
            <Route
              path={PageUrl.ROLES}
              element={
                <PrivateRoute>
                  <AuthRoles />
                </PrivateRoute>
              }
            />
            <Route path="" element={<Navigate to={PageUrl.LOGIN} />} />
            <Route path="*" element={<Navigate to={PageUrl.LOGIN} />} />
          </Route>
          <Route path={PageUrl.HOME} element={<PrivateOutlet />}>
            <Route
              path={`${PageUrl.ADMIN}/${PageUrl.HOME_PAGE}`}
              element={
                <AdminRoute>
                  <AdminHome />
                </AdminRoute>
              }
            >
              <Route path={PageUrl.DASHBOARD} element={<Dashboard />} />
              <Route
                path={PageUrl.STAFF_MANAGEMENT}
                element={<StaffManagement />}
              />
              <Route
                path={PageUrl.MCP_MANAGEMENT}
                element={<MCPManagement />}
              />
              <Route
                path={PageUrl.VEHICLE_MANAGEMENT}
                element={<VehicleManagement />}
              />
            </Route>
            <Route path={PageUrl.HOME_PAGE} element={<Home />} />
            <Route path={PageUrl.MCP} element={<MCP />} />
            <Route path={PageUrl.PROFILE} element={<Profile />} />
            <Route path={PageUrl.CHAT} element={<Chat />}>
              <Route path=":chatId" element={<ChatBox />} />
            </Route>
            <Route path="" element={<Navigate to={PageUrl.HOME_PAGE} />} />
            <Route path="*" element={<Navigate to={PageUrl.HOME_PAGE} />} />
          </Route>
        </Routes>
      </Router>
    </LocalizationProvider>
  );
};

export default Routers;
