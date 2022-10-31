import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { updateItemData } from "../database";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #FFF",
  boxShadow: 24,
  p: 4,
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function BasicModal({ value, color, size, item }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [snackBarOpen, setSnackBarOpen] = React.useState(false);

  const [values, setValues] = React.useState({
    quantity: value,
    reason: "Sale",
    notes: "",
  });

  const handleUpdate = () => {
    updateItemData(item, color, size, values.quantity);
    setSnackBarOpen(true);
    handleClose();
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBarOpen(false);
  };

  return (
    <div>
      <Typography onClick={handleOpen}>{value}</Typography>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={2}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {size}-{color} {item}
            </Typography>
            <TextField
              onChange={(newValue) =>
                setValues({ ...values, quantity: newValue.target.value })
              }
              required
              id="outlined-number"
              label="Number"
              type="number"
              value={values.quantity}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Autocomplete
              options={[
                { label: "Sale" },
                { label: "Stock In" },
                { label: "Adjustment" },
                { label: "Other" },
              ]}
              renderInput={(params) => (
                <TextField
                {...params}
                  onChange={(newValue) =>
                    setValues({ ...values, reason: newValue.target.value })
                  }
                  required
                  id="outlined-required"
                  label="Reason"
                  value={values.reason}
                />
              )}
            />

            <TextField
              onChange={(newValue) =>
                setValues({ ...values, notes: newValue.target.value })
              }
              id="outlined-multiline-flexible"
              label="Notes"
              multiline
              maxRows={4}
            />
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant="contained"
                onClick={handleUpdate}
                color="success"
              >
                Update
              </Button>
              <Button variant="outlined" onClick={handleClose} color="error">
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Succesfully Updated!
        </Alert>
      </Snackbar>
    </div>
  );
}
