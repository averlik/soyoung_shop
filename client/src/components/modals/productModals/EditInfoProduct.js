import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import { updateProductInfo, fetchProductInfo } from '../../../http/productAPI';

const EditInfoProduct = ({ show, onHide, id_product, onUpdate, currentInfo }) => {
    const [formData, setFormData] = useState({
        description: '',
        skin_type: '',
        volume: '',
        components: '',
        applying: '',
        ingredients: ''
    });

    useEffect(() => {
        if (currentInfo) {
            setFormData(currentInfo);
        } else {
            const fetchData = async () => {
                try {
                    const info = await fetchProductInfo(id_product);
                    setFormData(info);
                } catch (error) {
                    console.error('Ошибка при получении информации о товаре:', error);
                }
            };
            fetchData();
        }
    }, [currentInfo, id_product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
       try {
            await updateProductInfo(id_product, formData);
            onHide();
        } catch (error) {
            console.error('Ошибка при редактировании информации товара:', error);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Редактирование дополнительной информации</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="description">
                        <Form.Label>Описание</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="skin_type">
                        <Form.Label>Тип кожи</Form.Label>
                        <Form.Control
                            type="text"
                            name="skin_type"
                            value={formData.skin_type}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="volume">
                        <Form.Label>Объем товара</Form.Label>
                        <Form.Control
                            type="text"
                            name="volume"
                            value={formData.volume}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="components">
                        <Form.Label>Действующие компоненты</Form.Label>
                        <Form.Control
                            type="text"
                            name="components"
                            value={formData.components}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="applying">
                        <Form.Label>Способ нанесения</Form.Label>
                        <Form.Control
                            type="text"
                            name="applying"
                            value={formData.applying}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="ingredients">
                        <Form.Label>Состав</Form.Label>
                        <Form.Control
                            type="text"
                            name="ingredients"
                            value={formData.ingredients}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Отмена
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Сохранить изменения
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditInfoProduct;
