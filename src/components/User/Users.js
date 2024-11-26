import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, CircularProgress, Snackbar, TextField, InputAdornment } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import UserForm from './UserForm';
import SearchIcon from '@mui/icons-material/Search';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Users = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ id: null, name: '', email: '', role: '', status: 'Active' });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:3001/users')
      .then(response => setUsers(response.data))
      .catch(error => handleError(error))
      .finally(() => setLoading(false));
  }, []);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setUsers([...users].sort((a, b) => (a[key] > b[key] ? 1 : -1) * (direction === 'asc' ? 1 : -1)));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.role) {
      handleError('All fields are required');
      return;
    }
    setLoading(true);
    const apiCall = form.id ? axios.put(`http://localhost:3001/users/${form.id}`, form) : axios.post('http://localhost:3001/users', {
      name: form.name,
      email: form.email,
      role: form.role,
      status: form.status
    });
    apiCall.then(response => {
      setUsers(form.id ? users.map(user => user.id === form.id ? response.data : user) : [...users, response.data]);
      handleSuccess('User saved successfully');
    }).catch(error => handleError(error))
      .finally(() => {
        setLoading(false);
        setOpen(false);
        setForm({ id: null, name: '', email: '', role: '', status: 'Active' });
      });
  };

  const handleEdit = (user) => {
    setForm(user);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setLoading(true);
    axios.delete(`http://localhost:3001/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
        handleSuccess('User deleted successfully');
      })
      .catch(error => {
        console.error('There was an error deleting the user:', error);
        handleError('Failed to delete the user. Please try again.');
      })
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
      <h1>User Management</h1>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)} aria-label="Add User">
        Add User
      </Button>
      <TextField
        placeholder="Search users..."
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
        <UserForm form={form} handleChange={handleChange} handleSubmit={handleSubmit} />
      </Dialog>
      {loading ? <CircularProgress /> : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell onClick={() => handleSort('name')}>Name</TableCell>
                <TableCell onClick={() => handleSort('email')}>Email</TableCell>
                <TableCell onClick={() => handleSort('role')}>Role</TableCell>
                <TableCell onClick={() => handleSort('status')}>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>
                    <Button variant="outlined" color="primary" onClick={() => handleEdit(user)} aria-label="Edit User">
                      Edit
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => handleDelete(user.id)} aria-label="Delete User">
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

export default Users;
