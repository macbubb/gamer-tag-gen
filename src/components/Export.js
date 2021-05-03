import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import {
  BiExport,
  HiOutlineClipboardCopy,
  AiOutlineDownload,
} from 'react-icons/all';

const Export = (props) => {
  const exportIconColor = props.exportIconColor;
  const tag = props.tag;
  const exportIconStyle = { color: exportIconColor };
  const [showExportMenu, toggleExportMenu] = useState({ display: 'none' });

  const handleExportMenuClick = () => {
    console.log('clicked menu');
    toggleExportMenu({ display: 'flex' });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(tag);
  };

  const takeScreenShot = () => {
    html2canvas(document.querySelector(`#root`), {}).then((canvas) => {
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
          onClick={() => copyToClipboard()}
        >
          <AiOutlineDownload />
        </div>
        <div
          className="export-card-button-menu-clipboard"
          cursor="pointer"
          pointer-events="all"
          onClick={() => takeScreenShot()}
        >
          <HiOutlineClipboardCopy />
        </div>
      </div>
    </div>
  );
};

export default Export;
