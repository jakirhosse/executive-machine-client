
import {Typography, Avatar} from "@material-tailwind/react";
import {FaUser } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import UseAxiosinterceptor from "../../Hook/axiosInterCeptor/UseAxiosinterceptor";
import UserSectionTitle from "../../Hook/UserSectionTitle/UserSectionTitle";
import UseAlluser from "../../Hook/UseAlluser/UseAlluser";
const ManageUser = () => {
        const [interCeptor] = UseAxiosinterceptor();
        const [AllUser,refetch] = UseAlluser();
        const TABLE_HEAD = ["Photo", "Name", "Action", "Delete"];
        
        const handleAdmin = (id) => {
                Swal.fire({
                  title: 'Are you sure?',
                  text: "This parson is admin",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, admin it!'
                }).then((result) => {
                  if (result.isConfirmed) {
                    interCeptor.patch(`/users/${id}`)
                        .then(data => {
                          if (data.data.modifiedCount) {
                            Swal.fire(
                              'successful',
                              'successful this parson admin',
                              'success'
                            )
                         }
                    })
                    
                  }
                })
        }

        const handleDelete = (id) => {
                Swal.fire({
                  title: 'Are you sure?',
                  text: "user is delete",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                  if (result.isConfirmed) {
                    interCeptor.delete(`/users/${id}`)
                  .then(data => {
                    if (data.data.deletedCount) {
                      refetch()
                      Swal.fire(
                        'Successful',
                         
                        'success'
                      )
                  }
                })
        }
})
        }

       
        return (
                <>
                  <UserSectionTitle HeaderTitle={'---admin ----'} SetHeaderTitle={'---user home ----'}></UserSectionTitle>      
                  <table className="mx-auto xl:w-8/12 w-full md:mt-0 mt-10 bg-white">
            <thead>
              <tr>
                {TABLE_HEAD?.map((head) => (
                  <th
                    key={head}
                    className="bg-orange-500 py-4"
                  >
                       <Typography>{head}</Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {AllUser?.map(
                ({email,displayName,_id,photoURL,role}, index) => {
                  const isLast = index === AllUser?.length - 1;
                  const classes = isLast
                    ? "text-center px-4 lg:px-12"
                    : "text-center px-4 lg:px-12 border-b border-blue-gray-50";
   
                  return (
                    <tr key={_id}>
                      <td className={classes}>
                        <div>
                          <Avatar src={photoURL} />
                        </div>
                      </td>
                      <td className={classes}>
                              <Typography>{displayName}</Typography>
                              <Typography>{email}</Typography>
                              
                          </td>
                          <td className={classes}>
                        <div>
                           
                        {
                                      role ? <p className="bg-orange-600 text-white rounded-md">{role}</p>:<Typography><FaUser className="text-xl" onClick={()=>handleAdmin(_id)}></FaUser></Typography>            
                        }
                        </div>
                          </td>
                          
                      <td className={classes}>
                      <Typography className="text-orange-600 text-xl"> <RiDeleteBin6Line onClick={()=>handleDelete(_id)}></RiDeleteBin6Line></Typography>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
                </>
        );
};

export default ManageUser;