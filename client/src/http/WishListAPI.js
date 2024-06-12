import { $authHost } from "./index";

// Функция для добавления товара в корзину
export const addToWishList = async (id_product) => {
  const { data }  = await $authHost.post('api/wishlist/add', { id_product });
  return data;
};

// Функция для получения корзины пользователя
export const fetchWishList = async () => {
  try{ const { data } = await $authHost.get('/api/wishlist');
  return data;}
  catch(error){
    console.error('Ошибка загрузки изборанного:', error);
    return {wishListItems:[]};
  }
};

// Функция для удаления товара из корзины
export const removeWishListItem = async (id_wish_list_item) => {
  const { data } = await $authHost.delete(`api/wishlist/remove/${id_wish_list_item}`);
  return data;
};

// Функция для очистки корзины
export const clearWishList = async () => {
  const { data } = await $authHost.delete('api/wishlist/clear');
  return data;
};


