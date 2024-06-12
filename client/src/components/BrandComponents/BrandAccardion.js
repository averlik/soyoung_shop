
import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';

const BrandAccardion = observer(() => {
  const { products } = useContext(Context);

  const handleClearBrands = () => {
    products.setSelectedBrand([]);
  };

  const brands = products.brands || [];

  return (
    <div style={{ overflowY: 'auto' }}>
      <Accordion className='mt-4' defaultActiveKey="0" flush>
          <Accordion.Item eventKey="0">
              <Accordion.Header>Бренды</Accordion.Header>
              <Accordion.Body style={{ maxHeight: '200px', overflow: 'auto' }}>
                  <Form>
                      <Card
                          className="p-3"
                          onClick={handleClearBrands}
                          border={!products.selectedBrand || products.selectedBrand.length === 0 ? 'danger' : 'light'}
                      >
                          Не выбран
                      </Card>
                      {brands.length > 0 ? (
                          brands.map(brand => (
                              <Card
                                  style={{ cursor: 'pointer' }}
                                  key={brand.id_brand}
                                  className="p-3"
                                  onClick={() => products.setSelectedBrand(brand)}
                                  border={brand.id_brand === (products.selectedBrand?.id_brand || null) ? 'danger' : 'light'}
                              >
                                  {brand.brand_name}
                              </Card>
                          ))
                      ) : (
                          <Card
                              style={{ cursor: 'pointer' }}
                              className="p-3"
                              border={'light'}
                          >
                              Товаров нет
                          </Card>
                      )}
                  </Form>
              </Accordion.Body>
          </Accordion.Item>
      </Accordion>
  </div>
  );
});

export default BrandAccardion;

