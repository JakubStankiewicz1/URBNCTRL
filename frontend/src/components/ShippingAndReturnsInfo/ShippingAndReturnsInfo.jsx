import React from 'react';
import "./shippingAndReturnsInfo.css";
import { useState } from "react";


const ACCORDION_DATA = [
  {
    title: "PERSONAL IDENTIFICATION INFORMATION",
    content:
      "We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, register on the site, place an order, subscribe to the newsletter, respond to a survey, fill out a form, and in connection with other activities, services, features or resources we make available on our Site. Users may be asked for, as appropriate, name, email address, mailing address, phone number, credit card information. Users may, however, visit our Site anonymously. We will collect personal identification information from Users only if they voluntarily submit such information to us. Users can always refuse to supply personally identification information, except that it may prevent them from engaging in certain Site related activities.",
  },
  {
    title: "NON-PERSONAL IDENTIFICATION INFORMATION",
    content:
      "We may collect non-personal identification information about Users whenever they interact with our Site. Non-personal identification information may include the browser name, the type of computer and technical information about Users means of connection to our Site, such as the operating system and the Internet service providers utilized and other similar information.",
  },
  {
    title: "WEB BROWSER COOKIES",
    content:
      "Our Site may use \"cookies\" to enhance User experience. User's web browser places cookies on their hard drive for record-keeping purposes and sometimes to track information about them. User may choose to set their web browser to refuse cookies, or to alert you when cookies are being sent. If they do so, note that some parts of the Site may not function properly.",
  },
];


const ShippingAndReturnsInfo = () => {
    const [openIndex, setOpenIndex] = useState(null);



  return (






        <div className="shippingAndReturnsInfo">
      <div className="shippingAndReturnsInfoContainer">
        <div className="shippingAndReturnsInfoContainerDiv">
          {ACCORDION_DATA.map((item, idx) => (
            <div
              key={idx}
              className={`shippingAndReturnsInfoAccordion${
                openIndex === idx ? " open" : ""
              }`}
            >
              <div
                className="shippingAndReturnsInfoAccordionHeader"
                onClick={() =>
                  setOpenIndex(openIndex === idx ? null : idx)
                }
              >
                <div className="shippingAndReturnsInfoAccordionTitle">
                  {item.title}
                </div>
                <div
                  className={`shippingAndReturnsInfoAccordionIcon${
                    openIndex === idx ? " open" : ""
                  }`}
                >
                  <div className="shippingAndReturnsInfoAccordionIconHorizontal" />
                  <div className="shippingAndReturnsInfoAccordionIconVertical" />
                </div>
              </div>
              <div
                className="shippingAndReturnsInfoAccordionContentWrapper"
                style={{ maxHeight: openIndex === idx ? "500px" : "0" }}
              >
                <div className="shippingAndReturnsInfoAccordionContent">
                  {item.content}
                </div>
              </div>
              <div className="shippingAndReturnsInfoAccordionDivider" />
            </div>
          ))}
        </div>
      </div>
    </div>





        
  )




}

export default ShippingAndReturnsInfo