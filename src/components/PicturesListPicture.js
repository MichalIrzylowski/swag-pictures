import React from 'react';
import { connect } from 'react-redux';
import { DELETE_PICTURE_REQUEST } from '../redux/ActionTypes'

const PicturesListPicture = ({url, id, deletePicture}) => {

  const handleDelete = () => {
    deletePicture(id);
  }

  return (
    <div className='UserPicture' style={{backgroundImage: `url(${url})`}}>
      <div className='UserPicture-innerPicture' >
        <i className="fas fa-heart"></i>
        <i className="fas fa-comment"></i>
        <i className="fas fa-trash-alt" onClick={handleDelete}></i>
      </div>
    </div>
  )
}

function mapDispatchToProps (dispatch) {
  return {
    deletePicture: (id) => dispatch({type: DELETE_PICTURE_REQUEST, id})
  }
}

export default connect(null, mapDispatchToProps)(PicturesListPicture);
