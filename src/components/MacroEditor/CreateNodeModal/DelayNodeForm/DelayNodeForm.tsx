import useRangeSlider from "#components/RangeSlider/useRangeSlider";
import RangeSlider from "#components/RangeSlider/RangeSlider";
import Spacing from "#components/Spacing/Spacing";
import { Fragment } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { DelayNode, MacroNode } from "#classes/MacroNode";

interface Props {
  appendNode: (newNode: MacroNode) => void;
  onClickCancel: () => void;
}

function DelayNodeForm({ appendNode, onClickCancel }: Props) {
  const [delay, onChangeDelay] = useRangeSlider();
  const onClickAdd = () => {
    appendNode(new DelayNode(delay[0], delay[1]));
    onClickCancel();
  };
  return (
    <Fragment>
      <RangeSlider id="delay-slider" value={delay} handleChange={onChangeDelay} />
      <Spacing size={10} />{" "}
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

export default DelayNodeForm;
