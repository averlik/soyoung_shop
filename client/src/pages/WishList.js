import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../';
import { Button, Card, Col, Container, Row, Image, Form } from 'react-bootstrap';
import { fetchWishList, removeWishListItem,clearWishList} from '../http/WishListAPI';
import ProductItem from '../components/ProductItem';

const WishList = observer(() => {
    const { products } = useContext(Context);

    useEffect(() => {
        fetchWishList().then(data =>{
            products.setWishListItems(data.wishListItems||[])}
        );
    }, [products]);

    const removeFromWishList = async (id_wish_list_item) => {
        await removeWishListItem(id_wish_list_item);
        fetchWishList().then(data => products.setWishListItems(data.wishListItems||[]));
    };

    const handleClearWishList = async () => {
        await clearWishList();
        fetchWishList().then(data => products.setWishListItems(data.wishListItems||[]));
    };
    
    if (!products.wishListItems) {
        return <p>Загрузка избранных товаров...</p>;
    }
    return (
        <Container className="mt-3">
            <h1 className="pb-2">Избранное</h1>
            {products.wishListItems.length === 0 ? (
                <p>Избранное пусто!</p>
            ) : (
                <>
                  <Row className="d-flex">
                    {products.wishListItems.map(item => (
                        // <Card className="mb-3" key={item.id_wish_list_item}>
                        //     <Card.Body>
                        //         <Row>
                        //             <Col md="2">
                        //                 <Image src={process.env.REACT_APP_API_URL + item.product.image} alt="img not found" fluid />
                        //             </Col>
                        //             <Col>
                        //                 <h5>{item.product.ru_product_name}</h5>
                        //                 <p>{item.product.description}</p>
                        //             </Col>
                        //             <Col md="2" className="d-flex align-items-center justify-content-end">
                        //                 <h5>{item.product.price} руб</h5>
                        //             </Col>
                        //             <Col md="2" className="d-flex align-items-center justify-content-end">
                        //                 <Button variant="danger" onClick={() => removeFromWishList(item.id_wish_list_item)}>Удалить</Button>
                        //             </Col>
                        //         </Row>
                        //     </Card.Body>
                        // </Card>
                        <ProductItem key={item.id_wish_list_item} products={item.product}/>
                    ))}
                    </Row>
                    <div className="d-flex justify-content-end">
                        <Button variant="danger" onClick={handleClearWishList}>Очистить Избранное</Button>
                    </div>
                </>
            )}
        </Container>
    );
});

export default WishList;


// import React, { useContext, useEffect } from 'react';
// import { observer } from 'mobx-react-lite';
// import { Context } from '../';
// import { Button, Card, Col, Container, Row, Image, Form } from 'react-bootstrap';
// import { fetchWishList, removeWishListItem, clearWishList } from '../http/WishListAPI';

// const WishList = observer(() => {
//     const { products } = useContext(Context);

//     useEffect(() => {
//         fetchWishList().then(data => products.setWishListItems(data));
//     }, [products]);

//     const removeFromWishList = async (id_wish_list_item) => {
//         await removeWishListItem(id_wish_list_item);
//         fetchWishList().then(data => {
//             products.setWishListItems(data.wishListItems || []);
//         });
//     };

//     const handleClearWishList = async () => {
//         await clearWishList();
//         fetchWishList().then(data => {
//             products.setWishListItems(data.wishListItems || []);
//         });
//     };

//     // Проверка на наличие wishListItems
//     if (!products.wishListItems) {
//         return <p>Загрузка Избранного...</p>;
//     }

//     return (
//         <Container className="mt-3">
//             <h1 className="pb-2">Избранное</h1>
//             {products.wishListItems.length === 0 ? (
//                 <p>Избранное пусто!</p>
//             ) : (
//                 <>
//                     {products.wishListItems.map(item => (
//                         <Card className="mb-3" key={item.id_wish_list_item}>
//                             <Card.Body>
//                                 <Row>
//                                     <Col md="2">
//                                         <Image src={process.env.REACT_APP_API_URL + item.product.image} alt="img not found" fluid />
//                                     </Col>
//                                     <Col>
//                                         <h5>{item.product.ru_product_name}</h5>
//                                         <p>{item.product.description}</p>
//                                     </Col>
//                                     <Col md="2" className="d-flex align-items-center justify-content-end">
//                                         <h5>{item.product.price} руб</h5>
//                                     </Col>
//                                     <Col md="2" className="d-flex align-items-center justify-content-end">
//                                         <Button variant="danger" onClick={() => removeFromWishList(item.id_wish_list_item)}>Удалить</Button>
//                                     </Col>
//                                 </Row>
//                             </Card.Body>
//                         </Card>
//                     ))}
//                     <div className="d-flex justify-content-end">
//                         <Button variant="danger" onClick={handleClearWishList}>Очистить Избранное</Button>
//                     </div>
//                 </>
//             )}
//         </Container>
//     );
// });

// export default WishList;
