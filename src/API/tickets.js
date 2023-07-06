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
  );
};
