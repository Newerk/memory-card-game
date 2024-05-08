import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// });

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.VITE_MY_API": JSON.stringify(env.VITE_MY_API),
    },
    plugins: [react()],
  };
});
