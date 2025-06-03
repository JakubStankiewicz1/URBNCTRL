import React from 'react';
import "./community.css";
import CommunityHeader from '../../components/CommunityHeader/CommunityHeader';
import CommunityArticle from '../../components/CommunityArticle/CommunityArticle';

const Community = () => {
  return (
    <div className='community'>
        <CommunityHeader />
        <CommunityArticle />
    </div>
  )
}

export default Community