import Spacing from "#components/Spacing/Spacing";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Fragment, SyntheticEvent, useCallback, useContext, useState } from "react";
import { MacroNode, SubMacroNode } from "#classes/MacroNode";
import { MacroMapContext } from "#contexts/macroMapContext";

interface Props {
  appendNode: (newNode: MacroNode) => void;
  onClickCancel: () => void;
}

function SubMacroNodeForm({ appendNode, onClickCancel }: Props) {
  const [macroName, setMacroName] = useState("");
  const macroMapContext = useContext(MacroMapContext)

  const onClickAdd = () => {
    if(!macroMapContext?.value) return;
    if(!macroName) {
      alert("매크로를 선택하세요");
      return;
    }
    const newNode = new SubMacroNode(macroName, macroMapContext?.value[macroName]);
    appendNode(newNode);
    onClickCancel();
  };

  const onChangeSubMacro = useCallback(
    (_: SyntheticEvent, value: { label: string; name: string } | null) => {
      if (!value) return;
      setMacroName(value.name);
    },
    []
  );

  return (
    <Fragment>
      <Box>
        <Autocomplete
          disablePortal
          options={Object.keys(macroMapContext?.value!).map((name) => ({
            label: name,
            name,
          }))}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="매크로 선택" />}
          onChange={onChangeSubMacro}
        />
      </Box>
      <Box>
        <Spacing size={10} />
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={onClickAdd}>
            추가
          </Button>
          <Button variant="outlined" onClick={onClickCancel}>
            취소
          </Button>
        </Stack>
      </Box>
    </Fragment>
  );
}

export default SubMacroNodeForm;
