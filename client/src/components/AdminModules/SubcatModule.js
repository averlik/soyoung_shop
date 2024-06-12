import React, { useState, useEffect, useRef, useContext } from 'react';
import { Card, Button, Form, Row, Col, Dropdown } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import CreateSubcat from '../modals/subcatModals/CreateSubcat';
import UpdateSubcat from '../modals/subcatModals/UpdateSubcat';
import DeleteSubcat from '../modals/subcatModals/DeleteSubcat';
import { Context } from "../../index";
import { fetchSubcat, fetchSubcatAll, fetchCat, fetchSections } from "../../http/productAPI";

const SubcatModule = observer(() => {
    const { products } = useContext(Context);

    const [subcatVisible, setSubcatVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSubcat, setFilteredSubcat] = useState([]);
    const [searchResultVisible, setSearchResultVisible] = useState(false);
    const [updateSubcatVisible, setUpdateSubcatVisible] = useState(false);
    const [deleteSubcatVisible, setDeleteSubcatVisible] = useState(false);
    const [selectedSectionTitle, setSelectedSectionTitle] = useState("Выберите раздел");
    const [selectedCatTitle, setSelectedCatTitle] = useState("Выберите категорию");

    const searchInputRef = useRef(null);

    useEffect(() => {
        fetchSections().then(data => products.adminSetSections(data));
        if (products.adminSelectedSections.id_section) {
            fetchCat(products.adminSelectedSections.id_section)
                .then(data => products.adminSetCategories(data))
                .catch(error => console.error('Ошибка загрузки категорий:', error));
        }
        if (products.adminSelectedCategories.id_category) {
            fetchSubcat(products.adminSelectedCategories.id_category)
                .then(data => products.adminSetSubcategories(data));
        } else {
            fetchSubcatAll().then(data => products.adminSetSubcategories(data));
        }
    }, [products.adminSelectedSections, products.adminSelectedCategories, products]);

    const updateSubcatList = async () => {
        try {
            if (products.adminSelectedCategories.id_category) {
                const updatedSubcat = await fetchSubcat(products.adminSelectedCategories.id_category);
                setFilteredSubcat(updatedSubcat);
            } else {
                const updatedSubcat = await fetchSubcatAll();
                setFilteredSubcat(updatedSubcat);
            }
            setSearchResultVisible(false);
        } catch (error) {
            console.error('Ошибка при обновлении списка подкатегорий:', error);
        }
    };

    const handleAllSubcatClick = () => {
        fetchSubcatAll().then(data => {
            setFilteredSubcat(data);
            products.adminSetSubcategories(data);
        });
        setSelectedSectionTitle("Все подкатегории");
        setSelectedCatTitle("-");
        products.adminSetSelectedSections(0);
        products.adminSetSelectedCategories(0);
    };

    useEffect(() => {
        if (searchTerm) {
            const filtered = products.adminSubcategories.filter(subcategory =>
                subcategory.subcategory_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredSubcat(filtered);
            setSearchResultVisible(true);
        } else {
            setFilteredSubcat(products.adminSubcategories);
            setSearchResultVisible(false);
        }
    }, [searchTerm, products.adminSubcategories]);

    const handleSearchChange = event => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        setSearchTerm(searchInputRef.current.value);
    };

    const handleResetSearchSubcat = () => {
        setSearchTerm('');
        setFilteredSubcat(products.adminSubcategories);
        setSearchResultVisible(false);
        searchInputRef.current.value = '';
        handleAllSubcatClick();
    };

    const handleKeyPress = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSearch();
        }
    };

    const handleSectionSelect = section => {
        products.adminSetSelectedSections(section);
        setSelectedSectionTitle(section.section_name);
        setSelectedCatTitle("Выберите категорию");
    };

    const handleEditSubcat = id_subcategory => {
        products.adminSetSelectedSubcategories(id_subcategory);
        setUpdateSubcatVisible(true);
    };

    const handleDeleteSubcat = id_subcategory => {
        products.adminSetSelectedSubcategories(id_subcategory);
        setDeleteSubcatVisible(true);
    };

    return (
        <Form>
            <div>
                <Button variant="outline-dark" className="mt-1" onClick={() => setSubcatVisible(true)}>
                    Добавить подкатегорию
                </Button>
            </div>
            <Form>
                <div className="d-flex mt-3 mb-4">
                    <Form.Control
                        type="text"
                        placeholder="Поиск подкатегории"
                        className="mr-2"
                        style={{ maxWidth: 800, height: 60 }}
                        ref={searchInputRef}
                        onKeyPress={handleKeyPress}
                        onChange={handleSearchChange}
                    />
                    <Button variant="dark" className="mr-2" onClick={handleSearch} style={{ marginLeft: '10px' }}>
                        Поиск
                    </Button>
                    <Button variant="dark" onClick={handleResetSearchSubcat} style={{ marginLeft: '10px' }}>
                        Сбросить
                    </Button>
                </div>

                <Dropdown id="dropdown-basic-button" className='mb-3'>
                    <Dropdown.Toggle>
                        {selectedSectionTitle}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleAllSubcatClick}>Все подкатегории</Dropdown.Item>
                        {products.adminSections.map(section => (
                            <Dropdown.Item
                                onClick={() => handleSectionSelect(section)}
                                key={section.id_section}
                            >
                                {section.section_name}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown className='mb-4'>
                    <Dropdown.Toggle>
                        {selectedCatTitle}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {products.adminSelectedSections !== 0 && products.adminSelectedSections ? (
                            products.adminCategories.map(category => (
                                <Dropdown.Item
                                    onClick={() => { 
                                        products.adminSetSelectedCategories(category); 
                                        setSelectedCatTitle(category.category_name);
                                    }}
                                    key={category.id_category}
                                >
                                    {category.category_name}
                                </Dropdown.Item>
                            ))
                        ) : (
                            <Dropdown.Item disabled>Выберите раздел</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </Form>

            {searchResultVisible || !searchTerm ? (
                <>
                    {filteredSubcat.map(subcategories => (
                        <Card className="mt-2 p-3" key={subcategories.id_subcategory}>
                            <Row>
                                <Col>{subcategories.subcategory_name}</Col>
                                <Col md="auto">
                                    <Button variant="outline-primary" onClick={() => handleEditSubcat(subcategories.id_subcategory)}>
                                        Изменить
                                    </Button>
                                </Col>
                                <Col md="auto">
                                    <Button variant="outline-danger" onClick={() => handleDeleteSubcat(subcategories.id_subcategory)}>
                                        Удалить
                                    </Button>
                                </Col>
                            </Row>
                        </Card>
                    ))}
                </>
            ) : null}

            <CreateSubcat
                show={subcatVisible}
                onHide={() => {
                    setSubcatVisible(false);
                    updateSubcatList();
                }}
            />

            <UpdateSubcat
                show={updateSubcatVisible}
                onHide={() => {
                    setUpdateSubcatVisible(false);
                    updateSubcatList();
                }}
                id_subcategory={products.adminSelectedSubcategories}
                initialSubcatName={filteredSubcat.find(subcategory => subcategory.id_subcategory === products.adminSelectedSubcategories)?.subcategory_name}
                onUpdate={updateSubcatList}
            />

            <DeleteSubcat
                show={deleteSubcatVisible}
                onHide={() => {
                    setDeleteSubcatVisible(false);
                    updateSubcatList();
                }}
                id_subcategory={products.adminSelectedSubcategories}
                onDelete={updateSubcatList}
            />
        </Form>
    );
});

export default SubcatModule;


