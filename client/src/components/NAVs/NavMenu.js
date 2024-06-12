import { observer } from 'mobx-react-lite';
import React, { useState, useEffect, useContext, useRef } from 'react';
import Nav from 'react-bootstrap/Nav';
import Collapse from 'react-bootstrap/Collapse';
import { Context } from "../..";
import { fetchSections, fetchCat, fetchSubcat } from "../../http/productAPI";
import '../css/NavMenu.css';
import '../../styles/common.css';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaChevronRight } from "react-icons/fa";

const NavMenu = observer(() => {
  const { products } = useContext(Context);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [showCategories, setShowCategories] = useState(false);
  const [showSubcategories, setShowSubcategories] = useState(false);
  const [loadingSubcat, setLoadingSubcat] = useState(false);
  const menuRef = useRef(null);
  const [hoveredSection, setHoveredSection] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const togglePanel = () => {
    setOpen(!open);
    if (!open) {
      setShowCategories(false);
      setShowSubcategories(false);
    }
  };

  useEffect(() => {
    fetchSections().then(data => products.setSections(data));
    const storedFilters = JSON.parse(localStorage.getItem("catalogFilters"));
  }, [products]);

  const handleSectionClick = (section) => {
    products.setSelectedSections(section);
    setShowSubcategories(false);
    setShowCategories(true);

    fetchCat(section.id_section)
      .then(data => {
        products.setCategories(data);
        if (data.length === 0) {
          navigate('/catalog');
          togglePanel();
          setShowSubcategories(false);
          setShowCategories(false);
        }
        localStorage.setItem("catalogFilters", JSON.stringify({
          selectedSections: products.selectedSections,
          selectedCategories: 0,
          selectedSubcategories: 0,
          selectedBrand: 0
        }));
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  };

  const handleCategoryClick = (category) => {
    products.setSelectedCategories(category);
    setLoadingSubcat(true);
    setShowSubcategories(true);

    fetchSubcat(category.id_category)
      .then(data => {
        products.setSubcategories(data);
        setLoadingSubcat(false);
        if (data.length === 0) {
          navigate('/catalog');
          togglePanel();
          setShowSubcategories(false);
        }
        localStorage.setItem("catalogFilters", JSON.stringify({
          selectedSections: products.selectedSections,
          selectedCategories: products.selectedCategories,
          selectedSubcategories: 0,
          selectedBrand: 0
        }));
      })
      .catch(error => {
        console.error('Ошибка при загрузке подкатегорий:', error);
        setLoadingSubcat(false);
      });
  };

  const handleSubcategoryClick = (subcategory) => {
    products.setSelectedSubcategories(subcategory);
    navigate('/catalog');
    togglePanel();
    products.setSelectedBrand(0);

    localStorage.setItem("catalogFilters", JSON.stringify({
      selectedSections: products.selectedSections,
      selectedCategories: products.selectedCategories,
      selectedSubcategories: products.selectedSubcategories,
      selectedBrand: 0
    }));
  };

  const handleAllProductClick = () => {
    products.setSelectedSections(0);
    products.setSelectedCategories(0);
    products.setSelectedSubcategories(0);
    products.setSelectedBrand(0);
    localStorage.setItem("catalogFilters", JSON.stringify({
      selectedSections: 0,
      selectedCategories: 0,
      selectedSubcategories: 0,
      selectedBrand: 0
    }));
    navigate('/catalog');
    togglePanel();
  };

  const handleMouseEnterSection = (section) => {
    setHoveredSection(section.id_section);
    fetchCat(section.id_section)
      .then(data => {
        products.setCategories(data);
        setShowCategories(true);
        setShowSubcategories(false);
      })
      .catch(error => {
        console.error('Ошибка при загрузке категорий:', error);
      });
  };

  const handleMouseEnterCategory = (category) => {
    setHoveredCategory(category.id_category);
    fetchSubcat(category.id_category)
      .then(data => {
        products.setSubcategories(data);
        setShowSubcategories(true);
      })
      .catch(error => {
        console.error('Ошибка при загрузке подкатегорий:', error);
      });
  };

  const handleMouseLeaveSection = () => {
    setHoveredSection(null);
  };

  const handleMouseLeaveCategory = () => {
    setHoveredCategory(null);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpen(false);
      setShowCategories(false);
      setShowSubcategories(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} style={{ position: 'relative' }} className="nav-menu">
      <Nav style={{ backgroundColor: '#CAD3BF' }} className="nav-menu-2" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link onClick={togglePanel}>Каталог</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/sale">Скидки</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/brands">Бренды</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/aboutus">О нас</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/new">Новинки</Nav.Link>
        </Nav.Item>
      </Nav>

      <Collapse in={open}>
        <div style={{ position: 'absolute', top: '100%', left: 0, width: '100%', backgroundColor: 'white', zIndex: 999 }}>
          <Row>
            <Col md={4} className='nav-col'>
              <h4>Разделы</h4>
              {Array.isArray(products.sections) && products.sections.map(section => (
                <div key={section.id_section}>
                  <Nav.Item 
                    className={`nav-item ${hoveredSection === section.id_section ? 'active' : ''}`}
                    style={{ cursor: 'pointer', marginBottom: 10 }}
                    onClick={() => handleSectionClick(section)}
                    onMouseEnter={() => handleMouseEnterSection(section)}
                    onMouseLeave={handleMouseLeaveSection}
                  >
                    {section.section_name}
                    {section.hasCategories && <FaChevronRight />}
                  </Nav.Item>
                </div>
              ))}
              <Nav.Item
                style={{ cursor: 'pointer', marginBottom: 10 }}
                onClick={handleAllProductClick}
              >
                Все товары
              </Nav.Item>
            </Col>
            <Col md={4} className='nav-col'>
              {showCategories && products.categories.length > 0 && (
                <>
                  <h4>Категории</h4>
                  {Array.isArray(products.categories) && products.categories.map(category => (
                    <div key={category.id_category}>
                      <Nav.Item
                        className={`nav-item ${hoveredCategory === category.id_category ? 'active' : ''}`}
                        style={{ cursor: 'pointer', marginBottom: 10 }}
                        onClick={() => handleCategoryClick(category)}
                        onMouseEnter={() => handleMouseEnterCategory(category)}
                        onMouseLeave={handleMouseLeaveCategory}
                      >
                        {category.category_name}
                        {category.hasSubcategories && <FaChevronRight />}
                      </Nav.Item>
                    </div>
                  ))}
                </>
              )}
            </Col>
            <Col md={4} className='nav-col'>
              {showSubcategories && products.subcategories.length > 0 && (
                <>
                  <h4>Подкатегории</h4>
                  {Array.isArray(products.subcategories) && products.subcategories.map(subcategory => (
                    <div key={subcategory.id_subcategory} style={{ marginBottom: 10 }}>
                      <Nav.Item
                        className="nav-item"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleSubcategoryClick(subcategory)}
                      >
                        {subcategory.subcategory_name}
                      </Nav.Item>
                    </div>
                  ))}
                </>
              )}
            </Col>
          </Row>
        </div>
      </Collapse>
    </div>
  );
});

export default NavMenu;
