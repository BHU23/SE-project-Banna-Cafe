import React from 'react'
import { Link } from "react-router-dom"; //npm install react-icons --save
import { BsFacebook } from "react-icons/bs";
import { RiTwitterXLine } from "react-icons/ri";
import { LuInstagram } from "react-icons/lu";
import { FaGithub } from "react-icons/fa";
import './footer.css';
export default function Footer() {
  return (
    <div className="footer-member">
      <div className="content s6 left">
        <span>BANNA</span>
        <div className="img-logo"></div>
      </div>
      <div className="content s6 mid">
        <span>CONTACT</span>
        <div className="text-s6">
          <p>
            111/3, Surawithee 1, Suranaree
            <br />
            Mueang Nakhon Ratchasiima,
            <br />
            Nakho Ratchasiima, 30000
          </p>
          <p>
            <strong>EMAIL</strong> : SE_T08@sut.ac.th
          </p>
          <p>
            <strong>TEL.</strong> :0433333333
          </p>
          <div className="icon-s6">
            <Link to="https://github.com/BHU23" className="icon">
              <i>
                <BsFacebook />
              </i>
            </Link>
            <Link to="https://github.com/BHU23" className="icon">
              <i>
                <RiTwitterXLine />
              </i>
            </Link>
            <Link to="https://github.com/BHU23" className="icon">
              <i>
                <LuInstagram />
              </i>
            </Link>
            <Link to="https://github.com/BHU23" className="icon">
              <i>
                <FaGithub />
              </i>
            </Link>
          </div>
        </div>
      </div>
      <div className="content s6 right">
        <span>LOCATION</span>
        <div className="text-s6">
          <Link to={"https://maps.app.goo.gl/msfWbSQqR4F1CePXA"}>
            <div className="img-map"></div>
          </Link>
        </div>
      </div>
    </div>
  );
}
