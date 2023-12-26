import MuiRadio from "@mui/material/Radio";
import MuiRadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ChangeEventHandler } from "react";

interface RadioItem {
  value: unknown;
  label: string;
}

interface Props {
  items: RadioItem[];
  onChange: ChangeEventHandler<HTMLInputElement>;
}

function RadioGroup({ items, onChange }: Props) {
  return (
    <MuiRadioGroup row onChange={onChange}>
      {items.map(({ value, label }) => (
        <FormControlLabel key={`radio-item-${label}`} value={value} control={<MuiRadio />} label={label} />
      ))}
    </MuiRadioGroup>
  );
}

export default RadioGroup;
