
import { Typography } from "@material-tailwind/react";
import UseUserBooking from "../../Hook/UseUserBooking/UseUserBooking";
import UserSectionTitle from "../../Hook/UserSectionTitle/UserSectionTitle";
const UserHome = () => {
        const[bookings] = UseUserBooking();
        return (
                <>
                  <UserSectionTitle HeaderTitle={'-- Home--'} SetHeaderTitle={'---user Home---'}></UserSectionTitle> 
                  <div className="grid grid-cols-3 w-1/2 mx-auto gap-5 mt-10">
            <div className="p-10 bg-gradient-to-r from-orange-400 from-5% via-purple-300 via-70% to-pink-500 to-100% rounded-lg text-white">
                <p className="text-lg">Your Total Booking</p>
                <Typography className="text-center text-xl">{bookings.length}</Typography>
            </div >
            <div className="p-10 bg-gradient-to-r from-yellow-400 from-5% via-pink-300 via-70% to-orange-500 to-100% rounded-lg text-white">
                <p className="text-lg">Your Total Payment</p>
                {/* <Typography className="text-center text-xl">{paymentHistory.length}</Typography> */}
            </div >     
            </div>
                </>
        );
};
export default UserHome;