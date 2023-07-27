import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Box,
  CircularProgress,
  TextField,
  Autocomplete,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import { GlobalContext } from "../context/GlobalContext";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import PrintIcon from "@mui/icons-material/Print";
import { getTruckTickets } from "../API/tickets";
import { getTrucks } from "../API/trucks";
import PrintDialog from "./PrintPage";

const TicketsPrintList = () => {
  const { context, setContext } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [ticketsData, setTicketsData] = useState([]);
  const [openPrinterDialog, setOpenPrinterDialog] = useState(false);
  const [selectedPlate, setSelectedPlate] = useState(null);
  const [trucks, setTrucks] = useState([]);
  const [numeroVenta, setNumeroVenta] = useState("");
  const [error, setError] = useState(false);
  useEffect(() => {
    getTrucks().then((res) => setTrucks(res));
  }, []);

  const handleDelete = async (ticket) => {
    setTicketsData((prevTicketsData) =>
      prevTicketsData.filter((t) => t.id !== ticket.id)
    );
  };

  const handlePrint = (ticket) => {
    console.log("sdas", ticket);
    setContext({
      ...context,
      selectedTicket: ticket,
    });
    setOpenPrinterDialog(true);
  };

  const handleSearch = () => {
    if (selectedPlate == null) {
      setError(true);
    } else {
      setIsLoading(true);
      setError(false);
      console.log(selectedPlate.Patente, numeroVenta);
      const patente = selectedPlate.Patente;
      const numero = numeroVenta != "" ? numeroVenta : "0";
      getTruckTickets(patente, numero).then((res) => {
        setTicketsData(res);
        setIsLoading(false);
      });
    }
  };
  return (
    <div>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Autocomplete
            sx={{ width: "45%" }}
            value={selectedPlate}
            onChange={(event, newValue) => {
              setSelectedPlate(newValue);
            }}
            options={trucks}
            getOptionLabel={(option) => option.Patente}
            renderInput={(params) => <TextField {...params} label="Camión" />}
          />

          <TextField
            sx={{ width: "45%" }}
            label="Número de Venta"
            value={numeroVenta}
            onChange={(e) => setNumeroVenta(e.target.value)}
          />
        </Box>
        <Box sx={{ marginY: 2, justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{ width: "200px" }}
            onClick={handleSearch}
          >
            Buscar
          </Button>
        </Box>
        {error && <Typography>Debes seleccionar un camión</Typography>}
        {isLoading ? (
          <Box sx={{ justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <List>
            {ticketsData.map((ticket) => (
              <Paper key={ticket.id} elevation={3}>
                <ListItem>
                  <ListItemText
                    primary={
                      "Ticket " +
                      ticket.patente +
                      "-" +
                      ticket.numeroVenta +
                      ": " +
                      ticket.entregaBruta
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => {
                        handlePrint(ticket);
                      }}
                    >
                      <PrintIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Paper>
            ))}
          </List>
        )}
      </Container>
      <PrintDialog
        open={openPrinterDialog}
        onClose={() => setOpenPrinterDialog(false)}
      />
    </div>
  );
};

export default TicketsPrintList;
