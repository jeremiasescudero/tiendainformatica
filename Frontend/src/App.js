import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Inicio } from "./src/components/Inicio.jsx";
import { Celulares } from "./src/components/celulares/Celulares";
import { Menu } from "./src/components/Menu";
import { Footer } from "./src/components/Footer";
import { ModalDialog } from "./src/components/ModalDialog";
import { MarcaCelular } from "../Backend/base-orm/sequelize-init";



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
  <Route path="*" element={<Navigate to="/inicio" replace />} />
</Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;