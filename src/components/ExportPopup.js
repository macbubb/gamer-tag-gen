import React, { useEffect } from 'react';
import Card from './Card';
import html2canvas from 'html2canvas';

const ExportPopup = (props) => {
  const { card, changeStars, deleteCard, cardDimensions, palette } = props;
  //  useEffect(() => takeScreenShot(), []);
  var newWindow = window.open('', 'exportPopup');
  const takeScreenShot = () => {
    let id = `#${card.tag}`;
    console.log(id);
    var svgElements = newWindow.document.body.querySelectorAll('svg');
    svgElements.forEach(function (item) {
      item.setAttribute('width', item.getBoundingClientRect().width);
      item.setAttribute('height', item.getBoundingClientRect().height);
      item.style.width = null;
      item.style.height = null;
    });
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
      <div className="save-button">
        <button
          data-html2canvas-ignore
          onClick={() => takeScreenShot()}
          className="save"
        >
          SAVE
        </button>
      </div>
    </div>
  );
};

export default ExportPopup;
