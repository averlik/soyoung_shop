import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import promoImage from '../../img/icons/promo.png'; 
import promoImage2 from '../../img/Carousel/5000rub.jpg';
import promoImage3 from '../../img/Carousel/numbuzin.jpg';
import '../css/NavMenu.css'

function UncontrolledExample() {
  return (
    <Carousel fluid style={{ maxHeight: '600px' }}>
      <Carousel.Item>
        <div className="image-container">
          <img
            className="d-block w-100"
            src={promoImage} // Передайте переменную с путем к изображению в качестве src
            alt="First slide"
          />
        </div>
        <Carousel.Caption>
          <h3 className="welcome-text">Добро пожаловать, в один из крупнейших магазинов корейской косметики в городе Якутске!</h3>
          </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="image-container">
          <img
            className="d-block w-100"
            src={promoImage2} // Передайте переменную с путем к изображению в качестве src
            alt="Second slide"
          />
        </div>
        <Carousel.Caption>
          <h3></h3>
          
        </Carousel.Caption>
      </Carousel.Item>
      
    </Carousel>
  );
}

export default UncontrolledExample;

