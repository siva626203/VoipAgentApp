"use client";
import { useEffect, useState } from "react";

export default function CallHistory() {
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    fetch("/api/calls")
      .then((res) => res.json())
      .then(setCalls);
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border">
        <thead>
          <tr>
            <th className="border px-2">Client</th>
            <th className="border px-2">Direction</th>
            <th className="border px-2">Status</th>
            <th className="border px-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {calls.map((call: any) => (
            <tr key={call._id}>
              <td className="border px-2">{call.client_name || "Unknown"}</td>
              <td className="border px-2">{call.direction}</td>
              <td className="border px-2">{call.status}</td>
              <td className="border px-2">
                {new Date(call.start_time).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
