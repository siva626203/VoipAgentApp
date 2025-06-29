"use client";
import { useState, useEffect } from "react";
import * as Twilio from "@twilio/voice-sdk";

export default function DialPad() {
  const [device, setDevice] = useState<Twilio.Device | null>(null);
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState("Initializing...");

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/token");
      const { token } = await res.json();

      const dev = new Twilio.Device(token, {});
      dev.on("ready", () => setStatus("Ready"));
      dev.on("connect", () => setStatus("Call connected"));
      dev.on("disconnect", () => setStatus("Disconnected"));
      dev.on("error", (err) => setStatus("Error: " + err.message));
      setDevice(dev);
    })();
  }, []);

  const handleCall = () => {
    device?.connect({ params: { To: number } });
  };

  const handleHangup = () => {
    device?.disconnectAll();
  };

  return (
    <div>
      <input
        type="tel"
        placeholder="Enter phone number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <div className="flex gap-2">
        <button
          onClick={handleCall}
          className="bg-green-600 px-4 py-2 text-white rounded"
        >
          Call
        </button>
        <button
          onClick={handleHangup}
          className="bg-red-600 px-4 py-2 text-white rounded"
        >
          Hang Up
        </button>
      </div>
      <p className="mt-2 text-sm text-gray-600">Status: {status}</p>
    </div>
  );
}
