import React, { useContext, useState } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  FormControl,
  IconButton,
  OutlinedInput,
  InputLabel,
  Container,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/auth-context";

interface StatePassword {
  password: string;
  showPassword: boolean;
  email: string;
}

export const AuthPage: React.FC = () => {
  const auth = useContext(AuthContext);
  const { error, loading, request, clearError } = useHttp();
  const [values, setValues] = useState<StatePassword>({
    password: "",
    email: "",
    showPassword: false,
  });

  const handleChange = (prop: keyof StatePassword) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
    clearError();
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const registerHandler = async () => {
    try {
      request("/api/auth/register", "POST", {
        email: values.email,
        password: values.password,
      }).then(() => {});
      clearError();
    } catch (err) {}
  };

  const loginHandler = async () => {
    try {
      request("/api/auth/login", "POST", {
        email: values.email,
        password: values.password,
      }).then(({ userId, token }) => auth.login(token, userId));
    } catch (err) {}
  };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={3} className="border-primary border-1 mt-5">
        <Grid item xs={12} className="d-flex justify-content-center">
          <Typography variant="h6">Авторизація</Typography>
          {error && (
            <Typography
              variant="body1"
              className="text-danger ml-5 mt-auto mb-auto"
            >
              {error}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            value={values.email}
            onChange={handleChange("email")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            fullWidth
            disabled={loading}
            onClick={() => registerHandler()}
          >
            Зареєструватись
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            onClick={() => loginHandler()}
          >
            Увійти
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
