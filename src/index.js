import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom';

import ConnectButton from './ConnectButton';

import { manageAuthCallback, extractNameFromEmail, setLocalStorageItem } from './helpers';

const connectbuttonId = 'msk-auth-button';

const createConnectButton = (authConfig) => {
  const buttonContainer = document.createElement('div');
  buttonContainer.setAttribute('id', connectbuttonId);
  document.body.appendChild(buttonContainer);
  
  ReactDOM.render(<ConnectButton authConfig={authConfig} />, document.getElementById('msk-auth-button'));
}

export const useMisakeyAuth = (authConfig) => {
  const [userProfile, setUserProfile] = useState(localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : null);

  const connectButtonDomNode = document.getElementById(connectbuttonId);

  if (connectButtonDomNode === null) {
    createConnectButton(authConfig);
  }

  const isAuthCallback = useMemo(
    () => window.location.href.startsWith(authConfig.redirectUri),
    [authConfig, window.location.href],
  );

  const isAuthenticated = useMemo(
    () => userProfile !== null,
    [userProfile],
  );

  if (isAuthCallback) {
    manageAuthCallback()
      .then((idToken) => {
        localStorage.setItem('userProfile', JSON.stringify({
          email: idToken.email,
          name: extractNameFromEmail(idToken.email),
        }));
        window.close();
      })
      .catch(console.error)
  }

  window.addEventListener('storage', function(e) {
    const {key, newValue } = e;
    if (key === 'userProfile') {
      setUserProfile(JSON.parse(newValue));
    }
  });

  return { isAuthCallback, isAuthenticated, userProfile };
};
