//modules
import React from "react";

//components
import HeaderText from "./HeaderText";
import SubHeaderText from "./SubHeaderText";
import Divider from "./Divider";

//images
import Google from "../assets/google.svg";
import Twitter from "../assets/twitter.svg";
import Apple from "../assets/apple.svg";
import Logo from "../assets/newLogo.png";

const Socials = ({ headerText, subHeaderText }) => {
    return (
      <div class="social-div">
            <img class="logo-image" src={Logo} alt="Logo" />
            <HeaderText text={headerText} />
            <SubHeaderText text={subHeaderText} />
            <Divider />
            <div class="socials-parent">
              <div className="columns socials">
                <div className="column signin">
                  <img src={Apple} alt="Sign in with Apple" />
                </div>
                <div className="column signin">
                  <img src={Google} alt="Sign in with Google" />
                </div>
                <div className="column signin">
                  <img src={Twitter} alt="Sign in with Twitter" />
                </div>
              </div>
            </div>
      </div>

    )
};

export default Socials;