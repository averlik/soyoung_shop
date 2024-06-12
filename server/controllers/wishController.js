const { WishList, WishListItem, Product } = require('../models/models');

class WishController {
  async addToWishList(req, res) {
    try {
      const user = req.user;
      const { id_product } = req.body;

      // Ищем продукт по id
      const product = await Product.findByPk(id_product);

      const wishListItem = await WishListItem.findOne({
        where: {
          id_wish_list: user.id_user,
          id_product: id_product
        }
      });

      if (wishListItem) {
        return res.json({ message: `Товар ${product.name} уже в Избранном` }); // Notify item update
      } else {
        const wishList = await WishListItem.create({
          id_wish_list: user.id_user,
          id_product: product.id_product
        });
        return res.json(wishList);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Не удалось добавить товар в Избранное' });
    }
  }

  async getWishList(req, res) {
    try {
      const { id_user } = req.user;
      console.log('Fetching wishlist for user:', id_user);

      const wishList = await WishListItem.findAll({
        include: {
          model: Product,
          attributes: ['id_product','image', 'ru_product_name','eng_product_name', 'price','sale']
        },
        where: { id_wish_list: id_user }
      });

      console.log('Wishlist fetched:', JSON.stringify(wishList, null, 2));

      if (wishList.length===0) {
        return res.json({ wishListItems: [] });
      }

      return res.json({ wishListItems: wishList });
    } catch (error) {
      console.error('Error in getWishList:', error);
      res.status(500).json({ message: 'Не удалось получить Избранное' });
    }
  }

  // Метод для удаления товара из Избранного
  async removeFromWishList(req, res) {
    try {
      const { id_wish_list_item } = req.params;
      const wishListItem = await WishListItem.findByPk(id_wish_list_item);
      if (wishListItem) {
        await wishListItem.destroy();
        return res.json({ message: 'Товар удален из Избранного' });
      }
      return res.status(404).json({ message: 'Товар не найден в Избранном' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Не удалось удалить товар из Избранного' });
    }
  }
}

module.exports = new WishController();
