import React, { useState, useEffect, useRef, useContext } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import CreateBrand from '../modals/brandModals/CreateBrand';
import UpdateBrand from '../modals/brandModals/UpdateBrand';
import DeleteBrand from '../modals/brandModals/DeleteBrand';
import {Context} from "../../index";
import { fetchBrands } from "../../http/productAPI";

const BrandModule = observer(() => {
    const {products} = useContext(Context)

    const [brandVisible, setBrandVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBrands, setFilteredBrands] = useState([]);
    const [searchResultVisible, setSearchResultVisible] = useState(false);
    const [updateBrandVisible, setUpdateBrandVisible] = useState(false); 
    const [deleteBrandVisible, setDeleteBrandVisible] = useState(false); 
    
   
    const searchInputRef = useRef(null);
  
    useEffect(()=>{
        fetchBrands().then((data) => products.adminSetBrand(data)); 
    },[products]);

    const updateBrandList = async () => {
        try {
            const updatedBrands = await fetchBrands(); // Получаем обновленный список брендов
            setFilteredBrands(updatedBrands); // Обновляем отфильтрованный список брендов
            setSearchResultVisible(false); // Скрываем результаты поиска
        } catch (error) {
            console.error('Ошибка при обновлении списка брендов:', error);
        }
    };


  useEffect(() => {
    if (searchTerm) { 
      const filtered = products.adminBrands.filter(brand => brand.brand_name.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredBrands(filtered);
      setSearchResultVisible(true);
    } else {
      setFilteredBrands(products.adminBrands);
      setSearchResultVisible(false);
    }
  }, [searchTerm, products.adminBrands]);


  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    setSearchTerm(searchInputRef.current.value);
  };

  const handleResetSearchBrands = () => {
    setSearchTerm('');
    setFilteredBrands(products.adminBrands);
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
  const handleEditBrand = (id_brand) => {
    products.adminSetSelectedBrand(id_brand);
    setUpdateBrandVisible(true); 
    updateBrandList(); 
  };  

 // Обработчик нажатия на кнопку "Удалить"
  const handleDeleteBrand = (id_brand) => {
    products.adminSetSelectedBrand(id_brand); 
    setDeleteBrandVisible(true); 
    updateBrandList(); 
  };


  return (
    <Form>
      <div>
        <Button variant="outline-dark" className="mt-1 " onClick={() => setBrandVisible(true)}>
          Добавить бренд
        </Button>
      </div>
      <Form>
        <div className="d-flex mt-3 mb-4">
          <Form.Control
            type="text"
            placeholder="Поиск бренда"
            className="mr-2"
            style={{ maxWidth: 800, height: 60 }}
            ref={searchInputRef}
            onKeyPress={handleKeyPress}
            onChange={handleSearchChange}
          />
          <Button variant="dark" className="mr-2" onClick={handleSearch} style={{ marginLeft: '10px' }}>
            Поиск
          </Button>
          <Button variant="dark" onClick={handleResetSearchBrands} style={{ marginLeft: '10px' }}>
            Сбросить
          </Button>
        </div>
      </Form>
      {searchResultVisible || !searchTerm ? (
        <>
          {filteredBrands.map((brand) => (
            <Card className="mt-2 p-3" key={brand.id_brand}>
              <Row>
                <Col>{brand.brand_name}</Col>
                <Col md="auto">
                  <Button variant="outline-primary" onClick={() => handleEditBrand(brand.id_brand)}> 
                    Изменить
                  </Button>
                </Col>
                <Col md="auto">
                  <Button variant="outline-danger" onClick={()=>handleDeleteBrand(brand.id_brand)}>
                    Удалить
                  </Button>
                </Col>
              </Row>
            </Card>
          ))}
        </>
      ) : null}
      <CreateBrand 
        show={brandVisible} 
        onHide={() => {setBrandVisible(false);
        updateBrandList();}}
      />
    
    <UpdateBrand
        show={updateBrandVisible}
        onHide={() => {
            setUpdateBrandVisible(false);
            updateBrandList(); 
        }}
        id_brand={products.adminSelectedBrand} 
        initialBrandName={products.adminBrands.find(brand => brand.id_brand === products.adminSelectedBrand)?.brand_name}
        onUpdate={updateBrandList} 
    />
    <DeleteBrand
                show={deleteBrandVisible}
                onHide={() => {
                    setDeleteBrandVisible(false);
                    updateBrandList(); 
                }}
                id_brand={products.adminSelectedBrand} 
                onDelete={updateBrandList} 
    />
    </Form>
    
  );
});

export default BrandModule;

