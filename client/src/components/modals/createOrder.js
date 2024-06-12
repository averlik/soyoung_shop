import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Form, DropdownButton, Image, ListGroup, Row, Col } from "react-bootstrap";
import { observer } from 'mobx-react-lite';
import { createOrder, fetchStores } from '../../http/OrderAPI.js';
import DOMPurify from 'dompurify'; // Используем DOMPurify для очистки данных

const CreateOrder = observer(({ show, handleClose, cartItems }) => {
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [storeId, setStoreId] = useState('');
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [errors, setErrors] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceWithoutSale, setTotalPriceWithoutSale] = useState(0);
  const [showSale, setShowSale] = useState(false);

  useEffect(() => {
    fetchStores().then(data => setStores(data));
  }, []);

  useEffect(() => {
    let total = 0;
    let totalWithoutSale = 0;
    cartItems.forEach(item => {
      const itemTotal = item.product.price * item.cart_item_quantity;
      totalWithoutSale += itemTotal;
      total += itemTotal * (1 - item.product.sale / 100);
      if (item.product.sale > 0) {
        setShowSale(true);
      }
    });
    setTotalPrice(total);
    setTotalPriceWithoutSale(totalWithoutSale);
  }, [cartItems]);

  const handleSelectStore = (store) => {
    setStoreId(store.id_store);
    setSelectedStore(store);
  };

  const validate = () => {
    const newErrors = {};
    const phoneRegex = /^(\+7|7|8)[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/;
    const nameRegex = /^[а-яА-ЯёЁ\s]+$/;

    if (!userName || !nameRegex.test(userName)) {
      newErrors.userName = "Введите корректное имя (только кириллица)";
    }
    if (!phone || !phoneRegex.test(phone)) {
      newErrors.phone = "Введите корректный номер телефона";
    }
    if (!storeId) {
      newErrors.storeId = "Выберите пункт выдачи";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input);
  };

  const handleSubmit = async () => {
    if (validate()) {
      try {
        const sanitizedUserName = sanitizeInput(userName);
        const sanitizedPhone = sanitizeInput(phone);

        const response = await createOrder(sanitizedUserName, sanitizedPhone, storeId);
        handleClose();
        window.location.reload();
      } catch (error) {
        console.error('Error creating order:', error);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Оформление заказа</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formUserName">
            <Form.Label>Имя пользователя</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Введите ваше имя" 
              value={userName} 
              onChange={(e) => setUserName(e.target.value)} 
              isInvalid={!!errors.userName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.userName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formPhone">
            <Form.Label className='mt-3'>Телефон</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Введите ваш номер телефона" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              isInvalid={!!errors.phone}
            />
            <Form.Control.Feedback type="invalid">
              {errors.phone}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formStoreId">
            <Form.Label className='mt-3'>Пункт выдачи</Form.Label>
            <DropdownButton 
              title={selectedStore ? selectedStore.store_address : "Выберите пункт выдачи"} 
              onSelect={(eventKey) => handleSelectStore(stores.find(store => store.id_store === Number(eventKey)))}
            >
              {stores.map(store => (
                <Dropdown.Item key={store.id_store} eventKey={store.id_store}>
                  {store.store_address}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            {errors.storeId && <div className="text-danger">{errors.storeId}</div>}
          </Form.Group>
          <Form.Group className="mt-4">
            <Form.Label>Ваш заказ:</Form.Label>
            <ListGroup>
              {cartItems.map(item => (
                <ListGroup.Item key={item.id_cart_item} className="mb-3">
                  <Row>
                    <Col md="2">
                      <Image src={process.env.REACT_APP_API_URL + item.product.image} alt="img not found" fluid />
                    </Col>
                    <Col md="10" className="d-flex align-items-center">
                      <div>
                        {item.product.ru_product_name}
                        <div>{item.cart_item_quantity} шт.</div>
                        
                        {item.product.sale > 0 ? (
                          <>
                          <div>
                            <span style={{ textDecoration: 'line-through' }}>
                              {item.product.price * item.cart_item_quantity} руб
                            </span>
                            <span style={{ marginLeft: '10px' }}>
                              {item.product.price * (1 - item.product.sale / 100) * item.cart_item_quantity} руб
                            </span>
                            </div>
                          </>
                        ) : (
                          <span>{item.product.price * item.cart_item_quantity} руб</span>
                        )}
                      </div>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Form.Group>
        </Form>
        <Col className="d-flex flex-column align-items-end">
          <p style={{fontWeight:'bold'}}>Итого: {totalPrice} руб</p>
        </Col>
      </Modal.Body>
      <Modal.Footer>
        
        <Button variant="outline-dark" onClick={handleClose}>
          Отмена
        </Button>
        <Button variant="outline-success" onClick={handleSubmit}>
          Оформить заказ
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateOrder;

