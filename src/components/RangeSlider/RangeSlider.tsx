import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

interface Props {
  id: string;
  value: number[];
  handleChange: (event: Event, value: number | number[], activeThumb: number) => void;
}

function RangeSlider({ value, handleChange, id }: Props) {
  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        disableSwap
      />
    </Box>
  );
}

export default RangeSlider;
