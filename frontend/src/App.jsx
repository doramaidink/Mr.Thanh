import { Toaster, toast } from 'sonner';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ToastContainer } from "react-toastify";
import 'atropos/css';
import "react-toastify/dist/ReactToastify.css";
import HomePage from './pages/nguoidung/HomePage';
import NotFound from './pages/NotFound';
import CaphePage from './pages/nguoidung/CaphePage';
import DaxayPage from './pages/nguoidung/DaxayPage';
import NuocepPage from './pages/nguoidung/Nuocep';
import NuocngotPage from './pages/nguoidung/Nuocngot';
import TraPage from './pages/nguoidung/TraPage';
import TatcaPage from './pages/nguoidung/TatcaPage';
import PaymentSuccess from './pages/nguoidung/PaymentSuccess';

function App() {
  return <>
    <ToastContainer
      position="top-right"
      autoClose={2000}
    />


    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<HomePage />} />
        <Route
          path='/tatca'
          element={<TatcaPage />} />
        <Route
          path='/caphe'
          element={<CaphePage />} />
        <Route
          path='/daxay'
          element={<DaxayPage />} />
        <Route
          path='/nuocep'
          element={<NuocepPage />} />
        <Route
          path='/nuocngot'
          element={<NuocngotPage />} />
        <Route
          path='/tra'
          element={<TraPage />} />
        <Route
          path='*'
          element={<NotFound />} />
        <Route
          path="/payment-success"
          element={<PaymentSuccess />}
        />
      </Routes>
    </BrowserRouter>

  </>
}

export default App
