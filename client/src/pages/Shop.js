import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import {Row, Col} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import FeedbackForm from '../components/FeedbackForm'
import UncontrolledExample from '../components/HomePage/Carousel'
import Advertising from "../components/HomePage/Advertising";
import DiscountProducts from "../components/HomePage/DiscountProducts"
import "../components/css/Ads.css"

const Shop =observer(()=>{
    const {products}=useContext(Context)

    return (
        <div>
        <UncontrolledExample/>
        
        <Container>
            <DiscountProducts/>
            {/* <Advertising className='ads'/> */}
            <FeedbackForm/> 
        </Container>
        </div>
    );
});

export default Shop;