import { Typography, Container, Box, IconButton } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import PrintIcon from "@mui/icons-material/Print";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { GlobalContext } from "../context/GlobalContext";
import {getTrucks} from '../API/trucks'
export default function DetailAgro() {
  const { context, setContext } = useContext(GlobalContext);
  const [notaVenta, setNotaVenta] = useState(null);
  const [actualDate, setActualDate] = useState(null);
  const [driver, setDriver] = useState(null);
  const [truck, setTruck] = useState(null);
  const [firma, setFirma] = useState("");
  const [ticket, setTicket] = useState(null);
  useEffect(() => {
    
    const fetchTicket = async () => {
      setTicket(context.selectedTicket);
      setNotaVenta(context.selectedTicket.notaVenta);
      setDriver(context.selectedTicket.choferNombre);
      setFirma(context.selectedTicket.firma);

      getTrucks().then((camiones) => {
        const filteredCamion = camiones.filter(
          (camion) => camion.Patente === context.selectedTicket.patente
        );
        setTruck(filteredCamion[0]);
      });
    };
    fetchTicket();
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${day}/${month}/${year}`;
    setActualDate(formattedDate);
  }, []);

  const onClose = () => {
    localStorage.removeItem("idTicket");
    localStorage.removeItem("cuarteo");
    localStorage.removeItem("preset");
    localStorage.removeItem("tabacalOperation");
    localStorage.removeItem("odometer");
    localStorage.removeItem("bloqueID");
    localStorage.removeItem("supervisorNombre");
    localStorage.removeItem("machine");
    localStorage.removeItem("supervisorLegajo");
    localStorage.removeItem("dispatched");
    localStorage.removeItem("bloqueDescripcion");
    localStorage.removeItem("entregaBruta");
    localStorage.removeItem("notaVenta");
    setContext({
      ...context,
      page: "home",
    });
  };

  return (
    <Container
      sx={{
        "@media print": {
          margin: 0,
          padding: 0
        },
      }}
    >
      {notaVenta != null && (
        <Box sx={{ textAlign: "center", marginTop: 3 }}>
          <Typography
            variant="h5"
            sx={{
              fontSize: "14px",
              "@media print": {
                fontSize: "1px",
              },
            }}
          >
            <strong>{notaVenta.RazonSocial}</strong>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: "12px",
              "@media print": {
                fontSize: "1px",
              },
            }}
          >
            <strong>
              Remito: {ticket.remito}
            </strong>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: "12px",
              "@media print": {
                fontSize: "1px",
              },
            }}
          >
            <strong>**Documento no válido como factura**</strong>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: "12px",
              "@media print": {
                fontSize: "1px",
              },
            }}
          >
            <strong>
              Tipo Comprobante: {notaVenta.TipoRemito} (Cod.Nro 91)
            </strong>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: "12px",
              "@media print": {
                fontSize: "1px",
              },
            }}
          >
            {" "}
            <strong>Fecha: {actualDate}</strong>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "12px",
              "@media print": {
                fontSize: "1px",
              },
            }}
          >
            CUIT: {notaVenta.CUIT}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "12px",
              "@media print": {
                fontSize: "1px",
              },
            }}
          >
            Domicilio: Ruta Nacional 34 km 1344.5
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "12px",
              "@media print": {
                fontSize: "1px",
              },
            }}
          >
            C.P: (4530) Embarcación
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "12px",
              "@media print": {
                fontSize: "1px",
              },
            }}
          >
            Nro. Inscripción IIBB: {notaVenta.NroInscripcionIIBB}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "12px",
              "@media print": {
                fontSize: "1px",
              },
            }}
          >
            Ini. Actividades: 01/10/1995
          </Typography>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "12px",
              "@media print": {
                fontSize: "1px",
              },
            }}
          >
            ----------------------------------------------
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "12px",
              "@media print": {
                fontSize: "1px",
              },
            }}
          >
            Cliente:{" "}
            {notaVenta.Nombre != undefined
              ? notaVenta.Nombre
              : notaVenta.RazonSocialCliente}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "12px",
              "@media print": {
                fontSize: "1px",
              },
            }}
          >
            Dir. Entrega: {notaVenta.DireccionEntrega}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "12px",
              "@media print": {
                fontSize: "1px",
              },
            }}
          >
            Provincia:{" "}
            {notaVenta.Provincia != undefined
              ? notaVenta.Provincia
              : notaVenta.DescripcionProv}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "12px",
              "@media print": {
                fontSize: "1px",
              },
            }}
          >
            IVA: {notaVenta.CondicionIvaCliente}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "12px",
              "@media print": {
                fontSize: "1px",
              },
            }}
          >
            CUIT: {notaVenta.CUITCliente}
          </Typography>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "12px",
              "@media print": {
                fontSize: "1px",
              },
            }}
          >
            ****************************************
          </Typography>

          <Box sx={{ justifyContent: "center", display: 'flex', }}>
            <Box sx= {{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: 1}}>
               <Typography
              variant="body1"
              sx={{
                fontSize: "12px",
                fontWeight: 'bold',
                "@media print": {
                  fontSize: "1px",
                },
              }}
            >
              Producto
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "12px",
                "@media print": {
                  fontSize: "1px",
                },
              }}
            >
              {notaVenta.CodigoProducto} 
            </Typography>
            </Box>
            <Box sx= {{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: 1}}>
              <Typography
              variant="body1"
              sx={{
                fontSize: "12px",
                fontWeight: 'bold',
                "@media print": {
                  fontSize: "1px",
                },
              }}
            >
              Descripción
            </Typography> 
            <Typography
              variant="body1"
              sx={{
                fontSize: "12px",
                "@media print": {
                  fontSize: "1px",
                },
              }}
            >
              {notaVenta.DescripcionProducto}
            </Typography>
            </Box>
            <Box sx= {{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: 1}}>
              <Typography
              variant="body1"
              sx={{
                fontSize: "12px",
                fontWeight: 'bold',
                "@media print": {
                  fontSize: "1px",
                },
              }}
            >
              Unidad
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "12px",
                "@media print": {
                  fontSize: "1px",
                },
              }}
            >
              Lts.
            </Typography>
            </Box>
            <Box sx= {{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: 1}}>
              <Typography
              variant="body1"
              sx={{
                fontSize: "12px",
                fontWeight: 'bold',
                "@media print": {
                  fontSize: "1px",
                },
              }}
            >
              Cantidad
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "12px",
                "@media print": {
                  fontSize: "1px",
                },
              }}
            >
              {ticket.entregaBruta}
            </Typography>
            </Box>
            <Box sx= {{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: 1}}><Typography
              variant="body1"
              sx={{
                fontSize: "12px",
                fontWeight: 'bold',
                "@media print": {
                  fontSize: "1px",
                },
              }}
            >
              Total
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "12px",
                "@media print": {
                  fontSize: "1px",
                },
              }}
            >
              {ticket.entregaBruta}
            </Typography></Box>
           
             
            
            
            
          </Box>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "12px",
              "@media print": {
                fontSize: "1px",
              },
            }}
          >
            ****************************************
          </Typography>

          {truck != null && (
            <Typography
              variant="body1"
              sx={{
                fontSize: "12px",
                "@media print": {
                  fontSize: "1px",
                },
              }}
            >
              N° CAI: {truck.NROCAI}
            </Typography>
          )}
          {truck != null && (
            <Typography
              variant="body1"
              sx={{
                fontSize: "12px",
                "@media print": {
                  fontSize: "1px",
                },
              }}
            >
              Fecha Vto. CAI: {truck.FechaVenceCai.split("T")[0]}
            </Typography>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: 0,
            }}
          >
            {/* <img src={firma} alt="Signature" width="100px" /> */}
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "12px",
                marginTop: '50px',
                "@media print": {
                  fontSize: "1px",
                },
              }}
            >
              ----------------------------------------------
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
                fontSize: "12px",
                "@media print": {
                  fontSize: "1px",
                },
              }}
            >
              <strong>Firma</strong>
            </Typography>
          </Box >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "12px",
              "@media print": {
                fontSize: "1px",
              },
            }}
          >
            ****************************************
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "12px",
              
              "@media print": {
                fontSize: "1px",
                margin: 0
              },
            }}
          >
            Chofer: {driver}
          </Typography>
          {truck != null && (
            <Typography
              variant="body1"
              sx={{
                fontSize: "12px",
                "@media print": {
                  fontSize: "1px",
                  margin: 0
                },
              }}
            >
              Patente: {truck.Patente}
            </Typography>
          )}
        </Box>
      )}
    </Container>
  );
}
