import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import VisitorName from "../pages/VisitorName/VisitorName";
import Dashboard from "../pages/Dashboard/Dashboard";
import Components from "../pages/Components/Components";
import AddComponent from "../pages/AddComponent/AddComponent";
import LowStock from "../pages/LowStock/LowStock";
import AdminActivity from "../pages/AdminActivity/AdminActivity";
import AdminLogin from "../pages/AdminLogin/AdminLogin";
import AdminName from "../pages/AdminName/AdminName";
import Transaction from "../pages/Transaction/Transaction";
import NotFound from "../pages/NotFound/NotFound";
import UserActivity from "../pages/UserActivity/UserActivity";
import UserLogin from "../pages/UserLogin/UserLogin";

import CreateKit from "../pages/Kits/CreateKit";
import ViewKits from "../pages/Kits/ViewKits";
import EditKit from "../pages/Kits/EditKit";
import IssueKits from "../pages/Kits/IssueKits";

function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/visitor"
          element={<VisitorName />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/components"
          element={<Components />}
        />

        <Route
          path="/add-component"
          element={<AddComponent />}
        />

        <Route
          path="/low-stock"
          element={<LowStock />}
        />

        <Route
          path="/transaction"
          element={<Transaction />}
        />

        <Route
          path="/user-activity"
          element={<UserActivity />}
        />

        <Route
          path="/admin-activity"
          element={<AdminActivity />}
        />

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/name"
          element={<AdminName />}
        />

        <Route
          path="/user/login"
          element={<UserLogin />}
        />

        {/* ================= Kits ================= */}

        <Route
          path="/kits"
          element={<ViewKits />}
        />

        <Route
          path="/create-kit"
          element={<CreateKit />}
        />

        <Route
          path="/edit-kit/:id"
          element={<EditKit />}
        />

        <Route
          path="/issue-kits"
          element={<IssueKits />}
        />

        {/* 404 */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default AppRoutes;