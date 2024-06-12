import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { useNavigate } from 'react-router-dom';
import { Context } from "..";
import { fetchBrands } from "../http/productAPI";

const Brand = observer(() => {
  const { products } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBrands().then((data) => products.setBrand(data));
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBrands = products.brands.filter((brand) =>
    brand.brand_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBrandClick = (brand) => {
    products.setSelectedSections(0);
            products.setSelectedCategories(0);
            products.setSelectedSubcategories(0);
            products.setSelectedBrand(brand);;
            localStorage.setItem("catalogFilters", JSON.stringify({
              selectedSections: 0,
              selectedCategories: 0,
              selectedSubcategories: 0,
              selectedBrand: products.selectedBrand
            }));
            navigate('/catalog');
  };

  const getAlphabeticalBrands = () => {
    const brandsByAlphabet = {};
    filteredBrands.forEach((brand) => {
      let firstLetter = brand.brand_name.charAt(0).toUpperCase();
      if (!isNaN(firstLetter)) {
        firstLetter = "0-9";
      }
      if (!brandsByAlphabet[firstLetter]) {
        brandsByAlphabet[firstLetter] = [];
      }
      brandsByAlphabet[firstLetter].push(brand);
    });
    return brandsByAlphabet;
  };

  const brandsByAlphabet = getAlphabeticalBrands();

  return (
    <Container>
      <Row className="mt-4">
        <Col md={3}>
          <h2>БРЕНДЫ</h2>
          <Form.Control
            type="text"
            placeholder="Поиск брендов"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Col>
        <Col md={9}>
          {Object.keys(brandsByAlphabet).map((letter) => (
            <div key={letter}>
              <h3>{letter}</h3>
              <Row>
                {brandsByAlphabet[letter].map((brand) => (
                  <Col md={4} key={brand.id_brand}>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => handleBrandClick(brand)}
                    >
                      {brand.brand_name}
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
});

export default Brand;
