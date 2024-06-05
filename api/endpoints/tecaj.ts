import client from "../../lib/axios";
import { Tecaj } from "@/types";

const tecajApi = {
  getAllTecajDatum: async (datumPrimjene: string): Promise<Tecaj[]> => {
    try {
      const response = await client.get(`/v3?datum-primjene=${datumPrimjene}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getTecajByRange: async (
    dateFrom: string,
    dateSince: string
  ): Promise<Tecaj[]> => {
    try {
      const response = await client.get(
        `/v3?datum-primjene-od=${dateFrom}&datum-primjene-do=${dateSince}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
export default tecajApi;
