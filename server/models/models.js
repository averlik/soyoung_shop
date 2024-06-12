const sequelize=require('../db')
const {DataTypes}=require('sequelize')


const User = sequelize.define('user', {
  id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING(320),
    allowNull: false,
    unique: true
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  role: {
    type: DataTypes.STRING, defaultValue:"USER"
  }
}, {
  tableName: 'users'
});

const Feedback = sequelize.define('feedbacks', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'feedbacks'
});

const Stores = sequelize.define('stores', {
  id_store: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  store_address: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'stores'
});

const Product = sequelize.define('product', {
  id_product: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ru_product_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  eng_product_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_section: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  id_category: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  id_subcategory: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  id_brand: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  sale: {
    type: DataTypes.TINYINT,
    allowNull: true
  },
  published: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  }, 
  new_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  quantity:{
    type: DataTypes.INTEGER,
    allowNull: true
  },
  final_price: {
    type: DataTypes.VIRTUAL,
    get() {
        const discountPrice = this.price * ((100 - (this.sale || 0)) / 100);
        return parseFloat(discountPrice.toFixed(2)); // Округляем до двух знаков после запятой
    }
  }
}, {
  tableName: 'products'
});

const Order = sequelize.define('order', {
  id_order: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(12),
    allowNull: false
  },
  creation_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  id_store: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  total_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('в обработке', 'заказ принят', 'готов к выдаче', 'выдан','отменен'),
    defaultValue: 'в обработке',
    allowNull: false
  }
}, {
  tableName: 'orders'
});

const OrderItem = sequelize.define('orderItem', {
  id_order_item: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_order: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_product: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  order_item_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  order_item_sale:{
    type: DataTypes.TINYINT,
    allowNull: true
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'orderitems',
  timestamps: false
});

const Cart = sequelize.define('cart', {
  id_cart: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'carts'
});

const CartItem = sequelize.define('cartItem', {
  id_cart_item: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_cart: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_product: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cart_item_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'cartitems'
});

const WishList = sequelize.define('wishList', {
  id_wish_list: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'wishlists',
  timestamps: false
});

const WishListItem = sequelize.define('wishListItem', {
  id_wish_list_item: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_wish_list: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_product: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'wishlistitems',
  timestamps: false
});

const Sections = sequelize.define('sections', {
  id_section: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  section_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'sections'
});

 //таблица с категориями товаров categories
const Categories = sequelize.define('categories', {
  id_category: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_section: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  category_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'categories'
});

const Subcategories = sequelize.define('subcategories', {
  id_subcategory: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_category: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  subcategory_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'subcategories'
});


const Brand = sequelize.define('brand', {
  id_brand: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  brand_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'brands'
});

const ItemInfo = sequelize.define('itemInfo', {
  id_item_info: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_product: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  skin_type: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  volume: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  components: {
    type: DataTypes.TEXT
  },
  applying: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  ingredients: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'iteminfo'
});

// Associations

// User to Orders
User.hasMany(Order, { foreignKey: 'id_user'});
Order.belongsTo(User, { foreignKey: 'id_user'});

// User to Cart
User.hasOne(Cart, { foreignKey: 'id_user', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Cart.belongsTo(User, { foreignKey: 'id_user', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// User to WishList
User.hasOne(WishList, { foreignKey: 'id_user', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
WishList.belongsTo(User, { foreignKey: 'id_user', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Product to OrderItem
Product.hasMany(OrderItem, { foreignKey: 'id_product'});
OrderItem.belongsTo(Product, { foreignKey: 'id_product'});

// Order to OrderItem
Order.hasMany(OrderItem, { foreignKey: 'id_order', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
OrderItem.belongsTo(Order, { foreignKey: 'id_order', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Cart to CartItem
Cart.hasMany(CartItem, { foreignKey: 'id_cart', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
CartItem.belongsTo(Cart, { foreignKey: 'id_cart', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Product to CartItem
Product.hasMany(CartItem, { foreignKey: 'id_product' });
CartItem.belongsTo(Product, { foreignKey: 'id_product'});

// WishList to WishListItem
WishList.hasMany(WishListItem, { foreignKey: 'id_wish_list', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
WishListItem.belongsTo(WishList, { foreignKey: 'id_wish_list', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Product to WishListItem
Product.hasMany(WishListItem, { foreignKey: 'id_product', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
WishListItem.belongsTo(Product, { foreignKey: 'id_product', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Product to ItemInfo
Product.hasOne(ItemInfo, { foreignKey: 'id_product', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
ItemInfo.belongsTo(Product, { foreignKey: 'id_product', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Category to Subcategory
Categories.hasMany(Subcategories, { foreignKey: 'id_category', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Subcategories.belongsTo(Categories, { foreignKey: 'id_category', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Section to Category
Sections.hasMany(Categories, { foreignKey: 'id_section', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Categories.belongsTo(Sections, { foreignKey: 'id_section', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Brand to Product
Brand.hasMany(Product, { foreignKey: 'id_brand', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Product.belongsTo(Brand, { foreignKey: 'id_brand', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Subcategories.hasMany(Product, { foreignKey: 'id_subcategory' });
Product.belongsTo(Subcategories, { foreignKey: 'id_subcategory' });

Categories.hasMany(Product, { foreignKey: 'id_category' });
Product.belongsTo(Categories, { foreignKey: 'id_category' });

Sections.hasMany(Product, { foreignKey: 'id_section' });
Product.belongsTo(Sections, { foreignKey: 'id_section' });

module.exports = {
  User,
  Feedback,
  Stores,
  Product,
  Order,
  OrderItem,
  Cart,
  CartItem,
  WishList,
  WishListItem,
  Categories,
  Subcategories,
  Sections,
  Brand,
  ItemInfo
};