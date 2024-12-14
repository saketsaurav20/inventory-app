import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { StyledEngineProvider } from '@mui/material/styles';

const rootElement = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(rootElement).render(
  // <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  // </React.StrictMode>
);
