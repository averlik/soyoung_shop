import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import { Button, Card, Col, Container, Row, Image } from 'react-bootstrap';
import { fetchWishList, removeWishListItem, clearWishList } from '../../http/WishListAPI';
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "../../utils/consts";
import { HiOutlineHeart } from "react-icons/hi2";

const WishList = observer(() => {
    const navigate = useNavigate();
    const { products } = useContext(Context);

    useEffect(() => {
        fetchWishList().then(data => {
            products.setWishListItems(data.wishListItems || []);
        });
    }, [products]);

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        } else {
            return text;
        }
    };

    const formatPrice = (price, discount) => {
        if (discount > 0) {
            const discountedPrice = Math.ceil(price * (1 - discount / 100));
            return (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ textDecoration: 'line-through', color: 'gray', marginRight: 5 }}>{Math.ceil(price)} руб</div>
                    <div style={{ fontWeight: 'bold', fontSize: 18 }}>{discountedPrice.toFixed(0)} руб</div>
                </div>
            );
        } else {
            return <div style={{ fontWeight: 'bold', fontSize: 18 }}>{Math.ceil(price)} руб</div>;
        }
    };

    const removeFromWishList = async (id_wish_list_item) => {
        await removeWishListItem(id_wish_list_item);
        fetchWishList().then(data => products.setWishListItems(data.wishListItems || []));
    };

    const handleClearWishList = async () => {
        await clearWishList();
        fetchWishList().then(data => products.setWishListItems(data.wishListItems || []));
    };

    if (!products.wishListItems) {
        return <p>Загрузка избранных товаров...</p>;
    }

    return (
        <Container>
            <h4 className="pb-2">Избранное</h4>
            {products.wishListItems.length === 0 ? (
                <p>Избранное пусто!</p>
            ) : (
                <Row className="d-flex flex-wrap justify-content-start mb-4">
                    {products.wishListItems.map(item => (
                        <Col md={4} key={item.id_wish_list_item}>
                            <Card 
                                style={{ width: '100%', height: 480, cursor: 'pointer', position: 'relative', marginBottom: '10px' }} 
                                border={"light"}
                            >
                                <Image 
                                    width="100%" 
                                    height={350} 
                                    src={process.env.REACT_APP_API_URL + item.product.image}
                                    onClick={() => navigate(PRODUCT_ROUTE + '/' + item.id_product)} 
                                />
                                <div className="text-black-70 mt-1 d-flex justify-content-between align-items-center">   
                                    <div style={{ fontSize: 14 }}
                                        onClick={() => navigate(PRODUCT_ROUTE + '/' + item.id_product)}
                                    >
                                        {truncateText(item.product.ru_product_name, 80)}
                                    </div>
                                </div>
                                
                                <div style={{ fontWeight: 'bold', fontSize: 15 }}
                                    onClick={() => navigate(PRODUCT_ROUTE + '/' + item.id_product)}
                                >
                                    {truncateText(item.product.eng_product_name, 80)}
                                </div>
                                
                                <div style={{ position: 'absolute', bottom: '5px', left: '0', width: '100%' }}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        {formatPrice(item.product.price, item.product.sale)}
                                        <Button
                                            variant={"dark"}
                                            onClick={() => removeFromWishList(item.id_wish_list_item)}
                                            style={{ borderRadius: '50%', padding: '0.5rem', width: '2rem', height: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                        >
                                            <HiOutlineHeart size={20} />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
});

export default WishList;


