import Header from "../Shared/Navbar/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";


const Main = () => {
        return (
                <div>
                    <Header></Header>
                    <Outlet></Outlet>
                    <Footer></Footer>
                </div>
        );
};

export default Main;