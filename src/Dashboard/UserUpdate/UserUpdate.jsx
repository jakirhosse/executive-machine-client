import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Box, TextField, Button, Typography } from '@mui/material';
import UseAxiosinterceptor from '../../Hook/axiosInterCeptor/UseAxiosinterceptor';

const UserUpdate = ({ id }) => {
    const { register, handleSubmit, setValue } = useForm();
    const [interCeptor] = UseAxiosinterceptor();

    // Fetch current user data to pre-fill the form (useEffect to run once on component mount)
    React.useEffect(() => {
        interCeptor.get(`/booking/${id}`)
            .then(response => {
                const userData = response.data;
                setValue('name', userData.name);
                setValue('email', userData.email);
                setValue('price', userData.price);
                // setValue for other fields if necessary
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, [id, interCeptor, setValue]);

    const onSubmit = data => {
        interCeptor.put(`/booking/${id}`, data)
            .then(response => {
                Swal.fire('Updated!', 'Your profile has been updated.', response);
            })
            .catch(error => {
                console.error('Error updating profile:', error);
                Swal.fire( 'update success');
            });
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" >
            <Typography variant="h4"  gutterBottom>Update User Profile</Typography>
            <form>
                <Box mb={2}>
                    <TextField 
                        fullWidth 
                        label="Name" 
                        {...register('name', { required: true })} 
                    />
                </Box>
                <Box mb={2}>
                    <TextField 
                        fullWidth 
                        label="Email" 
                        {...register('email', { required: true })} 
                    />
                </Box>
                <Box mb={2}>
                    <TextField 
                        fullWidth 
                        label="Price" 
                        {...register('price', { required: true })} 
                    />
                </Box>
                {/* Add other fields as necessary */}
                <Button onClick={handleSubmit(onSubmit)} variant="contained" color="primary">Update</Button>
            </form>
        </Box>
    );
};

export default UserUpdate;
