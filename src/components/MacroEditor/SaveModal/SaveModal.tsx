import Spacing from "#/components/Spacing/Spacing";
import modalBoxStyle from "#/constants/modalBoxStyle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { ChangeEventHandler, useState } from "react";
interface Props {
  open: boolean;
  handleClose: () => void;
  handleSave: (macroName: string) => void;
}
function SaveModal({ open, handleClose, handleSave }: Props) {
  const [name, setName] = useState("");
  const onClickSave = () => {
    if (!name) {
      alert("매크로 이름을 입력하세요");
      return;
    }
    handleSave(name);
  };

  const onChangeName: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalBoxStyle}>
        <TextField onChange={onChangeName} label="매크로 이름" variant="standard" />
        <Spacing size={10} />
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={onClickSave}>
            추가
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            취소
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

export default SaveModal;
