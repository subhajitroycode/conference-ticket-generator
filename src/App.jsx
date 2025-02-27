import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import TicketConfirmation from "./components/TicketConfirmation";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <main className="text-center">
        <header>
          <img className="mx-auto mt-8 mb-16" src="/logo-full.svg" alt="logo" />
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
