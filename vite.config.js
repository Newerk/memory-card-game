import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// });

export default defineConfig({
  define: {
    __APP_ENV__: import.meta.env.VITE_MY_API,
  },
  plugins: [react()],
});
