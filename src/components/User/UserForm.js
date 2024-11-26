import React from 'react';
import { DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const UserForm = ({ form, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <DialogContent>
      <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth required />
      <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth required />
      <TextField label="Role" name="role" value={form.role} onChange={handleChange} fullWidth required />
      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select name="status" value={form.status} onChange={handleChange} required>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </Select>
      </FormControl>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => handleChange({ target: { name: 'open', value: false } })} color="secondary" aria-label="Cancel">
        Cancel
      </Button>
      <Button type="submit" color="primary" aria-label={form.id ? 'Update User' : 'Add User'}>
        {form.id ? 'Update' : 'Add'}
      </Button>
    </DialogActions>
  </form>
);

export default UserForm;
