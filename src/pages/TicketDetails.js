import React, { useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import { GlobalContext } from "../context/GlobalContext";

const TicketDetails = () => {
  const { context, setContext } = useContext(GlobalContext);

  const { selectedTicket } = context;
  console.log(selectedTicket);

  const handleBackButtonClick = () => {
    setContext({ ...context, page: "list" });
  };

  const handleNextButtonClick = () => {
    setContext({ ...context, page: "observations" });
  };

  return (
    <Box>
      <h2>
        Detalle del ticket {selectedTicket.Patente}
        {selectedTicket.numeroVenta}
      </h2>
      <Box sx={{ textAlign: "left", marginX: 2, marginBottom: 3 }}>
        <Typography>Inicio Despacho: {selectedTicket.inicio}</Typography>
        <Typography>Fin Despacho: {selectedTicket.fin}</Typography>
        <Typography>Cliente: {selectedTicket.cliente}</Typography>
        <Typography>Estado Incial: {selectedTicket.estadoInicial}</Typography>
        <Typography>Estado Final: {selectedTicket.estadoFinal}</Typography>
        <Typography>Entrega Bruta: {selectedTicket.entregaBruta}</Typography>
        <Typography>Patente: {selectedTicket.Patente}</Typography>
        <Typography>Número de Venta: {selectedTicket.numeroVenta}</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Button onClick={() => setContext({ ...context, page: "listObs" })}>
          Volver
        </Button>
        <Button
          onClick={() => setContext({ ...context, page: "observations" })}
        >
          Siguiente
        </Button>
      </Box>
    </Box>
  );
};

export default TicketDetails;
