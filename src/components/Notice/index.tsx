import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

export default function SimpleSnackbar(props: { message: string, stickMs: number, reset?: () => void }) {
  const [open, setOpen] = React.useState(true);

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    setOpen(false);
    props.reset && props.reset();
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={props.stickMs}
        onClose={handleClose}
        message={props.message}
      />
    </div>
  );
}
