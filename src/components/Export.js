import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import {
  BiExport,
  HiOutlineClipboardCopy,
  AiOutlineDownload,
  FaCheck,
} from 'react-icons/all';
import NewWindow from 'react-new-window';
import Card from './Card';

const Export = (props) => {
  const {
    showExportMenu,
    toggleExportMenu,
    exportIconColor,
    card,
    changeStars,
    deleteCard,
    cardScale,
    cardDimensions,
    palette,
  } = props;
  const exportIconStyle = { color: exportIconColor };
  const handleExportMenuClick = () => {
    console.log('clicked menu');
    toggleExportMenu({ display: 'flex' });
  };
  const [copied, setCopied] = useState(false);
  const [showWindowPortal, toggleWindowPortal] = useState(false);
  const features = {
    width: '1000px',
    height: '700px',
    resizable: 'no',
    status: 'off',
    location: 'off',
  };
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(card.tag)
      .then(() => {
        setCopied(true);
        console.log('copied');
      })
      .catch((err) => {
        console.log('not copied', err);
      });
  };

  const takeScreenShot = () => {
    let id = `#${card.tag}`;
    console.log(id);
    html2canvas(document.querySelector(id), {}).then((canvas) => {
      canvas.toBlob((blob) => {
        var file = new File([blob], 'test.png', {
          type: 'application/octet-stream',
        });
        document.location.href = URL.createObjectURL(file);
      });
    });
  };

  const handleMouseLeave = () => {
    toggleExportMenu({ display: 'none' });
    setCopied(false);
  };

  return (
    <div className="export-card-button">
      <button onClick={() => handleExportMenuClick()}>
        <BiExport style={exportIconStyle} className="export-card-button-icon" />
      </button>
      <div
        cursor="pointer"
        pointer-events="all"
        className="export-card-button-menu"
        onMouseLeave={handleMouseLeave}
        style={showExportMenu}
      >
        <div className="arrow-down"></div>
        <div
          className="export-card-button-menu-download"
          cursor="pointer"
          pointer-events="all"
          onClick={() => toggleWindowPortal(true)}
        >
          <AiOutlineDownload />
        </div>
        <div
          className="export-card-button-menu-clipboard"
          cursor="pointer"
          pointer-events="all"
          onClick={copyToClipboard}
        >
          {!copied ? <HiOutlineClipboardCopy /> : <FaCheck />}
        </div>
      </div>
      {showWindowPortal && (
        <NewWindow
          onUnload={() => {
            toggleWindowPortal(false);
          }}
          copyStyles="true"
          center="parent"
          onOpen={() => console.log('opened')}
          features={features}
        >
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
          </div>
          <button onClick={() => takeScreenShot()}>Screen</button>
        </NewWindow>
      )}
    </div>
  );
};

export default Export;
