import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { deleteProduct } from '../../../http/productAPI';

const DeleteProduct= ({ show, onHide, id_product, productName,onDelete }) => {
  const [loading, setLoading] = useState(false); 
  
  const handleDeleteProduct= async () => {
    setLoading(true); 
    try {
      await deleteProduct(id_product);
      onDelete();
      onHide(); 
    } catch (error) {
      console.error('Ошибка при удалении товара:', error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить товар</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Вы уверены, что хотите удалить товар <strong>{productName}</strong>?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Отмена
        </Button>
        <Button variant="danger" onClick={handleDeleteProduct} disabled={loading}>
          {loading ? 'Удаление...' : 'Удалить'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteProduct;
