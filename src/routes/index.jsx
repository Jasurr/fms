import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import AdminDashboard from "../admin/layouts/Dashboard/Dashboard";


var indexRoutes = [{ path: "/", name: "Home", component: Dashboard },
    {path: "/admin", name: "Admin", component: AdminDashboard}
];

export default indexRoutes;
