import React, { useContext } from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { observer } from 'mobx-react-lite';
import geoImg from '../../img/icons/geo.png'
import { Context } from "../..";
import { useNavigate } from 'react-router-dom';
import { FaWhatsapp } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { SlSocialVkontakte } from "react-icons/sl";
import Img from "../../img/clever.png"

const Footer = observer(() => {
  const { products } = useContext(Context);
  const navigate = useNavigate();

  const handleAllProductClick = () => {
    products.setSelectedSections(0);
    products.setSelectedCategories(0);
    products.setSelectedSubcategories(0);
    products.setSelectedBrand(0);
    localStorage.setItem("catalogFilters", JSON.stringify({
      selectedSections: 0,
      selectedCategories: 0,
      selectedSubcategories: 0,
      selectedBrand: 0
    }));
    navigate('/catalog');
  };

  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted mt-5'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="3" xl="3" className='mb-4'>
              <h5 className='text-uppercase fw-bold mb-4'>Навигация</h5>
              <p>
                <a className='text-reset' onClick={handleAllProductClick}>
                  Каталог
                </a>
              </p>
              <p>
                <a href="/brands" className='text-reset'>
                  Бренды
                </a>
              </p>
              <p>
                <a href='/aboutus' className='text-reset'>
                  О нас
                </a>
              </p>
              <p>
                <a href='/new' className='text-reset'>
                  Новинки
                </a>
              </p>
              <p>
                <a href='/sale' className='text-reset'>
                  Скидки
                </a>
              </p>
            </MDBCol>

    
            <MDBCol md="4" lg="4" xl="3" className='mb-4'>
              <h5 className='text-uppercase fw-bold mb-4'>Контакты:</h5>
              <p className="text-start">
                <a href='https://vk.com/soyoung_ykt?tpclid=facebook.PAZXh0bgNhZW0CMTEAAabnJdD4CJoQMGkRyoXze5scUakDLRajDtFizjpaYs6SIL-Y73-X76Y0BSI_aem_ARGSxAiHPo_Ue6JCwzK0CVa7PYvit4lyNu8fTyBdcExSvB_2lJs4lyp5V3Mlz7Li0epTxsWu6NVpJ7juDJMadon3' target="_blank" rel="noopener noreferrer" style={{ color: 'black' }}>
                  <SlSocialVkontakte style={{ height: "30px", width: "30px", marginRight: "10px" }} />
                  Наша группа Вконтакте
                </a>
              </p>
              <p className="text-start">
                <a href='https://t.me/soyoung_ykt' target="_blank" rel="noopener noreferrer" style={{ color: 'black' }}>
                  <FaTelegram style={{ height: "30px", width: "30px", marginRight: "10px" }} />
                  Наш Telegram-канал
                </a>
              </p>
              <p className="text-start">
                <a href='https://api.whatsapp.com/send/?phone=79142336784&text&type=phone_number&app_absent=0' target="_blank" rel="noopener noreferrer" style={{ color: 'black' }}>
                  <FaWhatsapp style={{ height: "30px", width: "30px", marginRight: "10px" }} />
                  Написать в Whatsapp
                </a>
              </p>
            </MDBCol>

            <MDBCol md="5" lg="5" xl="3" className='mb-4'>
              <h5 className='text-uppercase fw-bold mb-4'>Наши магазины</h5>
              <p className="text-start">
                <a href='https://go.2gis.com/s8ytz' style={{ color: 'black'}}>
                  <img src={geoImg} alt="Geo" className="geo-icon" />
                  ЦУМ Якутск Улица Курашова, 4;
                </a>
              </p>
              <p className="text-start">
                <a href='https://go.2gis.com/i6giu' style={{ color: 'black' }}>
                  <img src={geoImg} alt="Geo" className="geo-icon" />
                  Проспект Ленина, 16; 1 этаж;
                </a>
              </p>
              <p className="text-start">
                <a href='https://go.2gis.com/wzcay' style={{ color: 'black' }}>
                  <img src={geoImg} alt="Geo" className="geo-icon" />
                  Улица Петровского, 12; 1 этаж;
                </a>
              </p>
            </MDBCol>

            <MDBCol md="5" lg="5" xl="3" className='mb-4'style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <img src={Img} style={{ height:"160px", width:" 160px", marginBottom:"45px"}}  />

            </MDBCol>

          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        SoYoung @ 2024
      </div>
    </MDBFooter>
  );
})

export default Footer;



