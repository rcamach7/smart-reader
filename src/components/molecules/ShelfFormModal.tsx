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

import { useState } from 'react';
import axios from 'axios';

import { useLoadingContext } from '@/context/LoadingContext';
import { useUser } from '@/context/UserContext';
import { useFeedbackContext } from '@/context/FeedbackContext';

interface Props {
  name?: string;
  description?: string;
  isPublic?: boolean;
  shelfId?: string;
  open: boolean;
  toggle: () => void;
  type: 'create' | 'edit';
}

export default function ShelfFormModal({
  name,
  description,
  isPublic,
  open,
  shelfId,
  toggle,
  type,
}: Props) {
  const { setUser } = useUser();
  const { setIsPageLoading } = useLoadingContext();
  const { addAlertMessage } = useFeedbackContext();

  const [formDetails, setFormDetails] = useState<{
    name: string;
    description: string;
    isPublic: boolean;
  }>({
    name: name ? name : '',
    description: description ? description : '',
    isPublic: isPublic ? isPublic : true,
  });

  const [formErrors, setFormErrors] = useState({ shelfName: false });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const nameMeetsValidation = () => {
    if (formDetails.name.length < 4 || formDetails.name.length > 20) {
      setFormErrors((FE) => ({ ...FE, shelfName: true }));
      return false;
    } else {
      setFormErrors((FE) => ({ ...FE, shelfName: false }));
      return true;
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nameMeetsValidation()) {
      return;
    }

    setIsPageLoading(true);
    try {
      const res = await axios.post('/api/shelf', formDetails);
      setUser((U) => {
        return {
          ...U,
          shelves: [...U.shelves, res.data.shelf],
        };
      });
      addAlertMessage({
        text: 'Shelf created successfully.',
        severity: 'success',
      });
    } catch (error) {
      console.log(error);

      const errMessage = error?.response?.data?.message;
      addAlertMessage({
        text: errMessage ? errMessage : 'Error creating shelf',
        severity: 'error',
      });
    }
    setIsPageLoading(false);
    toggle();
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsPageLoading(true);
    try {
      const res = await axios.put('/api/shelf/' + shelfId, formDetails);
      setUser((U) => {
        return {
          ...U,
          shelves: U.shelves.map((curShelf) => {
            if (curShelf._id === res.data.shelf._id) {
              return res.data.shelf;
            } else {
              return curShelf;
            }
          }),
        };
      });
      addAlertMessage({
        text: 'Shelf edited successfully.',
        severity: 'success',
      });
    } catch (error) {
      console.log(error);

      const errMessage = error?.response?.data?.message;
      addAlertMessage({
        text: errMessage ? errMessage : 'Error editing shelf.',
        severity: 'error',
      });
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
        <Box
          sx={style}
          component="form"
          onSubmit={type === 'create' ? handleCreateSubmit : handleEditSubmit}
        >
          <Typography textAlign="center" variant="h1">
            {type === 'create' ? 'Create New Shelf' : 'Edit Shelf'}
          </Typography>
          <TextField
            error={formErrors.shelfName}
            helperText={
              formErrors.shelfName ? 'Must be between 4 to 20 characters' : ''
            }
            id="standard-helperText"
            label="Shelf Name"
            variant="standard"
            name="name"
            onChange={handleInputChange}
            value={formDetails.name}
            InputLabelProps={{
              sx: {
                color: '#a5a5a5',
              },
            }}
          />
          <TextField
            id="standard-helperText"
            label="Description"
            variant="standard"
            multiline
            maxRows={4}
            name="description"
            onChange={handleInputChange}
            value={formDetails.description}
            InputLabelProps={{
              sx: {
                color: '#a5a5a5',
              },
            }}
          />
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              <Typography sx={{ color: '#a5a5a5' }}>Visibility</Typography>
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
              {type === 'create' ? 'Create' : 'Confirm Edit'}
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
  backgroundColor: '#202833',
};
