import React from 'react';
import Card from './Card';
import html2canvas from 'html2canvas';

const ExportPopup = (props) => {
  const { card, changeStars, deleteCard, cardDimensions, palette } = props;
  var newWindow = window.open('', 'exportPopup');
  const takeScreenShot = () => {
    let id = `#${card.tag}`;
    console.log(id);
    html2canvas(newWindow.document.querySelector(id), {}).then((canvas) => {
      canvas.toBlob((blob) => {
        var file = new File([blob], `${card.tag}.png`, {
          type: 'application/octet-stream',
        });
        document.location.href = URL.createObjectURL(file);
      });
    });
  };

  return (
    <div id={card.tag}>
      <Card
        cardScale={3}
        cardType={'export'}
        palette={palette}
        cardDimensions={cardDimensions}
        card={card}
        changeStars={changeStars}
        newTag={true}
        deleteCard={deleteCard}
      />
      <button onClick={() => takeScreenShot()}>asdf</button>
    </div>
  );
};

export default ExportPopup;
