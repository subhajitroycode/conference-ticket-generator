import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import TicketConfirmation from "./components/TicketConfirmation";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <main>
        <header className="py-6">
          <img className="mx-auto w-40" src="/logo-full.svg" alt="logo" />
        </header>
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/ticket-confirmation" element={<TicketConfirmation />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
