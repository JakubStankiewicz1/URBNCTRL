import React from "react";
import "./privacyPolicyHeader.css";

const PrivacyPolicyHeader = () => {
  return (
    <div className="privacyPolicyHeader">
      <div className="privacyPolicyHeaderContainer">
        {/* Top Part */}
        <div className="privacyPolicyHeaderContainerTop">
          <div className="privacyPolicyHeaderContainerTopContainer">
            <p className="privacyPolicyHeaderContainerTopContainerText nunito-sans-regular">
              PRIVACY POLICY
            </p>
          </div>
        </div>

        {/* Bottom Part */}
        <div className="privacyPolicyHeaderContainerBottom">
          <div className="privacyPolicyHeaderContainerBottomContainer">
            <p className="privacyPolicyHeaderContainerBottomContainerText nunito-sans-regular">
              This Privacy Policy governs the manner in which URBNCTRL
              collects, uses, maintains and discloses information collected from
              users (each, a "User") of the www.urbnctrl.studio website
              ("Site"). This privacy policy applies to the Site and all products
              and services offered by URBNCTRL.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyHeader;
