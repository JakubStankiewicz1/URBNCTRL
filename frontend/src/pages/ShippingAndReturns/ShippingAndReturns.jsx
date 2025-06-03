import React from 'react';
import "./shippingAndReturns.css";
import ShippingAndReturnsHero from '../../components/ShippingAndReturnsHero/ShippingAndReturnsHero';
import ShippingAndReturnsInfo from '../../components/ShippingAndReturnsInfo/ShippingAndReturnsInfo';
import PrivacyPolicyFotter from '../../components/PrivacyPolicyFotter/PrivacyPolicyFotter';

const ShippingAndReturns = () => {
  return (
    <div className='shippingAndReturns'>
        <ShippingAndReturnsHero />
        <ShippingAndReturnsInfo />
        <PrivacyPolicyFotter />
    </div>
  )
}

export default ShippingAndReturns