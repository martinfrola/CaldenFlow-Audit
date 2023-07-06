import React, { useState, useRef, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Webcam from "react-webcam";
import {
  Box,
  TextField,
  Button,
  IconButton,
  TextareaAutosize,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
const CameraComponent = () => {
  const { context, setContext } = useContext(GlobalContext);
  const { selectedTicket } = context;

  const [images, setImages] = useState([]);
  const [observations, setObservations] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [facingMode, setFacingMode] = useState("environment");
  const webcamRef = useRef(null);
  const handleCaptureClick = () => {
    const imageUrl = webcamRef.current.getScreenshot();
    const base64Image = btoa(imageUrl);
    setImages([...images, base64Image]);
    setIsOpen(!isOpen);
  };

  const toggleCamera = () => {
    setIsOpen(!isOpen);
  };

  const videoConstraints = {
    facingMode: facingMode,
  };

  const handleSubmit = async () => {
    const url =
      "https://apisaoniken.azure-api.net/CaldenFlow/metrics?subscription-key=13c152e1db6d4716842483a0bfe47e32";
    selectedTicket.auditImages = images;
    selectedTicket.obs = "auditado";
    selectedTicket.observationDetails = observations;
    await axios.post(url, JSON.stringify(selectedTicket));
    setContext({
      ...context,
      page: "listObs",
      selectedTicket: {},
    });
  };

  return (
    <>
      {isOpen && (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            videoConstraints={videoConstraints}
            height="500px"
          />
        </>
      )}
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Button variant="outlined" onClick={toggleCamera}>
          {isOpen ? "Cerrar cámara" : "Abrir cámara"}
        </Button>
        {isOpen && (
          <Button variant="contained" onClick={handleCaptureClick}>
            Capturar imagen
          </Button>
        )}
      </Box>
      <Box sx={{ marginBottom: 3 }}>
        {images.map((image, index) => (
          <div key={index} style={{ position: "relative" }}>
            <IconButton
              onClick={() => {
                const newImages = [...images];
                newImages.splice(index, 1);
                setImages(newImages);
              }}
              style={{ position: "absolute", right: 0, top: 0 }}
            >
              <DeleteIcon />
            </IconButton>
            <img
              src={`${atob(image)}`}
              alt={`Imagen ${index}`}
              style={{ width: "100px", height: "100px" }}
            />
          </div>
        ))}
      </Box>

      <TextareaAutosize
        onChange={(e) => {
          setObservations(e.target.value);
        }}
        minRows={5}
        //disabled={images.length < 2}
        placeholder="Observaciones"
        variant="outlined"
        color="primary"
        sx={{ marginTop: 3 }}
      />
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Button onClick={() => setContext({ ...context, page: "listObs" })}>
          Volver
        </Button>
        <Button onClick={handleSubmit} disabled={images.length < 2}>
          Enviar Corrección
        </Button>
      </Box>
    </>
  );
};

export default CameraComponent;
