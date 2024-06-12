import React, { useState, useEffect, useRef, useContext } from 'react';
import { Card, Button, Form, Row, Col, Dropdown } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import CreateCat from '../modals/catModals/CreateCat';
import UpdateCat from '../modals/catModals/UpdateCat';
import DeleteCat from '../modals/catModals/DeleteCat';
import { Context } from '../../index';
import { fetchCat, fetchCatAll } from '../../http/productAPI';

const CatModule = observer(() => {
    const { products } = useContext(Context);

    const [catVisible, setCatVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCat, setFilteredCat] = useState([]);
    const [searchResultVisible, setSearchResultVisible] = useState(false);
    const [updateCatVisible, setUpdateCatVisible] = useState(false);
    const [deleteCatVisible, setDeleteCatVisible] = useState(false);
    const [selectedSection, setSelectedSection] = useState(null);
    const [selectedSectionTitle, setSelectedSectionTitle] = useState("Выберите раздел товара");

    const searchInputRef = useRef(null);

    useEffect(() => {
        if (selectedSection) {
            fetchCat(selectedSection.id_section).then((data) => {
                setFilteredCat(data);
                products.adminSetCategories(data);
            });
        } else {
            fetchCatAll().then((data) => {
                setFilteredCat(data);
                products.adminSetCategories(data);
            });
        }
    }, [selectedSection, products]);

    const updateCatList = async () => {
        try {
            if (selectedSection) {
                const updatedCat = await fetchCat(selectedSection.id_section);
                setFilteredCat(updatedCat);
            } else {
                const updatedCat = await fetchCatAll();
                setFilteredCat(updatedCat);
            }
            setSearchResultVisible(false);
        } catch (error) {
            console.error('Ошибка при обновлении списка категорий:', error);
        }
    };

    const handleAllCatClick = () => {
        fetchCatAll().then((data) => {
            setFilteredCat(data);
            products.adminSetCategories(data);
        });
        setSelectedSection(null);
        setSelectedSectionTitle("Все категории");
    };

    useEffect(() => {
        if (searchTerm) {
            const filtered = products.adminCategories.filter(category =>
                category.category_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredCat(filtered);
            setSearchResultVisible(true);
        } else {
            setFilteredCat(products.adminCategories);
            setSearchResultVisible(false);
        }
    }, [searchTerm, products.adminCategories]);

    const handleSearchChange = event => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        setSearchTerm(searchInputRef.current.value);
    };

    const handleResetSearchCat = () => {
        setSearchTerm('');
        setSearchResultVisible(false);
        searchInputRef.current.value = '';
        handleAllCatClick();
    };

    const handleKeyPress = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSearch();
        }
    };

    const handleEditCat = id_category => {
        products.adminSetSelectedCategories(id_category);
        setUpdateCatVisible(true);
    };

    const handleDeleteCat = id_category => {
        products.adminSetSelectedCategories(id_category);
        setDeleteCatVisible(true);
    };

    return (
        <Form>
            <div>
                <Button variant="outline-dark" className="mt-1" onClick={() => setCatVisible(true)}>
                    Добавить категорию
                </Button>
            </div>
            <Form>
                <div className="d-flex mt-3 mb-4">
                    <Form.Control
                        type="text"
                        placeholder="Поиск категории"
                        className="mr-2"
                        style={{ maxWidth: 800, height: 60 }}
                        ref={searchInputRef}
                        onKeyPress={handleKeyPress}
                        onChange={handleSearchChange}
                    />
                    <Button variant="dark" className="mr-2" onClick={handleSearch} style={{ marginLeft: '10px' }}>
                        Поиск
                    </Button>
                    <Button variant="dark" onClick={handleResetSearchCat} style={{ marginLeft: '10px' }}>
                        Сбросить
                    </Button>
                </div>
                <Dropdown id="dropdown-basic-button" className='mb-4'>
                    <Dropdown.Toggle>
                        {selectedSectionTitle}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleAllCatClick}>Все категории</Dropdown.Item>
                        {products.adminSections.map(section => (
                            <Dropdown.Item
                                onClick={() => { setSelectedSection(section); setSelectedSectionTitle(section.section_name) }}
                                key={section.id_section}
                            >
                                {section.section_name}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </Form>
            {searchResultVisible || !searchTerm ? (
                <>
                    {filteredCat.map(categories => (
                        <Card className="mt-2 p-3" key={categories.id_category}>
                            <Row>
                                <Col>{categories.category_name}</Col>
                                <Col md="auto">
                                    <Button variant="outline-primary" onClick={() => handleEditCat(categories.id_category)}>
                                        Изменить
                                    </Button>
                                </Col>
                                <Col md="auto">
                                    <Button variant="outline-danger" onClick={() => handleDeleteCat(categories.id_category)}>
                                        Удалить
                                    </Button>
                                </Col>
                            </Row>
                        </Card>
                    ))}
                </>
            ) : null}
            <CreateCat
                show={catVisible}
                onHide={() => {
                    setCatVisible(false);
                    updateCatList();
                }}
            />
            <UpdateCat
                show={updateCatVisible}
                onHide={() => {
                    setUpdateCatVisible(false);
                    updateCatList();
                }}
                id_category={products.adminSelectedCategories}
                initialCatName={filteredCat.find(category => category.id_category === products.adminSelectedCategories)?.category_name}
                onUpdate={updateCatList}
            />
            <DeleteCat
                show={deleteCatVisible}
                onHide={() => {
                    setDeleteCatVisible(false);
                    updateCatList();
                }}
                id_category={products.adminSelectedCategories}
                onDelete={updateCatList}
            />
        </Form>
    );
});

export default CatModule;
