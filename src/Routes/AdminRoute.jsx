import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import UseAdmin from "../Hook/UseAdmin/UseAdmin";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({children}) => {
        const {user,loading} = useContext(AuthContext)
        const [isAdmin, isLoading] = UseAdmin();
        const location = useLocation();
        if (loading ||isLoading) {
                return <div>loading.....</div>
            }
            if (user &&isAdmin) {
                return children
            }
            return   <Navigate to="/signIn" state={{ from: location }} replace />
};

export default AdminRoute;