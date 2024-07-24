import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";

import {
  Container,
  Wrapper,
  Title,
  Description,
  VotesCard,
  WrapperVotesCard,
  MUIStyles,
} from "./styles";
import { Api, handleErrorMessages } from "../../../config/axios.config";
import { ApiResponse } from "../../../models/general/api-response.interface";
import {
  getStorageData,
  keyStorage,
} from "../../../services/session-storage.service";
import {
  IAssociateComponentProps,
  IAssociateProps,
} from "../../../models/associate/associate.interface";
import { IScheduleResponseProps } from "../../../models/schedule/schedule.interface";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Button, Pagination } from "@mui/material";
import { colors } from "../../../../styles/colors";
import { AssociateTable } from "../../associate-table";
import { IVotesProps } from "../../../models/votes/votes.interface";
import {
  IPaginatedData,
  IPagination,
} from "../../../models/general/pagination.interface";

interface IVoteInformationProps {
  schedule: IScheduleResponseProps;
  handleCloseModal: (data: number | null) => void;
}

export const VoteInformation = ({
  handleCloseModal,
  schedule,
}: IVoteInformationProps) => {
  const [value, setValue] = React.useState("1");

  const [hasVoted, setHasVoted] = React.useState<boolean>(true);
  const [associates, setAssociates] = React.useState<
    IAssociateComponentProps[]
  >([]);
  const [pagination, setPagination] = React.useState<IPagination>();
  const [loggedAssociate, setLoggedAssociate] = React.useState<IAssociateProps>(
    () => {
      return getStorageData(keyStorage.associate) || null;
    }
  );

  useEffect(() => {
    getHasVotedInformation();
    getAllAssociates();
  }, []);

  const verifyIfScheduleIsExpired = () => {
    const currentDate = new Date();
    const scheduleDate = new Date(schedule.session.expiresIn);

    return currentDate > scheduleDate;
  };

  const getHasVotedInformation = async () => {
    try {
      const { data: response } = await Api.get<ApiResponse<boolean>>(
        "/votes/has-voted",
        {
          params: {
            scheduleId: schedule.id,
            associateId: loggedAssociate.id,
          },
        }
      );

      setHasVoted(response.data);
    } catch (error) {
      handleErrorMessages(error);
    }
  };

  const getAllAssociates = async (page: number = 0) => {
    try {
      const { data: response } = await Api.get<
        ApiResponse<IPaginatedData<IVotesProps[]>>
      >("/votes/schedule", {
        params: {
          scheduleId: schedule.id,
          page,
        },
      });

      setAssociates(
        transformAssociateInAssociateComponent(response.data.content)
      );
      setPagination(response.data.pagination);
    } catch (error) {
      handleErrorMessages(error);
    }
  };

  const transformAssociateInAssociateComponent = (
    votes: IVotesProps[]
  ): IAssociateComponentProps[] => {
    return votes.map((vote) => {
      return {
        id: vote.associate.id,
        name: vote.associate.name,
        cpf: vote.associate.cpf,
        vote: vote.vote,
      };
    });
  };

  const handleVote = async (vote: boolean) => {
    try {
      await Api.post<ApiResponse<boolean>>("/votes", {
        scheduleId: schedule.id,
        associateId: loggedAssociate.id,
        vote,
      });

      setHasVoted(true);
      handleCloseModal(schedule.id);
    } catch (error) {
      handleErrorMessages(error);
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handlePage = (page: number) => {
    if (page === pagination?.page) return;

    getAllAssociates(page);
  };

  return (
    <Container>
      <Wrapper>
        <div className="close" onClick={() => handleCloseModal(null)}>
          <CloseIcon
            sx={{
              fontSize: 32,
            }}
          />
        </div>
        <Title>Informações da pauta</Title>
        {verifyIfScheduleIsExpired() && (
          <span style={{ color: colors.red, margin: "5px 0 0 20px" }}>
            (Votação encerrada, não é possível votar)
          </span>
        )}
        <Box
          sx={{
            typography: "body1",
            marginTop: "20px",
            padding: "0 20px",
          }}
        >
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="Tabs for voting information"
              >
                <Tab label="Informações" value="1" />
                <Tab label="Listagem" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1" sx={{ padding: "20px 0 0" }}>
              <Title>{schedule.title}</Title>
              <Description>{schedule.description}</Description>
              <WrapperVotesCard>
                <div className="wrapper-specific-votes">
                  <VotesCard color="green" width={90} fontcolor="white">
                    <span>Votos aprovados</span>
                    <h2>{schedule.approvedVotes}</h2>
                  </VotesCard>
                  <VotesCard color="red" width={90} fontcolor="white">
                    <span>Votos desaprovados</span>
                    <h2>{schedule.disapprovedVotes}</h2>
                  </VotesCard>
                </div>
                <div className="wrapper-vote-total">
                  <VotesCard color="silver" width={100} fontcolor="black">
                    <span>Total de votos</span>
                    <h2>{schedule.totalVotes}</h2>
                  </VotesCard>
                </div>
              </WrapperVotesCard>
              <WrapperVotesCard>
                <div className="wrapper-specific-votes">
                  <Button
                    variant="contained"
                    sx={MUIStyles}
                    disabled={hasVoted || verifyIfScheduleIsExpired()}
                    color="success"
                    type="submit"
                    onClick={() => handleVote(true)}
                  >
                    Votar sim
                  </Button>
                  <Button
                    variant="contained"
                    sx={MUIStyles}
                    disabled={hasVoted || verifyIfScheduleIsExpired()}
                    color="error"
                    type="submit"
                    onClick={() => handleVote(false)}
                  >
                    Votar não
                  </Button>
                </div>
              </WrapperVotesCard>
            </TabPanel>
            <TabPanel value="2">
              <AssociateTable associateProps={associates} />
              <Pagination
                sx={{ padding: "20px 0" }}
                count={pagination?.numberOfPages || 1}
                page={pagination?.page ? pagination?.page + 1 : 1}
                onChange={(event, page) => handlePage(page - 1)}
              />
            </TabPanel>
          </TabContext>
        </Box>
      </Wrapper>
    </Container>
  );
};
