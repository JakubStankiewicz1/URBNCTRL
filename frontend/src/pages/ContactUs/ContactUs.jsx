import React from "react";
import "./contactUs.css";
import ContactUsHero from "../../components/ContactUsHero/ContactUsHero";
import ContactUsForm from "../../components/ContactUsForm/ContactUsForm";
import ContactUsSlider from "../../components/ContactUsSlider/ContactUsSlider";

const ContactUs = () => {
  return (
    <div className="contactUs">
      <ContactUsHero />
      <ContactUsForm />
      <ContactUsSlider />
    </div>
  );
};

export default ContactUs;
