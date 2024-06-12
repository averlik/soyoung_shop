const { Cart, CartItem, Product, ItemInfo } = require('../models/models');

class CartController {

  async addToCart(req, res) {
    try {
      const user = req.user;
      if (!user) {
          return res.status(401).json({ message: 'Войдите или зарегистрируйтесь чтобы добавить товар!' });
      }
      const { id_product, cart_item_quantity } = req.body;
      
      // Ищем продукт по id
      const product = await Product.findByPk(id_product);

      const cartItem = await CartItem.findOne({
        where: {
          id_cart: user.id_user,
          id_product: id_product
        }
      });
      
      if (cartItem) {
          cartItem.cart_item_quantity += cart_item_quantity;
          cartItem.subtotal = product.price * cart_item_quantity; // Обновляем подытог
          await cartItem.save();
          return res.json({ message: `Товар ${product.name} обновлен в корзине!` }); // Notify item update
      } else {
        // Создаем элемент корзины с учетом цены продукта
        const cart = await CartItem.create({
          id_cart: user.id_user,
          id_product: product.id_product,
          cart_item_quantity: cart_item_quantity,
        });
        return res.json(cart);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Войдите или зарегистрируйтесь чтобы добавить товар!' });
  }
}


async getCart(req, res) {
  try {
    const { id_user } = req.user;
    console.log('Fetching cart for user:', id_user);

    const cart = await CartItem.findAll({
      include: {
        model: Product,
        as: 'product',
        attributes: ['image', 'ru_product_name', 'eng_product_name', 'price', 'quantity', 'sale'],
        include: {
          model: ItemInfo,
          as: 'itemInfo',
          attributes: ['volume']
        }
      },
      where: { id_cart: id_user }
    });

    console.log('Cart fetched:', JSON.stringify(cart, null, 2));

    if (cart.length === 0) {
      return res.json({ message: 'Корзина пуста!' });
    }

    return res.json({ cartItems: cart });
  } catch (error) {
    console.error('Error in getCart:', error);
    res.status(500).json({ message: 'Не удалось получить корзину' });
  }
}


  // Метод для удаления товара из корзины
  async removeFromCart(req, res) {
    try {
      const { id_cart_item } = req.params;
      const cartItem = await CartItem.findByPk(id_cart_item);
      if (cartItem) {
        await cartItem.destroy();
        return res.json({ message: 'Товар удален из корзины' });
      }
      return res.status(404).json({ message: 'Товар не найден в корзине' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Не удалось удалить товар из корзины' });
    }
  }

  // // Метод для очистки корзины пользователя
  // async clearCart(req, res) {
  //   try {
  //     const user = req.user;
  //     await CartItem.destroy({ where: { id_cart: user.id_user } });
  //     return res.json({ message: 'Корзина очищена' });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Не удалось очистить корзину' });
  //   }
  // }


// Метод для обновления количества товаров в корзине
async updateCartItem(req, res) {
  try {
    const { id_cart_item } = req.params;
    const { cart_item_quantity } = req.body;

    const cartItem = await CartItem.findByPk(id_cart_item);
    if (!cartItem) {
      return res.status(404).json({ message: 'Товар не найден в корзине' });
    }

    const product = await Product.findByPk(cartItem.id_product);
    if (!product) {
      return res.status(404).json({ message: 'Товара больше нет в наличии' });
    }

    cartItem.cart_item_quantity = cart_item_quantity;
    cartItem.subtotal = product.price * cart_item_quantity;
    await cartItem.save();

    return res.json(cartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Не удалось обновить количество товара в корзине' });
  }
}

}

module.exports = new CartController();
