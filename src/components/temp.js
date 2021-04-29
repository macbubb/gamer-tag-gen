import './styles.css';
import { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import { Text } from 'react-native';
import {
  IoIosCloudyNight,
  IoIosAdd,
  IoIosCopy,
  FiCamera,
  BiExport,
  HiOutlineClipboardCopy,
  AiOutlineDownload,
} from 'react-icons/all';
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

export default function App() {
  const [counter, setCounter] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    console.log('Use Effect Called');
    document.title = `${counter}` + ' clicks, yo!';
  }, [counter]);

  useEffect(() => {
    console.log('App loaded');
    var bigStyle = darkMode
      ? { background: '#FFF', color: '#000' }
      : { background: '#000', color: '#FFF' };
    document.getElementsByTagName('body')[0].style = bigStyle;
  }, []);

  useEffect(() => {
    console.log('Dark Mode Effect Called');
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  function handleDarkClick() {
    setDarkMode((state) => !state);
    const asdf = document.getElementsByTagName('body')[0].style;
    if (darkMode) {
      asdf.color = '#fff';
      asdf.background = '#000';
    } else {
      asdf.background = '#fff';
      asdf.color = '#000';
    }
  }

  console.log('component rendered');

  const copyToClipboard = () => {
    navigator.clipboard.writeText('Hi!');
  };

  const takeScreenShot = () => {
    html2canvas(document.querySelector('#capture'), {}).then((canvas) => {
      canvas.toBlob((blob) => {
        var file = new File([blob], 'test.png', {
          type: 'application/octet-stream',
        });
        document.location.href = URL.createObjectURL(file);
      });
    });
  };

  return (
    <div className="App" id="capture">
      <h1>My Code Sandbox</h1>

      <h2 data-html2canvas-ignore>
        Testing the UseEffect Hook, localStorage, clipboard API, and html2canvas
      </h2>
      <h3>{counter}</h3>
      <button onClick={() => setCounter((state) => state + 1)}>
        <IoIosAdd />
      </button>
      <button
        onClick={() => handleDarkClick()}
        onKeyPress={() => console.log('PRESSED')}
      >
        <IoIosCloudyNight />
      </button>
      <button onClick={() => copyToClipboard()}>
        <IoIosCopy />
      </button>
      <button onClick={() => takeScreenShot()}>
        <FiCamera />
      </button>
      <div className="menu">
        <MenuProvider style={{ display: 'flex', flexDirection: 'row' }}>
          <Menu>
            <MenuTrigger>
              <BiExport />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption onSelect={() => console.log('Copy')}>
                <HiOutlineClipboardCopy />
              </MenuOption>
              <MenuOption onSelect={() => console.log('export image')}>
                <AiOutlineDownload />
              </MenuOption>
            </MenuOptions>
          </Menu>
        </MenuProvider>
      </div>
    </div>
  );
}
