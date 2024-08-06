import { useState } from 'react';
import { Typography, Avatar } from "@material-tailwind/react";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import UseUserBooking from "../../Hook/UseUserBooking/UseUserBooking";
import Swal from "sweetalert2";
import UserSectionTitle from "../../Hook/UserSectionTitle/UserSectionTitle";
import { Link, useNavigate } from "react-router-dom";
import UseAxiosinterceptor from '../../Hook/axiosInterCeptor/UseAxiosinterceptor';
import { Button } from '@mui/material';

const TABLE_HEAD = ['#', "Photo", "Product Details", "User Details", "Delete", "Update", "Payment"];

const UserBooking = () => {
    const [bookings, refetch] = UseUserBooking();
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [interCeptor] = UseAxiosinterceptor();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // useNavigate hook for navigation

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Your order will be deleted",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                interCeptor.delete(`/booking/${id}`)
                    .then((data) => {
                        if (data.data.deletedCount) {
                            refetch();
                            Swal.fire('Deleted!', 'Your booking has been deleted.', 'success');
                        }
                    });
            }
        });
    };

    const handleUpdateClick = (booking) => {
        setSelectedBooking(booking);
        navigate('/dashboard/userUpdate'); // navigate to the update route
    };

    const handlePayment = (booking) => {
        setLoading(true);
        interCeptor.post('http://localhost:5000/bookings', {
            totalPrice: booking.price,
            currency: 'BDT',
            firstName: booking.name,
            email: 'customer@example.com', // Replace with actual customer email
            country: 'Bangladesh',
            city: 'Dhaka',
            thana: 'Uttara',
            postCode: '1230',
            number: booking.Mobile_number
        })
        .then(response => {
            setLoading(false);
            window.location.replace(response.data.url);
        })
        .catch(error => {
            setLoading(false);
            Swal.fire('Error!', 'Payment failed. Please try again.', error);
        });
    };

    return (
        <>
            <UserSectionTitle HeaderTitle={'---User Booking----'} SetHeaderTitle={'---User Booking----'} />
            {selectedBooking && (
                <UserUpdate booking={selectedBooking} onClose={() => setSelectedBooking(null)} refetch={refetch} />
            )}
            <table className="mx-auto xl:w-8/12 w-full md:mt-0 mt-10 bg-white">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th key={head} className="bg-orange-500 py-4">
                                <Typography>{head}</Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {bookings?.map(({ _id, name, Mobile_number, quantity, image, price, productName, category, payment }, index) => {
                        const isLast = index === bookings?.length - 1;
                        const classes = isLast ? "text-center px-4 lg:px-12" : "text-center px-4 lg:px-12 border-b border-blue-gray-50";
                        return (
                            <tr key={_id}>
                                <td className="w-60 px-52">
                                    {index + 1}
                                </td>
                                <td>
                                    <div>
                                        <Avatar src={image} className="w-20 h-20" />
                                    </div>
                                </td>
                                <td className={classes}>
                                    <Typography variant="small">{category}</Typography>
                                    <Typography variant="small">{productName.slice(0, 15)}...</Typography>
                                    <Typography color="orange">৳{price}</Typography>
                                    <Typography variant="small">quantity : {quantity}</Typography>
                                </td>
                                <td className={classes}>
                                    <div>
                                        <Typography variant="small">{name}</Typography>
                                        <Typography variant="small">{Mobile_number}</Typography>
                                    </div>
                                </td>
                                <td className={classes}>
                                    <Button className="text-red-600 text-xl" disabled={payment === 'complete'} onClick={() => handleDelete(_id)}><RiDeleteBin6Line /></Button>
                                </td>
                                <td className={classes}>
                                    <Button onClick={() => handleUpdateClick({ _id, name, Mobile_number, quantity, image, price, productName, category, payment })}><RiEdit2Line /></Button>
                                </td>
                                <td className={classes}>
                                    {payment ? <p className="bg-orange-600 px-3 rounded-md"><Link>{payment}</Link></p> : <Typography className="bg-orange-600 px-3 rounded-md">
                                        <Button onClick={() => handlePayment({ _id, price, name, Mobile_number })}>Pay</Button>
                                    </Typography>}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default UserBooking;
