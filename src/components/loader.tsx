import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Container } from "@material-ui/core";
import { BrowserRouter as Router } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
    },
  })
);

export const Loader = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="sm" className="mt-3 d-flex justify-content-center">
        <CircularProgress />
      </Container>
    </div>
  );
};
