import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, FormControlLabel, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress, Snackbar, InputAdornment } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import PermissionForm from './PermissionForm';
import SearchIcon from '@mui/icons-material/Search';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Permissions = ({ roleId }) => {
  const [permissions, setPermissions] = useState([]);
  const [availablePermissions, setAvailablePermissions] = useState([]);
  const [newPermission, setNewPermission] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3001/roles/${roleId}/permissions`)
      .then(response => setPermissions(response.data))
      .catch(error => handleError(error))
      .finally(() => setLoading(false));

    axios.get('http://localhost:3001/permissions')
      .then(response => setAvailablePermissions(response.data))
      .catch(error => handleError(error))
      .finally(() => setLoading(false));
  }, [roleId]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setPermissions([...permissions].sort((a, b) => (a[key] > b[key] ? 1 : -1) * (direction === 'asc' ? 1 : -1)));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPermissions = availablePermissions.filter(permission => permission.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleTogglePermission = (permissionId) => {
    const updatedPermissions = permissions.includes(permissionId)
      ? permissions.filter(p => p !== permissionId)
      : [...permissions, permissionId];

    setPermissions(updatedPermissions);

    axios.put(`http://localhost:3001/roles/${roleId}/permissions`, updatedPermissions)
      .catch(error => handleError(error));
  };

  const handleAddPermission = () => {
    if (!newPermission.trim()) {
      handleError('Permission name cannot be empty');
      return;
    }
    setLoading(true);
    const newPerm = { id: availablePermissions.length + 1, name: newPermission };
    axios.post('http://localhost:3001/permissions', newPerm)
      .then(response => {
        setAvailablePermissions([...availablePermissions, response.data]);
        setNewPermission('');
        setOpen(false);
        handleSuccess('Permission added successfully');
      })
      .catch(error => handleError(error))
      .finally(() => setLoading(false));
  };

  const handleSuccess = (message) => {
    setSnackbar({ open: true, message, severity: 'success' });
  };

  const handleError = (message) => {
    setSnackbar({ open: true, message: message.toString(), severity: 'error' });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ open: false, message: '', severity: 'success' });
  };

  return (
    <div>
      <h2>Permissions for Role ID: {roleId}</h2>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)} aria-label="Add Permission">
        Add Permission
      </Button>
      <TextField
        placeholder="Search permissions..."
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        style={{ margin: '20px 0' }}
      />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Permission</DialogTitle>
        <DialogContent>
          <PermissionForm newPermission={newPermission} setNewPermission={setNewPermission} handleAddPermission={handleAddPermission} />
        </DialogContent>
      </Dialog>
      {loading ? <CircularProgress /> : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell onClick={() => handleSort('name')}>Permission</TableCell>
                <TableCell>Assign</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPermissions.map(permission => (
                <TableRow key={permission.id}>
                  <TableCell>{permission.name}</TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={permissions.includes(permission.id)}
                          onChange={() => handleTogglePermission(permission.id)}
                        />
                      }
                      label=""
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Permissions;
