import axios from "axios";
const headers = {
  "Ocp-Apim-Subscription-Key": "13c152e1db6d4716842483a0bfe47e32",
};
export const getTicketsObs = async () => {
  const res = await axios.get(
    "https://apisaoniken.azure-api.net/CaldenFlow/despachos?status=obs",
    { headers }
  );
  return res.data.value;
};

export const getTicketsForPrint = async () => {
  const res = await axios.get(
    "https://apisaoniken.azure-api.net/CaldenFlow/despachos?status=forPrint",
    { headers }
  );
  return res.data.value;
};

export const updateTickets = (ticket) => {
  ticket.obs = "ok";
  fetch(
    "https://apisaoniken.azure-api.net/CaldenFlow/metrics?subscription-key=13c152e1db6d4716842483a0bfe47e32",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticket),
    }
  ).then(() => saveTicketCN(ticket));
};

export const saveTicketCN = async (data) => {
  const url = "https://api-cn.cngrupo.com.ar/api/insertaTicket";
  const newData = {
    lat: data.lat ? data.lat.toString() : "",
    lng: data.lng ? data.lng.toString() : "",
    inicio: data.inicio || "",
    fin: data.fin || "",
    estadoInicial: data.estadoInicial
      ? parseFloat(data.estadoInicial).toString()
      : "",
    entregaBruta: data.entregaBruta
      ? parseFloat(data.entregaBruta).toString()
      : "",
    estadoFinal: data.estadoFinal
      ? parseFloat(data.estadoFinal).toString()
      : "",
    numeroVenta: data.numeroVenta || "",
    cliente: data.cliente || "",
    producto: data.producto || "",
    patente: data.patente || "",
    patenteAuxilio: data.patenteAuxilio || "",
    choferLegajo: data.choferLegajo ? parseInt(data.choferLegajo) : null,
    maquina: data.maquina || "",
    horometro: data.horometro || "",
    operacion: data.operacion || "",
    bloqueID: data.bloqueID || "",
    supervisorLegajo: data.supervisorLegajo || "",
    cuarteo: data.cuarteo || "",
  };
  const formattedData = JSON.stringify(newData)
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line));

  const finalData = JSON.stringify(formattedData, null, 2);

  await axios.post(url, JSON.parse(finalData));
};
