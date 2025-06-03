import React from 'react';
import "./contactUs.css";
import ContactUsHero from '../../components/ContactUsHero/ContactUsHero';
import ContactUsForm from '../../components/ContactUsForm/ContactUsForm';

const ContactUs = () => {
  return (
    <div className='contactUs'>
        <ContactUsHero />
        <ContactUsForm />
    </div>
  )
}

export default ContactUs