import React from "react";
import "./shippingAndReturnsInfo.css";
import { useState } from "react";

const ACCORDION_DATA = [
  {
    title: "SHIPPING INFORMATION",
    content:
      "We offer worldwide shipping through trusted carriers including DHL, FedEx, and UPS. Standard shipping typically takes 5-10 business days, while express shipping takes 2-5 business days. All orders are carefully packaged in sustainable materials to protect your items during transit. You will receive tracking information once your order has been dispatched.",
  },
  {
    title: "SHIPPING COSTS",
    content:
      "Shipping costs vary by destination and package weight. Orders over $150 qualify for FREE worldwide shipping. Standard shipping rates: USA/Canada $15, Europe $18, Asia-Pacific $20, Rest of World $25. Express shipping available for additional $15-25 depending on destination. All shipping costs are calculated at checkout.",
  },
  {
    title: "RETURNS & EXCHANGES",
    content:
      "We accept returns within 30 days of delivery for unworn items in original condition with tags attached. Items must be returned in original packaging. Return shipping costs are the responsibility of the customer unless the item was defective or incorrect. Exchanges are available for different sizes or colors of the same item, subject to availability.",
  },
  {
    title: "RETURN PROCESS",
    content:
      "To initiate a return, please contact our customer service team at hello@urbnctrl.studio with your order number and reason for return. We will provide you with a return authorization number and shipping instructions. Please allow 5-10 business days for processing once we receive your returned items.",
  },
  {
    title: "REFUND POLICY",
    content:
      "Refunds will be processed to the original payment method within 5-10 business days of receiving your returned items. Please note that original shipping costs are non-refundable unless the return is due to our error. Items returned after 30 days or without return authorization may not be eligible for refund.",
  },
  {
    title: "INTERNATIONAL ORDERS",
    content:
      "International customers are responsible for any customs duties, taxes, or fees imposed by their country. These charges are not included in our shipping costs and vary by destination. Please check with your local customs office for specific requirements. URBNCTRL is not responsible for delays caused by customs processing.",
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
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
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
  );
};

export default ShippingAndReturnsInfo;
