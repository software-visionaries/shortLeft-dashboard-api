import React from 'react';
import '../styles/avatar.css'

const generateInitials = (name) => {
    const words = name.trim().split(' ');
    let initials = '';
  
    for (let i = 0; i < words.length && initials.length < 2; i++) {
      initials += words[i][0];
    }
  
    return initials.toUpperCase();
  };
  

function Avatar({ image,name }) {
    const initials = generateInitials(name);

  return (
    <div className='avatar'>
      {image ? (
        <img src={image} alt={initials} className='avatar__image' />
      ) : (
        <div className='avatar__name'>{initials}</div>
      )}
    </div>
  );
}


export default Avatar