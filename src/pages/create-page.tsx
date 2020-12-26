import React, { useContext, useState } from "react";
import { Container, Grid, TextField, Typography } from "@material-ui/core";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/auth-context";
import { useHistory } from "react-router-dom";

export const CreatePage: React.FC = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [link, setValues] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(event.target.value);
  };
  const handlePress = async (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      try {
        await request(
          "/api/link/generate",
          "POST",
          {
            from: link,
          },
          { Authorization: `Bearer: ${auth.token}` }
        ).then((data) => history.push(`/detail/:${data.link._id}`));
      } catch (e) {}
    }
  };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={3} className="border-primary border-1 mt-5">
        <Grid item xs={12} className="d-flex justify-content-center">
          <Typography variant="h6">Вставте силку</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="standard-basic"
            label="Standard"
            fullWidth
            value={link}
            onChange={handleChange}
            onKeyPress={(e) => handlePress(e)}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
