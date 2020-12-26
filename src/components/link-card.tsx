import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Grid, Link, ListItemText } from "@material-ui/core";

interface LinkCard {
  clicks?: number;
  _id?: string;
  code?: string;
  to?: string;
  from?: string;
  owner?: string;
  date?: string;
}

export const LinkCard: React.FC<LinkCard> = ({
  date,
  from,
  to,
  _id,
  clicks,
}) => {
  return (
    <Grid container spacing={3} className="border-primary border-1" key={_id}>
      <Grid item xs={12} className="d-flex justify-content-center">
        <Accordion className="w-100">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <ListItemText
              primary={
                <ListItemText
                  primary="Посилання"
                  secondary={<Link href={from}>{from}</Link>}
                />
              }
              secondary={`Дата створення ${date}`}
            />
          </AccordionSummary>
          <AccordionDetails>
            <ListItemText
              primary={
                <ListItemText
                  primary="Ваше посилання"
                  secondary={<Link href={to}>{to}</Link>}
                />
              }
              secondary={`Кількість кліків: ${clicks}`}
            />
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};
