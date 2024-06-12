// import { observer } from "mobx-react-lite";
// import React from "react";
// import { useContext } from 'react';
// import { Context } from "..";
// import ProductItem from "./ProductItem";
// import { Row } from "react-bootstrap";

// const ProductList = observer(() => {
//     const { products, user } = useContext(Context); // Получаем данные пользователя
    
//     return (
//         <Row className="d-flex">
//             {products.products.length > 0 ? (
//                 products.products.map(product => (
//                     (user.isAdmin || !product.hidden) && // Показываем товар если он не скрыт или если пользователь администратор
//                     <ProductItem key={product.id_product} product={product} isAdmin={user.isAdmin} />
//                 ))
//             ) : (
//                 <div>Нет товаров</div>
//             )}
//         </Row>
//     );
// });

// export default ProductList;

import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Row, Col } from "react-bootstrap";
import { Context } from "..";
import ProductItem from "./ProductItem";

const ProductList = observer(() => {
  const { products, user } = useContext(Context);

  return (
    <Row className="d-flex">
      {products.products.length > 0 ? (
        products.products.map(product => (
          (user.isAdmin || !product.hidden) && ( // Показываем товар если он не скрыт или если пользователь администратор
            <Col xs={6} md={4} lg={4} key={product.id_product} className="mb-4">
              <ProductItem product={product} isAdmin={user.isAdmin} />
            </Col>
          )
        ))
      ) : (
        <div>Нет товаров</div>
      )}
    </Row>
  );
});

export default ProductList;


