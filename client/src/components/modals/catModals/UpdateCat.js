import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { updateCat } from "../../../http/productAPI";

const UpdateCat = ({ show, onHide, id_category, initialCatName, onUpdate }) => {
    const [catName, setCatName] = useState(initialCatName);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        setErrorMessage('');
        setCatName(initialCatName);
    }, [show, initialCatName]);

    const handleUpdateCat = async () => {
        updateCat(id_category, catName)
            .then(data => {
                onUpdate();
                setSuccessMessage('Запись успешно изменена!');
                setTimeout(() => {
                    setSuccessMessage('');
                    onHide();
                }, 500);
            }).catch(error => {
                if (error.response && error.response.data && error.response.data.message) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage('Произошла ошибка при обновлении категории');
                }
                console.error('Ошибка при обновлении категории:', error);
            });
    };

    return (
        <Modal
            show={show}
            onHide={() => {
                onHide();
                setErrorMessage('');
                setSuccessMessage('');
            }}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Изменить категорию: {initialCatName}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                <Form>
                    <Form.Control
                        type="text"
                        placeholder="Введите новое название категории"
                        value={catName}
                        onChange={(e) => setCatName(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Отмена
                </Button>
                <Button variant="primary" onClick={handleUpdateCat}>
                    Сохранить изменения
                </Button>
                </Modal.Footer>
        </Modal>
    );
};

export default UpdateCat;



