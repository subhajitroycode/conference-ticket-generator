import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NotFound from "./NotFound";

const TicketConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ticketData = location.state?.userData;

  //   useEffect(() => {
  //     if (!ticketData) {
  //       navigate("/", { replace: true });
  //     }
  //   }, [ticketData, navigate]);

  return !ticketData ? (
    <NotFound />
  ) : (
    <div>Your name is: {ticketData.fullName}</div>
  );
};

export default TicketConfirmation;
