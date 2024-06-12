import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { deleteSubcat } from '../../../http/productAPI';

const DeleteCat= ({ show, onHide, id_subcategory, onDelete }) => {
  const [loading, setLoading] = useState(false); 
  const handleDeleteSubcat= async () => {
    setLoading(true); 

    try {
      await deleteSubcat(id_subcategory);
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
        <Modal.Title>Удалить подкатегорию</Modal.Title>
      </Modal.Header>
      <Modal.Body>Вы уверены, что хотите удалить эту подкатегорию?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Отмена
        </Button>
        <Button variant="danger" onClick={handleDeleteSubcat} disabled={loading}>
          {loading ? 'Удаление...' : 'Удалить'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteCat;
