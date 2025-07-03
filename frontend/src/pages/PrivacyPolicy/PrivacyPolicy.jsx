import React from "react";
import "./privacyPolicy.css";
import PrivacyPolicyHeader from "../../components/PrivacyPolicyHeader/PrivacyPolicyHeader";
import PrivacyPolicyInfo from "../../components/PrivacyPolicyInfo/PrivacyPolicyInfo";
import PrivacyPolicyFotter from "../../components/PrivacyPolicyFotter/PrivacyPolicyFotter";

const PrivacyPolicy = () => {
  return (
    <div className="privacyPolicy">
      <PrivacyPolicyHeader />
      <PrivacyPolicyInfo />
      <PrivacyPolicyFotter />
    </div>
  );
};

export default PrivacyPolicy;
