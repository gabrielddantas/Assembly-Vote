import React, { useEffect, useState } from "react";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";

import {
  Container,
  WrapperHeader,
  WrapperContent,
  WrapperScroll,
  LinkContainer,
  MUIStyles,
} from "./styles";
import { Box, Button, Typography } from "@mui/material";
import { colors } from "../../../styles/colors";
import { Api, handleErrorMessages } from "../../config/axios.config";
import { ISessionProps } from "../../models/session/session.interface";
import { ApiResponse } from "../../models/general/api-response.interface";
import Pagination from "@mui/material/Pagination";
import Modal from "@mui/material/Modal";
import {
  IPaginatedData,
  IPagination,
} from "../../models/general/pagination.interface";
import { SessionCard } from "../../components/session-card";
import { ScheduleRegister } from "../../components/modal/schedule-register";
import { Link, useNavigate, useParams } from "react-router-dom";
import EventNoteIcon from "@mui/icons-material/EventNote";

import {
  IScheduleProps,
  IScheduleResponseProps,
} from "../../models/schedule/schedule.interface";
import { ScheduleTable } from "../../components/schedule-table";

export const Schedule = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [schedules, setSchedules] = useState<IScheduleResponseProps[]>([]);
  const [pagination, setPagination] = useState<IPagination>();

  useEffect(() => {
    getSchedules();
  }, []);

  const getSchedules = async (page: number = 0) => {
    try {
      const { data } = await Api.get<
        ApiResponse<IPaginatedData<IScheduleResponseProps[]>>
      >(`/schedules/by-session/${sessionId}`, {
        params: {
          page: page,
        },
      });
      setSchedules(data.data.content);
      setPagination(data.data.pagination);
    } catch (error) {
      handleErrorMessages(error);
    }
  };

  const handlePage = (page: number) => {
    if (page === pagination?.page) return;

    getSchedules(page);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = (scheduleRegistered: IScheduleProps | null) => {
    setOpenModal(false);

    if (scheduleRegistered) {
      if (scheduleRegistered.session.id != sessionId) {
        navigate("/");
        return;
      }
      getSchedules();
    }
  };

  return (
    <Container>
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
          <ScheduleRegister
            handleCloseModal={(scheduleRegistered) =>
              handleCloseModal(scheduleRegistered)
            }
          />
        </Box>
      </Modal>
      <WrapperHeader>
        <Breadcrumbs aria-label="breadcrumb">
          <LinkContainer to="/">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Sessões
          </LinkContainer>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              color: colors.deepSeaBlue,
              fontSize: "18px",
            }}
          >
            <EventNoteIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Pautas
          </Typography>
        </Breadcrumbs>
        <Button
          variant="contained"
          sx={MUIStyles}
          type="button"
          onClick={handleOpenModal}
        >
          Cadastrar uma pauta
        </Button>
      </WrapperHeader>
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          color: colors.deepSeaBlue,
          marginTop: "20px",
          fontSize: "28px",
        }}
      >
        Listagem das pautas
      </Typography>
      <WrapperContent>
        <WrapperScroll>
          <div className="wrapper-cards">
            {schedules.length > 0 ? (
              <ScheduleTable schedulesProps={schedules} />
            ) : (
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: colors.deepSeaBlue,
                  marginTop: "20px",
                  fontSize: "18px",
                }}
              >
                Nenhuma pauta encontrada
              </Typography>
            )}
          </div>
        </WrapperScroll>
        <Pagination
          count={pagination?.numberOfPages || 1}
          page={pagination?.page ? pagination?.page + 1 : 1}
          onChange={(event, page) => handlePage(page - 1)}
        />
      </WrapperContent>
    </Container>
  );
};
