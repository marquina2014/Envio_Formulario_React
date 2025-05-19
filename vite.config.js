import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   //base: "https://prod-26.brazilsouth.logic.azure.com:443/workflows/5cabd87481574a1699cda8924bf8bc39/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ZNP0yaN6HcEZ-aGOvauIdFUfJnWUNJC3-UWhd99H4Iw&path=", 
});