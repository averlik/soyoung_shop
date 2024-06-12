import { $host, $authHost } from "./index";

//feedback
export const createFeedback = async(email, text)=>{
    const {data}= await $host.post('api/feedback',
    {email,text})
    return data
}

export const fetchFeedbacks = async()=>{
    const {data}= await $authHost.get('api/feedback')
    return data
}

export const deleteFeedback = async(id)=>{
    const {data}= await $authHost.delete('api/feedback/'+id)
    return data
}