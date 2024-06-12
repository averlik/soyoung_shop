import React, { useState ,useEffect} from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { updateSection } from "../../../http/productAPI";

const UpdateSection = ({ show, onHide, id_section, initialSectionName, onUpdate }) => {
  const [sectionName, setSectionName] = useState(initialSectionName);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
    setSectionName(initialSectionName); 
  }, [show, initialSectionName]);


  const handleUpdateSection = async () => {
    updateSection(id_section, sectionName )
    .then(data => { 
        onUpdate();
        setSuccessMessage('Запись успешно изменена!');
        setTimeout(() => {
            setSuccessMessage('');
            onHide();
        }, 400); 
    }).catch(error => {
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Произошла ошибка при обновлении раздела');
        }
        console.error('Ошибка при обновлении раздела:', error); // Логирование ошибки, если запрос не удался
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
            Изменить раздел: {initialSectionName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} 
        <Form>
            <Form.Control
              type="text"
              placeholder="Введите новое название раздела"
              value={sectionName}
              onChange={(e) => setSectionName(e.target.value)}
            />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Отмена
        </Button>
        <Button variant="primary" onClick={handleUpdateSection}>
          Сохранить изменения
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateSection;

