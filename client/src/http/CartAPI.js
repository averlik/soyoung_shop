import { $authHost } from "./index";

// Функция для добавления товара в корзину
export const addToCart = async (id_product, cart_item_quantity) => {
  const { data }  = await $authHost.post('api/cart/add', { id_product, cart_item_quantity });
  return data;
};

// Функция для получения корзины пользователя
export const fetchCart = async () => {
  try {
    const { data } = await $authHost.get('/api/cart');//тут слеш лишний или не лишний
    return data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    return { cartItems: [] }; // Возвращаем пустой массив, если произошла ошибка
  }
};

// Функция для обновления количества товара в корзине
export const updateCartItem = async (id_cart_item, update) => {
  const { data } = await $authHost.put(`api/cart/update/${id_cart_item}`, update);
  return data;
};

// Функция для удаления товара из корзины
export const removeCartItem = async (id_cart_item) => {
  const { data } = await $authHost.delete(`api/cart/remove/${id_cart_item}`);
  return data;
};

// Функция для очистки корзины
export const clearCart = async () => {
  const { data } = await $authHost.delete('api/cart/clear');
  return data;
};
