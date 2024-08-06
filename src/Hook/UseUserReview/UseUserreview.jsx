import { useQuery } from "react-query";
import { AuthContext } from "../../provider/AuthProvider";
import UseAxiosinterceptor from "../axiosInterCeptor/UseAxiosinterceptor";
import { useContext } from "react";


const UseUserreview = () => {
        const {user} = useContext(AuthContext)
        const [interCeptor] = UseAxiosinterceptor()
        const { data: userReview=[] } = useQuery({
            queryKey: [user?.email, '/review/user/'],
            queryFn: async () => {
                const res = await interCeptor.get (`/review/user/${user?.email}`)
                return res.data
            }
        })
        return  [userReview]
};

export default UseUserreview;