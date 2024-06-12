
import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button, Form, Image } from 'react-bootstrap';
import { Context } from '../../../index';
import { updateProduct, updateProductInfo, fetchBrands, fetchCatAll, fetchSubcatAll, fetchSections } from '../../../http/productAPI';
import EditInfoProduct from './EditInfoProduct';

const EditProduct = ({ show, onHide, id_product }) => {
    const { products } = useContext(Context);
    
    // Добавлено состояние для управления видимостью модального окна редактирования дополнительной информации
    const [editModalVisible, setEditModalVisible] = useState(false)
    const [newImage, setNewImage] = useState(null);

    // Стейт для хранения данных о продукте
    const [product, setProduct] = useState({
        id_product: '',
        ru_product_name: '',
        eng_product_name: '',
        price: '',
        image: '',
        id_brand: '',
        id_section:'',
        id_subcategory:'',
        id_category:'',
        new_status:false,
        sale: '',
        quantity:'',
        published:false
    });

    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [sections, setSections] = useState([]);

        useEffect(() => {
        if (id_product) {
            const selectedProduct = products.adminProducts.find(prod => prod.id_product === id_product);
            if (selectedProduct) {
                const updatedProduct = {
                    ...selectedProduct,
                    ru_product_name: selectedProduct.ru_product_name || 'не заполнено',
                    eng_product_name: selectedProduct.eng_product_name || 'не заполнено',
                    price: selectedProduct.price || 'не заполнено',
                    image: selectedProduct.image || 'не заполнено',
                    id_brand: selectedProduct.id_brand || 'не заполнено',
                    id_section: selectedProduct.id_section || 'не заполнено',
                    id_subcategory: selectedProduct.id_subcategory || 'не заполнено',
                    id_category: selectedProduct.id_category || 'не заполнено',
                    sale: selectedProduct.sale || 'не заполнено',
                    quantity: selectedProduct.quantity || 'не заполнено',
                    published: selectedProduct.published || false,
                    new_status: selectedProduct.new_status || false
                };
                setProduct(updatedProduct);
            }
        }
    }, [id_product, products.adminProducts]);

    useEffect(() => {
                fetchBrands().then(data => products.adminSetBrand(data));
                fetchCatAll().then(data => products.adminSetCategories(data));
                fetchSubcatAll().then(data => products.adminSetSubcategories(data));
                fetchSections().then(data => products.adminSetSections(data));
            }, [products]);

    // Функция обновления данных о продукте
    const handleChange = (e) => {
        // setProduct({
        //     ...product,
        //     [e.target.name]: e.target.value
        // });
        const { name, value, type, checked } = e.target;
        setProduct({
            ...product,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // Функция обработки отправки данных о продукте и дополнительной информации о продукте
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Отправка данных о продукте
            await updateProduct(id_product, product);

            // Закрытие модального окна
            onHide();
        } catch (error) {
            console.error('Ошибка при редактировании товара:', error);
        }
    };

    const handleFileChange = e => {
            setNewImage(e.target.files[0]);
    };

    // Отображение модального окна для редактирования дополнительной информации
    const handleEditInfoClick = () => {
        setEditModalVisible(true);
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Редактировать товар</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                        <Form.Group>
                         <Form.Label>Название (Рус)</Form.Label>
                         <Form.Control
                            type="text"
                            name="ru_product_name"
                            value={product.ru_product_name}
                            placeholder={product.ru_product_name === 'не заполнено' ? 'не заполнено' : ''}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Название (Англ)</Form.Label>
                        <Form.Control
                            type="text"
                            name="eng_product_name"
                            value={product.eng_product_name}
                            placeholder={product.eng_product_name === 'не заполнено' ? 'не заполнено' : ''}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Цена</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={product.price}
                            placeholder={product.price === 'не заполнено' ? 'не заполнено' : ''}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Скидка на товар</Form.Label>
                        <Form.Control
                            type="number"
                            name="sale"
                            value={product.sale}
                            placeholder={product.sale === 'не заполнено' ? 'не заполнено' : ''}
                            onChange={handleChange}
                            className='mb-3'
                        />
                        <Form.Group controlId="publishedCheckbox">
                        <Form.Check
                            type="checkbox"
                            label="Опубликовать товар в каталоге"
                            name="published"
                            checked={product.published}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {/* Поле для управления меткой "Новинка" */}
                    <Form.Group controlId="newStatusCheckbox">
                        <Form.Check
                            type="checkbox"
                            label="Отметить как новинку"
                            name="new_status"
                            checked={product.new_status}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    </Form.Group>
                    <Form.Group className='mb-2'>
                        <Form.Label>Текущее изображение: </Form.Label>
                        <Image className='mb-2' variant="top" style={{ width: 70, height: 90, margin: 10 }} src={product.image === 'не заполнено' ? '' : process.env.REACT_APP_API_URL + product.image} />
                        <Form.Control
                            type="text"
                            name="image"
                            value={product.image}
                            placeholder={product.image === 'не заполнено' ? 'не заполнено' : ''}
                            readOnly
                        />
                    </Form.Group>
                    <Form.Control
                        onChange={handleFileChange}
                        className='mt-3 mb-3'
                        type="file"
                    />
                    <Form.Group>
                        <Form.Label>Количество товара</Form.Label>
                        <Form.Control
                            type="number"
                            name="quantity"
                            value={product.quantity}
                            placeholder={product.quantity === 'не заполнено' ? 'не заполнено' : ''}
                            onChange={handleChange}
                            className='mb-3'
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Бренд</Form.Label>
                        <Form.Control
                            as="select"
                            name="id_brand"
                            value={product.id_brand}
                            onChange={handleChange}
                            className='mb-3'
                        >
                            <option value="не заполнено">не заполнено</option>
                            {products.adminBrands.map(brand => (
                                <option key={brand.id_brand} value={brand.id_brand}>
                                    {brand.brand_name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Раздел</Form.Label>
                        <Form.Control
                            as="select"
                            name="id_section"
                            value={product.id_section}
                            onChange={handleChange}
                            className='mb-4'
                        >
                            <option value="не заполнено">не заполнено</option>
                            {products.adminSections.map(section => (
                                <option key={section.id_section} value={section.id_section}>
                                    {section.section_name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Категория</Form.Label>
                        <Form.Control
                            as="select"
                            name="id_category"
                            value={product.id_category}
                            onChange={handleChange}
                            className='mb-3'
                        >
                            <option value="не заполнено">не заполнено</option>
                            {products.adminCategories.map(category => (
                                <option key={category.id_category} value={category.id_category}>
                                    {category.category_name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Подкатегория</Form.Label>
                        <Form.Control
                            as="select"
                            name="id_subcategory"
                            value={product.id_subcategory}
                            onChange={handleChange}
                            className='mb-3'
                        >
                            <option value="не заполнено">не заполнено</option>
                            {products.adminSubcategories.map(subcategory => (
                                <option key={subcategory.id_subcategory} value={subcategory.id_subcategory}>
                                    {subcategory.subcategory_name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    
                    
                    
                    <hr/>
                    <Button variant="primary" type="submit" className='mb-3 mt-2'>
                        Сохранить
                    </Button>
                    {/* Кнопка для открытия модального окна редактирования дополнительной информации */}
                    <Button style={{marginLeft:12}} className='mb-3 mt-2' variant="outline-primary" onClick={handleEditInfoClick}>Изменить дополнительную информацию</Button>
                    {/* Модальное окно для редактирования дополнительной информации */}
                    <EditInfoProduct 
                        show={editModalVisible} 
                        onHide={() => setEditModalVisible(false)} 
                        id_product={id_product} 
                        onUpdate={() => {}} // Замените на функцию обновления, если необходимо
                        currentInfo={null} // Передайте текущую информацию о товаре
                    />
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditProduct;


