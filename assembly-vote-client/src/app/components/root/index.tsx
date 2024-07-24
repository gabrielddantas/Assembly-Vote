import React, { useEffect } from "react";

import { AppBar, Toolbar, Typography } from "@mui/material";
import { ContainerMobile, WrapperContent } from "./styles";
import { colors } from "../../../styles/colors";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {
  clearAllStorageData,
  getStorageData,
  keyStorage,
} from "../../services/session-storage.service";
import { useNavigate } from "react-router-dom";

export const Root = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
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

  const logout = () => {
    clearAllStorageData();
    navigate("/login");
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
            <ExitToAppIcon
              onClick={logout}
              sx={{
                cursor: "pointer",
                fontSize: 32,
              }}
            />
          </Toolbar>
        </AppBar>
        <WrapperContent>
          <div className="content">{children}</div>
        </WrapperContent>
      </ContainerMobile>
    </>
  );
};
