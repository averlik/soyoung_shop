import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";
import { Context } from "..";
import { fetchBrands, fetchBrandsByNewProduct, fetchNewProduct } from "../http/productAPI";
import SubcatBar from "../components/SubcatBar";
import BrandAccardion from "../components/BrandComponents/BrandAccardion";
import SortMenu from "../components/SortMenu";
import ProductList from "../components/ProductList";
import Pages from "../components/Pages";

const New = observer(() => {
  const { state } = useLocation();
  const { products ,user} = useContext(Context);
  const [sortType, setSortType] = useState('');

useEffect(() => {
    const fetchData = async () => {
        try {
            let newData;
            let brandData;

            if (user.isAdmin) {
                newData = await fetchNewProduct(
                    products.selectedBrand.id_brand || null,
                    products.page,
                    products.limit,
                    sortType
                );
            } else {
                newData = await fetchNewProduct(
                    products.selectedBrand.id_brand || null,
                    products.page,
                    products.limit,
                    1, // Для обычного пользователя загружаем только опубликованные товары
                    sortType
                );
            }

            products.setProducts(newData.rows);
            products.setTotalCount(newData.count);

            brandData = await fetchBrandsByNewProduct();
            products.setBrand(brandData);
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        }
    };

    fetchData();
}, [user.isAdmin, products.selectedBrand, products.page, sortType]);

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <BrandAccardion />
        </Col>
        <Col md={9}>
          <SortMenu sortType={sortType} setSortType={setSortType} />
          <ProductList />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
});

export default New;
