import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { updateSubcat } from "../../../http/productAPI";

const UpdateSubcat = ({ show, onHide, id_subcategory, initialSubcatName, onUpdate }) => {
    const [subcatName, setSubcatName] = useState(initialSubcatName);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        setErrorMessage('');
        setSubcatName(initialSubcatName);
    }, [show, initialSubcatName]);

    const handleUpdateSubcat = async () => {
        updateSubcat(id_subcategory, subcatName)
            .then(data => {
                onUpdate();
                setSuccessMessage('Запись успешно изменена!');
                setTimeout(() => {
                    setSuccessMessage('');
                    onHide();
                }, 500); // Закрыть модальное окно через 2 секунды после успешного обновления
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.message) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage('Произошла ошибка при обновлении подкатегории');
                }
                console.error('Ошибка при обновлении подкатегории:', error);
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
                    Изменить подкатегорию: {initialSubcatName}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                <Form>
                    <Form.Control
                        type="text"
                        placeholder="Введите новое название подкатегории"
                        value={subcatName}
                        onChange={(e) => setSubcatName(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Отмена
                </Button>
                <Button variant="primary" onClick={handleUpdateSubcat}>
                    Сохранить изменения
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateSubcat;
