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
}

export default function CreateShelf({ open, toggle }: Props) {
  return (
    <div>
      <Modal
        open={open}
        onClose={toggle}
        aria-labelledby="modal-modal-confirm"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>Hello World</Box>
      </Modal>
    </div>
  );
}
