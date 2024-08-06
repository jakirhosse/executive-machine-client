// SignIn.jsx
import { Card, Input, Typography } from "@material-tailwind/react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";

const SignIn = () => {
  const { register, handleSubmit, reset } = useForm();
  const { signInAccount } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    signInAccount(data.email, data.password)
      .then((data) => {
        if (data.user.uid) {
          reset();
          navigate(from, { replace: true });
          Swal.fire({
            icon: 'success',
            title: `Successful login to your account`,
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          });
        }
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: error.message // Display the error message from authentication
        });
        console.error("Error signing in:", error);
      });
  };

  return (
    <Card color="transparent" shadow={false} className="mt-20 bg-white w-96 mx-auto p-10">
      <Typography variant="h4" color="blue-gray" className="text-center">
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-2">
        <div className="mb-4 flex flex-col gap-6">
          <Input {...register("email", { required: true })} size="lg" label="Email" />
          <Input {...register("password", { required: true })} type="password" size="lg" label="Password" />
        </div>
        <Input type="submit" variant="outlined" color="orange" className="uppercase hover:text-white hover:bg-yellow-900" value={'Login'} />
        <Typography className="mt-4 text-center font-normal">
          Create a new account <Link to={"/signUp"}><span className="text-orange-600 underline underline-offset-4">Registration</span></Link>
        </Typography>
      </form>
    </Card>
  );
};

export default SignIn;
