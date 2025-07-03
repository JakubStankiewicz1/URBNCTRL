import React from "react";
import "./homeLocationTwo.css";
import assets from "../../assets/assets";

const HomeLocationTwo = () => {
  return (
    <div className="homeLocationTwo">
      <div className="homeLocationTwoContainer">
        <div className="homeLocationTwoContainerDiv">
          {/* Left Part */}
          <div className="homeLocationTwoContainerDivLeft">
            <div className="homeLocationTwoContainerDivLeftCotntainer">
              {/* Top Part */}
              <div className="homeLocationTwoContainerDivLeftCotntainerTop">
                <div className="homeLocationTwoContainerDivLeftCotntainerTopContainer">
                  <div className="homeLocationTwoContainerDivLeftCotntainerTopContainerHr" />
                </div>
              </div>

              {/* Middle Part */}
              <div className="homeLocationTwoContainerDivLeftCotntainerMiddle">
                <div className="homeLocationTwoContainerDivLeftCotntainerMiddleContainer">
                  <div className="homeLocationTwoContainerDivLeftCotntainerMiddleContainerOne">
                    <p className="homeLocationTwoContainerDivLeftCotntainerMiddleContainerOneText">
                      CREATIVE DISTRICT
                    </p>
                  </div>

                  <div className="homeLocationTwoContainerDivLeftCotntainerMiddleContainerTwo">
                    <p className="homeLocationTwoContainerDivLeftCotntainerMiddleContainerTwoText">
                      DESIGN COMMUNITY
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Part */}
              <div className="homeLocationTwoContainerDivLeftCotntainerBottom">
                <div className="homeLocationTwoContainerDivLeftCotntainerBottomContainer">
                  <div className="homeLocationTwoContainerDivLeftCotntainerBottomContainerOne">
                    <div className="homeLocationTwoContainerDivLeftCotntainerBottomContainerOneBtn">
                      <p className="homeLocationTwoContainerDivLeftCotntainerBottomContainerOneBtnText">
                        Discover
                      </p>
                    </div>
                  </div>

                  <div className="homeLocationTwoContainerDivLeftCotntainerBottomContainerTwo">
                    <button className="homeLocationTwoContainerDivLeftCotntainerBottomContainerTwoButton">
                      Instagram
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Part */}
          <div className="homeLocationTwoContainerDivRight">
            <div className="homeLocationTwoContainerDivRightContainer">
              <div className="homeLocationTwoContainerDivRightContainerDiv">
                <div className="homeLocationTwoContainerDivRightContainerDivOne">
                  <div className="homeLocationTwoContainerDivRightContainerDivOneContainer">
                    <img
                      src={assets.HomeLocationOneImgOne}
                      alt=""
                      className="homeLocationTwoContainerDivRightContainerDivOneContainerImage"
                    />
                  </div>
                </div>

                <div className="homeLocationTwoContainerDivRightContainerDivTwo">
                  <div className="homeLocationTwoContainerDivRightContainerDivTwoContainer">
                    <img
                      src={assets.HomeLocationOneImgTwo}
                      alt=""
                      className="homeLocationTwoContainerDivRightContainerDivTwoContainerImage"
                    />
                  </div>
                </div>

                <div className="homeLocationTwoContainerDivRightContainerDivThree">
                  <div className="homeLocationTwoContainerDivRightContainerDivThreeContainer">
                    <img
                      src={assets.HomeLocationOneImgThree}
                      alt=""
                      className="homeLocationTwoContainerDivRightContainerDivThreeContainerImage"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLocationTwo;
