import { useQuery } from "react-query";
import UseAxiosinterceptor from "../axiosInterCeptor/UseAxiosinterceptor";


const UseAlluser = () => {
        const [interCeptor] = UseAxiosinterceptor()
        const { data: AllUser = [] ,refetch} = useQuery({
                queryKey: ['/manageUser'],
                queryFn: async () => {
                    const res = await interCeptor.get('/manageUser')
                    return res.data
                }
            })
            return  [AllUser,refetch]
        };


export default UseAlluser;