import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CarList from "./pages/CarList";
import RentForm from "./pages/RentForm";
import History from "./pages/History";

function App() {
  return (
    <>
      <div className="w-3/4 mx-auto mt-5">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<CarList />} />
            <Route path="/rent" element={<RentForm />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
