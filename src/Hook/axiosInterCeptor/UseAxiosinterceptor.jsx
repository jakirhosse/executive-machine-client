import { useContext, useEffect } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UseAxiosinterceptor = () => {
        const {logOut} = useContext(AuthContext)
        const navigate= useNavigate()
        const interCeptor = axios.create({
                baseURL:'http://localhost:5000'
        })

        useEffect(()=>{
                interCeptor.interceptors.request.use((config)=>{
                        const token = localStorage.getItem('access-token')
                        if (token) {
                               config.headers.Authorization=`bearer ${token}`
                            }
                            return config;
                })
                interCeptor.interceptors.response.use((response)=> response,
                async(error)=> {
                        if (error.response && (error.response.status === 401 || error.response.status === 403)){
                         logOut()
                            navigate('/')
                            }
                        return Promise.reject(error);   
        })
        },[interCeptor,navigate,logOut])
        return [interCeptor]
};
export default UseAxiosinterceptor;