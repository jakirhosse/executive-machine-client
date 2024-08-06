import { Card, Checkbox, Input, Typography } from "@material-tailwind/react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";

const SignUp = () => {
    const { register, handleSubmit, reset } = useForm();
    const { createNewAccount, updateUserProfile } = useContext(AuthContext);
    const apiKey = import.meta.env.VITE_imgbb_key;
    const location = useLocation();
    const Navigate = useNavigate();
    let from = location.state?.from?.pathname || "/";

    const onSubmit = data => {
        const image = data.file[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;

        // Upload image to imgbb API
        fetch(url, {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(imgData => {
            const imgURL = imgData.data.url;
            
            // Create new account with email and password
            createNewAccount(data.email, data.password)
            
            .then(() => {
                // Update user profile with name and image URL
                updateUserProfile(data.name, imgURL)
                .then(() => {
                    // Reset form fields
                    reset();
                    
                    // Navigate to previous location or home
                    Navigate(from, { replace: true });
                    
                    // Show success message
                    Swal.fire({
                        icon: 'success',
                        title: `Successfully created your account`,
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    });
                })
                .catch(error => {
                    console.error("Error updating user profile:", error.message);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Failed to update profile information!',
                    });
                });
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('Email already in use');
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Email already in use. Please use a different email!',
                    });
                } else {
                    console.error("Error creating new account:", error.message);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Failed to create account!',
                    });
                }
            });
        })
        .catch(error => {
            console.error("Error uploading image:", error.message);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to upload image!',
            });
        });
    };

    return (
        <Card color="transparent" shadow={false} className="mt-20 bg-white w-96 mx-auto p-10">
            <Typography variant="h4" color="blue-gray" className="text-center">
                Registration
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-2">
                <div className="mb-4 flex flex-col gap-6">
                    <Input {...register("name", { required: true })} size="lg" label="Name" />
                    <Input {...register("email", { required: true })} size="lg" label="Email" />
                    <Input {...register("password", { required: true, minLength: 8 })} type="password" size="lg" label="Password" />
                    <Input type="file" {...register("file", { required: true })} size="lg" />
                </div>
                <Checkbox
                    {...register("term", { required: true })}
                    label={
                        <Typography variant="small" color="gray" className="flex font-normal">
                            I agree the
                            <a href="#" className="font-medium transition-colors hover:text-gray-900">
                                &nbsp;Terms and Conditions
                            </a>
                        </Typography>
                    }
                    containerProps={{ className: "-ml-2.5" }}
                />
                <Input type="submit" variant="outlined" color="orange" className="uppercase hover:text-white hover:bg-yellow-900" value={'Registration'} />
                <Typography className="mt-4 text-center font-normal">
                    Already have an account <Link to={"/signIn"}><span className="text-orange-600 underline underline-offset-4">Login</span></Link>
                </Typography>
            </form>
        </Card>
    );
};

export default SignUp;
