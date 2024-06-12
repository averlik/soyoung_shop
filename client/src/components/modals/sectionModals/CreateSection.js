import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { createSection } from "../../../http/productAPI";


const CreateSection = ({ show, onHide }) => {
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Сброс сообщения об ошибке при новом открытии окна
  useEffect(() => {
    setErrorMessage('');
  }, [show]);

  // Обработчик изменения значения поля ввода
  const handleChange = (e) => {
    setValue(e.target.value);
    setErrorMessage('');
  };

  const addSection = () => {
    console.log('Отправка запроса с данными:', { section_name: value }); // Логирование данных перед отправкой запроса
    createSection({ section_name: value })
      .then(data => {
        setValue('');
        setSuccessMessage('Запись успешно сохранена!');
        setTimeout(() => {
          setSuccessMessage('');
          onHide();
        }, 500); 
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Произошла ошибка при добавлении раздела');
        }
        console.error('Ошибка при отправке запроса:', error); // Логирование ошибки, если запрос не удался
      });
  };
  
  return (
    <Modal
      show={show}
      onHide={() => {
        onHide();
        setErrorMessage(''); // Сброс сообщения об ошибке при закрытии модального окна
        setSuccessMessage(''); // Сброс сообщения об успехе при закрытии модального окна
      }}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить новый раздел
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Вывод сообщения об ошибке */}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} {/* Вывод сообщения об успехе */}
        <Form>
          <Form.Control
            value={value}
            onChange={handleChange} 
            placeholder={"Введите название нового"}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-danger"} onClick={onHide}>Отмена</Button>
        <Button variant={"outline-success"} onClick={addSection}>Сохранить</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateSection;
