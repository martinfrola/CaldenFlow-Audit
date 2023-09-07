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

export default function EditDialog({ open, onClose }) {
    const { context, setContext } = useContext(GlobalContext);
    const [ticket, setTicket] = useState(null)
    const [trucks, setTrucks] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [blocks, setBlocks] = useState([]);
    const [supervisors, setSupervisors] = useState([]);
    const [machines, setMachines] = useState([]);
    const [selectedTruck, setSelectedTruck] = useState(null);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [selectedMachine, setSelectedMachine] = useState(null);
    const [selectedOdometer, setSelectedOdometer] = useState("");
    const [selectedOperation, setSelectedOperation] = useState(null);
    const [selectedBlock, setSelectedBlock] = useState(null);
    const [selectedSupervisor, setSelectedSupervisor] = useState(null);
    const [selectedCuarteo, setSelectedCuarteo] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    const[operationMode, setOperationMode] =useState(null)

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
        
        let machines
        let supervisors
        let blocks
        if(ticket.cliente == 'Tabacal') {
          machines = await getMachines()
          setMachines(machines)
          supervisors = await getSupervisors()
          setSupervisors(supervisors)
          blocks = await getBlocks()
          setBlocks(blocks)
        } else {
          machines = await getMachinesLedesma()
          setMachines(machines)
          supervisors = await getSupervisorsLedesma()
          setSupervisors(supervisors)
          blocks = await getBlocksLedesma()
          setBlocks(blocks)
        }
        const foundMachine = machines.find((machine) => machine.MaquinaID === ticket.maquina);
        setSelectedMachine(foundMachine);

        const foundSupervisor = supervisors.find((supervisor) => supervisor.Legajo === parseInt(ticket.supervisorLegajo));
        setSelectedSupervisor(foundSupervisor);

        const foundBlock = blocks.find((block) => block.BloqueID === parseInt(ticket.bloqueID));
        setSelectedBlock(foundBlock);

        setSelectedOdometer(ticket.horometro)
        setSelectedOperation(ticket.operacion)
        setSelectedCuarteo(ticket.cuarteo == "true" ? true : false)
        setIsLoading(false)
      }
      if(open) {
        fetchData()
      }
    }, [open])

    
  const loadFields = () => {
    const ticket = context.selectedTicket
    setSelectedTruck()
  }
  const handleClose = () => {
    setTicket(null)
    setSelectedBlock(null)
    setSelectedDriver(null)
    setSelectedTruck(null)
    setSelectedSupervisor(null)
    setSelectedOdometer("")
    setSelectedCuarteo(null)
    setSelectedMachine(null)
    setSelectedOperation(null)
    setIsLoading(true)
    setOpenModal(false)
    onClose();
  };
  const startSendingProcess = () => {
    setOpenModal(true)
    saveTicket()
  }

  const saveTicket = async () => {
    const newTicket = ticket
    newTicket.patente = selectedTruck.Patente
    newTicket.choferNombre = selectedDriver.Nombre
    newTicket.choferLegajo = selectedDriver.Legajo
    if(newTicket.cliente == "Tabacal" || newTicket.operacionVenta == 'Ledesma Capilar'){
      newTicket.supervisorLegajo = selectedSupervisor.Legajo.toString()
      newTicket.supervisorNombre = selectedSupervisor.NombreyApellido
      newTicket.bloqueID = selectedBlock.BloqueID.toString()
      newTicket.bloqueDescripcion = selectedBlock.Descripcion
      newTicket.maquina = selectedMachine.MaquinaID
      newTicket.operacion = selectedOperation
      newTicket.cuarteo = selectedCuarteo.toString()
    }
    await saveNewTicket(newTicket)
    handleClose()
  }


  const operations = ["Verde", "Quemada", "Otro"]

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
        Campos a modificar
      </DialogTitle>
      
 {isLoading ?
  <Box sx={{width: '100%', justifyContent: "center", textAlign: 'center' }}>
    <CircularProgress />
  </Box>
  :  
 <DialogContent>
 <Autocomplete
     options={trucks}
     getOptionLabel={(option) => option.Patente}
     value={selectedTruck}
     onChange={(event, newValue) => {
       setSelectedTruck(newValue);
     }}
     renderInput={(params) => (
       <TextField {...params} label="Patente" margin="normal" />
     )}
   />
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
  {ticket !== null && 
    <Box>
    {ticket.cliente == 'Tabacal' && 
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
   {ticket.cliente == 'Tabacal' && 
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
  
 </DialogContent>
 }
<DialogActions>
        <Button
        color="error"
          onClick={onClose}
        >
          Cerrar
        </Button>
        <Button onClick={startSendingProcess}>
          Guardar
        </Button>

      </DialogActions>
      <GuardarTicketModal isOpen={openModal} />
        </Dialog>
    )
}