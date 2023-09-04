import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} timeout={500} />;
});

const toProperCase = (str) => {
  if (!str) return ""; // return an empty string if str is undefined or null
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.substring(1);
    })
    .join(" ");
};

function PrintDialog({ open, onClose }) {
  const [ticketData, setTicketData] = useState({});
  const { context, setContext } = useContext(GlobalContext);

  useEffect(() => {
    console.log(context);
    console.log(context.selectedTicket);
    setTicketData(context.selectedTicket);
  }, [open]);

  const handleClose = () => {
    onClose();
  };

  const isTabacal = ticketData.cliente === "Tabacal";
  const isCuarteo = ticketData.cuarteo === "true";

  const storedData = [
    { label: "Inicio", value: ticketData.inicio },
        { label: "Fin", value: ticketData.fin },
        { label: "Cliente", value: ticketData.cliente },
        {
          label: "Entrega",
          value: ticketData.entregaBruta,
        },
        {
          label: "T. Inicial",
          value: ticketData.estadoInicial,
        },
        {
          label: "T. Final",
          value: ticketData.estadoFinal,
        },
        {
          label: "Chofer",
          value: ticketData.choferNombre,
        },
        {
          label: "Patente",
          value: ticketData.patente,
        },
        ...(ticketData.operacionVenta !== 'Ledesma Tanques' 
            ? [
              {
                label: "Máquina",
                value: ticketData.maquina,
              },
              {
                label: "Horómetro",
                value: ticketData.horometro,
              },
              ...(ticketData.operacionVenta !== 'Ledesma Capilar' 
                ? [
                    {
                      label: "Operación",
                      value: ticketData.operacion,
                    },
                  ]
                : []),
            
              {
                label: "Bloque",
                value: ticketData.bloqueDescripcion,
              },
              {
                label: "Supervisor",
                value: ticketData.supervisorLegajo + ": " + ticketData.supervisorNombre,
              },
            ]:[]),
        ...(ticketData.cuarteo == "true"
          ? [
              {
                label: "Cuarteo",
                value: "Sí",
              },
            ]
          : []),
        {
          label: "Número de ticket",
          value: ticketData.numeroVenta,
        },
  ];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen
      fullWidth
      TransitionComponent={Transition}
    >
      <DialogTitle
        sx={{
          "@media print": {
            display: "none",
          },
        }}
      >
        Datos del ticket
      </DialogTitle>
      <DialogContent
        style={{
          width: "75mm",
          paddingLeft: 80,
          paddingRight: 10,
          paddingTop: 10,
        }}
      >
        <Typography>
          <strong>MIC INGENIOS</strong>
        </Typography>
        <Typography variant="body2">
          <strong>Combustibles del Norte S.A.</strong>
        </Typography>
        <Typography variant="body2">
          <strong>Av. Chile 1275, CP 4400, Salta</strong>
        </Typography>
        <Typography
          variant="body2"
          style={{
            paddingBottom: 10,
          }}
        >
          <strong>CUIT 30-68128447-4</strong>
        </Typography>
        {storedData.map(({ label, value }) => (
          <Typography key={label} variant="body2">
            <strong>{label}:</strong> {value}
          </Typography>
        ))}

        {ticketData.firma ? (
          <img
            src={ticketData.firma}
            alt="Signature"
            style={{ maxWidth: "80%" }}
          />
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button
          sx={{
            "@media print": {
              display: "none",
            },
          }}
          onClick={onClose}
        >
          Cerrar
        </Button>
        <Button
          sx={{
            "@media print": {
              display: "none",
            },
          }}
          onClick={() => window.print()}
        >
          Imprimir
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PrintDialog;
