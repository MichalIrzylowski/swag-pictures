import React from 'react';
import PictureCard from './PictureCard';
import Helper from './Helper';

const PicturesCards = ({pictures}) => {

  let picturesCards = pictures.map( p => <PictureCard key={p._id} img={p.imgUrl} title={p.title} description={p.description} author={p.author} /> );

  return (
    <div>
      {picturesCards}
      {picturesCards.length === 0 ? <Helper /> : null}
    </div>
  )
}

export default PicturesCards;
