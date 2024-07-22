import React from "react";
import { IScheduleResponseProps } from "../../models/schedule/schedule.interface";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

export const ScheduleTable = ({
  schedules,
}: {
  schedules: IScheduleResponseProps[];
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 800 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Título</TableCell>
            <TableCell align="left">Descrição</TableCell>
            <TableCell align="left">Total de votos</TableCell>
            <TableCell align="left">Votos aprovados</TableCell>
            <TableCell align="left">Votos desaprovados</TableCell>
            <TableCell align="left">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {schedules.map((row) => (
            <TableRow
              key={row.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="left">{row.description}</TableCell>
              <TableCell align="left">{row.totalVotes}</TableCell>
              <TableCell align="left">{row.approvedVotes}</TableCell>
              <TableCell align="left">{row.disapprovedVotes}</TableCell>
              <TableCell align="left">
                <Link to={"/"}>Mais informações</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
