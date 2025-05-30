import React from 'react';
import "./navbar.css";
import { MdOutlineShoppingBag } from "react-icons/md";
import { PiUserBold } from "react-icons/pi";

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="navbarContainer">
            <div className="navbarContainerDiv">
                {/* Left Part */}
                <div className="navbarContainerLeft">
                    <div className="navbarContainerLeftContainer">
                        <p className="navbarContainerLeftContainerText">
                            URBNCTRL
                        </p>
                    </div>
                </div>







                {/* Right Part */}
                <div className="navbarContainerRight">
                    <div className="navbarContainerRightContainer">



                        {/* Element */}
                        <div className="navbarContainerRightContainerElementOne">
                            <div className="navbarContainerRightContainerElementOneContainer">
                                <PiUserBold  className='navbarContainerRightContainerElementOneContainerIcon' />
                            </div>
                        </div>

                        {/* Element */}
                        <div className="navbarContainerRightContainerElementTwo">
                            <div className="navbarContainerRightContainerElementTwoContainer">
                                <MdOutlineShoppingBag className='navbarContainerRightContainerElementTwoContainerIcon' />
                            </div>
                        </div>

                        {/* Element */}
                        <div className="navbarContainerRightContainerElementThree">
                            <div className="navbarContainerRightContainerElementThreeContainer">
                                <div className="navbarContainerRightContainerElementThreeContainerMenu">
                                    <div className="navbarContainerRightContainerElementThreeContainerMenuLineOne" />
                                    <div className="navbarContainerRightContainerElementThreeContainerMenuLineTwo" />
                                    <div className="navbarContainerRightContainerElementThreeContainerMenuLineThree" />
                                </div>
                            </div>
                        </div>



                    </div>
                </div>








            </div>
        </div>
    </div>
  )
}

export default Navbar