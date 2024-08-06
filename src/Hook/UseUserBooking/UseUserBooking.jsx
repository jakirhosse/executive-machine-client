import { useContext } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../../provider/AuthProvider";
import UseAxiosinterceptor from "../axiosInterCeptor/UseAxiosinterceptor";

const UseUserBooking = () => {
  const { user } = useContext(AuthContext);
 
  const [interceptor] = UseAxiosinterceptor();
  
  const { data: bookings = [], refetch } = useQuery({
    queryKey: [user?.email, '/bookings/user'],
    queryFn: async () => {
      if (!user?.email) {
        throw new Error("User email is undefined");
      }
      const res = await interceptor.get(`/bookings/user?email=${user?.email}`);
      return res.data;
    }
  });

  

  return [bookings, refetch];
};

export default UseUserBooking;
