import React from "react";
import "./community.css";
import CommunityHeader from "../../components/CommunityHeader/CommunityHeader";
import CommunityArticle from "../../components/CommunityArticle/CommunityArticle";
import AboutUsInfoScroll from "../../components/AboutUsInfoScroll/AboutUsInfoScroll";

const Community = () => {
  return (
    <main className="community" role="main">
      <CommunityHeader />
      <CommunityArticle />
      <AboutUsInfoScroll />
    </main>
  );
};

export default Community;
