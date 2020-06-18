import React, { useState, useMemo } from 'react';

import Avatar from '@misakey/ui/Avatar/User';

import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import { useLocalStyles, openCenteredWindow, setLocalStorageItem } from './helpers';

const popoverStyle = {
  width: '350px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '15px',
  boxSizing: 'border-box',
}

const logoutButton = {
  border: '1px solid black',
  borderRadius: '5px',
  minWidth: '200px',
  cursor: 'pointer',
  textTransform: 'uppercase',
  background: 'white',
  marginTop: '10px',
  marginBottom: '10px',
  padding: '2px 0',
}


export default ({ authConfig }) => {
  const [userProfile, setUserProfile] = useState(localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isAuthenticated = useMemo(
    () => userProfile !== null,
    [userProfile],
  );

  const [position, commonStyle, buttonStyle, buttonDisabledStyle] = useLocalStyles(authConfig.buttonPlacement);


  const onConnect = () => {
    const authUrl = `https://auth.misakey.com/_/oauth2/auth?client_id=${authConfig.clientId}&redirect_uri=${authConfig.redirectUri}&response_type=id_token&scope=openid&state=${Math.random().toString(36).substr(2)}&nonce=${Math.random().toString(36).substr(2)}&prompt=login`
    const authWindow = openCenteredWindow(authUrl, 'authwindow', 800, 600)

    setIsConnecting(true);
    const checkInterval = setInterval(
      () => {
        if(authWindow.closed) {
          const newUserProfile = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : null;

          setUserProfile(newUserProfile);
          clearInterval(checkInterval);
          setIsConnecting(false);
        }
      },
      500,
    );
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = () => {
    setUserProfile(null);
    setLocalStorageItem('userProfile', null);
    handleClose();
  }

  const open = Boolean(anchorEl);
  const id = open ? 'account-popover' : undefined;

  if (isConnecting) {
    return (
      <a style={buttonDisabledStyle}>
        Signing in...
      </a>
    )
  }

  if (isAuthenticated) {
    return (
      <>
        <Avatar aria-describedby={id}  displayName={userProfile.name} style={commonStyle} onClick={handleClick} />
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={position}
          transformOrigin={position}
        >
          <Paper style={popoverStyle}>
            <Avatar displayName={userProfile.name} />
            <Typography variant="h4">
              {userProfile.name}
            </Typography>
            <Typography color="textSecondary">
              {userProfile.email}
            </Typography>
            <hr width="100%" />
            <button onClick={onLogout} style={logoutButton}>Sign out</button>
            <hr width="100%" />
            <Link href="https://about.misakey.com/#/legals/privacy-policy/" color="textSecondary">Privacy Policy</Link>
            <Link href="https://about.misakey.com/#/legals/tos/" color="textSecondary">Terms Of Service</Link>
          </Paper>
        </Popover>
      </>
    )
  }

  return (
    <a style={buttonStyle} onClick={onConnect}>
      Sign in
    </a>
  )
}