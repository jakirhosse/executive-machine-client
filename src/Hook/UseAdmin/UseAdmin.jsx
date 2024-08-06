import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import UseAxiosinterceptor from "../axiosInterCeptor/UseAxiosinterceptor";
import { useQuery } from "react-query";

const UseAdmin = () => {
    const { user } = useContext(AuthContext);
    const [interCeptor] = UseAxiosinterceptor();

    const { data: isAdmin, isLoading, error } = useQuery({
        queryKey: ['isAdmin', user?.email],
        queryFn: async () => {
            if (!user?.email) return null;
            const res = await interCeptor.get(`/users/admin/${user?.email}`);
            return res.data.role;
        },
        enabled: !!user?.email, // Prevent query if email is not present
    });

    if (error) {
        console.error("Error fetching admin data:", error);
    }

    return [isAdmin, isLoading];
};

export default UseAdmin;
