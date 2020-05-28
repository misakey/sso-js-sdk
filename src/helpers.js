import { useMemo } from 'react';

export const manageAuthCallback = () => new Promise((resolve, reject) => {
  // Do the authCallback thing
  let { hash } = window.location;
  if (hash.charAt(0) === '#') {
    hash = hash.substr(1); //('#', '?');
  }

  const hashParams = new URLSearchParams(hash);
  const errorTitle = hashParams.get('error');
  const errorDescription = hashParams.get('error_description');
  const errorDebug = hashParams.get('error_debug');
  if (errorTitle !== null) {
    const error = new Error(`${errorTitle}: ${errorDescription} (${errorDebug})`);
    reject(error);
  } else {
    const idToken = JSON.parse(atob(hashParams.get('id_token').split('.')[1]));
    resolve(idToken);
  }
}) 

export const openCenteredWindow = (url, title, w, h) => {
  // Fixes dual-screen position                             Most browsers      Firefox
  const dualScreenLeft = window.screenLeft !==  undefined ? window.screenLeft : window.screenX;
  const dualScreenTop = window.screenTop !==  undefined   ? window.screenTop  : window.screenY;

  const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
  const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

  const systemZoom = width / window.screen.availWidth;
  
  const left = (width - w) / 2 / systemZoom + dualScreenLeft
  const top = (height - h) / 2 / systemZoom + dualScreenTop
  const newWindow = window.open(url, title, 
    `
    scrollbars=yes,
    width=${w / systemZoom}, 
    height=${h / systemZoom}, 
    top=${top}, 
    left=${left}
    `
  )

  if (window.focus) newWindow.focus();
  return newWindow;
}

export const setLocalStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));

  // trigger the event manually so that it triggers in the same window
  // first create the event
  var e = new Event("storage");
  
  // simulate it being an actual storage event
  e.key = key;
  e.newValue = value;
  // Now actually trigger it
  window.dispatchEvent(e);
}

export const useLocalStyles = (position) => useMemo(
  () => {
    const commonStyle = {
      position: 'fixed',
      cursor: 'pointer',
    }
    const position = {}

    switch (position) {
      case 'top-right':
        commonStyle.top = '10px';
        commonStyle.right = '10px';
        position.vertical = 'top';
        position.horizontal = 'right';
        break;

      case 'top-left':
        commonStyle.top = '10px';
        commonStyle.left = '10px';
        position.vertical = 'top';
        position.horizontal = 'left';
        break;

      case 'bottom-right':
        commonStyle.bottom = '10px';
        commonStyle.right = '10px';
        position.vertical = 'bottom';
        position.horizontal = 'right';
        break;

      case 'bottom-left':
        commonStyle.bottom = '10px';
        commonStyle.left = '10px';
        position.vertical = 'bottom';
        position.horizontal = 'left';
        break;
    
      default:
        commonStyle.top = '10px';
        commonStyle.right = '10px';
        position.vertical = 'top';
        position.horizontal = 'right';
        break;
    }


    const buttonStyle = {
      ...commonStyle,
      borderRadius: '500px',
      background: '#e32e73',
      color: 'white',
      border: 0,
      padding: '5px 10px',
      fontSize: '1.2em',
      textTransform: 'uppercase',
      textDecoration: 'none',
      cursor: 'pointer',
    }
    
    const buttonDisabledStyle = {
      ...buttonStyle,
      background: "#333",
    }

    return [position, commonStyle, buttonStyle, buttonDisabledStyle]
  },
  [position],
);