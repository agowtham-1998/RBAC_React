import React from 'react';
import { DialogContent, DialogActions, Button, TextField, FormControlLabel, Checkbox } from '@mui/material';

const RoleForm = ({ form, handleChange, handlePermissionChange, handleSubmit, availablePermissions }) => (
  <form onSubmit={handleSubmit}>
    <DialogContent>
      <TextField label="Role Name" name="name" value={form.name} onChange={handleChange} fullWidth required />
      <div>
        {availablePermissions.map(permission => (
          <FormControlLabel
            key={permission.id}
            control={
              <Checkbox
                checked={form.permissions.includes(permission.id)}
                onChange={() => handlePermissionChange(permission.id)}
              />
            }
            label={permission.name}
          />
        ))}
      </div>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => handleChange({ target: { name: 'open', value: false } })} color="secondary" aria-label="Cancel">
        Cancel
      </Button>
      <Button type="submit" color="primary" aria-label={form.id ? 'Update Role' : 'Add Role'}>
        {form.id ? 'Update' : 'Add'}
      </Button>
    </DialogActions>
  </form>
);

export default RoleForm;
