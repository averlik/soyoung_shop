import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { deleteSection } from '../../../http/productAPI';

const DeleteSection = ({ show, onHide, id_section, onDelete }) => {
  const [loading, setLoading] = useState(false); 
  const handleDeleteSection = async () => {
    setLoading(true); 

    try {
      await deleteSection(id_section);
      onDelete();
      onHide(); 
    } catch (error) {
      console.error('Ошибка при удалении раздела:', error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить раздел</Modal.Title>
      </Modal.Header>
      <Modal.Body>Вы уверены, что хотите удалить этот раздел?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Отмена
        </Button>
        <Button variant="danger" onClick={handleDeleteSection} disabled={loading}>
          {loading ? 'Удаление...' : 'Удалить'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteSection;
