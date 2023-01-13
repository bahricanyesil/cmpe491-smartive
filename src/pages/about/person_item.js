import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import React from 'react';

import './about.css';

const PersonItem = ({img, name, description, instagramUrl, linkedinUrl, githubUrl}) => {
  return (
    <div className="member">
    <img width={150} height={150} src={img} alt={name}/>
    <div className="description">
        <h1>{name}</h1>
        <h2>Computer Engineering,</h2>
        <h2>Bogazici University</h2>
        <p>{description}</p>
        <div className="social-media">
          <InstagramIcon onClick={event =>  window.location.href=instagramUrl}/>
          <LinkedInIcon onClick={event =>  window.location.href=linkedinUrl}/>
          <GitHubIcon onClick={event =>  window.location.href=githubUrl}/>
        </div>
    </div>
  </div>
  );
};

export default PersonItem;
