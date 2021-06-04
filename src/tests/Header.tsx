import React from 'react';
import AppBar from '@material-ui/core/AppBar';

const Header = () => {
  return (
    <AppBar>
      {/* <header style={{ margin: '20px auto' }}> */}
      <h1 className="text-center">BlueSky Task Manager</h1>
      {/* </header> */}
    </AppBar>
  );
};

export default Header;
