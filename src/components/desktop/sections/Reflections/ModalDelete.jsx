import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import Typography from "@mui/joy/Typography";
import { useStoreActions } from "easy-peasy"

function ModalDelete({ id, isOpen, setIsOpen }) {
  const deleteCurrentReflection = useStoreActions(
    (state) => state.reflections.deleteCurrentReflection
  );

  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <ModalDialog
        variant="outlined"
        role="alertdialog"
        aria-labelledby="alert-dialog-modal-title"
        aria-describedby="alert-dialog-modal-description"
      >
        <Typography
          id="alert-dialog-modal-title"
          component="h2"
          startDecorator={<WarningRoundedIcon />}
        >
          Confirm delete
        </Typography>
        <Divider />
        <Typography
          id="alert-dialog-modal-description"
          textColor="text.tertiary"
        >
          Are you sure you want to delete this reflection?
        </Typography>
        <Box
          sx={{ display: "flex", gap: 1, justifyContent: "flex-end", pt: 2 }}
        >
          <Button
            variant="plain"
            color="neutral"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="solid"
            color="danger"
            onClick={() => {
              deleteCurrentReflection({id});
              setIsOpen(false);
            }}
          >
            Delete reflection
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  );
}

export default ModalDelete;
