import React, { useState ,useEffect} from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { updateBrand } from "../../../http/productAPI";

const UpdateBrand = ({ show, onHide, id_brand, initialBrandName, onUpdate }) => {
  const [brandName, setBrandName] = useState(initialBrandName);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
    setBrandName(initialBrandName); 
  }, [show, initialBrandName]);


  const handleUpdateBrand = async () => {
    updateBrand(id_brand, brandName )
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
          setErrorMessage('Произошла ошибка при обновлении бренда');
        }
        console.error('Ошибка при обновлении бренда:', error); // Логирование ошибки, если запрос не удался
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
            Изменить бренд: {initialBrandName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} 
        <Form>
          {/* <Form.Group controlId="formBrandName"> */}
            {/* <Form.Label>Новое название бренда</Form.Label> */}
            <Form.Control
              type="text"
              placeholder="Введите новое название бренда"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
            />
          {/* </Form.Group> */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Отмена
        </Button>
        <Button variant="primary" onClick={handleUpdateBrand}>
          Сохранить изменения
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateBrand;

