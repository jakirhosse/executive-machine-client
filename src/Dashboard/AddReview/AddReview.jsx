import { Input, Textarea } from "@material-tailwind/react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../provider/AuthProvider";
import UseAxiosinterceptor from "../../Hook/axiosInterCeptor/UseAxiosinterceptor";
import Swal from "sweetalert2";
import UserSectionTitle from "../../Hook/UserSectionTitle/UserSectionTitle";

const AddReview = () => {
        const { register, handleSubmit ,reset} = useForm();
        const {user} = useContext(AuthContext)
        const [interCeptor] = UseAxiosinterceptor();

        const onSubmit = data => {
                const addReview = {
                    name: user?.displayName,
                    email: user?.email,
                    photo:user?.photoURL,
                    ratting: parseFloat(data.ratting),
                    comment:data.comment
                }
        
        interCeptor.post('review',addReview)
        .then(data => {
                if (data.data.insertedId) {
                    reset()
                    Swal.fire({
                        icon:"success",
                        title: 'Successful add  your review',
                        showClass: {
                          popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                          popup: 'animate__animated animate__fadeOutUp'
                        }
                      })
            }

        })
}
        return (
                <>
                 <UserSectionTitle HeaderTitle={'---review---'} SetHeaderTitle={'---Add review---'}></UserSectionTitle>
                 <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex w-1/2 flex-col gap-6 mx-auto mt-10 bg-white p-10 rounded-lg">
                <div className="grid grid-cols-2 gap-6">
                    <Input defaultValue={user?.displayName} disabled variant="outlined" label="Outlined" />
                    <select {...register("ratting", {required: true})} className="border border-spacing-4 rounded-lg">
                        <option disabled>Ratting</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
            </div>
                <Textarea {...register("comment", { required: true })} label="Message" />
                <div className="w-52 mx-auto"><Input type="submit" className="hover:text-orange-600 bg-orange-600" value={'Submit'}/></div>
            </div>
         </form>
                </>
        );
};

export default AddReview;