import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Inicio } from "./src/components/Inicio.jsx";
import { Celulares } from "./src/components/celulares/Celulares";
import { Menu } from "./src/components/Menu";
import { Footer } from "./src/components/Footer";
import { Notebooks } from "./src/components/notebooks/Notebooks";
import { ModalDialog } from "./src/components/ModalDialog";
import { Perifericos } from "./src/components/perifericos/Perifericos";
import {Servicios} from "./src/components/servicios/Servicios" ;
import { Login } from "./components/login/Login";
import { MarcaCelular, MarcaNotebooks } from "../Backend/base-orm/sequelize-init";



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
  <Route path="/marcascelulares" element={<MarcaCelular />} />
  <Route path="/notebooks" element={<Notebooks />} />
  <Route path="/marcasnotebooks" element={<MarcaNotebooks />} />
  <Route path="/perifericos" element={<Perifericos />} />
  <Route path="/tipo" element={<Celulares />} />
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