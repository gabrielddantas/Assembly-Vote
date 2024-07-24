import React, { useEffect } from "react";
import { IScheduleResponseProps } from "../../models/schedule/schedule.interface";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { Box, Modal } from "@mui/material";
import { VoteInformation } from "../modal/vote-information";
import { colors } from "../../../styles/colors";
import { ApiResponse } from "../../models/general/api-response.interface";
import { Api } from "../../config/axios.config";

export const ScheduleTable = ({
  schedulesProps,
}: {
  schedulesProps: IScheduleResponseProps[];
}) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [schedules, setSchedules] = React.useState<IScheduleResponseProps[]>(
    []
  );
  const [schedule, setSchedule] = React.useState<IScheduleResponseProps | null>(
    null
  );

  useEffect(() => {
    setSchedules(schedulesProps);
  }, [schedulesProps]);

  const getScheduleById = async (id: number) => {
    const { data: response } = await Api.get<
      ApiResponse<IScheduleResponseProps>
    >(`schedules/${id}`);

    const newSchedules = schedules.map((schedule) => {
      if (schedule.id === id) {
        return response.data;
      }

      return schedule;
    });

    setSchedules(newSchedules);
  };

  const handleCloseModal = (voteRegistered: number | null) => {
    if (voteRegistered) {
      getScheduleById(voteRegistered);
    }
    setOpenModal(false);
  };

  const handleOpenModal = (schedule: IScheduleResponseProps) => {
    setSchedule(schedule);
    setOpenModal(true);
  };

  return (
    <>
      <Modal open={openModal} onClose={() => handleCloseModal(null)}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <VoteInformation
            schedule={schedule!}
            handleCloseModal={(voteRegistered) =>
              handleCloseModal(voteRegistered)
            }
          />
        </Box>
      </Modal>
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
                  <p
                    style={{
                      color: colors.black,
                      cursor: "pointer",
                    }}
                    onClick={() => handleOpenModal(row)}
                  >
                    Mais informações
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
