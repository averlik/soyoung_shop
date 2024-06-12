import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { deleteCat } from '../../../http/productAPI';

const DeleteCat= ({ show, onHide, id_category, onDelete }) => {
  const [loading, setLoading] = useState(false); 
  const handleDeleteСat= async () => {
    setLoading(true); 

    try {
      await deleteCat(id_category);
      onDelete();
      onHide(); 
    } catch (error) {
      console.error('Ошибка при удалении категории:', error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить категорию</Modal.Title>
      </Modal.Header>
      <Modal.Body>Вы уверены, что хотите удалить эту категорию?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Отмена
        </Button>
        <Button variant="danger" onClick={handleDeleteСat} disabled={loading}>
          {loading ? 'Удаление...' : 'Удалить'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteCat;
