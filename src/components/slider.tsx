import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import { Firmness } from "@/helpers/api";

const VerticalSlider = ({
  sliderIndex,
  setSliderIndex,
  firmnessList,
}: {
  sliderIndex: number;
  setSliderIndex: (index: number) => void;
  firmnessList: Firmness[];
}) => {
  const marks = firmnessList.map((firmness, index) => ({
    value: index,
    label: (
      <Box
        sx={{
          textTransform: "capitalize",
        }}
      >
        {firmness.name}
        <Box
          sx={{
            fontSize: "0.8rem",
            color: "gray",
            textAlign: "left",
          }}
        >
          {firmness.count}
        </Box>
      </Box>
    ),
  }));

  return (
    <Box
      sx={{
        height: 300,
        display: "flex",
        alignItems: "center",
        paddingY: "20px",
      }}
    >
      <Slider
        orientation="vertical"
        defaultValue={50}
        aria-labelledby="vertical-slider"
        marks={marks}
        step={1}
        min={0}
        max={firmnessList.length - 1}
        value={sliderIndex}
        onChange={(_, value) => setSliderIndex(value as number)}
        sx={{
          mr: 2,
          mt: "20px",
          mb: "20px",
          "& .MuiSlider-track": {
            display: "none",
          },
          "& .MuiSlider-mark": {
            display: "none",
          },
          "& .MuiSlider-rail": {
            width: 26,
            paddingTop: "20px",
            marginTop: "-20px",
            marginBottom: "-20px",
            paddingBottom: "20px",
            backgroundColor: "white",
            border: "2px solid gray",
            boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
          },
          "& .MuiSlider-thumb": {
            backgroundColor: "white",
            border: "2px solid red",
            "&:hover, &:focus, &:active": {
              borderColor: "red",
            },
          },
        }}
      />
    </Box>
  );
};

export default VerticalSlider;
