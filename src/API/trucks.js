import axios from "axios";

export const getTrucks = async () => {
  try {
    const res = await axios.get(
      "https://api-cn.cngrupo.com.ar/api/getCamiones"
    );
    return res.data;
  } catch (error) {
    console.error("Error al obtener los camiones:", error);
    return null;
  }
};
