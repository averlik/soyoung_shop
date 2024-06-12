// // import React, { useEffect, useState, useContext } from 'react';
// // import { Link } from 'react-router-dom';
// // import Carousel from 'react-multi-carousel';
// // import 'react-multi-carousel/lib/styles.css';
// // import Col from 'react-bootstrap/Col';
// // import Container from 'react-bootstrap/Container';
// // import Row from 'react-bootstrap/Row';
// // import Button from 'react-bootstrap/Button';
// // import { fetchSaleProduct } from '../../http/productAPI'; // Импорт функции API для получения товаров со скидкой
// // import ProductItem from '../ProductItem';
// // import { Context } from "../../";
// // import { useNavigate } from 'react-router-dom';
// // import { FaChevronRight } from "react-icons/fa";
// // import { SALE_ROUTE } from '../../utils/consts';

// // function DiscountProducts() {
// //     const navigate = useNavigate();
// //     const [saleProducts, setSaleProducts] = useState([]);
// //     const { products, user } = useContext(Context); // Получаем данные пользователя

// //      // Проверяем, существует ли selectedBrand перед попыткой доступа к его свойствам
// //      const brandId = products.selectedBrand ? products.selectedBrand.id_brand : null;

// //     useEffect(() => {
// //         // Получение товаров со скидкой при загрузке компонента
// //         fetchSaleProduct(  
// //             null,
// //             products.page,
// //             products.limit,
// //             1 // Для обычного пользователя загружаем только опубликованные товары
// //             ).then(data => setSaleProducts(data.rows));
// //     }, []);

// //     const responsive = {
// //         superLargeDesktop: {
// //             breakpoint: { max: 4000, min: 3000 },
// //             items: 5
// //         },
// //         desktop: {
// //             breakpoint: { max: 3000, min: 1024 },
// //             items: 4 // Увеличено с 3 до 4 для отображения четырех товаров на экранах с разрешением от 1024 пикселей
// //         },
// //         tablet: {
// //             breakpoint: { max: 1024, min: 464 },
// //             items: 2
// //         },
// //         mobile: {
// //             breakpoint: { max: 464, min: 0 },
// //             items: 2
// //         }
// //     };

// //     return (
// //         <Container>
// //             <Row className="justify-content-between align-items-center mb-2 mt-5" onClick={() => navigate(SALE_ROUTE)}>
// //                 <Col>
// //                     <h2>СКИДКИ</h2>
// //                 </Col>
// //                 <Col className="d-flex justify-content-end">
// //                     <FaChevronRight style={{ height: '30px', width: '30px', marginRight:'10px' }} />
// //                 </Col>
// //             </Row>
// //             <Carousel responsive={responsive}>
// //                 {saleProducts.map(product => (
// //                     <div key={product.id_product}>
// //                         <ProductItem key={product.id_product} product={product} isAdmin={user.isAdmin} />
// //                     </div>
// //                 ))}
// //             </Carousel>
// //         </Container>
// //     );
// // }

// // export default DiscountProducts;

// import React, { useEffect, useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
// import { Container, Row, Col } from 'react-bootstrap';
// import { FaChevronRight } from "react-icons/fa";
// import { fetchSaleProduct } from '../../http/productAPI';
// import ProductItem from '../ProductItem';
// import { Context } from "../../";
// import { SALE_ROUTE } from '../../utils/consts';
// import '../css/DiscountProducts.css'; 

// function DiscountProducts() {
//     const navigate = useNavigate();
//     const [saleProducts, setSaleProducts] = useState([]);
//     const { products, user } = useContext(Context);

//     const brandId = products.selectedBrand ? products.selectedBrand.id_brand : null;

//     useEffect(() => {
//         fetchSaleProduct(
//             null,
//             products.page,
//             products.limit,
//             1
//         ).then(data => setSaleProducts(data.rows));
//     }, [products.page, products.limit]);

//     const responsive = {
//         superLargeDesktop: {
//             breakpoint: { max: 4000, min: 3000 },
//             items: 5
//         },
//         desktop: {
//             breakpoint: { max: 3000, min: 1024 },
//             items: 4
//         },
//         tablet: {
//             breakpoint: { max: 1024, min: 464 },
//             items: 3
//         },
//         mobile: {
//             breakpoint: { max: 464, min: 0 },
//             items: 2 // Для мобильных устройств устанавливаем 2 элемента
//         }
//     };

//     return (
//         <Container>
//             <Row className="justify-content-between align-items-center mb-2 mt-5 discount-header" onClick={() => navigate(SALE_ROUTE)}>
//                 <Col>
//                     <h2 className="discount-title">СКИДКИ</h2>
//                 </Col>
//                 <Col className="d-flex justify-content-end">
//                     <FaChevronRight className="discount-icon" />
//                 </Col>
//             </Row>
//             <Carousel responsive={responsive}>
//                 {saleProducts.map(product => (
//                     <div key={product.id_product} className="product-item">
//                         <ProductItem key={product.id_product} product={product} isAdmin={user.isAdmin} />
//                     </div>
//                 ))}
//             </Carousel>
//         </Container>
//     );
// }

// export default DiscountProducts;


import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Container, Row, Col } from 'react-bootstrap';
import { FaChevronRight } from "react-icons/fa";
import { fetchSaleProduct } from '../../http/productAPI';
import ProductItem from '../ProductItem';
import { Context } from "../../";
import { SALE_ROUTE } from '../../utils/consts';
import '../css/DiscountProducts.css'; // Импорт файла CSS

function DiscountProducts() {
    const navigate = useNavigate();
    const [saleProducts, setSaleProducts] = useState([]);
    const { products, user } = useContext(Context);

    const brandId = products.selectedBrand ? products.selectedBrand.id_brand : null;

    useEffect(() => {
        fetchSaleProduct(
            null,
            products.page,
            products.limit,
            1
        ).then(data => setSaleProducts(data.rows));
    }, [products.page, products.limit]);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3
        },
        tablet2: {
            breakpoint: { max: 770, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1 // Для мобильных устройств устанавливаем 2 элемента
        }
    };

    return (
        <Container className="carousel-container">
            <Row className="justify-content-between align-items-center mb-2 mt-5 discount-header" onClick={() => navigate(SALE_ROUTE)}>
                <Col>
                    <h2 className="discount-title">СКИДКИ</h2>
                </Col>
                <Col className="d-flex justify-content-end">
                    <FaChevronRight className="discount-icon" />
                </Col>
            </Row>
            <Carousel responsive={responsive}>
                {saleProducts.map(product => (
                    <div key={product.id_product} className="product-item">
                        <ProductItem key={product.id_product} product={product} isAdmin={user.isAdmin} />
                    </div>
                ))}
            </Carousel>
        </Container>
    );
}

export default DiscountProducts;
