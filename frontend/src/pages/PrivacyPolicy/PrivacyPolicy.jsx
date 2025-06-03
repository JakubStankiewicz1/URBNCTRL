import React from 'react';
import "./privacyPolicy.css";
import PrivacyPolicyHeader from '../../components/PrivacyPolicyHeader/PrivacyPolicyHeader';
import PrivacyPolicyInfo from '../../components/PrivacyPolicyInfo/PrivacyPolicyInfo';

const PrivacyPolicy = () => {
  return (
    <div className='privacyPolicy'>
        <PrivacyPolicyHeader />
        <PrivacyPolicyInfo />
    </div>
  )
}

export default PrivacyPolicy