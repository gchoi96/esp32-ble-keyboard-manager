import Spacing from "#components/Spacing/Spacing";
import RadioGroup from "#components/RadioGroup/RadioGroup";
import KeyAction from "#types/KeyAction";
import KeyCode from "#types/KeyCode";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import {
  ChangeEventHandler,
  Fragment,
  SyntheticEvent,
  useCallback,
  useState,
} from "react";
import { KeyNode, MacroNode } from "#classes/MacroNode";

interface KeyItem {
  label: string;
  code: KeyCode;
}

interface Props {
  appendNode: (newNode: MacroNode) => void;
  onClickCancel: () => void;
}

function KeyNodeForm({ appendNode, onClickCancel }: Props) {
  const [action, setAction] = useState<KeyAction>();
  const [code, setCode] = useState<KeyCode | null>();

  const onChangeKeyAction: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setAction(e.target.value as KeyAction);
  }, []);

  const onChangeKey = useCallback(
    (_: SyntheticEvent, value: { label: string; code: KeyCode } | null) => {
      setCode(value && value.code);
    },
    []
  );

  const isOptionEqualToValue = useCallback((option: KeyItem, value: KeyItem) => {
    return option.code === value.code;
  }, []);

  const onClickAdd = () => {
    if (!action) return;
    if (!code) return;
    const newNode = new KeyNode(code, action);
    appendNode(newNode);
    onClickCancel();
  };

  return (
    <Fragment>
      <Box>
        <Autocomplete
          disablePortal
          options={Object.keys(KeyCode).map<KeyItem>((code) => ({
            label: code,
            code: code as KeyCode,
          }))}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="키 선택" />}
          onChange={onChangeKey}
          isOptionEqualToValue={isOptionEqualToValue}
        />
      </Box>
      <Box>
        <RadioGroup
          onChange={onChangeKeyAction}
          items={[
            { value: KeyAction.Press, label: KeyAction.Press },
            { value: KeyAction.Release, label: KeyAction.Release },
          ]}
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

export default KeyNodeForm;
