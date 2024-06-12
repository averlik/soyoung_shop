import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Form, Row, Col, Container, Image } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from "../../index";
import { fetchAllOrders, fetchStores, updateOrderStatus } from "../../http/OrderAPI";
import AdminSortMenu from '../modals/AdminSortMenu'; 
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "../../utils/consts";

const AdminOrderHistory = observer(() => {
    const { products } = useContext(Context);
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    const [editingOrderId, setEditingOrderId] = useState(null);
    const [status, setStatus] = useState('');
    const [sortType, setSortType] = useState(''); // Добавляем состояние для типа сортировки
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAllOrders().then((data) => products.setOrders(data));
        fetchStores().then(data => products.setStores(data));
    }, [products]);

    const getStoreAddress = (id_store) => {
        const store = products.stores.find(store => store.id_store === id_store);
        return store ? store.store_address : 'Неизвестный пункт выдачи';
    };

    const sortOrders = (orders) => {
        let sortedOrders = orders.slice();

        if (sortType) {
            sortedOrders = sortedOrders.filter(order => order.status === sortType);
        }

        return sortedOrders.sort((a, b) => new Date(b.creation_date) - new Date(a.creation_date));
    };

    const sortedOrders = sortOrders(products.orders);

    const toggleOrderDetails = (orderId) => {
        if (expandedOrderId === orderId) {
            setExpandedOrderId(null);
        } else {
            setExpandedOrderId(orderId);
        }
    };

    const handleStatusChange = (id_order, newStatus) => {
        setEditingOrderId(id_order);
        setStatus(newStatus);
    };

    const saveStatusChange = async (id_order) => {
        const order = products.orders.find(order => order.id_order === id_order); // Получаем текущий заказ по его id
    
        if (order.status === "отменен") {
            // Если текущий статус заказа "отменен", выводим ошибку и прерываем выполнение функции
            alert("Нельзя менять статус отмененного заказа!");
            return;
        }
    
        // Иначе сохраняем новый статус
        await updateOrderStatus(id_order, status);
        fetchAllOrders().then((data) => products.setOrders(data));
        setEditingOrderId(null);
    };
    
    

    return (
        <Container>
            <h4 className="pb-2">Заказы</h4>
            <AdminSortMenu sortType={sortType} setSortType={setSortType} /> {/* Добавляем компонент меню сортировки */}
            {sortedOrders.length === 0 ? (
                <p>У вас пока нет заказов</p>
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

                                        {editingOrderId === order.id_order ? (
                                            <>
                                                <Form.Select
                                                    value={status}
                                                    onChange={(e) => setStatus(e.target.value)}
                                                    className="mb-2"
                                                >
                                                    <option value="в обработке">в обработке</option>
                                                    <option value="заказ принят">заказ принят</option>
                                                    <option value="готов к выдаче">готов к выдаче</option>
                                                    <option value="выдан">выдан</option>
                                                    <option value="отменен">отменен</option>
                                                </Form.Select>
                                                <Button variant="outline-success"  
                                                style={{ marginRight: 20, marginTop: 10 }}
                                                onClick={() => saveStatusChange(order.id_order)}>
                                                    Сохранить
                                                </Button>
                                                <Button variant="outline-secondary"
                                                style={{ marginRight: 20, marginTop: 10, marginLeft: 10 }}
                                                onClick={() => setEditingOrderId(null)}>
                                                    Отмена
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <p><strong>Статус заказа:</strong> {order.status}</p>
                                                <Button variant="outline-dark"  
                                                style={{ marginRight: 20, marginTop: 10 }}
                                                onClick={() => handleStatusChange(order.id_order, order.status)}>
                                                    Поменять статус заказа
                                                </Button>
                                            </>
                                        )}
                                        <Button
                                            style={{ marginRight: 20, marginTop: 10 }}
                                            variant="outline-dark"
                                            onClick={() => toggleOrderDetails(order.id_order)}
                                        >
                                            {expandedOrderId === order.id_order ? 'Скрыть детали' : 'Показать детали'}
                                        </Button>
                                        {expandedOrderId === order.id_order && (
                                            <div className="mt-3">
                                                <h6>Контакты заказчика:</h6>
                                                <Card className='mb-2'>
                                                    <Card.Body>
                                                        <Row>
                                                            <Col>
                                                                <p>Имя: {order.user_name}</p>
                                                                <p>Номер телефона: {order.phone}</p>
                                                                <p>Почта: {order.user.email}</p>
                                                            </Col>
                                                        </Row>
                                                    </Card.Body>
                                                </Card>
                                                <h6>Содержимое заказа:</h6>
                                                {order.orderItems.map(item => (
                                                    <Card className='mb-2' key={item.id_order_item}>
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
                                                            <Col  md="2">
                                                            <p className='d-flex align-items-center'> {item.order_item_quantity} шт.</p>
                                                            <p> {item.subtotal} руб.</p> 
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

export default AdminOrderHistory;
