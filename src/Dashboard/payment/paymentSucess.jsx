import { Link, useLocation } from "react-router-dom";
import { BsCartCheckFill } from "react-icons/bs";
import { Button } from "@material-tailwind/react";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import UseAxiosinterceptor from "../../Hook/axiosInterCeptor/UseAxiosinterceptor";

const PaymentSuccess = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const [interceptor] = UseAxiosinterceptor();

    const query = new URLSearchParams(location.search);
    const transitionId = query.get('transitionId');

    if (transitionId) {
        interceptor.delete(`http://localhost:5000/bookings/user?email=${user?.email}`);
    }

    return (
        <div className="w-96 mx-auto mt-32">
            <BsCartCheckFill className="text-orange-600 text-[5rem] mx-auto mb-5" />
            <p className="text-orange-600 text-[1.3rem] font-medium mb-5">Thank you for shopping with Pickaboo!</p>
            <p className="text-green-600 text-lg text-center">Order placed successfully</p>
            <p className="text-orange-600 text-center">Order Id: {transitionId}</p>
            <Link to={'/'}>
                <Button className="rounded-sm bg-blue-600 hover:bg-orange-600 text-white w-full mt-5">Continue Shopping</Button>
            </Link>
        </div>
    );
};

export default PaymentSuccess;
