import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteFeedback = ({ show, onHide, onDelete }) => {
    const [loading, setLoading] = useState(false);

    const handleDeleteFeedBack = async () => {
        setLoading(true);

        try {
            await onDelete();
        } catch (error) {
            console.error('Ошибка при удалении сообщения:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Удалить отзыв</Modal.Title>
            </Modal.Header>
            <Modal.Body>Вы уверены, что хотите удалить этот отзыв?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Отмена
                </Button>
                <Button variant="danger" onClick={handleDeleteFeedBack} disabled={loading}>
                    {loading ? 'Удаление...' : 'Удалить'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteFeedback;
