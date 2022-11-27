import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import AccessoryService from "../API/AccessoryService";

const AccessoryPage = () => {
  const { id } = useParams();
  const [accessory, setAccessory] = useState({});
  const [config, setConfig] = useState({});
  async function fetchAccessory(id) {
    const response = await AccessoryService.getAccessoryById(id);
    setAccessory(response.data);
    const response2 = await AccessoryService.getConfiguration(
      response.data.category_id,
      response.data.accessory_id
    );
    setConfig(response2.data);
  }
  useEffect(() => {
    fetchAccessory(id);
  }, []);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box
        sx={{
          my: "2rem",
          display: "flex",
          width: "85%",
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={6}>
            <img src={"http://127.0.0.1:8000" + accessory.photo} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{ background: "grey", borderRadius: "10px", height: "100%" }}
            ></Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AccessoryPage;
