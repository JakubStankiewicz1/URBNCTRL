import React from 'react';
import "./shippingAndReturns.css";
import ShippingAndReturnsHero from '../../components/ShippingAndReturnsHero/ShippingAndReturnsHero';
import ShippingAndReturnsInfo from '../../components/ShippingAndReturnsInfo/ShippingAndReturnsInfo';

const ShippingAndReturns = () => {
  return (
    <div className='shippingAndReturns'>
        <ShippingAndReturnsHero />
        <ShippingAndReturnsInfo />
    </div>
  )
}

export default ShippingAndReturns