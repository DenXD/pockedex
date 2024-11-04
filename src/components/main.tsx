import { useBerries } from "@/helpers/api";
import VerticalSlider from "@/components/slider";
import { Box, Card, CardContent, CardHeader, TextField } from "@mui/material";
import BerryList from "./lis";
import { useState } from "react";

function Dashboard() {
  const { berries, firmnessList } = useBerries(
    "https://pokeapi.co/api/v2/berry"
  );
  const [sliderIndex, setSliderIndex] = useState(0);
  const [filterText, setFilterText] = useState("");
  const filteredBerries = berries
    .filter((berry) =>
      berry.name.toLowerCase().includes(filterText.toLowerCase())
    )
    .filter((berry) => berry.firmness.name === firmnessList[sliderIndex]?.name);

  return (
    <>
      <Card
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          padding: 1,
          margin: 1,
        }}
      >
        <CardHeader
          title="Pok`e Berries"
          subheader="How tough are you?"
          sx={{
            textAlign: "left",
            fontSize: "1.5rem",
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              minWidth: "150px",
            }}
          >
            <VerticalSlider
              sliderIndex={sliderIndex}
              setSliderIndex={setSliderIndex}
              firmnessList={firmnessList}
            />
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: 2,
              }}
            >
              <TextField
                label="Filter by name"
                variant="outlined"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                sx={{
                  mb: 2,
                  width: "200px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "16px",
                  },
                }}
              />
            </Box>
            <BerryList berries={filteredBerries} />
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

export default Dashboard;
