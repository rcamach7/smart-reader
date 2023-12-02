import { Button, Modal, Typography, Box } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
};

interface Props {
  open: boolean;
  toggle: () => void;
  confirmFunc?: () => void;
  title: string;
  description: string;
  type?: 'confirm' | 'information';
}

export default function ConfirmModal({
  open,
  toggle,
  confirmFunc,
  title,
  description,
  type,
}: Props) {
  return (
    <div>
      <Modal
        open={open}
        onClose={toggle}
        aria-labelledby="modal-modal-confirm"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-confirm" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {description}
          </Typography>
          {type === 'confirm' ? (
            <Box sx={{ p: 1, display: 'flex', gap: 1 }}>
              <Button variant="outlined" color="error" onClick={confirmFunc}>
                Confirm
              </Button>
              <Button onClick={toggle} variant="outlined">
                Cancel
              </Button>
            </Box>
          ) : null}
        </Box>
      </Modal>
    </div>
  );
}
