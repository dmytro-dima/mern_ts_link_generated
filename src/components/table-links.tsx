import React from "react";
import { NavLink } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, Link } from "@material-ui/core";

interface ILink {
  clicks?: number;
  _id?: string;
  code?: string;
  to?: string;
  from?: string;
  owner?: string;
  date?: string;
}

export const TableLinks: React.FC<{ links: ILink[] }> = ({ links }) => {
  console.log(links);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell>Оригінал</TableCell>
            <TableCell align="left">Ваше посилання</TableCell>
            <TableCell align="center">Детальніше</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {links.map(({ from, to, _id }: ILink) => (
            <TableRow key={_id}>
              <TableCell>
                <Link component={Link} href={from}>
                  {from}
                </Link>
              </TableCell>
              <TableCell align="left">
                <Link component={Link} href={to}>
                  {to}
                </Link>
              </TableCell>
              <TableCell align="center">
                <Button
                  variant="outlined"
                  color="primary"
                  component={NavLink}
                  to={`/detail/:${_id}`}
                  className="text-decoration-none text-primary"
                >
                  Детальніше
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
