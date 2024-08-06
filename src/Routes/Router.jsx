import { createBrowserRouter} from "react-router-dom";
import Main from "../LayOut/Main";
import Home from "../Pages/Homes/Home/Home";
import SignUp from "../Pages/Homes/SignUp/SignUp";
import SignIn from "../Pages/Homes/SignIn/SignIn";
import Phone from "../Pages/CategoryPages/Phones/Phone";
import Watch from "../Pages/CategoryPages/Watch/Watch";
import LapTop from "../Pages/CategoryPages/LapTop/LapTop";
import HeadPhone from "../Pages/CategoryPages/HeadPhone/HeadPhone";
import Dashboard from "../LayOut/Dashboard";
import UserBooking from "../Dashboard/UserBooking/UserBooking";
import AddReview from "../Dashboard/AddReview/AddReview";
import UserHome from "../Dashboard/UserHome/UserHome";
import AdminHome from "../Dashboard/AdminHome/AdminHome";
import ManageUser from "../Dashboard/ManageUser/ManageUser";
import ManageBooking from "../Dashboard/ManageBooking/ManageBooking";
import ReserVation from "../Dashboard/ReserVation/ReserVation";
import PaymentSuccess from "../Dashboard/payment/paymentSucess";
import PaymentFail from "../Dashboard/payment/paymentFail";
import UserUpdate from "../Dashboard/UserUpdate/UserUpdate";
export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/phone", element: <Phone /> },
      { path: "/watch", element: <Watch /> },
      { path: "/laptop", element: <LapTop /> },
      { path: "/headphone", element: <HeadPhone /> },
      { path: "/signUp", element: <SignUp /> },
      { path: "/signIn", element: <SignIn /> },
      {
        path: "/reservation/:id",
        element: <ReserVation></ReserVation>,
        loader: ({ params }) => fetch(`http://localhost:5000/reservation/${params.id}`)
      }
    ]
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      { path: "userBooking", element: <UserBooking /> },
      {path:'userUpdate',element:<UserUpdate></UserUpdate>},
      { path: "addReview", element: <AddReview /> },
      {
        path:"paymentSuccess",element:<PaymentSuccess></PaymentSuccess>
      },
      {
        path:"paymentFail",element:<PaymentFail></PaymentFail>
      },
      { path: "userHome", element: <UserHome /> },
      
      // Admin routes
      { path: "adminHome", element: <AdminHome /> },
      { path: "manageUser", element: <ManageUser /> },
      { path: "manageBooking", element: <ManageBooking /> }
    ]
  }
]);




