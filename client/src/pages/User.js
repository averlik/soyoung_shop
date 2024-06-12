import React, { useState, useRef, useContext } from 'react';
import { Button, Container, Form, Row, Col, ListGroup, Card } from 'react-bootstrap';
import OrderHistory from '../components/UserModules/OrderHistory'
import CatModule from '../components/AdminModules/СatModule';
import SubcatModule from '../components/AdminModules/SubcatModule';
import ProductModule  from '../components/AdminModules/ProductModule';
import { Context } from '../index';
import {  SHOP_ROUTE } from '../utils/consts';
import { NavLink, useNavigate } from 'react-router-dom';
import WishList from '../components/UserModules/WishList';

const User = () => {
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
      case 'orderHistory_module':
        return ( <OrderHistory />);
      case 'wish_module':
        return (<WishList/>);
      default:
        return (<WishList/>);
    }
  };

  return (
    <Container className='mt-2 mb-2'>
      <Row>
      <h2 style={{marginBottom:20, marginLeft:5}}>Личный кабинет</h2>
        <Col md={3}>
          <ListGroup defaultActiveKey="workspace" >
            <ListGroup.Item variant="link" onClick={() => handleLinkClick('wish_module')}>
              Избранное
            </ListGroup.Item>
            <ListGroup.Item variant="link" onClick={() => handleLinkClick('orderHistory_module')}>
              Мои покупки
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={9}>
          <FormComponent />
        </Col>
      </Row>
      <Row>
      <Button
            variant="outline-dark"
            className="Admin-panel"
            style={{ marginRight: 30, marginTop:30 }}
            onClick={logOut}
            >
            Выйти из профиля
          </Button>
      </Row>
    </Container>
   
  );
};

export default User;



