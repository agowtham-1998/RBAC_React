import React from 'react';
import { DialogContent, DialogActions, Button, TextField } from '@mui/material';

const PermissionForm = ({ newPermission, setNewPermission, handleAddPermission }) => (
  <form onSubmit={handleAddPermission}>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        label="Permission Name"
        type="text"
        fullWidth
        value={newPermission}
        onChange={(e) => setNewPermission(e.target.value)}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setNewPermission('')} color="secondary" aria-label="Cancel">
        Cancel
      </Button>
      <Button type="submit" color="primary" aria-label="Add Permission">
        Add
      </Button>
    </DialogActions>
  </form>
);

export default PermissionForm;
