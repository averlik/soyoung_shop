import React, { useContext, useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Form, Row } from "react-bootstrap";
import { Context } from "../../../index.js";
import { observer } from 'mobx-react-lite';
import { fetchSubcat, fetchBrands, createProduct, fetchCat, fetchSections } from '../../../http/productAPI.js';

const CreateProduct = observer(({ show, onHide }) => {

    const { products } = useContext(Context);

    const [ruName, setRuName] = useState('');
    const [engName, setEngName] = useState('');
    const [price, setPrice] = useState('');
    const [sale, setSale] = useState('');
    const [quantity, setQuantity] = useState('');
    const [file, setFile] = useState(null);
    const [info, setInfo] = useState([
        {
            description: '',
            skin_type: '',
            volume: '',
            components: '',
            applying: '',
            ingredients: ''
        }
    ]);

    const selectFile = e => {
        setFile(e.target.files[0]);
    };

    useEffect(() => {
        fetchSections()
        .then(data => products.adminSetSections(data))
        .catch(error => console.error('Ошибка загрузки разделов:', error));
        
        fetchCat(products.adminSelectedSections.id_section)
        .then(data => products.adminSetCategories(data))
        .catch(error => console.error('Ошибка загрузки категорий:', error));
        
        fetchSubcat(products.adminSelectedCategories.id_category)
        .then(data => products.adminSetSubcategories(data))
        .catch(error => console.error('Ошибка загрузки подкатегорий:', error));
        
        fetchBrands()
        .then(data => products.adminSetBrand(data))
        .catch(error => console.error('Ошибка загрузки брендов:', error));
    }, [products.adminSelectedSections, products.adminSelectedCategories, products]);

    const changeInfo = (key, value, index) => {
        setInfo(info.map((item, idx) => idx === index ? { ...item, [key]: value } : item));
    };

    const addProduct = () => {
        console.log("Adding product...");//потом удалить
        const formData = new FormData();
        formData.append('ru_product_name', ruName);
        formData.append('eng_product_name', engName);
        formData.append('price', `${price}`);
        formData.append('sale', `${sale}`);
        formData.append('quantity', `${quantity}`);
        formData.append('image', file);
        formData.append('id_brand', products.adminSelectedBrand.id_brand);
        formData.append('id_section', products.adminSelectedSections.id_section);
        formData.append('id_category', products.adminSelectedCategories.id_category);
        formData.append('id_subcategory', products.adminSelectedSubcategories.id_subcategory);
        formData.append('info', JSON.stringify(info));

        createProduct(formData).then(data => onHide())
            .catch((error) => console.error('Error creating product:', error));
    };

    const handleSectionSelect =(section)=>{
        products.adminSetSelectedSections(section);
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить новый товар
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

                    <Dropdown className='mt-3'>
                        <Dropdown.Toggle>
                            {products.adminSelectedBrand.brand_name || "Выберите название бренда товара"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {products.adminBrands.map(brand => (
                                <Dropdown.Item
                                    onClick={() => products.adminSetSelectedBrand(brand)}
                                    key={brand.id_brand}
                                >
                                    {brand.brand_name}
                                </Dropdown.Item>
                            ))}

                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown className='mt-3'>
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

                    <Dropdown className='mt-3'>
                        <Dropdown.Toggle>
                            {products.adminSelectedSubcategories.subcategory_name || "Выберите подкатегорию товара"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {products.adminSubcategories.map(subcategory => (
                                <Dropdown.Item
                                    onClick={() => products.adminSetSelectedSubcategories(subcategory)}
                                    key={subcategory.id_subcategory}
                                >
                                    {subcategory.subcategory_name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Form.Control
                        value={ruName}
                        onChange={e => setRuName(e.target.value)}
                        className='mt-3'
                        placeholder='Введите название товара на русском'
                    />
                    <Form.Control
                        value={engName}
                        onChange={e => setEngName(e.target.value)}
                        className='mt-3'
                        placeholder='Введите название товара на английском'
                    />
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className='mt-3'
                        placeholder='Введите стоимость товара'
                        type='number'
                    />
                    <Form.Control
                        onChange={selectFile}
                        className='mt-3 mb-3'
                        type="file"
                    />
                    <Form.Control
                        value={quantity}
                        onChange={e => setQuantity(Number(e.target.value))}
                        className='mt-3'
                        placeholder='Введите количество товара'
                        type='number'
                    />
                    <Form.Control
                        value={sale}
                        onChange={e => setSale(Number(e.target.value))}
                        className='mt-3'
                        placeholder='Введите скидку на товар(%)'
                        type='number'
                    />
                    <hr />


                    {info.map((item, index) => (
                        <Row className='p-3 pt-2' key={index}>
                            <h4>Добавьте информацию о товаре</h4>
                            <Form.Control
                                className='mt-3 '
                                placeholder="Введите описание"
                                as="textarea"
                                style={{ height: 'auto' }}
                                name="description"
                                value={item.description}
                                onChange={(e) => changeInfo('description', e.target.value, index)}
                            />
                            <Form.Control
                                className='mt-3'
                                placeholder="Введите тип кожи"
                                name="skin_type"
                                value={item.skin_type}
                                onChange={(e) => changeInfo('skin_type', e.target.value, index)}
                            />
                            <Form.Control
                                className='mt-3'
                                placeholder="Введите объем товара"
                                type='number'
                                name="volume"
                                value={item.volume}
                                onChange={(e) => changeInfo('volume', e.target.value, index)}
                            />
                            <Form.Control
                                className='mt-3'
                                placeholder="Введите компоненты"
                                as="textarea"
                                style={{ height: 'auto' }}
                                name="components"
                                value={item.components}
                                onChange={(e) => changeInfo('components', e.target.value, index)}
                            />
                            <Form.Control
                                className='mt-3'
                                placeholder="Введите способ нанесения"
                                as="textarea"
                                style={{ height: 'auto' }}
                                name="applying"
                                value={item.applying}
                                onChange={(e) => changeInfo('applying', e.target.value, index)}
                            />
                            <Form.Control
                                className='mt-3'
                                placeholder="Введите ингридиенты"
                                as="textarea"
                                style={{ height: 'auto' }}
                                name="ingredients"
                                value={item.ingredients}
                                onChange={(e) => changeInfo('ingredients', e.target.value, index)}
                            />
                        </Row>
                    ))}

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Отмена</Button>
                <Button variant={"outline-success"} onClick={addProduct}>Сохранить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateProduct;
