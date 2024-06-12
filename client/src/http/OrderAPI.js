import { $authHost } from "./index";

// Функция для добавления товара в корзину
export const createOrder = async (user_name, phone, id_store ) => {
  const { data }  = await $authHost.post('api/order/create', { user_name, phone, id_store });
  return data;
};

export const fetchAllOrders= async()=>{
    const {data}= await $authHost.get('api/order/all')
    return data
}
export const fetchOrder= async(id_order)=>{
    const {data}= await $authHost.get('api/order/info/'+id_order)
    return data
}
export const fetchOrderByStatus= async(status)=>{
    const {data}= await $authHost.get('api/order/status',
    {params:{status}}
    )
    return data
}
export const fetchAdminOrder= async(id_order)=>{
    const {data}= await $authHost.get('/api/order/getinfo/'+id_order)
    return data
}

export const fetchUserOrder= async()=>{
    const {data}= await $authHost.get('api/order')
    return data
}


export const updateOrderStatus = async (id_order, status) => {
    const { data } = await $authHost.put(`/api/order/update/${id_order}`, { status });
    return data;
};

export const fetchStores = async () => {
  const { data } = await $authHost.get('api/order/stores');
  return data;
};



