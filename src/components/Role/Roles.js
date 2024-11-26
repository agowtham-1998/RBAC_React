import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, CircularProgress, Snackbar, TextField, InputAdornment } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import RoleForm from './RoleForm';
import SearchIcon from '@mui/icons-material/Search';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [form, setForm] = useState({ id: null, name: '', permissions: [] });
  const [availablePermissions, setAvailablePermissions] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:3001/roles')
      .then(response => setRoles(response.data))
      .catch(error => handleError(error))
      .finally(() => setLoading(false));

    axios.get('http://localhost:3001/permissions')
      .then(response => setAvailablePermissions(response.data))
      .catch(error => handleError(error))
      .finally(() => setLoading(false));
  }, []);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setRoles([...roles].sort((a, b) => (a[key] > b[key] ? 1 : -1) * (direction === 'asc' ? 1 : -1)));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredRoles = roles.filter(role => role.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlePermissionChange = (permissionId) => {
    const updatedPermissions = form.permissions.includes(permissionId)
      ? form.permissions.filter(p => p !== permissionId)
      : [...form.permissions, permissionId];

    setForm({ ...form, permissions: updatedPermissions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name) {
      handleError('Role name is required');
      return;
    }
    setLoading(true);
    const apiCall = form.id ? axios.put(`http://localhost:3001/roles/${form.id}`, form) : axios.post('http://localhost:3001/roles', {
      name: form.name,
      permissions: form.permissions
    });
    apiCall.then(response => {
      setRoles(form.id ? roles.map(role => role.id === form.id ? response.data : role) : [...roles, response.data]);
      handleSuccess('Role saved successfully');
    }).catch(error => handleError(error))
      .finally(() => {
        setLoading(false);
        setOpen(false);
        setForm({ id: null, name: '', permissions: [] });
      });
  };
  

  const handleEdit = (role) => {
    setForm(role);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setLoading(true);
    axios.delete(`http://localhost:3001/roles/${id}`)
      .then(() => {
        setRoles(roles.filter(role => role.id !== id));
        handleSuccess('Role deleted successfully');
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
      <h1>Role Management</h1>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)} aria-label="Add Role">
        Add Role
      </Button>
      <TextField
        placeholder="Search roles..."
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
        <RoleForm form={form} handleChange={handleChange} handlePermissionChange={handlePermissionChange} handleSubmit={handleSubmit} availablePermissions={availablePermissions} />
      </Dialog>
      {loading ? <CircularProgress /> : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell onClick={() => handleSort('name')}>Role Name</TableCell>
                <TableCell onClick={() => handleSort('permissions')}>Permissions</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRoles.map(role => (
                <TableRow key={role.id}>
                  <TableCell>{role.name}</TableCell>
                  <TableCell>
                    {role.permissions.map(pid => availablePermissions.find(p => p.id === pid)?.name).join(', ')}
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined" color="primary" onClick={() => handleEdit(role)} aria-label="Edit Role">
                      Edit
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => handleDelete(role.id)} aria-label="Delete Role">
                      Delete
                    </Button>
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

export default Roles;
