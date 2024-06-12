import React, { useState, useEffect, useContext, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import CreateProduct from '../modals/productModals/CreateProduct';
import EditProduct from '../modals/productModals/EditProduct';
import DeleteProduct from '../modals/productModals/DeleteProduct';
import { Context } from '../../index';
import { fetchProduct, fetchSections, fetchCat, fetchSubcat, fetchSubcatAll, fetchProductAdmin } from '../../http/productAPI';
import ProductListAdmin from '../../components/ProductListAdmin';
import Pages from "../Pages";
import SelectFilter from '../modals/productModals/SelectFilter';

const ProductModule = observer(() => {
    const { products } = useContext(Context);

    const [productVisible, setProductVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [delModalVisible, setDelModalVisible] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [selectedProductName, setSelectedProductName] = useState('');
    const [filterVisible, setFilterVisible] = useState(false);
    
    const [sections, setSections] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSection, setSelectedSection] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);


    const [searchTerm, setSearchTerm] = useState('');
    const [searchResultVisible, setSearchResultVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sectionData = await fetchSections(); // Метод для получения данных о разделах
                setSections(sectionData);
            } catch (error) {
                console.error('Ошибка загрузки разделов:', error);
            }
        };
    
        fetchData();
    }, []);
    
    useEffect(() => {
        if (products.adminSelectedSections || products.adminSelectedCategories || products.adminSelectedSubcategories) {
            loadProducts();
        }
    }, [products.adminSelectedSections, products.adminSelectedCategories, products.adminSelectedSubcategories]);

    
    useEffect(() => {
        if (searchTerm) {
            // Фильтрация товаров по русскому и английскому названию
            const filtered = products.adminProducts.filter(product =>
                product.ru_product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.eng_product_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            products.adminSetProducts(filtered); // Обновление списка отфильтрованных товаров
            setSearchResultVisible(true); // Показываем результаты поиска
        } else {
            // Если поисковой запрос пуст, отображаем все товары
            loadProducts();
            setSearchResultVisible(false); // Скрываем результаты поиска
        }
    }, [searchTerm, products]);

    const searchInputRef = useRef(null);

    const handleSearchChange = event => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        setSearchTerm(searchInputRef.current.value);
    };

    const handleKeyPress = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSearch();
        }
    };

    const handleResetSearchProducts = () => {
        setSearchTerm('');
        loadProducts();
    };

    const handleUpdate = () => { };
    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        // if (!products.adminSelectedCategories || !products.adminSelectedSubcategories) return;
        try {
            const data = await fetchProductAdmin( 
                products.adminSelectedSections.id_section || null,
                products.adminSelectedCategories.id_category || null,
                products.adminSelectedSubcategories.id_subcategory || null,
                products.adminSelectedBrand.id_brand || null,
                1, 9
            ).then(data => {
                products.adminSetProducts(data.rows);
                products.setTotalCount(data.count);
            });
            products.adminSetProducts(data.rows);
            products.setTotalCount(data.count);
        } catch (error) {
            console.error('Ошибка загрузки товаров:', error);
        }
    };

    const updateProductList = async () => {
        try {
            await loadProducts();
        } catch (error) {
            console.error('Ошибка при обновлении списка товаров:', error);
        }
    };

    // редактирование
    const handleEdit = id_product => {
        setSelectedProductId(id_product);
        setEditModalVisible(true);
    };

    // удаление
    const handleDeleteProduct = (id_product, productName) => {
        setSelectedProductId(id_product);
        setDelModalVisible(true);
        setSelectedProductName(productName);
    };

    return (
        <Form>
            <div>
                <Button variant="outline-dark" className="mt-1 mb-3" onClick={() => setProductVisible(true)}>
                    Добавить товар
                </Button>
            </div>
            <Form>
                <div className="d-flex mb-4">
                    <Form.Control
                        type="text"
                        placeholder="Поиск товара"
                        className="mr-2"
                        style={{ maxWidth: 800, height: 60 }}
                        onKeyPress={handleKeyPress}
                        ref={searchInputRef}
                        onChange={handleSearchChange}
                    />
                    <Button variant="dark" className="mr-2" onClick={handleSearch} style={{ marginLeft: '10px' }}>
                        Поиск
                    </Button>
                    <Button variant="dark" onClick={handleResetSearchProducts} style={{ marginLeft: '10px' }}>
                        Сбросить
                    </Button>
                </div>
            </Form>

            <SelectFilter/>
            
            <ProductListAdmin
                products={products.adminProducts}
                onEdit={handleEdit}
                onDelete={handleDeleteProduct}
            />
            <Pages />

            <CreateProduct
                show={productVisible}
                onHide={() => {
                    setProductVisible(false);
                    updateProductList();
                }}
            />
            <EditProduct
                show={editModalVisible}
                onHide={() => {
                    setEditModalVisible(false);
                    updateProductList();
                }}
                id_product={selectedProductId}
            />
            <DeleteProduct
                show={delModalVisible}
                onHide={() => {
                    setDelModalVisible(false);
                    updateProductList();
                }}
                id_product={selectedProductId}
                productName={selectedProductName}
                onDelete={handleDeleteProduct}
            />
        </Form>
    );
});

export default ProductModule;
