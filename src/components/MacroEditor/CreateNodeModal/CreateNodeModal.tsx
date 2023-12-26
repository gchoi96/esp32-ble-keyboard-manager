import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Spacing from "#/components/Spacing/Spacing";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { HTMLAttributes, SyntheticEvent, useCallback, useState } from "react";
import KeyNodeForm from "#components/MacroEditor/CreateNodeModal/KeyNodeForm/KeyNodeForm";
import DelayNodeForm from "#components/MacroEditor/CreateNodeModal/DelayNodeForm/DelayNodeForm";
import { MacroNode } from "#classes/MacroNode";
import modalBoxStyle from "#/constants/modalBoxStyle";
import SubMacroNodeForm from "./SubMacroNodeForm/SubMacroNodeForm";

interface Props extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  handleClose: () => void;
  appendNode: (newNode: MacroNode) => void;
  parentNode?: MacroNode;
}

function CreateNodeModal({ open, appendNode, handleClose, ...props }: Props) {
  const [value, setValue] = useState(0);

  const handleChange = useCallback((_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  }, []);

  return (
    <Modal open={open} onClose={handleClose} {...props}>
      <Box sx={modalBoxStyle}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Key Node" />
            <Tab label="Delay Node" />
            <Tab label="SubMacro Node" />
          </Tabs>
        </Box>
        <Spacing size={10} />
        {value === 0 ? (
          <KeyNodeForm appendNode={appendNode} onClickCancel={handleClose} />
        ) : value === 1 ? (
          <DelayNodeForm appendNode={appendNode} onClickCancel={handleClose} />
        ) : (
          <SubMacroNodeForm appendNode={appendNode} onClickCancel={handleClose} />
        )}
      </Box>
    </Modal>
  );
}

export default CreateNodeModal;
