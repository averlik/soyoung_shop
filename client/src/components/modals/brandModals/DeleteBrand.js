import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { deleteBrand } from '../../../http/productAPI';

const DeleteBrand = ({ show, onHide, id_brand, onDelete }) => {
  const [loading, setLoading] = useState(false); 
  const handleDeleteBrand = async () => {
    setLoading(true); 

    try {
      await deleteBrand(id_brand);
      onDelete();
      onHide(); 
    } catch (error) {
      console.error('Ошибка при удалении бренда:', error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить бренд</Modal.Title>
      </Modal.Header>
      <Modal.Body>Вы уверены, что хотите удалить этот бренд?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Отмена
        </Button>
        <Button variant="danger" onClick={handleDeleteBrand} disabled={loading}>
          {loading ? 'Удаление...' : 'Удалить'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteBrand;
