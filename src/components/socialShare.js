import * as React from 'react'
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';

const SocialShare = ({ url, title, description }) => (
  <div className="post-meta-share-icons">
    <p>If you found this article helpful please share:</p>
    
    <FacebookShareButton url={url} quote={description}>
        <FacebookIcon size={40} round={true} bgStyle={{fill: "#0F044C"}}/>
    </FacebookShareButton>

    <LinkedinShareButton url={url} title={title} summary={description}>
        <LinkedinIcon size={40} round={true} bgStyle={{fill: "#0F044C"}}/>
    </LinkedinShareButton>

    <TwitterShareButton url={url} title={description}>
        <TwitterIcon size={40} round={true} bgStyle={{fill: "#0F044C"}}/>
    </TwitterShareButton>

  </div>
);

export default SocialShare