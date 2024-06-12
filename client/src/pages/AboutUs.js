// // import React, { useContext, useEffect } from "react";
// // import { Container } from "react-bootstrap";
// // import {Row, Col,Image} from 'react-bootstrap';
// // import { observer } from 'mobx-react-lite';
// // import { Context } from '..';
// // import FeedbackForm from '../components/FeedbackForm'
// // import Advertising from "../components/HomePage/Advertising";
// // import DiscountProducts from "../components/HomePage/DiscountProducts"
// // import AboutImg from "../img/aboutUs.png"
// // import AboutImg2 from "../img/aboutUs2.png"
// // import geoImg from '../img/icons/geo.png'
// // import { FaWhatsapp } from "react-icons/fa6";
// // import { FaTelegram } from "react-icons/fa";
// // import { SlSocialVkontakte } from "react-icons/sl";

// // const AboutUs =observer(()=>{

// //     return (
// //         <Container className="mt-4">
// //         <Row>
        
// //         <Col md={6}>
// //           <Image className='mb-3' width={640} height={450} src={AboutImg} />
// //         </Col>
// //          <Col md={6}>
// //          <div>
        
// //         <h4>So Young — это один из крупнейших магазинов корейской косметики в городе Якутске!</h4>
            
// //         <h5 style={{marginTop:"10px"}}>Компания предлагает жителям Якутска ознакомиться с традициями ухода по-корейски. 
// //             Сохрани свою молодость и красоту вместе с So Young!
// //         </h5>
        
// //         <p  style={{marginTop:"15px"}}><strong> Наши преимущества:</strong></p>
        
// //             <li>Только качественная оригинальная продукция</li>
// //             <li>Широкий выбор косметических средств, более 8000 наименований</li>
// //             <li>Доступные цены на все средства любимых брендов</li>
// //             <li>Консультирование от опытных сотрудников, индивидуальный подбор уходовых средств для каждого</li>
// //             <li>Бонусная программа для лояльных клиентов</li>
// //             <li>Регулярные скидки и акции</li>
                
// //         </div>
// //         </Col>
        
// //         <Col md={6} className="mt-3">
// //          <div>
// //         <h4 className='fw-bold mb-4'>Наши адреса:</h4>
            
// //                 <p className="text-start" >
// //                     <a href='https://go.2gis.com/s8ytz' style={{color:'black'}}>
// //                     <img src={geoImg} alt="Geo" className="geo-icon"  style={{ marginRight:"5px"}} />
// //                     ЦУМ Якутск Улица Курашова, 4;
// //                     </a>
// //                 </p>
// //                 <p className="text-start">
// //                     <a href='https://go.2gis.com/i6giu' style={{color:'black'}}>
// //                     <img src={geoImg} alt="Geo" className="geo-icon" style={{ marginRight:"5px"}} />
// //                     Проспект Ленина, 16; 1 этаж;
// //                     </a>
// //                 </p>
// //                 <p className="text-start">
// //                     <a href='https://go.2gis.com/wzcay' style={{color:'black'}}>
// //                     <img src={geoImg} alt="Geo" className="geo-icon" style={{ marginRight:"5px"}}/>
// //                     Улица Петровского, 12; 1 этаж; 
// //                     </a>
// //                 </p>  

// //                 <h4 className='fw-bold mb-4 mt-4'>Контакты:</h4>
            
// //                 <p className="text-start" >
// //                     <a href='https://vk.com/soyoung_ykt?tpclid=facebook.PAZXh0bgNhZW0CMTEAAabnJdD4CJoQMGkRyoXze5scUakDLRajDtFizjpaYs6SIL-Y73-X76Y0BSI_aem_ARGSxAiHPo_Ue6JCwzK0CVa7PYvit4lyNu8fTyBdcExSvB_2lJs4lyp5V3Mlz7Li0epTxsWu6NVpJ7juDJMadon3' style={{color:'black'}}>
// //                     <SlSocialVkontakte style={{height:"30px", width:"30px", marginRight:"10px"}}/>
// //                      Вконтакте
// //                     </a>
// //                 </p>
// //                 <p className="text-start">
// //                     <a href='https://t.me/soyoung_ykt?tpclid=facebook.PAZXh0bgNhZW0CMTEAAabnJdD4CJoQMGkRyoXze5scUakDLRajDtFizjpaYs6SIL-Y73-X76Y0BSI_aem_ARGSxAiHPo_Ue6JCwzK0CVa7PYvit4lyNu8fTyBdcExSvB_2lJs4lyp5V3Mlz7Li0epTxsWu6NVpJ7juDJMadon3' style={{color:'black'}}>
// //                     <FaTelegram style={{height:"30px", width:"30px", marginRight:"10px"}}/>
// //                      Telegram
// //                     </a>
// //                 </p>
// //                 <p className="text-start">
// //                     <a href='https://api.whatsapp.com/send/?phone=79142336784&text&type=phone_number&app_absent=0' style={{color:'black'}}>
// //                     <FaWhatsapp style={{height:"30px", width:"30px", marginRight:"10px"}}/>
// //                         Whatsapp
// //                     </a>
// //                 </p>    
// //         </div>
// //         </Col>
// //         <Col md={6}>
// //           <Image className='mb-3' width={500} height={450} src={AboutImg2} />
// //         </Col>
// //         </Row>
// //         </Container>
// //     );
// // });

// // export default AboutUs;

// import React from "react";
// import { Container, Row, Col, Image } from "react-bootstrap";
// import { observer } from 'mobx-react-lite';
// import { Context } from '..';
// import FeedbackForm from '../components/FeedbackForm';
// import Advertising from "../components/HomePage/Advertising";
// import DiscountProducts from "../components/HomePage/DiscountProducts";
// import AboutImg from "../img/aboutUs.png";
// import AboutImg2 from "../img/aboutUs2.png";
// import geoImg from '../img/icons/geo.png';
// import { FaWhatsapp } from "react-icons/fa";
// import { FaTelegram } from "react-icons/fa";
// import { SlSocialVkontakte } from "react-icons/sl";

// const AboutUs = observer(() => {
//   return (
//     <Container className="mt-4">
//       <Row>
//         <Col md={6}>
//           <Image className='mb-3' fluid src={AboutImg} alt="About Us" />
//         </Col>
//         <Col md={6}>
//           <div>
//             <h4>So Young — это один из крупнейших магазинов корейской косметики в городе Якутске!</h4>
//             <h5 style={{ marginTop: "10px" }}>
//               Компания предлагает жителям Якутска ознакомиться с традициями ухода по-корейски. Сохрани свою молодость и красоту вместе с So Young!
//             </h5>
//             <p style={{ marginTop: "15px" }}><strong>Наши преимущества:</strong></p>
//             <ul>
//               <li>Только качественная оригинальная продукция</li>
//               <li>Широкий выбор косметических средств, более 8000 наименований</li>
//               <li>Доступные цены на все средства любимых брендов</li>
//               <li>Консультирование от опытных сотрудников, индивидуальный подбор уходовых средств для каждого</li>
//               <li>Бонусная программа для лояльных клиентов</li>
//               <li>Регулярные скидки и акции</li>
//             </ul>
//           </div>
//         </Col>

//         <Col md={6} className="mt-3">
//           <div>
//             <h4 className='fw-bold mb-4'>Наши адреса:</h4>
//             <p className="text-start">
//               <a href='https://go.2gis.com/s8ytz' style={{ color: 'black' }}>
//                 <img src={geoImg} alt="Geo" className="geo-icon" style={{ marginRight: "5px" }} />
//                 ЦУМ Якутск, Курашова, 4;
//               </a>
//             </p>
//             <p className="text-start">
//               <a href='https://go.2gis.com/i6giu' style={{ color: 'black' }}>
//                 <img src={geoImg} alt="Geo" className="geo-icon" style={{ marginRight: "5px" }} />
//                 Проспект Ленина, 16; 1 этаж;
//               </a>
//             </p>
//             <p className="text-start">
//               <a href='https://go.2gis.com/wzcay' style={{ color: 'black' }}>
//                 <img src={geoImg} alt="Geo" className="geo-icon" style={{ marginRight: "5px" }} />
//                 Улица Петровского, 12; 1 этаж;
//               </a>
//             </p>

//             <h4 className='fw-bold mb-4 mt-4'>Контакты:</h4>
//             <p className="text-start">
//               <a href='https://vk.com/soyoung_ykt?tpclid=facebook.PAZXh0bgNhZW0CMTEAAabnJdD4CJoQMGkRyoXze5scUakDLRajDtFizjpaYs6SIL-Y73-X76Y0BSI_aem_ARGSxAiHPo_Ue6JCwzK0CVa7PYvit4lyNu8fTyBdcExSvB_2lJs4lyp5V3Mlz7Li0epTxsWu6NVpJ7juDJMadon3' style={{ color: 'black' }}>
//                 <SlSocialVkontakte style={{ height: "30px", width: "30px", marginRight: "10px" }} />
//                 Вконтакте
//               </a>
//             </p>
//             <p className="text-start">
//               <a href='https://t.me/soyoung_ykt?tpclid=facebook.PAZXh0bgNhZW0CMTEAAabnJdD4CJoQMGkRyoXze5scUakDLRajDtFizjpaYs6SIL-Y73-X76Y0BSI_aem_ARGSxAiHPo_Ue6JCwzK0CVa7PYvit4lyNu8fTyBdcExSvB_2lJs4lyp5V3Mlz7Li0epTxsWu6NVpJ7juDJMadon3' style={{ color: 'black' }}>
//                 <FaTelegram style={{ height: "30px", width: "30px", marginRight: "10px" }} />
//                 Telegram
//               </a>
//             </p>
//             <p className="text-start">
//               <a href='https://api.whatsapp.com/send/?phone=79142336784&text&type=phone_number&app_absent=0' style={{ color: 'black' }}>
//                 <FaWhatsapp style={{ height: "30px", width: "30px", marginRight: "10px" }} />
//                 Whatsapp
//               </a>
//             </p>
//           </div>
//         </Col>

//         <Col md={6}>
//           <Image className='mb-3' fluid src={AboutImg2} alt="About Us 2" />
//         </Col>
//       </Row>
//     </Container>
//   );
// });

// export default AboutUs;

// import React from "react";
// import { Container, Row, Col, Image } from "react-bootstrap";
// import { observer } from 'mobx-react-lite';
// import AboutImg from "../img/aboutUs.png";
// import AboutImg2 from "../img/aboutUs2.png";
// import geoImg from '../img/icons/geo.png';
// import { FaWhatsapp } from "react-icons/fa";
// import { FaTelegram } from "react-icons/fa";
// import { SlSocialVkontakte } from "react-icons/sl";
// import '../styles/About.css';  

// const AboutUs = observer(() => {
//   return (
//     <Container className="mt-4 about-us-container">
//       <Row>
//         <Col md={6}>
//           <Image className='mb-3' fluid src={AboutImg} alt="About Us" />
//         </Col>
//         <Col md={6}>
//           <div>
//             <h4>So Young — это один из крупнейших магазинов корейской косметики в городе Якутске!</h4>
//             <h5 style={{ marginTop: "10px" }}>
//               Компания предлагает жителям Якутска ознакомиться с традициями ухода по-корейски. Сохрани свою молодость и красоту вместе с So Young!
//             </h5>
//             <p style={{ marginTop: "15px" }}><strong>Наши преимущества:</strong></p>
//             <ul>
//               <li>Только качественная оригинальная продукция</li>
//               <li>Широкий выбор косметических средств, более 8000 наименований</li>
//               <li>Доступные цены на все средства любимых брендов</li>
//               <li>Консультирование от опытных сотрудников, индивидуальный подбор уходовых средств для каждого</li>
//               <li>Бонусная программа для лояльных клиентов</li>
//               <li>Регулярные скидки и акции</li>
//             </ul>
//           </div>
//         </Col>

//         <Col md={6} className="mt-3">
//           <div>
//             <h4 className='fw-bold mb-4'>Наши адреса:</h4>
//             <p className="text-start">
//               <a href='https://go.2gis.com/s8ytz' target="_blank" rel="noopener noreferrer" style={{ color: 'black' }}>
//                 <img src={geoImg} alt="Geo" className="geo-icon" style={{ marginRight: "5px" }} />
//                 ЦУМ Якутск Улица Курашова, 4;
//               </a>
//             </p>
//             <p className="text-start">
//               <a href='https://go.2gis.com/i6giu' target="_blank" rel="noopener noreferrer" style={{ color: 'black' }}>
//                 <img src={geoImg} alt="Geo" className="geo-icon" style={{ marginRight: "5px" }} />
//                 Проспект Ленина, 16; 1 этаж;
//               </a>
//             </p>
//             <p className="text-start">
//               <a href='https://go.2gis.com/wzcay' target="_blank" rel="noopener noreferrer" style={{ color: 'black' }}>
//                 <img src={geoImg} alt="Geo" className="geo-icon" style={{ marginRight: "5px" }} />
//                 Улица Петровского, 12; 1 этаж;
//               </a>
//             </p>

//             <h4 className='fw-bold mb-4 mt-4'>Контакты:</h4>
//             <p className="text-start">
//               <a href='https://vk.com/soyoung_ykt?tpclid=facebook.PAZXh0bgNhZW0CMTEAAabnJdD4CJoQMGkRyoXze5scUakDLRajDtFizjpaYs6SIL-Y73-X76Y0BSI_aem_ARGSxAiHPo_Ue6JCwzK0CVa7PYvit4lyNu8fTyBdcExSvB_2lJs4lyp5V3Mlz7Li0epTxsWu6NVpJ7juDJMadon3' target="_blank" rel="noopener noreferrer" style={{ color: 'black' }}>
//                 <SlSocialVkontakte style={{ height: "30px", width: "30px", marginRight: "10px" }} />
//                 Вконтакте
//               </a>
//             </p>
//             <p className="text-start">
//               <a href='https://t.me/soyoung_ykt?tpclid=facebook.PAZXh0bgNhZW0CMTEAAabnJdD4CJoQMGkRyoXze5scUakDLRajDtFizjpaYs6SIL-Y73-X76Y0BSI_aem_ARGSxAiHPo_Ue6JCwzK0CVa7PYvit4lyNu8fTyBdcExSvB_2lJs4lyp5V3Mlz7Li0epTxsWu6NVpJ7juDJMadon3' target="_blank" rel="noopener noreferrer" style={{ color: 'black' }}>
//                 <FaTelegram style={{ height: "30px", width: "30px", marginRight: "10px" }} />
//                 Telegram
//               </a>
//             </p>
//             <p className="text-start">
//               <a href='https://api.whatsapp.com/send/?phone=79142336784&text&type=phone_number&app_absent=0' target="_blank" rel="noopener noreferrer" style={{ color: 'black' }}>
//                 <FaWhatsapp style={{ height: "30px", width: "30px", marginRight: "10px" }} />
//                 Whatsapp
//               </a>
//             </p>
//           </div>
//         </Col>

//         <Col md={6}>
//           <Image className='mb-3' fluid src={AboutImg2} alt="About Us 2" />
//         </Col>
//       </Row>
//     </Container>
//   );
// });

// export default AboutUs;

import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { observer } from 'mobx-react-lite';
import AboutImg from "../img/aboutUs.png";
import AboutImg2 from "../img/aboutUs2.png";
import geoImg from '../img/icons/geo.png';
import { FaWhatsapp } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { SlSocialVkontakte } from "react-icons/sl";
import '../styles/About.css';  

const AboutUs = observer(() => {
  return (
    <Container className="mt-4 about-us-container">
      <Row>
        <Col md={6} className="order-md-1 order-1">
          <Image className='mb-3' fluid src={AboutImg} alt="About Us" />
        </Col>
        <Col md={6} className="order-md-2 order-2">
          <div>
            <h4>So Young — это один из крупнейших магазинов корейской косметики в городе Якутске!</h4>
            <h5 style={{ marginTop: "10px" }}>
              Компания предлагает жителям Якутска ознакомиться с традициями ухода по-корейски. Сохрани свою молодость и красоту вместе с So Young!
            </h5>
            <p style={{ marginTop: "15px" }}><strong>Наши преимущества:</strong></p>
            <ul>
              <li>Только качественная оригинальная продукция</li>
              <li>Широкий выбор косметических средств, более 8000 наименований</li>
              <li>Доступные цены на все средства любимых брендов</li>
              <li>Консультирование от опытных сотрудников, индивидуальный подбор уходовых средств для каждого</li>
              <li>Бонусная программа для лояльных клиентов</li>
              <li>Регулярные скидки и акции</li>
            </ul>
          </div>
        </Col>

        <Col md={6} className="mt-2 order-md-3 order-3">
          <div>
            <h4 className='fw-bold mb-4'>Наши адреса:</h4>
            <p className="text-start">
              <a href='https://go.2gis.com/s8ytz' target="_blank" rel="noopener noreferrer" style={{ color: 'black' }}>
                <img src={geoImg} alt="Geo" className="geo-icon" style={{ marginRight: "5px" }} />
                ЦУМ Якутск Улица Курашова, 4;
              </a>
            </p>
            <p className="text-start">
              <a href='https://go.2gis.com/i6giu' target="_blank" rel="noopener noreferrer" style={{ color: 'black' }}>
                <img src={geoImg} alt="Geo" className="geo-icon" style={{ marginRight: "5px" }} />
                Проспект Ленина, 16; 1 этаж;
              </a>
            </p>
            <p className="text-start">
              <a href='https://go.2gis.com/wzcay' target="_blank" rel="noopener noreferrer" style={{ color: 'black' }}>
                <img src={geoImg} alt="Geo" className="geo-icon" style={{ marginRight: "5px" }} />
                Улица Петровского, 12; 1 этаж;
              </a>
            </p>

            <h4 className='fw-bold mb-4 mt-5'>Контакты:</h4>
            <p className="text-start">
              <a href='https://vk.com/soyoung_ykt?tpclid=facebook.PAZXh0bgNhZW0CMTEAAabnJdD4CJoQMGkRyoXze5scUakDLRajDtFizjpaYs6SIL-Y73-X76Y0BSI_aem_ARGSxAiHPo_Ue6JCwzK0CVa7PYvit4lyNu8fTyBdcExSvB_2lJs4lyp5V3Mlz7Li0epTxsWu6NVpJ7juDJMadon3' target="_blank" rel="noopener noreferrer" style={{ color: 'black' }}>
                <SlSocialVkontakte style={{ height: "30px", width: "30px", marginRight: "10px" }} />
                Вконтакте
              </a>
            </p>
            <p className="text-start">
              <a href='https://t.me/soyoung_ykt?tpclid=facebook.PAZXh0bgNhZW0CMTEAAabnJdD4CJoQMGkRyoXze5scUakDLRajDtFizjpaYs6SIL-Y73-X76Y0BSI_aem_ARGSxAiHPo_Ue6JCwzK0CVa7PYvit4lyNu8fTyBdcExSvB_2lJs4lyp5V3Mlz7Li0epTxsWu6NVpJ7juDJMadon3' target="_blank" rel="noopener noreferrer" style={{ color: 'black' }}>
                <FaTelegram style={{ height: "30px", width: "30px", marginRight: "10px" }} />
                Telegram
              </a>
            </p>
            <p className="text-start">
              <a href='https://api.whatsapp.com/send/?phone=79142336784&text&type=phone_number&app_absent=0' target="_blank" rel="noopener noreferrer" style={{ color: 'black' }}>
                <FaWhatsapp style={{ height: "30px", width: "30px", marginRight: "10px" }} />
                Whatsapp
              </a>
            </p>
          </div>
        </Col>

        <Col md={6} className="about-img2 d-none d-md-block order-md-4">
          <Image className='mb-3' fluid src={AboutImg2} alt="About Us 2" />
        </Col>
      </Row>
    </Container>
  );
});

export default AboutUs;
