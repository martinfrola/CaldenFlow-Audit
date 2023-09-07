import axios from 'axios'
export const getMachinesLedesma = async () => {
      try {
        const res = await axios.get(
          "https://api-cn.cngrupo.com.ar/api/getVehiculosLedesma"
        );
        return res.data;
      } catch (error) {
        console.error("Error al obtener los camiones:", error);
        return null;
      }
  };
  export const getSupervisorsLedesma = async () => {
      try {
        const res = await axios.get(
          "https://api-cn.cngrupo.com.ar/api/getPersonalLedesma"
        );
        return res.data;
      } catch (error) {
        console.error("Error al obtener los camiones:", error);
        return null;
      }
  };
  export const getBlocksLedesma = async () => {
      try {
        const res = await axios.get(
          "https://api-cn.cngrupo.com.ar/api/getBloquesLedesma"
        );
        return res.data;
      } catch (error) {
        console.error("Error al obtener los camiones:", error);
        return null;
      }
  };
  export const getMachines = async () => {
      try {
        const res = await axios.get(
          "https://api-cn.cngrupo.com.ar/api/getVehiculos"
        );
        return res.data;
      } catch (error) {
        console.error("Error al obtener los camiones:", error);
        return null;
      }
  };
  
  export const getSupervisors = async () => {
      try {
        const res = await axios.get(
          "https://api-cn.cngrupo.com.ar/api/getPersonal"
        );
        return res.data;
      } catch (error) {
        console.error("Error al obtener los camiones:", error);
        return null;
      }
  };
  
  export const getBlocks = async () => {
      try {
        const res = await axios.get(
          "https://api-cn.cngrupo.com.ar/api/getBloques"
        );
        return res.data;
      } catch (error) {
        console.error("Error al obtener los camiones:", error);
        return null;
      }
  };
  
  export const getDrivers = async () => {
      try {
        const res = await axios.get(
          "https://api-cn.cngrupo.com.ar/api/getChoferesCamionCisterna"
        );
        return res.data;
      } catch (error) {
        console.error("Error al obtener los camiones:", error);
        return null;
      }
  };
  
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