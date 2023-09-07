import axios from "axios";
const headers = {
  "Ocp-Apim-Subscription-Key": "13c152e1db6d4716842483a0bfe47e32",
};
export const getTicketsObs = async () => {
  const res = await axios.get(
    "https://apisaoniken.azure-api.net/CaldenFlow/despachos?status=obs&&client=aok",
    { headers }
  );
  return res.data.value;
};

export const getTruckTickets = async (patente, numeroVenta) => {
  const res = await axios.get(
    `https://apisaoniken.azure-api.net/CaldenFlow/tickets?patente=${patente}&numeroVenta=${numeroVenta}`,
    { headers }
  );
  return res.data.value;
};

export const saveNewTicket = (data) => {

  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Timeout exceeded"));
    }, 10000); // 10 segundos en milisegundos
  });

  const fetchPromise = fetch(
    "https://apisaoniken.azure-api.net/CaldenFlow/metrics?subscription-key=13c152e1db6d4716842483a0bfe47e32",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  )
  .then((res) => console.log("Se insertó el ticket"))
  .catch((error) => alert(error))

  return Promise.race([fetchPromise, timeoutPromise]);
};
