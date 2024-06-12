import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { fetchSections, fetchProduct, fetchProductAdmin, fetchCat, fetchSubcat } from "../http/productAPI";
import SubcatBar from "../components/SubcatBar";
import SortMenu from "../components/SortMenu";
import ProductList from "../components/ProductList";
import Pages from "../components/Pages";

const Catalog = observer(() => {
  const { user, products } = useContext(Context);
  const [sortType, setSortType] = useState('');
  const storedFilters = JSON.parse(localStorage.getItem("catalogFilters"));

  useEffect(() => {
    if (storedFilters) {
      products.setSelectedSections(storedFilters.selectedSections);
      products.setSelectedCategories(storedFilters.selectedCategories);
      products.setSelectedSubcategories(storedFilters.selectedSubcategories);
      products.setPage(storedFilters.page);
    } else {
      fetchSections().then(products.setSections);
      fetchCat().then(products.setCategories);
      fetchSubcat().then(products.setSubcategories);
      fetchProduct(null, null, null, null, 1, 9).then(data => {
        products.setProducts(data.rows);
        products.setTotalCount(data.count);
      });
    }
  }, []);

  useEffect(() => {
    const fetchProducts = user.isAdmin ? fetchProductAdmin : fetchProduct;
    fetchProducts(
      products.selectedSections?.id_section || null,
      products.selectedCategories?.id_category || null,
      products.selectedSubcategories?.id_subcategory || null,
      products.selectedBrand?.id_brand || null,
      products.page,
      products.limit,
      sortType
    ).then(data => {
      products.setProducts(data.rows);
      products.setTotalCount(data.count);
    });
  }, [
    user.isAdmin, 
    products.selectedSections,
    products.selectedCategories,
    products.selectedSubcategories,
    products.selectedBrand,
    products.page,
    sortType
  ]);

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <SubcatBar />
        </Col>
        <Col md={9}>
          <SortMenu sortType={sortType} setSortType={setSortType} />
          <ProductList isAdmin={user.isAdmin} />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
});

export default Catalog;




