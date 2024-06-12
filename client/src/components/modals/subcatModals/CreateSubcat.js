import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Modal from 'react-bootstrap/Modal';
import { Context } from "../../../index.js";
import { Button, Dropdown, Form } from "react-bootstrap";
import { createSubcat, fetchCatAll } from '../../../http/productAPI.js';
import { fetchCat,fetchSections,fetchSubcatAll,fetchSubcat  } from '../../../http/productAPI.js';

const CreateSubcat = observer(({ show, onHide }) => {
  const { products } = useContext(Context);
  const [subcatName, setSubcatName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(()=>{
    fetchSections().then((data) => products.adminSetSections(data));
   // fetchSubcatAll().then((data) => products.adminSetSubcategories(data));
    fetchCat(products.adminSelectedSections.id_section).then(data => products.adminSetCategories(data)).catch(error => console.error('Ошибка загрузки категорий:', error));
    //fetchSubcat(products.adminSelectedCategories.id_category).then((data) => products.adminSetSubcategories(data)); 
},[products.adminSelectedSections, products.adminSelectedCategories, products]);

  const addSubcat = () => {
    const formData = new FormData();
    formData.append('id_category', products.adminSelectedCategories.id_category);
    formData.append('subcategory_name', subcatName);

    createSubcat(formData)
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
          setErrorMessage('Произошла ошибка при добавлении подкатегории');
        }
      });
  };
  //Обработчик нажатия на разделы
  const handleSectionSelect =(section)=>{
    products.adminSetSelectedSections(section);
  // setSelectedSectionTitle(section.section_name);
  //  setSelectedCatTitle("Выберите категорию");
  //  setSelectedSectionTitle(products.adminSelectedSections.section_name)
}
  const handleInputChange = (e) => {
    setSubcatName(e.target.value);
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
          Добавить новую подкатегорию
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className='mt-1'>
            <Dropdown.Toggle>
              {products.adminSelectedSections.section_name || "Выберите раздел товара"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {products.sections.map(section => (
                <Dropdown.Item
                  onClick={() => {handleSectionSelect(section);}}
                  key={section.id_section}
                >
                  {section.section_name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className='mt-3'>
            <Dropdown.Toggle>
              {products.adminSelectedCategories.category_name || "Выберите категорию товара"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {products.adminCategories.map(category => (
                <Dropdown.Item
                  onClick={() =>  products.adminSetSelectedCategories(category)}
                  key={category.id_category}
                >
                  {category.category_name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
          {successMessage && <p className="text-success mt-3">{successMessage}</p>}

          <Form.Control
            value={subcatName}
            onChange={handleInputChange}
            className='mt-3'
            placeholder='Введите название новой подкатегории'
          />
          
        </Form>
      </Modal.Body>
     
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Отмена
        </Button>
        <Button variant="outline-success" onClick={addSubcat}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateSubcat;

