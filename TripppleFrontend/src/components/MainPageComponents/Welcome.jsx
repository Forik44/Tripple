import { Container, Grid, Typography } from "@mui/material";
import React from "react";

const Welcome = () => {
  return (
    <Container sx={{ my: "5rem", ml: "1rem", mr: "1rem" }}>
      <Grid container>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          {/* <Typography variant="h3" color="#66FCF1" align="center">
            Комплектующие для любых целей
          </Typography> */}
          <img src="/images/logo.png" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Welcome;
