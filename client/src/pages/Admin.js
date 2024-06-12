import React, { useState, useRef, useContext } from 'react';
import { Button, Container, Form, Row, Col, ListGroup, Card } from 'react-bootstrap';
import BrandModule from '../components/AdminModules/BrandModule'
import CatModule from '../components/AdminModules/СatModule';
import SubcatModule from '../components/AdminModules/SubcatModule';
import ProductModule  from '../components/AdminModules/ProductModule';
import { Context } from '../index';
import {  SHOP_ROUTE } from '../utils/consts';
import { NavLink, useNavigate } from 'react-router-dom';
import AdminOrderHistory from '../components/AdminModules/AdminOrderHistory';
import SectionModule from '../components/AdminModules/SectionModule';
import FeedbackModule from '../components/AdminModules/FeedbackModule';

const Admin = () => {
  const [selectedLink, setSelectedLink] = useState(null);
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  const logOut = () => {
    localStorage.removeItem('token');
    user.setUser({});
    user.setIsAuth(false);
    user.setIsAdmin(false);
    navigate(SHOP_ROUTE); // Redirect to shop after logout
  };

  const FormComponent = () => {

    switch (selectedLink) {
      case 'brand_module':
        return ( <BrandModule />);
      case 'feedback_module':
        return ( <FeedbackModule />);
      case 'section_modul':
        return (<SectionModule/>);
      case 'cat_modul':
        return (<CatModule/>);
      case 'subcat_modul':
        return (<SubcatModule/>);
      case 'product_modul':
        return (<ProductModule/>);
      case 'orders_module':
        return (<AdminOrderHistory/>);
      default:
        return (<AdminOrderHistory/>);
    }
  };

  return (
    <Container className='mt-2 mb-2'>
      <h2 style={{marginBottom:20, marginLeft:5}}>Админ-панель</h2>
      <Row>
        <Col xs={4}>
          <ListGroup defaultActiveKey="workspace" >
            <ListGroup.Item variant="link" onClick={() => handleLinkClick('orders_module')}>
              Заказы
            </ListGroup.Item>
            <ListGroup.Item variant="link" onClick={() => handleLinkClick('feedback_module')}>
              Обратная связь
            </ListGroup.Item>
            <ListGroup.Item variant="link" onClick={() => handleLinkClick('brand_module')}>
              Бренды
            </ListGroup.Item>
            <ListGroup.Item variant="link" onClick={() => handleLinkClick('section_modul')}>
              Разделы
            </ListGroup.Item>
            <ListGroup.Item variant="link" onClick={() => handleLinkClick('cat_modul')}>
              Категории
            </ListGroup.Item>
            <ListGroup.Item variant="link" onClick={() => handleLinkClick('subcat_modul')}>
              Подкатегории
            </ListGroup.Item>
            <ListGroup.Item variant="link" onClick={() => handleLinkClick('product_modul')}>
              Товары
            </ListGroup.Item>
          </ListGroup>

          <Button
            variant="outline-dark"
            className="Admin-panel"
            style={{ marginRight: 30, marginTop:30 }}
            onClick={logOut}
            >
            Выйти из системы
      </Button>

        </Col>
        <Col xs={8}>
          <FormComponent />
        </Col>
      </Row>
    </Container>
   
  );
};

export default Admin;



