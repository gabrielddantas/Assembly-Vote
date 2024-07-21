import React, { useEffect } from "react";

import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import {
  ContainerMobile,
  WrapperMobileContent,
  ContainerDesktop,
  WrapperDesktopSecondary,
  WrapperInformation,
  WrapperContent,
} from "./styles";
import { colors } from "../../../styles/colors";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
  getStorageData,
  keyStorage,
} from "../../services/session-storage.service";

export const Root = ({ children }: { children: JSX.Element }) => {
  const [associateName, setAssociateName] = React.useState<string>("");

  useEffect(() => {
    setAssociateName(getAssociateName());
  }, []);

  const getAssociateName = () => {
    const associate = getStorageData(keyStorage.associate);

    if (associate) {
      return getFirstAndLastName(associate.name);
    }

    return "Usuário";
  };

  const getFirstAndLastName = (name: string) => {
    const names = name.split(" ");
    if (names.length === 1) {
      return names[0];
    }
    return names[0] + " " + names[names.length - 1];
  };

  return (
    <>
      <ContainerMobile>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {associateName}
            </Typography>
            <Button color="inherit">Cadastrar pauta</Button>
          </Toolbar>
        </AppBar>
        <WrapperMobileContent>{children}</WrapperMobileContent>
      </ContainerMobile>
      <ContainerDesktop>
        <WrapperDesktopSecondary>
          <WrapperInformation>
            <CalendarMonthIcon
              sx={{
                fontSize: 80,
                color: colors.white,
                marginTop: "50px",
              }}
            />
            <Typography
              variant="h6"
              component="div"
              color={colors.white}
              sx={{
                marginTop: "5px",
              }}
            >
              Assembly Vote
            </Typography>
            <Typography
              variant="subtitle2"
              component="div"
              color={colors.white}
            >
              {associateName}
            </Typography>
            <div className="handles">
              <Button
                variant="contained"
                endIcon={<AddToPhotosIcon />}
                type="button"
              >
                Cadastrar pauta
              </Button>
            </div>
          </WrapperInformation>
          <WrapperContent>{children}</WrapperContent>
        </WrapperDesktopSecondary>
      </ContainerDesktop>
    </>
  );
};
