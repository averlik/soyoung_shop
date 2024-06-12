import React, { useState, useContext, useEffect } from 'react';
import { Col, Container, Row, Image, Button, Form } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import "../styles/common.css";
import { observer } from "mobx-react-lite";
import { useParams } from 'react-router-dom';
import { fetchOneProduct } from '../http/productAPI';
import { addToCart } from "../http/CartAPI";
import { Context } from '..';
import { HiOutlineHeart } from "react-icons/hi2";
import { addToWishList } from '../http/WishListAPI'
import { Link } from 'react-router-dom';

const ProductPage = observer(() => {
  const { user } = useContext(Context);
  const [product, setProduct] = useState({ info: [] });
  const { id_product } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false); 
  
  useEffect(() => {
    fetchOneProduct(id_product)
      .then(data => {
        if (data) {
          setProduct(data);
        } else {
          setNotFound(true); 
        }
      })
      .catch(error => console.error(error));
  }, [id_product]);

  const handleAddToCartClick = async () => {
    try {
      if (quantity > product.quantity) {
        setError('Недостаточное количество товара на складе');
        setTimeout(() => {
          setError('');
        }, 5000); // Скрыть надпись через 5 секунд
        return;
      }
      const formData = new FormData();
      formData.append('id_product', id_product);
      formData.append('cart_item_quantity', quantity);
      const response = await addToCart(id_product, quantity);
      alert(`Товар ${product.ru_product_name} был добавлен в вашу корзину!`);
      setError('');
    } catch (error) {
      console.error(error);
      alert('Войдите или зарегистрируйтесь, чтобы добавить товар в корзину!');
    }
  };

  const handleAddToFavoritesClick = async () => {
    try {
      const formData = new FormData();
      formData.append('id_product', id_product);
      const response = await addToWishList(id_product);
      alert(`Товар ${product.ru_product_name} был добавлен в избранное!`);
    } catch (error) {
      console.error(error);
      alert('Войдите или зарегистрируйтесь, чтобы добавить товар в Избранное');
    }
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value > 0 && value <= product.quantity) {
      setQuantity(value);
      setError('');
    } else if (value > product.quantity) {
      setQuantity(product.quantity);
      setError('Превышено количество доступных товаров на складе');
      setTimeout(() => {
        setError('');
      }, 5000); // Скрыть надпись через 5 секунд
    } else {
      setQuantity(1);
      setError('');
    }
  };

  const increaseQuantity = () => {
    if (quantity < product.quantity) {
      setQuantity(prevQuantity => prevQuantity + 1);
      setError('');
    } else {
      setError('Превышено количество доступных товаров на складе');
      setTimeout(() => {
        setError('');
      }, 5000); // Скрыть надпись через 5 секунд
    }
  };

  const decreaseQuantity = () => {
    setQuantity(prevQuantity => {
      const newQuantity = prevQuantity > 1 ? prevQuantity - 1 : 1;
      setError('');
      return newQuantity;
    });
  };

  return (
    <Container className='mt-3'>
      {notFound ? (
        <Row>
          <Col>
            <div style={{ textAlign: 'center', marginTop: '100px', marginBottom:'130px'}}>
              <h1>упс...<br />товар не найден :( </h1>
              <p>Можете перейти в <Link to="/catalog">каталог</Link>
              <p>либо на <Link to="/">главную страницу</Link></p></p>
            </div>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col xs={12} md={4}>
            <Image className='mb-3' width="100%" height="auto" src={process.env.REACT_APP_API_URL + product.image} />
          </Col>
          <Col xs={12} md={8}>
            <div className="d-flex flex-column justify-content-around">
              <h1 className="text-black-70" style={{ fontSize: 17 }}>{product.ru_product_name}</h1>
              <h1 className="mt-1" style={{ fontSize: 21, fontWeight: 'bolder' }}>{product.eng_product_name}</h1>
            </div>

            <div className='mt-2' style={{ display: 'flex', alignItems: 'center' }}>
              <h5 style={{ fontSize: 16, fontWeight: 'bold' }}>Объем: {product.itemInfo ? product.itemInfo.volume : '-'}</h5>
            </div>

            <div className='mt-4' style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              {product.sale > 0 ? (
                <>
                  <h3 style={{ fontWeight: 600, marginRight: 20 }}>{(Math.ceil(product.price * (1 - product.sale / 100))).toFixed(0)} руб</h3>
                  <h3 style={{ textDecoration: 'line-through', color: '#808080', fontSize: 24, marginRight: 20 }}>{Math.ceil(product.price)} руб</h3>
                </>
              ) : (
                <h3 style={{ fontWeight: 600, marginRight: 20 }}>{Math.ceil(product.price)} руб</h3>
              )}
            </div>

            <div className='mt-4' style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginRight: 20 }}>
                <Button variant="outline-dark" onClick={decreaseQuantity} style={{ borderRadius: '50%', padding: '0.5rem', width: '2rem', height: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>-</Button>
                <Form.Control
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
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
                <Button variant="outline-dark" onClick={increaseQuantity} style={{ borderRadius: '50%', padding: '0.5rem', width: '2rem', height: '2rem',
                display: 'flex', justifyContent: 'center', alignItems: 'center' }}>+</Button>
              </div>

              <Button variant={"outline-dark"} onClick={handleAddToFavoritesClick} style={{ marginRight: 20, borderRadius: '50%', padding: '0.5rem', width: '2rem', height: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <HiOutlineHeart size={20} />
              </Button>
              <Button variant={"outline-dark"} onClick={handleAddToCartClick} style={{ borderRadius: '2rem' }}>
                В корзину
              </Button>
            </div>
            {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
            <div className='mt-4'>
              <Accordion defaultActiveKey="0" className='mb-4'>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Описание</Accordion.Header>
                  <Accordion.Body>
                    <p>{product.itemInfo ? product.itemInfo.description : '-'}</p>
                    <p><strong>Подходит для: </strong>{product.itemInfo ? product.itemInfo.skin_type : '-'}</p>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>Применение</Accordion.Header>
                  <Accordion.Body>
                    <p>{product.itemInfo ? product.itemInfo.applying : '-'}</p>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                  <Accordion.Header>Активные компоненты</Accordion.Header>
                  <Accordion.Body>
                    <p>{product.itemInfo ? product.itemInfo.components : '-'}</p>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                  <Accordion.Header>Состав</Accordion.Header>
                  <Accordion.Body>
                    <p>{product.itemInfo ? product.itemInfo.ingredients : '-'}</p>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
});

export default ProductPage;
