import { observer } from "mobx-react-lite";
import React from "react";
import { useContext } from 'react';
import { Context } from "..";
import ProductItem from "./ProductItem";
import { Row, Col } from "react-bootstrap"; // Импортируем Col из react-bootstrap

const ProductListSearch = observer(({ searchResults }) => {
    const { user } = useContext(Context);
    const productList = searchResults || []; // Если нет результатов поиска, используем пустой массив

    return (
        <Row>
            {productList.length > 0 ? (
                productList.map(product => (
                    (user.isAdmin || !product.hidden) && // Показываем товар если он не скрыт или если пользователь администратор
                    <Col key={product.id_product} md={3}> {/* Используем Col для размещения товара */}
                        <ProductItem product={product} isAdmin={user.isAdmin} />
                    </Col>
                ))
            ) : (
                <div>Нет товаров</div>
            )}
        </Row>
    );
});

export default ProductListSearch;
