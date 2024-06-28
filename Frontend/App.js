import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Inicio } from "./components/Inicio";
import { Celulares } from "./components/celulares/Celulares";
import { Menu } from "./components/Menu";
import { Footer } from "./components/Footer";
import { Notebooks } from "./components/notebooks/Notebooks";
import { ModalDialog } from "./components/ModalDialog";
import { Perifericos } from "./components/perifericos/Perifericos";
import {Servicios} from "./components/servicios/Servicios" ;
import { Login } from "./components/login/Login";

import { Empleados } from "./components/empleados/Empleados";



function App() {
  return (
    <>
      <BrowserRouter>
        <ModalDialog />
        <Menu />
        <div className="divBody">
<Routes>
  <Route path="/inicio" element={<Inicio />} />
  <Route path="/celulares" element={<Celulares />} />
  <Route path="/notebooks" element={<Notebooks />} />
  <Route path="/perifericos" element={<Perifericos />} />
  <Route path="/servicios" element={<Servicios />} />
  <Route path="/" element={<Perifericos />} />
  <Route path="*" element={<Navigate to="/inicio" replace />} />
</Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;