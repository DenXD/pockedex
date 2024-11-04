import { Berry } from "@/helpers/api";
import {
  Avatar,
  Box,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

const BerryList = ({ berries }: { berries: Berry[] }) => {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {berries.map((berry) => (
        <ListItem
          alignItems="flex-start"
          sx={{
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            padding: 1,
            margin: 1,
          }}
        >
          <ListItemAvatar>
            <Avatar
              sx={{
                textTransform: "uppercase",
              }}
              alt={berry.name}
              src="name.jpg"
            />
          </ListItemAvatar>
          <ListItemText
            primary={berry.name}
            secondary={
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  gap: 1,
                }}
              >
                {berry.flavors.map((flavor) => (
                  <Chip label={flavor.flavor.name} key={flavor.flavor.name} />
                ))}
              </Box>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default BerryList;
