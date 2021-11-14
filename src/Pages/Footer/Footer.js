import React from "react";
import { Container } from "react-bootstrap";
import {
  AiOutlineYoutube,
  AiFillFacebook,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";
import { SiTelegram } from "react-icons/si";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="container-fluid bg-warning py-4">
      <Container className="footer">
        <div className="icon-div text-center">
          <h3 className="text-center mb-4">Follow us</h3>
          <SiTelegram className="text-primary fs-1 me-2" />
          <AiOutlineYoutube className="text-danger fs-1 me-2" />
          <AiFillFacebook className="text-primary fs-1 me-2" />
          <AiOutlineInstagram className="text-danger fs-1 me-2" />
          <AiOutlineTwitter className="text-primary fs-1 me-2" />
        </div>
        <div className="contact-us text-center">
          <h3>Contact</h3>
          <p>Md Zahangir Hossain</p>
          <p>CEO SunglassMarkt</p>
          <p>zahangir710@gmail.com</p>
        </div>
        <div className="contact-us text-center">
          <h3>Address</h3>
          <p>Speicher strasse 22</p>
          <p>39106, Magdeburg, Germany</p>
          <p>Phone: +4915906453609</p>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
