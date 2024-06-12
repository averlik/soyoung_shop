
import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Row, Col, Container, Image } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from "../../index";
import { fetchUserOrder, fetchStores } from "../../http/OrderAPI";
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "../../utils/consts";

const OrderHistory = observer(() => {
  const navigate = useNavigate()
  const { products } = useContext(Context);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Добавляем состояние загрузки

  useEffect(() => {
    fetchUserOrder()
      .then((data) => {
        products.setOrders(data || []); // Устанавливаем пустой массив, если данных нет
        setIsLoading(false); // Устанавливаем isLoading в false после получения данных
      })
      .catch(error => {
        setIsLoading(false); // Обработка ошибки: устанавливаем isLoading в false
      });
    fetchStores().then(data => products.setStores(data));
  }, [products]);

  const getStoreAddress = (id_store) => {
    const store = products.stores.find(store => store.id_store === id_store);
    return store ? store.store_address : 'Неизвестный пункт выдачи';
  };

  const sortOrdersByDate = (orders) => {
    return orders.slice().sort((a, b) => new Date(b.creation_date) - new Date(a.creation_date));
  };

  const sortedOrders = sortOrdersByDate(products.orders || []);

  const toggleOrderDetails = (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  return (
    <Container>
      <h4 className="pb-2">История заказов</h4>
      {isLoading ? ( // Показываем индикатор загрузки, пока данные загружаются
        <p>Loading...</p>
      ) : sortedOrders.length === 0 ? ( // Если нет заказов, выводим сообщение об этом
        <p>Заказов пока нет!</p>
      ) : (
        <>
          {sortedOrders.map(order => (
            <Card className="mb-3" key={order.id_order}>
              <Card.Body>
                <Row>
                  <Col>
                    <h5>Номер заказа: {order.id_order}</h5>
                    <p>Дата оформления: {new Date(order.creation_date).toLocaleString()}</p>
                    <p>Пункт выдачи: {getStoreAddress(order.id_store)}</p>
                    <p>Статус заказа: {order.status}</p>
                    <h5 className='d-flex align-items-center justify-content-end'>Итого: {order.total_price} руб</h5>
                    <Button variant="outline-dark" onClick={() => toggleOrderDetails(order.id_order)}>
                      {expandedOrderId === order.id_order ? 'Скрыть детали' : 'Показать детали'}
                    </Button>
                    {expandedOrderId === order.id_order && (
                      <div className="mt-3">
                        <h6>Содержимое заказа:</h6>
                        {order.orderItems.map(item => (
                          <Card className='mb-2' key={item.id_order_item} onClick={() => navigate(PRODUCT_ROUTE + '/' + item.id_product)} >
                            <Card.Body>
                              <Row>
                                <Col md="2" className='mb-3'>
                                  <Image src={process.env.REACT_APP_API_URL + item.product.image} alt="img not found" fluid />
                                </Col>
                                <Col>
                                  <p>{item.product.ru_product_name}</p>
                                  <p>{item.product.eng_product_name}</p>
                                  {item.order_item_sale>0 && <p>Скидка: {item.order_item_sale}%</p>}
                                </Col>
                                <Col md="2">
                                  <p>{item.order_item_quantity} шт.</p>
                                  <p>{item.subtotal} руб.</p>
                                </Col>
                              </Row>
                            </Card.Body>
                          </Card>
                        ))}
                      </div>
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </>
      )}
    </Container>
  );
});

export default OrderHistory;
