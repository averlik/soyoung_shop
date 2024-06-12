import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import ad_img1 from '../../img/icons/ad_img1.png'; // Импортируйте изображение


function Advertising() {
  return (
    <Container className='mt-3'style={{ height: '556px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Row className="w-100">
        <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
          <div style={{ fontSize: '50px', textAlign: 'center' }}>
            Откройте для себя новейшие косметические продукты
          </div>
        </Col>
        <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
          <Image src={ad_img1} style={{ width: "100%", maxWidth: '550px', height: 'auto', marginLeft: '40px' }} />
        </Col>
      </Row>
    </Container>
  );
}

export default Advertising;
