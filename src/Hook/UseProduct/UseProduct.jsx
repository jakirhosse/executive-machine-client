import axios from 'axios';
import { useQuery } from "react-query";

const UseProduct = () => {
        const { data: products = [] } = useQuery({
                queryKey: ['products'],
                queryFn: async () => {
                    const res = await axios.get('http://localhost:5000/products')
                    return res.data
                }
            })
            return [products]
};
export default UseProduct;