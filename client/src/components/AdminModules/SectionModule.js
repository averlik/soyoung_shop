import React, { useState, useEffect, useRef, useContext } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import CreateSection from '../modals/sectionModals/CreateSection';
import UpdateSection from '../modals/sectionModals/UpdateSection';
import DeleteSection from '../modals/sectionModals/DeleteSection';
import {Context} from "../../index";
import { fetchSections } from "../../http/productAPI";

const SectionModule = observer(() => {
    const {products} = useContext(Context)

    const [sectionVisible, setSectionVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSections, setFilteredSections] = useState([]);
    const [searchResultVisible, setSearchResultVisible] = useState(false);
    const [updateBrandVisible, setUpdateSectionVisible] = useState(false); 
    const [deleteSectionVisible, setDeleteSectionVisible] = useState(false); 
    
   
    const searchInputRef = useRef(null);
  
    useEffect(()=>{
        fetchSections().then((data) => products.adminSetSections(data)); 
    },[products]);

    const updateSectionList = async () => {
        try {
            const updatedSections = await fetchSections(); // Получаем обновленный список разделов
            setFilteredSections(updatedSections); // Обновляем отфильтрованный список разделов
            setSearchResultVisible(false); // Скрываем результаты поиска
        } catch (error) {
            console.error('Ошибка при обновлении списка разделов:', error);
        }
    };


  useEffect(() => {
    if (searchTerm) { 
      const filtered = products.adminSections.filter(section => section.section_name.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredSections(filtered);
      setSearchResultVisible(true);
    } else {
      setFilteredSections(products.adminSections);
      setSearchResultVisible(false);
    }
  }, [searchTerm, products.adminSections]);


  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    setSearchTerm(searchInputRef.current.value);
  };

  const handleResetSearchSections = () => {
    setSearchTerm('');
    setFilteredSections(products.adminSections);
    setSearchResultVisible(false);
    searchInputRef.current.value = '';
  };
  

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      handleSearch();
    }
  };

  // Обработчик нажатия на кнопку "Изменить"
  const handleEditSection = (id_section) => {
    products.adminSetSelectedSections(id_section);
    setUpdateSectionVisible(true); 
    updateSectionList(); 
  };  

 // Обработчик нажатия на кнопку "Удалить"
  const handleDeleteSection = (id_section) => {
    products.adminSetSelectedSections(id_section); 
    setDeleteSectionVisible(true); 
    updateSectionList(); 
  };


  return (
    <Form>
      <div>
        <Button variant="outline-dark" className="mt-1 " onClick={() => setSectionVisible(true)}>
          Добавить раздел
        </Button>
      </div>
      <Form>
        <div className="d-flex mt-3 mb-4">
          <Form.Control
            type="text"
            placeholder="Поиск раздела"
            className="mr-2"
            style={{ maxWidth: 800, height: 60 }}
            ref={searchInputRef}
            onKeyPress={handleKeyPress}
            onChange={handleSearchChange}
          />
          <Button variant="dark" className="mr-2" onClick={handleSearch} style={{ marginLeft: '10px' }}>
            Поиск
          </Button>
          <Button variant="dark" onClick={handleResetSearchSections} style={{ marginLeft: '10px' }}>
            Сбросить
          </Button>
        </div>
      </Form>
      {searchResultVisible || !searchTerm ? (
        <>
          {filteredSections.map((section) => (
            <Card className="mt-2 p-3" key={section.id_section}>
              <Row>
                <Col>{section.section_name}</Col>
                <Col md="auto">
                  <Button variant="outline-primary" onClick={() => handleEditSection(section.id_section)}> 
                    Изменить
                  </Button>
                </Col>
                <Col md="auto">
                  <Button variant="outline-danger" onClick={()=>handleDeleteSection(section.id_section)}>
                    Удалить
                  </Button>
                </Col>
              </Row>
            </Card>
          ))}
        </>
      ) : null}
      <CreateSection 
        show={sectionVisible} 
        onHide={() => {setSectionVisible(false);
        updateSectionList();}}
      />
    
    <UpdateSection
        show={updateBrandVisible}
        onHide={() => {
            setUpdateSectionVisible(false);
            updateSectionList(); 
        }}
        id_section={products.adminSelectedSections} 
        initialSectionName={products.adminSections.find(section => section.id_section === products.adminSelectedSections)?.section_name}
        onUpdate={updateSectionList} 
    />
    <DeleteSection
                show={deleteSectionVisible}
                onHide={() => {
                    setDeleteSectionVisible(false);
                    updateSectionList(); 
                }}
                id_section={products.adminSelectedSections} 
                onDelete={updateSectionList} 
    />
    </Form>
    
  );
});

export default SectionModule;

