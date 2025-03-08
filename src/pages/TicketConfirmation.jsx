import React from "react";
import { useLocation } from "react-router-dom";
import NotFound from "./NotFound";

const TicketConfirmation = () => {
  const location = useLocation();
  const ticketData = location.state?.userData;

  return !ticketData ? (
    <NotFound />
  ) : (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-bold text-3xl md:text-5xl md:leading-14 text-center px-4">
        Congrats,{" "}
        <span className="bg-gradient-to-r from-orange-600 to-neutral-0 bg-clip-text text-transparent">
          {ticketData.fullName.trim()}!
        </span>{" "}
        Your ticket is ready.
      </h1>
      <p className="text-center mt-6 mx-auto w-auto md:w-1/2 text-lg md:text-base text-neutral-300 px-4">
        We've emailed your ticket to{" "}
        <span className="text-orange-500">{ticketData.email}</span> and will
        send updates in the run up to the event.
      </p>
      <div className="ticket h-[10.5rem] w-[22rem] md:h-56 md:w-[30rem] mt-24 mx-auto p-4 flex justify-between flex-col relative">
        <div className="flex items-start">
          <img src="/logo-mark.svg" alt="logo" className="w-8 mr-3 pt-2" />
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-1 md:mb-2">
              Coding Conf
            </h3>
            <p className="text-[15px] text-neutral-300">
              Jan 31, 2025 / Austin, TX
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <img
            src={URL.createObjectURL(ticketData.avatar)}
            alt="avatar image"
            className="w-12 h-12 md:h-14 md:w-14 rounded-lg mr-3"
          />
          <div>
            <h4 className="text-2xl">{ticketData.fullName.trim()}</h4>
            <div className="flex items-center">
              <img
                src="/icon-github.svg"
                alt="github icon"
                className="h-5 mr-1.5"
              />
              <p className="text-neutral-300">
                @{ticketData.githubUsername.trim()}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute right-0 md:right-2.5 top-1/2 -translate-y-1/2">
          <p className="rotate-90 text-2xl text-neutral-500 font-medium">
            #{ticketData.ticketNumber}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TicketConfirmation;
