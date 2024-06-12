import React, { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { fetchFeedbacks, deleteFeedback } from '../../http/FeedbackAPI';
import DeleteFeedback from '../modals/deleteFeedback';

const FeedbackModule = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);

    const loadFeedbacks = async () => {
        try {
            const data = await fetchFeedbacks();
            // Сортировка отзывов по новизне (предполагается, что у отзывов есть поле created_at)
            const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setFeedbacks(sortedData);
        } catch (error) {
            console.error('Ошибка при получении отзывов:', error);
        }
    };

    useEffect(() => {
        loadFeedbacks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteFeedback(id);
            await loadFeedbacks();  // Перезагрузка списка отзывов после удаления
        } catch (error) {
            console.error('Ошибка при удалении отзыва:', error);
        }
    };

    const handleShowModal = (id) => {
        setSelectedFeedbackId(id);
        setShowModal(true);
    };

    const handleHideModal = () => {
        setShowModal(false);
        setSelectedFeedbackId(null);
    };

    const handleConfirmDelete = async () => {
        if (selectedFeedbackId) {
            await handleDelete(selectedFeedbackId);
            handleHideModal();
        }
    };

    return (
        <Form>
            <h2>Отзывы</h2>
            {feedbacks.length === 0 ? (
                <p>Пока нет сообщений</p>
            ) : (
                feedbacks.map(feedback => (
                    <Card key={feedback.id} className="mb-3">
                        <Card.Body className="d-flex justify-content-between align-items-center">
                            <div>
                                <Card.Title>{feedback.email}</Card.Title>
                                <Card.Text>{feedback.text}</Card.Text>
                                <Card.Text className="text-muted">{new Date(feedback.createdAt).toLocaleString()}</Card.Text>
                            </div>
                            <Button variant="danger" onClick={() => handleShowModal(feedback.id)}>Удалить</Button>
                        </Card.Body>
                    </Card>
                ))
            )}
            <DeleteFeedback
                show={showModal}
                onHide={handleHideModal}
                onDelete={handleConfirmDelete}
            />
        </Form>
    );
};

export default FeedbackModule;
