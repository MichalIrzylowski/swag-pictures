import React from "react";
import PictureCard from "./PictureCard";
import Helper from "./Helper";

const PicturesCards = ({ pictures }) => {
  debugger;
  let picturesCards = pictures.map(p => (
    <PictureCard
      key={p._id}
      pictureId={p._id}
      userId={p.author._id}
      img={p.imgUrl}
      title={p.title}
      description={p.description}
      author={p.author}
      comments={p.comments}
    />
  ));

  return (
    <div>
      {picturesCards}
      {picturesCards.length === 0 ? <Helper /> : null}
    </div>
  );
};

export default PicturesCards;
