import React from 'react';
import {
  BiExport,
  HiOutlineClipboardCopy,
  AiOutlineDownload,
} from 'react-icons/all';
import { IconContext } from 'react-icons/lib';

const Export = (props) => {
  const color = props.exportIconColor;
  const style = { color: color };
  return <BiExport style={style} />;
};

export default Export;
