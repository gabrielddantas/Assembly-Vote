import React, { useEffect } from "react";

import { AppBar, Toolbar, Typography } from "@mui/material";
import { ContainerMobile, WrapperContent } from "./styles";
import { colors } from "../../../styles/colors";
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
            <CalendarMonthIcon
              sx={{
                fontSize: 40,
                color: colors.white,
                marginRight: "10px",
              }}
            />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {associateName}
            </Typography>
          </Toolbar>
        </AppBar>
        <WrapperContent>
          <div className="content">{children}</div>
        </WrapperContent>
      </ContainerMobile>
    </>
  );
};
