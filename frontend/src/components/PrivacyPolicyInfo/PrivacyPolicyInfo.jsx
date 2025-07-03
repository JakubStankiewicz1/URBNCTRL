import React, { useState } from "react";
import "./privacyPolicyInfo.css";

const ACCORDION_DATA = [
  {
    title: "PERSONAL IDENTIFICATION INFORMATION",
    content:
      "We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, register on the site, place an order, subscribe to our newsletter, respond to a survey, fill out a form, and in connection with other activities, services, features or resources we make available on our Site. Users may be asked for, as appropriate, name, email address, mailing address, phone number, credit card information. Users may, however, visit our Site anonymously. We will collect personal identification information from Users only if they voluntarily submit such information to us. Users can always refuse to supply personally identification information, except that it may prevent them from engaging in certain Site related activities.",
  },
  {
    title: "NON-PERSONAL IDENTIFICATION INFORMATION",
    content:
      "We may collect non-personal identification information about Users whenever they interact with our Site. Non-personal identification information may include the browser name, the type of computer and technical information about Users means of connection to our Site, such as the operating system and the Internet service providers utilized and other similar information.",
  },
  {
    title: "WEB BROWSER COOKIES",
    content:
      'Our Site may use "cookies" to enhance User experience. User\'s web browser places cookies on their hard drive for record-keeping purposes and sometimes to track information about them. User may choose to set their web browser to refuse cookies, or to alert you when cookies are being sent. If they do so, note that some parts of the Site may not function properly.',
  },
  {
    title: "HOW WE USE COLLECTED INFORMATION",
    content:
      "URBNCTRL may collect and use Users personal information for the following purposes: to improve customer service, to personalize user experience, to improve our Site, to process payments, to send periodic emails about new products and updates, and to run a promotion, contest, survey or other Site feature. We may use the email address to respond to their inquiries, questions, and/or other requests.",
  },
  {
    title: "HOW WE PROTECT YOUR INFORMATION",
    content:
      "We adopt appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal information, username, password, transaction information and data stored on our Site. Our Site is protected by SSL security technology.",
  },
  {
    title: "SHARING YOUR PERSONAL INFORMATION",
    content:
      "We do not sell, trade, or rent Users personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates and advertisers for the purposes outlined above.",
  },
];

const PrivacyPolicyInfo = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="privacyPolicyInfo">
      <div className="privacyPolicyInfoContainer">
        <div className="privacyPolicyInfoContainerDiv">
          {ACCORDION_DATA.map((item, idx) => (
            <div
              key={idx}
              className={`privacyPolicyInfoAccordion${
                openIndex === idx ? " open" : ""
              }`}
            >
              <div
                className="privacyPolicyInfoAccordionHeader"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <div className="privacyPolicyInfoAccordionTitle">
                  {item.title}
                </div>
                <div
                  className={`privacyPolicyInfoAccordionIcon${
                    openIndex === idx ? " open" : ""
                  }`}
                >
                  <div className="privacyPolicyInfoAccordionIconHorizontal" />
                  <div className="privacyPolicyInfoAccordionIconVertical" />
                </div>
              </div>
              <div
                className="privacyPolicyInfoAccordionContentWrapper"
                style={{ maxHeight: openIndex === idx ? "500px" : "0" }}
              >
                <div className="privacyPolicyInfoAccordionContent">
                  {item.content}
                </div>
              </div>
              <div className="privacyPolicyInfoAccordionDivider" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyInfo;
