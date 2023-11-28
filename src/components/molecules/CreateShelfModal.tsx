import {
  Modal,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Button,
} from '@mui/material';

import { useEffect, useState } from 'react';
import axios from 'axios';

import { useLoadingContext } from '@/context/LoadingContext';
import { useUser } from '@/context/UserContext';
import { useFeedbackContext } from '@/context/FeedbackContext';

interface Props {
  open: boolean;
  toggle: () => void;
}

export default function CreateShelf({ open, toggle }: Props) {
  const { user, setUser } = useUser();
  const { setIsPageLoading } = useLoadingContext();
  const { addAlertMessage } = useFeedbackContext();

  const [formDetails, setFormDetails] = useState({
    name: '',
    description: '',
    isPublic: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsPageLoading(true);
    try {
      const res = await axios.post('/api/shelf', formDetails);
      setUser((U) => {
        return {
          ...U,
          shelves: res.data.shelves,
        };
      });
      addAlertMessage({
        text: 'Shelf created successfully',
        severity: 'success',
      });
    } catch (error) {
      console.log(error);
      addAlertMessage({ text: 'Error creating shelf', severity: 'error' });
    }
    setIsPageLoading(false);
    toggle();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={toggle}
        aria-labelledby="modal-modal-confirm"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit}>
          <Typography textAlign="center">Create New Shelf</Typography>
          <TextField
            id="standard-helperText"
            label="Shelf Name"
            variant="standard"
            name="name"
            onChange={handleInputChange}
          />
          <TextField
            id="standard-helperText"
            label="Description"
            variant="standard"
            multiline
            maxRows={4}
            name="description"
            onChange={handleInputChange}
          />
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Visibility
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={formDetails.isPublic ? 'public' : 'private'}
              label="Visibility"
              onChange={(event: SelectChangeEvent) => {
                setFormDetails((SFD) => {
                  return {
                    ...SFD,
                    isPublic: event.target.value === 'public' ? true : false,
                  };
                });
              }}
            >
              <MenuItem value="public">Public</MenuItem>
              <MenuItem value="private">Private</MenuItem>
            </Select>
            <Button sx={{ mt: 3 }} type="submit" variant="outlined">
              Create
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  display: 'flex',
  flexDirection: 'column',
};
