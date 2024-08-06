import { Link, useNavigate } from "react-router-dom";
import { Navbar, Typography, IconButton, Button } from "@material-tailwind/react";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  // console.log(user);
  const Navigate = useNavigate();
  const handleSingOut = () => {
    logOut().then(() => {
      Navigate("/");
    });
  };
  const navList = (
    <ul className="mb-4 mt-2 z-10 lg:flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium text-md hover:text-amber-800"
      >
        <Link to="/">Home</Link>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium text-md hover:text-amber-800"
      >
        <Link to={"/headphone"}>headphone</Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium text-md hover:text-amber-800"
      >
        <Link to={"/phone"}>phone</Link>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium text-md hover:text-amber-800"
      >
        <Link to={"/laptop"}>laptop</Link>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium text-md hover:text-amber-800"
      >
        <Link to={"/watch"}>watch</Link>
      </Typography>

      {user?.email ? (
        <p> <Button variant="text" onClick={handleSingOut}>Log out</Button></p>
      ) : (
        <div>
          <Typography
            as="li"
            variant="small"
            color="white"
            className="p-1 font-medium text-md hover:text-amber-800"
          >
            <Link to="/signIn">signIn</Link>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="white"
            className="p-1 font-medium text-md hover:text-amber-800"
          >
            <Link to="/signUp">signUp</Link>
          </Typography>
        </div>
      )}
    </ul>
  );

  return (
    <Navbar className="fixed top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4 bg-pink-500">
      <div className="flex items-center justify-between">
        <Typography
          as="a"
          href="#"
          className="cursor-pointer py-1.5 font-bold uppercase italic text-white"
        >
          executive machines
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <IconButton
          variant="text"
          color="white"
          className="ml-auto lg:hidden"
          onClick={() =>
            document.querySelector(".nav-list").classList.toggle("hidden")
          }
        >
          <span className="material-icons">menu</span>
        </IconButton>
      </div>
      <div className="nav-list hidden lg:hidden">{navList}</div>
    </Navbar>
  );
};

export default Header;
