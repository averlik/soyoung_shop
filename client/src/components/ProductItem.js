
// // import React, { useContext } from 'react';
// // import { Col, Card, Image } from 'react-bootstrap';
// // import { useNavigate } from 'react-router-dom';
// // import { PRODUCT_ROUTE } from '../utils/consts';
// // import { observer } from 'mobx-react-lite';
// // import { Context } from '../index';
// // import './css/catalog.css'

// // const ProductItem = observer(({ product, isAdmin }) => {
// //   const navigate = useNavigate();
// //   const { user } = useContext(Context);


// //       const truncateText = (text, maxLength) => {
// //         if (text.length > maxLength) {
// //             return text.substring(0, maxLength) + '...';
// //         } else {
// //             return text;
// //         }
// //     };

// //     const formatPrice = (price, discount) => {
// //         if (discount > 0) {
// //             const discountedPrice = Math.ceil(price * (1 - discount / 100));
// //             return (
// //                 <div style={{ display: 'flex', alignItems: 'center' }}>
// //                     <div style={{ textDecoration: 'line-through', color: 'gray', marginRight: 5 }}>{price} руб</div>
// //                     <div style={{ fontWeight: 'bold', fontSize: 18 }}>{discountedPrice.toFixed(0)} руб</div>
// //                 </div>
// //             );
// //         } else {
// //             return <div style={{ fontWeight: 'bold', fontSize: 18 }}>{Math.ceil(price)} руб</div>;
// //         }
// //     };

// //   const getOverlayText = () => {
// //     if (user.isAdmin && product.quantity <= 0) {
// //       return 'Товар закончился';
// //     } else if (user.isAdmin && product.published == 0) {
// //       return 'Товар скрыт';
// //     }
// //     return null;
// //   };

// //   const overlayText = getOverlayText();

// //   return (
// //     <Col md={4} className="mt-4">
// //       <Card
// //         style={{ width: 300, height: 480, cursor: 'pointer', position: 'relative' }}
// //         border={'light'}
// //         onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id_product)}
// //       >
// //         {overlayText && (
// //            <div
// //            style={{
// //              position: 'absolute',
// //              top: 0,
// //              right: 0, 
// //              backgroundColor: 'rgba(0, 0, 0, 0.5)',
// //              color: 'white',
// //              padding: '5px',
// //              zIndex: 1,
// //            }}
// //          >
// //             {overlayText}
// //           </div>
// //         )}
// //         {product.sale > 0 && (
// //           <div
// //             style={{
// //               position: 'absolute',
// //               top: 0,
// //               left: 0,
// //               backgroundColor: '#CAD3BF',
// //               color: 'black',
// //               padding: '5px',
// //               width:'70px',
// //               zIndex: 1,
// //               textAlign:'center',
// //               fontSize:'20px'
// //             }}
// //           >
// //             {product.sale}%
// //           </div>
// //         )}
// //         {product.new_status == 1 && (
// //           <div
// //             style={{
// //               position: 'absolute',
// //               top: 0,
// //               left: 0,
// //               backgroundColor: '#CAD3BF',
// //               color: 'black',
// //               padding: '5px',
// //               width:'70px',
// //               zIndex: 1,
// //               textAlign:'center',
// //               fontSize:'20px'
// //             }}
// //           >
// //             NEW
// //           </div>
// //         )}
// //         <Image
// //          className="product-item-image"
// //          width={300} height={350}
// //           src={process.env.REACT_APP_API_URL + product.image} />
// //         <div className="text-black-70 mt-1 d-flex justify-content-between align-items-center">
// //           <div style={{ fontSize: 14 }}>{truncateText(product.ru_product_name, 80)}</div>
// //         </div>
// //         <div style={{ fontWeight: 'bold', fontSize: 15 }}>{truncateText(product.eng_product_name, 80)}</div>
// //         <div
// //           className="d-flex align-items-center justify-content-between"
// //           style={{ position: 'absolute', bottom: '5px', width: '90%' }}
// //         >
// //           {formatPrice(product.price, product.sale)}
// //         </div>
// //       </Card>
// //     </Col>
// //   );
// // });

// // export default ProductItem;


// import React, { useContext } from 'react';
// import { Card, Image } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { PRODUCT_ROUTE } from '../utils/consts';
// import { observer } from 'mobx-react-lite';
// import { Context } from '../index';
// import './css/catalog.css';

// const ProductItem = observer(({ product, isAdmin }) => {
//   const navigate = useNavigate();
//   const { user } = useContext(Context);

//   const truncateText = (text, maxLength) => {
//     if (text.length > maxLength) {
//       return text.substring(0, maxLength) + '...';
//     } else {
//       return text;
//     }
//   };

//   const formatPrice = (price, discount) => {
//     if (discount > 0) {
//       const discountedPrice = Math.ceil(price * (1 - discount / 100));
//       return (
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           <div style={{ textDecoration: 'line-through', color: 'gray', marginRight: 5 }}>{price} руб</div>
//           <div style={{ fontWeight: 'bold', fontSize: 18 }}>{discountedPrice.toFixed(0)} руб</div>
//         </div>
//       );
//     } else {
//       return <div style={{ fontWeight: 'bold', fontSize: 18 }}>{Math.ceil(price)} руб</div>;
//     }
//   };

//   const getOverlayText = () => {
//     if (user.isAdmin && product.quantity <= 0) {
//       return 'Товар закончился';
//     } else if (user.isAdmin && product.published === 0) {
//       return 'Товар скрыт';
//     }
//     return null;
//   };

//   const overlayText = getOverlayText();

//   return (
//     <Card
//       className="product-item-card"
//       style={{ width: '100%', height: '100%', cursor: 'pointer', position: 'relative' }}
//       border={'light'}
//       onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id_product)}
//     >
//       {overlayText && (
//         <div
//           style={{
//             position: 'absolute',
//             top: 0,
//             right: 0,
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             color: 'white',
//             padding: '5px',
//             zIndex: 1,
//           }}
//         >
//           {overlayText}
//         </div>
//       )}
//       {product.sale > 0 && (
//         <div
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             backgroundColor: '#CAD3BF',
//             color: 'black',
//             padding: '5px',
//             width: '70px',
//             zIndex: 1,
//             textAlign: 'center',
//             fontSize: '20px'
//           }}
//         >
//           {product.sale}%
//         </div>
//       )}
//       {product.new_status === 1 && (
//         <div
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             backgroundColor: '#CAD3BF',
//             color: 'black',
//             padding: '5px',
//             width: '70px',
//             zIndex: 1,
//             textAlign: 'center',
//             fontSize: '20px'
//           }}
//         >
//           NEW
//         </div>
//       )}
//       <Image
//         className="product-item-image"
//         width="100%" height="auto"
//         src={process.env.REACT_APP_API_URL + product.image}
//       />
//       <div className="text-black-70 mt-1 d-flex justify-content-between align-items-center">
//         <div style={{ fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
//           {truncateText(product.ru_product_name, 80)}
//         </div>
//       </div>
//       <div style={{ fontWeight: 'bold', fontSize: 15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
//         {truncateText(product.eng_product_name, 80)}
//       </div>
//       <div
//         className="d-flex align-items-center justify-content-between"
//         style={{ position: 'absolute', bottom: '5px', width: '90%' }}
//       >
//         {formatPrice(product.price, product.sale)}
//       </div>
//     </Card>
//   );
// });

// export default ProductItem;
import React, { useContext } from 'react';
import { Card, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import './css/catalog.css';

const ProductItem = observer(({ product, isAdmin }) => {
  const navigate = useNavigate();
  const { user } = useContext(Context);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } else {
      return text;
    }
  };

  const formatPrice = (price, discount) => {
    if (discount > 0) {
      const discountedPrice = Math.ceil(price * (1 - discount / 100));
      return (
        <div className="price-container">
          <div className="original-price">{price} руб</div>
          <div className="discounted-price">{discountedPrice.toFixed(0)} руб</div>
        </div>
      );
    } else {
      return <div className="discounted-price">{Math.ceil(price)} руб</div>;
    }
  };

  const getOverlayText = () => {
    if (user.isAdmin && product.quantity <= 0) {
      return 'Товар закончился';
    } else if (user.isAdmin && product.published === 0) {
      return 'Товар скрыт';
    }
    return null;
  };

  const overlayText = getOverlayText();

  return (
    <Card
      className="product-item-card"
      onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id_product)}
    >
      {overlayText && (
        <div className="overlay-text">{overlayText}</div>
      )}
      {product.sale > 0 && (
        <div className="sale-badge">{product.sale}%</div>
      )}
      {product.new_status == 1 &&(
        <div className="new-badge">NEW</div>
      )}
      <Image
        className="product-item-image"
        src={process.env.REACT_APP_API_URL + product.image}
      />
      <div className="product-details">
        <div className="product-name-ru">{truncateText(product.ru_product_name, 80)}</div>
        <div className="product-name-eng">{truncateText(product.eng_product_name, 80)}</div>
        {formatPrice(product.price, product.sale)}
      </div>
    </Card>
  );
});

export default ProductItem;

