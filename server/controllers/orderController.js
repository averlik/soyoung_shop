const { Order, OrderItem, CartItem, Product, Stores, User, ItemInfo } = require('../models/models');
const sequelize=require('../db')

class OrderController {

    // Метод для создания заказа
    async createOrder(req, res) {
    const user = req.user;
    const { user_name, phone, id_store } = req.body;

    const transaction = await sequelize.transaction();

    try {
        const cartItems = await CartItem.findAll({ where: { id_cart: user.id_user } });

        if (cartItems.length === 0) {
            return res.status(400).json({ message: 'Корзина пуста' });
        }

        let total_price = 0;
        for (const item of cartItems) {
            const product = await Product.findByPk(item.id_product);

            if (product.quantity < item.cart_item_quantity) {
                await transaction.rollback();
                return res.status(400).json({ message: `Недостаточное количество товара ${product.ru_product_name} на складе` });
            }

            total_price += (product.price * (1 - product.sale / 100)) * item.cart_item_quantity;
        }

        const order = await Order.create({
            id_user: user.id_user,
            user_name,
            phone,
            creation_date: new Date(),
            id_store,
            total_price,
            status: 'в обработке'
        }, { transaction });

        for (const item of cartItems) {
            const product = await Product.findByPk(item.id_product);

            let price;
            if (product.sale > 0) {
                price = (product.price * (1 - product.sale / 100)) * item.cart_item_quantity;
            } else {
                price = product.price * item.cart_item_quantity;
            }

            await OrderItem.create({
                id_order: order.id_order,
                id_product: item.id_product,
                order_item_quantity: item.cart_item_quantity,
                order_item_sale: product.sale,
                subtotal: price
            }, { transaction });

            product.quantity -= item.cart_item_quantity;
            await product.save({ transaction });
        }

        await CartItem.destroy({ where: { id_cart: user.id_user }, transaction });

        await transaction.commit();
        return res.status(201).json(order);
    } catch (error) {
        await transaction.rollback();
        console.error(error);
        return res.status(500).json({ message: 'Ошибка при создании заказа' });
    }
}

    // Метод для получения заказа по id
    async getOrder(req, res) {
        const { id_order } = req.params;

        try {
            const order = await Order.findByPk(id_order, {
                include: [{ model: OrderItem, include: {model:Product, include:{model:ItemInfo,  attributes: ['volume']}} }]
            });

            if (!order) {
                return res.status(404).json({ message: 'Заказ не найден' });
            }

            return res.json(order);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка при получении заказа' });
        }
    }

    // Метод для получения заказа по id
    async getUserOrder(req, res) {
        const user = req.user;
        try {
            const order = await Order.findAll({
                include: [{ model: OrderItem, include: [Product] }],
                where: { id_user: user.id_user }
            });
    
            if (!order || order.length === 0) {
                return res.status(404).json({ message: 'У вас еще нет заказов' });
            }
    
            return res.json(order);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка при получении списка заказов' });
        }
    }
    
    // Метод для получения заказа по id
    async getAllOrder(req, res) {
        try {
            const order = await Order.findAll( {
                include: [{ model: OrderItem, include: [{model: Product}]},{model: User}] 
            });

            if (!order) {
                return res.status(404).json({ message: 'Заказов нет' });
            }

            return res.json(order);
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка при получении заказа' });
        }
    }

    // Метод для получения заказов по статусу
    async getOrdersByStatus(req, res) {
        const { status } = req.query;

        try {
            const orders = await Order.findAll({
                where: { status },
                include: [{ model: OrderItem, include: [{ model: Product }] }, { model: User }]
            });

            if (!orders || orders.length === 0) {
                return res.status(404).json({ message: `Нет заказов со статусом ${status}` });
            }

            return res.json(orders);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка при получении заказов' });
        }
    }
    
    // Метод получения пунктов выдачи
    async getStores(req, res) {
        try {
            const stores = await Stores.findAll();

            return res.json(stores);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка при получении пунктов выдачи' });
        }
    }

    //Метод обновления статуса заказа
    async updateOrderStatus(req, res) {
        const { id_order } = req.params;
        const { status } = req.body;
    
        try {
            // Поиск заказа по id с учетом связанных сущностей orderItems
            const order = await Order.findByPk(id_order, { include: OrderItem });
    
            // Проверка существования заказа
            if (!order) {
                return res.status(404).json({ message: 'Заказ не найден' });
            }
            // Проверка, не является ли статус заказа "отменен"
            if (order.status === 'отменен') {
                return res.json({ message: 'Нельзя изменить статус отмененного заказа!' });
            } else {
                // Если новый статус - "отменен", возвращаем товары на склад
                if (status === 'отменен' && order.status !== 'отменен') {
                    for (const item of order.orderItems) {
                        const product = await Product.findByPk(item.id_product);
                        if (product) {
                            product.quantity += item.order_item_quantity;
                            await product.save();
                        }
                    }
                }
                // Обновление статуса заказа и сохранение изменений
                order.status = status;
                await order.save();
            }
            return res.json(order);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка при обновлении статуса заказа' });
        }
    }
    
    
}

module.exports = new OrderController();
