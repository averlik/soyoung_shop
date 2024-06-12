
import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../';
import { Button, Card, Col, Container, Row, Image, Form } from 'react-bootstrap';
import { fetchCart, updateCartItem, removeCartItem, clearCart } from '../http/CartAPI';
import CreateOrder from '../components/modals/createOrder'; // Импорт модального окна
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "../utils/consts";
import { HiOutlineTrash } from "react-icons/hi2";

const Cart = observer(() => {
  const navigate = useNavigate();
  const { products } = useContext(Context);
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false); // Состояние для отслеживания отображения модального окна
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceWithoutSale, setTotalPriceWithoutSale] = useState(0);
  const [showSale, setShowSale] = useState(false); // Состояние для отслеживания наличия скидок
 
  useEffect(() => {
    fetchCart().then(data => {
      products.setCartItems(data.cartItems || []);
    });
  }, [products]);

  const formatPrice = (price, discount, quantity) => {
    if (discount > 0) {
        const discountedPrice = ((price * (1 - discount / 100))*quantity);
        const Price=quantity*price;
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ textDecoration: 'line-through', color: 'gray', marginRight: 5 }}>{Price} руб</div>
                <div style={{ fontWeight: 'bold', fontSize: 18 }}>{discountedPrice} руб</div>
            </div>
        );
    } else {
      const Price=quantity*price;
        return <div style={{ fontWeight: 'bold', fontSize: 18 }}>{Price} руб</div>;
    }
};

useEffect(() => {
  if (products.cartItems) {
    let total = 0;
    let totalWithoutSale = 0;
    let hasSale = false;

    products.cartItems.forEach(item => {
      totalWithoutSale += item.product.price * item.cart_item_quantity;
      total += item.product.price * (1 - item.product.sale / 100) * item.cart_item_quantity;
      if (item.product.sale) {
        hasSale = true;
      }
    });

    setTotalPrice(Math.ceil(total));
    setTotalPriceWithoutSale(Math.ceil(totalWithoutSale));
    setShowSale(hasSale);
  }
}, [products.cartItems]);
  
  const decreaseQuantity = async (id_cart_item) => {
    const item = products.cartItems.find(item => item.id_cart_item === id_cart_item);
    if (item.cart_item_quantity > 1) {
      await updateCartItem(id_cart_item, { cart_item_quantity: item.cart_item_quantity - 1 });
      fetchCart().then(data => products.setCartItems(data.cartItems || []));
    }
  };

  const increaseQuantity = async (id_cart_item, id_product) => {
    const item = products.cartItems.find(item => item.id_cart_item === id_cart_item);
  
    if (item.cart_item_quantity < item.product.quantity) {
      await updateCartItem(id_cart_item, { cart_item_quantity: item.cart_item_quantity + 1 });
      fetchCart().then(data => products.setCartItems(data.cartItems || []));
      setErrorMessage('');
    } else {
      setErrorMessage('Превышено количество доступных товаров на складе');
      alert(`Превышено количество доступных товаров ${item.product.ru_product_name} на складе`);
      setTimeout(() => {
        setErrorMessage('');
      }, 5000); // Скрыть надпись через 5 секунд
    }
  };

  const removeFromCart = async (id_cart_item) => {
    await removeCartItem(id_cart_item);
    fetchCart().then(data => products.setCartItems(data.cartItems || []));
  };

  const handleClearCart = async () => {
    await clearCart();
    fetchCart().then(data => products.setCartItems(data.cartItems || []));
  };

  const createOrder = async () => {
    // Логика создания заказа
    setShowModal(false); // Закрываем модальное окно после успешного оформления заказа
  };



  return (
    <Container className="mt-3">
      <h1 className="pb-2">Корзина</h1>
      {products.cartItems.length === 0 ? (
        <p>Корзина пуста!</p>
      ) : (
        <>
          {products.cartItems.map(item => (
            <Card className="mb-3" key={item.id_cart_item}>
              <Card.Body>
                <Row>
                  <Col md="2">
                    <Image src={process.env.REACT_APP_API_URL + item.product.image} alt="img not found" fluid 
                    onClick={() => navigate(PRODUCT_ROUTE + '/' + item.id_product)} />
                  </Col>
                  <Col className='mt-1' onClick={() => navigate(PRODUCT_ROUTE + '/' + item.id_product)}>
                    <h6 className='mb-3'>{item.product.ru_product_name}</h6>
                    <h5>{item.product.eng_product_name}</h5>
                    <p style={{fontWeight:'bold'}} className='mt-1'>Объем: {item.product.itemInfo.volume} мл</p>
                  </Col>
                  <Col md="1" className="d-flex flex-column align-items-center justify-content-center">
                    {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Button variant="outline-dark" onClick={() => decreaseQuantity(item.id_cart_item)}> - </Button>
                      <Form.Control
                        type="number"
                        value={item.cart_item_quantity}
                        readOnly
                        style={{ width: 60, textAlign: 'center', margin: '0 10px' }}
                      />
                      <Button variant="outline-dark" onClick={() => increaseQuantity(item.id_cart_item)}> + </Button>
                    </div> */}

                    <div style={{ display: 'flex', alignItems: 'center', marginRight: 20 }}>
                      <Button variant="outline-dark"onClick={() => decreaseQuantity(item.id_cart_item)} style={{ borderRadius: '50%', padding: '0.5rem', width: '2rem', height: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>-</Button>
                      <Form.Control
                        type="number" 
                        value={item.cart_item_quantity}
                        style={{
                          width: 60,
                          textAlign: 'center',
                          borderRadius: '50px',
                          appearance: 'none',
                          MozAppearance: 'textfield',
                          marginLeft: 10,
                          marginRight: 10
                        }}
                        className="no-spinners"
                      />
                      <Button variant="outline-dark" onClick={() => increaseQuantity(item.id_cart_item)} style={{ borderRadius: '50%', padding: '0.5rem', width: '2rem', height: '2rem',
                      display: 'flex', justifyContent: 'center', alignItems: 'center' }}>+</Button>
                    </div>

                  </Col>
                  <Col md="2" className="d-flex align-items-center justify-content-end">
                    <div>{formatPrice(item.product.price, item.product.sale, item.cart_item_quantity)}</div>
                  </Col>
                  <Col md="1" className="d-flex align-items-center justify-content-center">
                    <Button variant="outline-danger" onClick={() => removeFromCart(item.id_cart_item)}>
                      <HiOutlineTrash />
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
         
          <div className="d-flex flex-column align-items-end mt-3">
            {showSale && (
              <>
                <h5>Итого без скидки: {totalPriceWithoutSale} руб</h5>
              </>
            )}
            <h2>Итого: {totalPrice} руб</h2>
          </div>
          <div className="d-flex justify-content-end mt-3">
            <Button variant={"outline-dark"}  onClick={() => setShowModal(true)} style={{ borderRadius: '2rem', fontSize:20 }}>
              Оформить заказ
            </Button>
           </div>
          
        </>
      )}
      {/* Модальное окно для оформления заказа */}
      <CreateOrder show={showModal} handleClose={() => setShowModal(false)} cartItems={products.cartItems} />
    </Container>
  );
});

export default Cart;
