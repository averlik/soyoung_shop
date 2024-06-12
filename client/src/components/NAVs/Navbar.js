import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../index';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import logoImg from '../../img/icons/logo.svg';
import { HiOutlineShoppingBag, HiOutlineHeart, HiOutlineUserCircle, HiOutlineDocumentMagnifyingGlass } from "react-icons/hi2";
import MenuImg from '../../img/icons/menu.png';
import '../css/Navbar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ADMIN_ROUTE, ACCOUNT_ROUTE, CART_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, SEARCH_ROUTE, CATALOG_ROUTE, SALE_ROUTE, NEW_ROUTE } from '../../utils/consts';
import { IoIosSearch } from "react-icons/io";
import { GrCatalog } from "react-icons/gr";
import { CiDiscount1 } from "react-icons/ci";
import { GiLipstick } from "react-icons/gi";

const NavBar = observer(() => {
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 992);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 992);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const logOut = () => {
    localStorage.removeItem('token');
    user.setUser({});
    user.setIsAuth(false);
    user.setIsAdmin(false);
    navigate(SHOP_ROUTE);
  };

  const handleCartClick = () => {
    if (!isWideScreen) {
      closeMenu();
    }
    navigate(CART_ROUTE);
  };

  const handleHeartClick = () => {
    if (!isWideScreen) {
      closeMenu();
    }
    navigate(ACCOUNT_ROUTE);
  };

  const handleAdminClick = () => {
    if (!isWideScreen) {
      closeMenu();
    }
    navigate(ADMIN_ROUTE);
  };

  const handleAccClick = () => {
    if (!isWideScreen) {
      closeMenu();
    }
    navigate(ACCOUNT_ROUTE);
  };

  const handleLoginClick = () => {
    if (!isWideScreen) {
      closeMenu();
    }
    navigate(LOGIN_ROUTE);
  };

  const handleSearchClick = () => {
    if (!isWideScreen) {
      closeMenu();
    }
    if (searchQuery.trim()) {
      navigate(`${SEARCH_ROUTE}?query=${searchQuery}`);
    }
  };

  const closeMenu = () => {
    const navbarToggle = document.querySelector('.navbar-toggler');
    if (navbarToggle && navbarToggle.classList.contains('collapsed')) {
      return; // Menu is already closed
    }
    navbarToggle.click();
  };

  const NavItem = ({ icon: Icon, text, onClick }) => (
    isWideScreen ? (
      <a className='icons-transition' onClick={onClick}>
        <Icon size={35} />
      </a>
    ) : (
      <Nav.Link style={{ marginLeft: '5px' }} onClick={onClick}>
        <Icon size={25} /> {text}
      </Nav.Link>
    )
  );

  const renderAdminLinks = () => (
    <>
      <Button
        variant="outline-success"
        className="Admin-panel"
        style={{ marginRight: 30 }}
        onClick={handleAdminClick}
      >
        Админ-панель
      </Button>
      <NavItem icon={HiOutlineUserCircle} text="Личный кабинет" onClick={handleAdminClick} />
      {!isWideScreen && (
        <NavLink to={CATALOG_ROUTE} className="nav-link" style={{ flex: "display", alignItems: "center" }}>
          <GrCatalog style={{ height: "20px", width: "20px", marginRight: "5px" }} />Каталог
        </NavLink>
      )}
    </>
  );

  const renderUserLinks = () => (
    <>
      {isWideScreen ? (
        <>
          <NavItem icon={HiOutlineHeart} text="Избранное" onClick={handleHeartClick} />
          <NavItem icon={HiOutlineShoppingBag} text="Корзина" onClick={handleCartClick} />
          <NavItem icon={HiOutlineUserCircle} text="Личный кабинет" onClick={handleAccClick} />
        </>
      ) : (
        <div style={{ textAlign: "left" }}>
          <>
          <NavLink to={CATALOG_ROUTE} className="nav-link mt-2" style={{ display: "flex" }} onClick={closeMenu}>
              <GrCatalog style={{ height: "20px", width: "19px", marginRight: "5px" }} />Каталог
            </NavLink>
            <NavLink to={SALE_ROUTE} className="nav-link " style={{ display: "flex" }} onClick={closeMenu}>
              <CiDiscount1 style={{ height: "25px", width: "25px", marginRight: "5px" }} />Скидки
            </NavLink>
            <NavLink to={NEW_ROUTE} className="nav-link" style={{ display: "flex" }} onClick={closeMenu}>
              <GiLipstick style={{ height: "20px", width: "20px", marginRight: "5px" }} />Новинки
            </NavLink>
            <NavLink to={CART_ROUTE} className="nav-link " style={{ display: "flex" }} onClick={closeMenu}>
              <HiOutlineShoppingBag style={{ height: "25px", width: "25px", marginRight: "5px" }} />Корзина
            </NavLink>
            <NavLink to={ACCOUNT_ROUTE} className="nav-link" style={{ display: "flex" }} onClick={closeMenu}>
              <HiOutlineHeart style={{ height: "25px", width: "25px", marginRight: "5px" }} />Избранное
            </NavLink>
            <NavLink to={ACCOUNT_ROUTE} className="nav-link " style={{ display: "flex" }} onClick={closeMenu}>
              <HiOutlineUserCircle style={{ height: "25px", width: "25px", marginRight: "5px" }} />Личный кабинет
            </NavLink>
          </>
        </div>
      )}
    </>
  );

  
  const renderGuestLinks = () => (
    <>
      {isWideScreen ? (
        <NavLink to={LOGIN_ROUTE} className="login-link">
          <HiOutlineUserCircle style={{ height: "30px", width: "30px", marginRight: "5px"}} />
            Войти
          </NavLink>
        ) : (
          <div style={{ textAlign: "left" }}>
            <>
              <NavLink to={LOGIN_ROUTE} className="login-link mt-2 mb-2" style={{ display: "flex" }} onClick={closeMenu}>
                <HiOutlineUserCircle style={{ height: "25px", width: "25px", marginRight: "5px" }} />Войти
              </NavLink>
              <NavLink to={CATALOG_ROUTE} className="nav-link  " style={{ display: "flex" }} onClick={closeMenu}>
                <GrCatalog style={{ height: "20px", width: "19px", marginRight: "5px" }} />Каталог
              </NavLink>
              <NavLink to={SALE_ROUTE} className="nav-link " style={{ display: "flex" }} onClick={closeMenu}>
                <CiDiscount1 style={{ height: "25px", width: "25px", marginRight: "5px" }} />Скидки
              </NavLink>
              <NavLink to={NEW_ROUTE} className="nav-link " style={{ display: "flex" }} onClick={closeMenu}>
                <GiLipstick style={{ height: "20px", width: "20px", marginRight: "5px" }} />Новинки
              </NavLink>
            </>
          </div>
        )}
    </>
  );

  return (
    <>
      <div className={`fixed-navbar-clone ${isWideScreen ? 'navbar_wide' : ''}`} />
      <Navbar fixed="top" expand="lg" className={`${isWideScreen ? 'navbar_wide' : ''}`}>
        <Container fluid style={{ display: "flex", alignItems: "center" }}>
          <NavLink to={SHOP_ROUTE} className="d-flex align-items-center">
            <img
              src={logoImg}
              alt="logo"
              className={`d-inline-block align-top ${isWideScreen ? 'width-logo' : 'small-logo'}`}
            />
          </NavLink>

          <Navbar.Toggle aria-controls="navbarScroll" className='fixed-navbar-toggle'>
            <img src={MenuImg} className='menu-icon' alt="Menu" />
          </Navbar.Toggle>

          <Navbar.Collapse id="navbarScroll">
            <Form className={`d-flex ${isWideScreen ? 'search_style' : 'search-style-mobile'}`}>
              <Form.Control
                type="search"
                placeholder="Поиск товаров"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                variant="outline-success"
                className="search_button"
                onClick={handleSearchClick}
                style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 5 }}
              >
                <IoIosSearch style={{ width: "30px", height: "30px", backgroundSize: "cover" }} />
              </Button>
            </Form>

            <Nav className='links_style'>
              {user.isAuth ? (
                user.isAdmin ? renderAdminLinks() : renderUserLinks()
              ) : (
                renderGuestLinks()
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
});

export default NavBar;

