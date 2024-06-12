import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { HiOutlineTrash } from "react-icons/hi2";
import { PRODUCT_ROUTE } from "../utils/consts";
import { useNavigate } from "react-router-dom";

const ProductListAdmin = ({ products, onEdit, onDelete }) => {
    const navigate = useNavigate();
    const buttonStyle = { height: '38px' }; // Установите нужную высоту

    const formatPrice = (price, discount) => {
        if (discount > 0) {
            const discountedPrice = Math.ceil(price * (1 - discount / 100)); // Округляем в большую сторону
            return (
                <div>
                    <div style={{ textDecoration: 'line-through', color: 'gray', marginRight: 5 }}>{price} руб</div>
                    <div style={{ fontWeight: 'bold', fontSize: 18 }}>{discountedPrice.toFixed(0)} руб</div> {/* Используем toFixed(0) для отображения целого числа */}
                </div>
            );
        } else {
            return <div style={{ fontWeight: 'bold', fontSize: 18 }}>{Math.ceil(price)} руб</div>;
        }
    };

    const [filterType, setFilterType] = useState('all'); // Состояние для выбора типа фильтрации

    const getOverlayText = (product) => {
        if (product.quantity <= 0 && product.published == 0) {
            return 'Товар закончился и скрыт';
        } else if (product.quantity <= 0) {
            return 'Товар закончился';} 
        else if ( product.published == 0) {
            return 'Товар скрыт';
        }
        return null;
    };

    return (
        <div>
            <Row className='mb-4'>
                <Col>
                    <Form.Group>
                        <Form.Label>Выберите тип фильтрации:</Form.Label>
                        <Form.Control
                            as="select"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value="all">Все товары</option>
                            <option value="outOfStock">Нет в наличии</option>
                            <option value="hidden">Скрытые</option>
                            <option value="sale">Товары со скидкой</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                {products.map(product => {
                    const overlayText = getOverlayText(product);
                    if ((filterType === 'outOfStock' && product.quantity > 0) || 
                        (filterType === 'hidden' && product.published != 0) || 
                        (filterType === 'sale' && product.sale <= 0)) {
                        // Пропускаем отображение товара, если он не должен быть показан в соответствии с выбранным типом фильтрации
                        return null;
                    }
                    return (
                        <Col key={product.id_product} md={12} className="mb-3">
                            <Card>
                                <Card.Body style={{ position: 'relative' }}>
                                    {overlayText && (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                color: 'white',
                                                padding: '5px',
                                                zIndex: 1,
                                            }}
                                        >
                                            {overlayText}
                                        </div>
                                    )}
                                    <Row>
                                        <Col md={2} onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id_product)}>
                                            <Card.Img variant="top" style={{width: 130, height: 130}} src={process.env.REACT_APP_API_URL + product.image} />
                                        </Col>
                                        <Col md={5} onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id_product)}>
                                            <Card.Title style={{fontSize: 14}}>{product.ru_product_name}</Card.Title>
                                            <Card.Title style={{fontSize: 18}}>{product.eng_product_name}</Card.Title>
                                        </Col>
                                        <Col md={2} className="d-flex align-items-center" onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id_product)}>
                                            <Card.Title className="mb-0" style={{fontSize: 16}}>{formatPrice(product.price, product.sale)}</Card.Title>
                                        </Col>
                                        <Col md={3} className="d-flex align-items-center justify-content-end">
                                            <Button style={{...buttonStyle, marginRight: 12}} variant="outline-dark" onClick={() => onEdit(product.id_product)}>Изменить</Button>
                                            <Button 
                                                variant="outline-danger" 
                                                onClick={() => onDelete(product.id_product, product.ru_product_name)} 
                                                style={buttonStyle}
                                                className="ml-2 d-flex align-items-center"
                                            >
                                                <HiOutlineTrash />
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
};

export default ProductListAdmin;
