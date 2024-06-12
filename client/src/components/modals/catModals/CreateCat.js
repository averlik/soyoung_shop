import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Modal from 'react-bootstrap/Modal';
import { Context } from "../../../index.js";
import { Button, Dropdown, Form } from "react-bootstrap";
import { createCat } from '../../../http/productAPI.js';
import { fetchSections } from '../../../http/productAPI.js';

const CreateCat = observer(({ show, onHide }) => {
  const { products } = useContext(Context);
  const [categoryName, setCategoryName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => { 
    fetchSections()
      .then(data => products.adminSetSections(data))
      .catch(error => console.error('Ошибка загрузки разделов:', error));    
  }, [products]);

  useEffect(() => {
    // При изменении выбранного раздела сбрасываем значение категории
    setCategoryName('');
    setErrorMessage('');
    setSuccessMessage('');
  }, [products.adminSelectedSections]);

  const addCategory = () => {
    const formData = new FormData();
    formData.append('id_section', products.adminSelectedSections.id_section);
    formData.append('category_name', categoryName);

    createCat(formData)
      .then(data => {
        setSuccessMessage('Запись прошла успешно!');
        setTimeout(() => {
          onHide();
          setSuccessMessage('');
        }, 1000);
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Произошла ошибка при добавлении категории');
        }
      });
  };

  const handleInputChange = (e) => {
    setCategoryName(e.target.value);
    setErrorMessage('');
    setSuccessMessage('');
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить новую категорию
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className='mt-1'>
            <Dropdown.Toggle>
              {products.adminSelectedSections.section_name || "Выберите раздел товара"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {products.adminSections.map(section => (
                <Dropdown.Item
                  onClick={() => products.adminSetSelectedSections(section)}
                  key={section.id_section}
                >
                  {section.section_name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
          {successMessage && <p className="text-success mt-3">{successMessage}</p>}

          <Form.Control
            value={categoryName}
            onChange={handleInputChange}
            className='mt-3'
            placeholder='Введите название новой категории'
          />
          
        </Form>
      </Modal.Body>
    
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Отмена
        </Button>
        <Button variant="outline-success" onClick={addCategory}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateCat;
