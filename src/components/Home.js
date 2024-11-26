import React from 'react';
import { Typography, Container, Box, Grid, Card, CardContent } from '@mui/material';

const Home = () => (
  <Container>
    <Box textAlign="center" m={5}>
      <Typography variant="h2" gutterBottom>Welcome to the Admin Dashboard</Typography>
      <Typography variant="h6" gutterBottom>Manage users, roles, and permissions efficiently and securely.</Typography>
    </Box>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h5">Users</Typography>
            <Typography variant="body2" color="textSecondary">View and manage users.</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h5">Roles</Typography>
            <Typography variant="body2" color="textSecondary">Define and edit roles.</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h5">Permissions</Typography>
            <Typography variant="body2" color="textSecondary">Assign and modify permissions.</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Container>
);

export default Home;
