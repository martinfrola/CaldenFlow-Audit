import React, { useContext, useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  CircularProgress,
  IconButton,
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
import { getTicketsForPrint, updateTickets } from "../API/tickets";
import PrintDialog from "./PrintPage";

const TicketsPrintList = () => {
  const { context, setContext } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true);
  const [ticketsData, setTicketsData] = useState([]);
  const [openPrinterDialog, setOpenPrinterDialog] = useState(false);

  useEffect(() => {
    const getTickets = async () => {
      const tickets = await getTicketsForPrint();
      setTicketsData(tickets);
      setIsLoading(false);
    };
    getTickets();
  }, []);

  const handleDelete = async (ticket) => {
    await updateTickets(ticket);
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
  return (
    <div>
      {isLoading ? (
        <CircularProgress />
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
                  <IconButton
                    onClick={() => {
                      handleDelete(ticket);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Paper>
          ))}
        </List>
      )}
      <PrintDialog
        open={openPrinterDialog}
        onClose={() => setOpenPrinterDialog(false)}
      />
    </div>
  );
};

export default TicketsPrintList;
