import React from "react";
import "./communityArticleElement.css";

const CommunityArticleElement = ({
  image,
  category,
  title,
  buttonText = "Read Article",
}) => {
  return (
    <article className="communityArticleElement" role="article" aria-labelledby={`article-title-${title.replace(/\s+/g, '-').toLowerCase()}`}>
      <div className="communityArticleElementContainer">
        <div className="communityArticleElementContainerDiv">
          {" "}
          {/* Image */}
          <div className="communityArticleElementContainerDivImage">
            <div className="communityArticleElementContainerDivImageContainer">
              <img
                src={image}
                alt={`${category}: ${title}`}
                className="communityArticleElementContainerDivImageContainerImage"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          {/* Info */}
          <div className="communityArticleElementContainerDivInfo">
            <div className="communityArticleElementContainerDivInfoContainer">
              <div className="communityArticleElementContainerDivInfoContainerOne">
                <div className="communityArticleElementContainerDivInfoContainerOneContainer">
                  <p className="communityArticleElementContainerDivInfoContainerOneContainerText nunito-sans-regular">
                    {category}
                  </p>
                </div>
              </div>

              <div className="communityArticleElementContainerDivInfoContainerTwo">
                <div className="communityArticleElementContainerDivInfoContainerTwoContainer">
                  <h3 
                    className="communityArticleElementContainerDivInfoContainerTwoContainerText nunito-sans-regular"
                    id={`article-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
                  >
                    {title}
                  </h3>
                </div>
              </div>

              <div className="communityArticleElementContainerDivInfoContainerThree">
                <div className="communityArticleElementContainerDivInfoContainerThreeContainer">
                  <button 
                    className="communityArticleElementContainerDivInfoContainerThreeContainerButton"
                    aria-label={`${buttonText} - ${title}`}
                    type="button"
                  >
                    <div className="communityArticleElementContainerDivInfoContainerThreeContainerButtonContainer">
                      <span className="communityArticleElementContainerDivInfoContainerThreeContainerButtonContainerText nunito-sans-regular">
                        {buttonText}
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CommunityArticleElement;
