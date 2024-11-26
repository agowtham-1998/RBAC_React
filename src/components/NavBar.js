import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const NavBar = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" style={{ flexGrow: 1 }}>
        Admin Dashboard
      </Typography>
      <Button color="inherit" component={Link} to="/">Home</Button>
      <Button color="inherit" component={Link} to="/users">Users</Button>
      <Button color="inherit" component={Link} to="/roles">Roles</Button>
    </Toolbar>
  </AppBar>
);

export default NavBar;
