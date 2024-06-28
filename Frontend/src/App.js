import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import  Inicio  from "./components/Inicio";
import { Celulares } from "./components/celulares/Celulares";
import { Menu } from "./components/Menu";
import { Footer } from "./components/Footer";
import { ModalDialog } from "./components/ModalDialog";




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