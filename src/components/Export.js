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
import ExportPopup from './ExportPopup';

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
          name="exportPopup"
          center="parent"
          features={features}
        >
          <ExportPopup
            palette={palette}
            cardDimensions={cardDimensions}
            card={card}
            changeStars={changeStars}
            deleteCard={deleteCard}
          />
        </NewWindow>
      )}
    </div>
  );
};

export default Export;
