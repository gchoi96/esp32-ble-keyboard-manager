import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import RemoveIcon from "@mui/icons-material/Remove";
import { MouseEventHandler } from "react";
interface Props {
  width?: string | number;
  onClickAddButton: MouseEventHandler<HTMLButtonElement>;
  onClickRemoveButton: MouseEventHandler<HTMLButtonElement>;
  onClickSaveButton: () => void;
  onClickLastButton: MouseEventHandler<HTMLButtonElement>;
}
function ControlPanel({
  width,
  onClickAddButton,
  onClickRemoveButton,
  onClickSaveButton,
  onClickLastButton,
}: Props) {
  return (
    <Stack width={width} display="flex" justifyContent="flex-start">
      <IconButton aria-label="add" onClick={onClickAddButton}>
        <AddIcon fontSize="inherit" />
      </IconButton>
      <IconButton aria-label="remove" onClick={onClickRemoveButton}>
        <RemoveIcon fontSize="inherit" />
      </IconButton>
      <IconButton aria-label="remove" onClick={onClickSaveButton}>
        <SaveIcon fontSize="inherit" />
      </IconButton>
      <Button  sx={{maxWidth:"100%"}} variant="text" onClick={onClickLastButton}>
        L
      </Button>
    </Stack>
  );
}

export default ControlPanel;
