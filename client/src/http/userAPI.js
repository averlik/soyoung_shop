import { $host, $authHost } from "./index";
import { jwtDecode } from 'jwt-decode';

export const signup= async(email, password_hash)=>{
    const {data}= await $host.post('api/user/signup',{email,password_hash, role:'USER'})
    localStorage.setItem('token',data.token)
    return jwtDecode(data.token)
}

export const login= async(email, password_hash)=>{
    const {data}= await $host.post('api/user/login',{email,password_hash})
    localStorage.setItem('token',data.token)
    return jwtDecode(data.token)
}

export const check= async()=>{
    const {data}= await $authHost.get('api/user/auth')
    //localStorage.setItem('token',data.token)
    return jwtDecode(data.token)
}

