import React, {useState, useContext, useEffect} from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Autocomplete,
  TextField,
  Slide,
  FormControlLabel,
  Switch,
  Box,
  CircularProgress
} from "@mui/material";
import {getTimestamp} from '../utils/mixin'
import GuardarTicketModal from '../components/GuardarTicketModal'
import { GlobalContext } from "../context/GlobalContext";
import {getTrucks, 
    getBlocks, 
    getBlocksLedesma, 
    getDrivers, 
    getMachines, 
    getMachinesLedesma, 
    getSupervisors, 
    getSupervisorsLedesma} from '../API/autocompleteData'
import {saveNewTicket} from '../API/tickets'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} timeout={500} />;
});

export default function NewTicket({  }) {
    const { context, setContext } = useContext(GlobalContext);
    const [ticket, setTicket] = useState(null)
    const [trucks, setTrucks] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [blocks, setBlocks] = useState([]);
    const [supervisors, setSupervisors] = useState([]);
    const [machines, setMachines] = useState([]);
    const [selectedTruck, setSelectedTruck] = useState(null);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [selectedOperacionVenta, setSelectedOperacionVenta] = useState(null)
    const [selectedMachine, setSelectedMachine] = useState(null);
    const [selectedOdometer, setSelectedOdometer] = useState("");
    const [selectedOperation, setSelectedOperation] = useState(null);
    const [selectedBlock, setSelectedBlock] = useState(null);
    const [selectedSupervisor, setSelectedSupervisor] = useState(null);
    const [selectedCuarteo, setSelectedCuarteo] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    const [inicio, setInicio] = useState("")
    const [fin, setFin] = useState("")
    const [entregaBruta, setEntregaBruta] = useState("")
    const [totInicial, setTotInicial] = useState("")
    const [totFinal, setTotFinal] = useState("")

    useEffect(() => {
      
      const fetchData = async () => {
        const ticket = context.selectedTicket
        setTicket(ticket);
        const trucks = await getTrucks()
        setTrucks(trucks)
        const foundTruck = trucks.find((truck) => truck.Patente === ticket.patente);
        setSelectedTruck(foundTruck);

        const drivers = await getDrivers()
        setDrivers(drivers)
        const foundDriver = drivers.find((driver) => driver.Legajo === ticket.choferLegajo);
        setSelectedDriver(foundDriver);
        
        setIsLoading(false)
      }
 
        fetchData()
    }, [])

    
  const changeOperacionVenta = async (operacion) => {
    
    let machines
    let supervisors
    let blocks
    if(operacion == 'Tabacal') {
      machines = await getMachines()
      setMachines(machines)
      supervisors = await getSupervisors()
      setSupervisors(supervisors)
      blocks = await getBlocks()
      setBlocks(blocks)
    } 
    if(operacion == 'Ledesma Capilar') {
      machines = await getMachinesLedesma()
      setMachines(machines)
      supervisors = await getSupervisorsLedesma()
      setSupervisors(supervisors)
      blocks = await getBlocksLedesma()
      setBlocks(blocks)
    }
  }
  const handleClose = () => {
    setContext({
      ...context,
      page: "listObs",
      selectedTicket: ticket,
    });
  };
  const startSendingProcess = () => {
    setOpenModal(true)
    saveTicket()
  }

  const saveTicket = async () => {
    const newTicket = ticket
    newTicket.created = getTimestamp(fin)
    newTicket.lat = null
    newTicket.lng = null
    newTicket.inicio = inicio
    newTicket.fin = fin
    newTicket.estadoInicial = totInicial + " litros"
    newTicket.entregaBruta = entregaBruta + " litros"
    newTicket.estadoFinal = totFinal + " litros"
    newTicket.choferNombre = selectedDriver.Nombre
    newTicket.choferLegajo = selectedDriver.Legajo
    newTicket.patenteAuxilio = ""
    newTicket.cliente = selectedOperacionVenta.split(" ").shift()
    if(selectedOperacionVenta == "Tabacal" || selectedOperacionVenta == 'Ledesma Capilar'){
      newTicket.supervisorLegajo = selectedSupervisor.Legajo.toString()
      newTicket.supervisorNombre = selectedSupervisor.NombreyApellido
      newTicket.bloqueID = selectedBlock.BloqueID.toString()
      newTicket.bloqueDescripcion = selectedBlock.Descripcion
      newTicket.maquina = selectedMachine.MaquinaID
      newTicket.operacion = selectedOperation
      newTicket.horometro = selectedOdometer
      newTicket.cuarteo = selectedCuarteo.toString()
    }
    newTicket.operacionVenta = selectedOperacionVenta
    newTicket.obs = 'ok'
    await saveNewTicket(newTicket)
    handleClose()
  }

  const operacionesVenta = ["Tabacal","Ledesma Tanques", "Ledesma Capilar"] 
  const operations = ["Verde", "Quemada", "Otro"]

    return (
        <Dialog
          open={true}
          fullScreen
          fullWidth
          TransitionComponent={Transition}
        > 
        {ticket != null && 
        <DialogTitle
        sx={{
          "@media print": {
            display: "none",
          },
        }}
      >
        Agregar Ticket {ticket.numeroVenta} - {ticket.patente}
      </DialogTitle>
        }
    
      
 {isLoading ?
  <Box sx={{width: '100%', justifyContent: "center", textAlign: 'center' }}>
    <CircularProgress />
  </Box>
  :  
 <DialogContent>
 <Autocomplete
     options={drivers}
     getOptionLabel={(option) => option.Nombre}
     value={selectedDriver}
     onChange={(event, newValue) => {
       setSelectedDriver(newValue);
     }}
     renderInput={(params) => (
       <TextField {...params} label="Chofer" margin="normal" />
     )}
   />
 <Autocomplete
     options={operacionesVenta}
     getOptionLabel={(option) => option}
     value={selectedOperacionVenta}
     onChange={(event, newValue) => {
       setSelectedOperacionVenta(newValue);
       changeOperacionVenta(newValue)
     }}
     renderInput={(params) => (
       <TextField {...params} label="Operacion de Venta" margin="normal" />
     )}
   />

   {(selectedOperacionVenta != "Ledesma Tanques" && selectedOperacionVenta != null) && 
   <Box>
<Autocomplete
     options={machines}
     getOptionLabel={(option) => option.Descripcion}
     value={selectedMachine}
     onChange={(event, newValue) => {
       setSelectedMachine(newValue);
     }}
     renderInput={(params) => (
       <TextField {...params} label="Máquina" margin="normal" />
     )}
   />
   <TextField
     label="Horómetro"
     type="number"
     InputProps={{ inputProps: { min: 0 } }}
     value={selectedOdometer}
     sx={{ marginTop: 1, width: "100%" }}
     onChange={(event) => {
       setSelectedOdometer(event.target.value);
     }}
   />

   
   <Autocomplete
     options={blocks}
     getOptionLabel={(option) => option.Descripcion}
     value={selectedBlock}
     onChange={(event, newValue) => {
       setSelectedBlock(newValue);
     }}
     renderInput={(params) => (
       <TextField {...params} label="Bloque" margin="normal" />
     )}
   />
   <Autocomplete
     options={supervisors}
     getOptionLabel={(option) => option.Descripcion}
     value={selectedSupervisor}
     onChange={(event, newValue) => {
       setSelectedSupervisor(newValue);
     }}
     renderInput={(params) => (
       <TextField {...params} label="Supervisor" margin="normal" />
     )}
   />
    {selectedOperacionVenta == 'Tabacal' && 
     <Autocomplete
      options={operations}
      getOptionLabel={(option) => option}
      value={selectedOperation}
      onChange={(event, newValue) => {
        setSelectedOperation(newValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Operación" margin="normal" />
      )}
    />
   }
   {selectedOperacionVenta == 'Tabacal' && 
     <FormControlLabel
     control={
       <Switch
         onChange={() => setSelectedCuarteo(!selectedCuarteo)}
         checked={selectedCuarteo}
       />
     }
     label="Cuarteo"
     />
   }

   </Box>
   }
 
 <TextField
     label="Fecha Inicio"
     type="text"
     InputProps={{ inputProps: { min: 0 } }}
     value={inicio}
     sx={{ marginTop: 1, width: "100%" }}
     onChange={(event) => {
       setInicio(event.target.value);
     }}
   />
   <TextField
     label="Fecha Fin"
     type="text"
     InputProps={{ inputProps: { min: 0 } }}
     value={fin}
     sx={{ marginTop: 1, width: "100%" }}
     onChange={(event) => {
       setFin(event.target.value);
     }}
   />
   <TextField
     label="Entrega Bruta"
     type="number"
     InputProps={{ inputProps: { min: 0 } }}
     value={entregaBruta}
     sx={{ marginTop: 1, width: "100%" }}
     onChange={(event) => {
       setEntregaBruta(event.target.value);
     }}
   />
   <TextField
     label="Totalizador Inicial"
     type="number"
     InputProps={{ inputProps: { min: 0 } }}
     value={totInicial}
     sx={{ marginTop: 1, width: "100%" }}
     onChange={(event) => {
       setTotInicial(event.target.value);
     }}
   />
   <TextField
     label="Totalizador Final"
     type="number"
     InputProps={{ inputProps: { min: 0 } }}
     value={totFinal}
     sx={{ marginTop: 1, width: "100%" }}
     onChange={(event) => {
       setTotFinal(event.target.value);
     }}
   />
  
 </DialogContent>
 }
<DialogActions>
        <Button
        color="error"
          onClick={handleClose}
        >
          Cerrar
        </Button>
        <Button disabled={selectedDriver == null} onClick={startSendingProcess}>
          Guardar
        </Button>

      </DialogActions>
      <GuardarTicketModal isOpen={openModal} />
        </Dialog>
    )
}