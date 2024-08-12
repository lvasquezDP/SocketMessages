import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const host='192.168.137.141:3000';
const baseURL=`http://${host}/api`;

const api=axios.create({baseURL});

api.interceptors.request.use(async (config)=>{
    const token =await AsyncStorage.getItem('token');
    if(token)config.headers.Authorization=`Bearer ${token}`;
    return config;
})

export default api;