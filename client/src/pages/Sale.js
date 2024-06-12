import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";
import { Context } from "..";
import { fetchBrands, fetchSaleProduct ,fetchBrandsBySaleProduct} from "../http/productAPI";
import SubcatBar from "../components/SubcatBar";
import BrandAccardion from "../components/BrandComponents/BrandAccardion";
import SortMenu from "../components/SortMenu";
import ProductList from "../components/ProductList";
import Pages from "../components/Pages";

const Sale = observer(() => {
  const { state } = useLocation();
  const { products, user } = useContext(Context);
  const [sortType, setSortType] = useState('');

  useEffect(() => {
    const fetchData = async () => {
        try {
            let saleData;
            let brandData;

            if (user.isAdmin) {
                saleData = await fetchSaleProduct(
                    products.selectedBrand.id_brand || null,
                    products.page,
                    products.limit,
                    sortType
                );
            } else {
                saleData = await fetchSaleProduct(
                    products.selectedBrand.id_brand || null,
                    products.page,
                    products.limit,
                    1, // Для обычного пользователя загружаем только опубликованные товары
                    sortType
                );
            }

            products.setProducts(saleData.rows);
            products.setTotalCount(saleData.count);

            brandData = await fetchBrandsBySaleProduct();
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

export default Sale;
