import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { Settings } from "@mui/icons-material";
import { GlobalContext } from "../context/GlobalContext";
import LogoCaldenFlow from "../utils/images/logo_audit.png";

const Nav = () => {
  const { context, setContext } = useContext(GlobalContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState("Consulta");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDropdownChange = (val) => {
    setSelected(val);

    setContext({
      ...context,
      page: val === "Observados" ? "listObs" : "listPrint",
    });
    handleClose();
  };

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 3 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img src={LogoCaldenFlow} alt="Logo CaldenFlow" width="170px" />
          </Box>
          {(context.page == "listObs" || context.page == "listPrint") && (
            <div>
              <Button
                variant="text"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                sx={{ color: "white" }}
              >
                {selected}
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  value={"Observados"}
                  onClick={() => handleDropdownChange("Observados")}
                >
                  Observados
                </MenuItem>
                <MenuItem
                  value={"Repimprimir"}
                  onClick={() => handleDropdownChange("Consulta")}
                >
                  Consulta
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav;
