import React, { useContext, useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { GlobalContext } from "../context/GlobalContext";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getTicketsObs } from "../API/tickets";

const TicketObsList = () => {
  const { context, setContext } = useContext(GlobalContext);
  const [ticketsByPlate, setTicketsByPlate] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getTickets = async () => {
      const response = await getTicketsObs();
      const plates = [...new Set(response.map((item) => item.patente))];
      const tickets = plates.reduce((acc, plate) => {
        acc.push({
          plate: plate,
          tickets: response.filter((item) => item.patente === plate),
        });
        return acc;
      }, []);

      setTicketsByPlate(tickets);
      setIsLoading(false);
      console.log(tickets);
    };
    getTickets();
  }, []);

  const handleClick = async (ticket) => {
    setContext({
      ...context,
      page: "observations",
      selectedTicket: ticket,
    });
  };
  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        ticketsByPlate.map((truck) => (
          <Accordion key={truck.plate}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {truck.plate}
            </AccordionSummary>
            <AccordionDetails>
              {truck.tickets.map((ticket) => (
                <Box
                  key={ticket.id}
                  sx={{
                    textAlign: "left",
                    marginBottom: 1,
                    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                    paddingBottom: 1,
                    cursor: "pointer",
                  }}
                >
                  <Typography onClick={() => handleClick(ticket)}>
                    Ticket {ticket.numeroVenta}
                  </Typography>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </div>
  );
};

export default TicketObsList;
