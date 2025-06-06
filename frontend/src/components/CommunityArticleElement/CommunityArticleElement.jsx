import React from 'react';
import "./communityArticleElement.css";

const CommunityArticleElement = ({ image, category, title, buttonText = "Read Article" }) => {
  return (
    <div className='communityArticleElement'>
        <div className="communityArticleElementContainer">
            <div className="communityArticleElementContainerDiv">                {/* Image */}
                <div className="communityArticleElementContainerDivImage">
                    <div className="communityArticleElementContainerDivImageContainer">
                        <img src={image} alt={title} className='communityArticleElementContainerDivImageContainerImage' />
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
                                <p className="communityArticleElementContainerDivInfoContainerTwoContainerText nunito-sans-regular">
                                    {title}
                                </p>
                            </div>
                        </div>

                        <div className="communityArticleElementContainerDivInfoContainerThree">
                            <div className="communityArticleElementContainerDivInfoContainerThreeContainer">
                                <div className="communityArticleElementContainerDivInfoContainerThreeContainerButton">
                                    <div className="communityArticleElementContainerDivInfoContainerThreeContainerButtonContainer">
                                        <p className="communityArticleElementContainerDivInfoContainerThreeContainerButtonContainerText nunito-sans-regular">
                                            {buttonText}
                                        </p>
                                    </div>
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

export default CommunityArticleElement