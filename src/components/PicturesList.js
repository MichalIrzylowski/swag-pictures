import React from 'react';
import PicturesListPicture from './PicturesListPicture';

const PicturesList = ({pictures}) => {
  const picturesList = pictures.map(p => <PicturesListPicture key={p._id} url={p.imgUrl} id={p._id} />);

  return (
    <div className='PicturesList'>
      {picturesList}
    </div>
  )
}

PicturesList.defaultProps = {
  pictures: []
}


export default PicturesList;
