import React from "react";
import "./communityHeader.css";

const CommunityHeader = () => {
  return (
    <header className="communityHeader" role="banner">
      <div className="communityHeaderContainer">
        <div className="communityHeaderContainerDiv">
          {/* Top Part */}
          <div className="communityHeaderContainerDivTop">
            <div className="communityHeaderContainerDivTopContainer">
              <h1 className="communityHeaderContainerDivTopContainerText nunito-sans-regular">
                Our Community
              </h1>
            </div>
          </div>

          {/* Middle Part */}
          <div className="communityHeaderContainerDivMiddle">
            <div className="communityHeaderContainerDivMiddleContainer">
              <div className="communityHeaderContainerDivMiddleContainerDiv" />
            </div>
          </div>

          {/* Bottom Part */}
          <div className="communityHeaderContainerDivBottom">
            <div className="communityHeaderContainerDivBottomContainer">
              <p className="communityHeaderContainerDivBottomContainerText nunito-sans-regular">
                Explore our features in depth through an all new interactive
                format and enjoy our content in the form we’ve intended it to be
                viewed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CommunityHeader;
