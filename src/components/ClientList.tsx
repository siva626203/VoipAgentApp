"use client";
import { useEffect, useState } from "react";

export default function ClientList() {
  const [clients, setClients] = useState([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    notes: "",
  });
  const [newClient, setNewClient] = useState({
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    const res = await fetch("/api/clients");
    const data = await res.json();
    setClients(data);
  }

  async function createClient() {
    const res = await fetch("/api/clients", {
      method: "POST",
      body: JSON.stringify(newClient),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setNewClient({ name: "", phone: "", email: "", notes: "" });
      fetchClients();
    } else {
      alert("Failed to add client");
    }
  }

  function startEdit(client: any) {
    setEditingId(client._id);
    setForm({ ...client });
  }

  async function updateClient() {
    const res = await fetch("/api/clients", {
      method: "PUT",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setEditingId(null);
      fetchClients();
    } else {
      alert("Failed to update");
    }
  }

  async function deleteClient(id: string) {
    if (!confirm("Are you sure?")) return;

    const res = await fetch("/api/clients", {
      method: "DELETE",
      body: JSON.stringify({ _id: id }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      fetchClients();
    } else {
      alert("Delete failed");
    }
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">➕ Add New Client</h3>
      <div className="space-y-2 mb-6">
        <input
          type="text"
          placeholder="Name"
          value={newClient.name}
          onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="tel"
          placeholder="Phone"
          value={newClient.phone}
          onChange={(e) =>
            setNewClient({ ...newClient, phone: e.target.value })
          }
          className="border p-2 w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={newClient.email}
          onChange={(e) =>
            setNewClient({ ...newClient, email: e.target.value })
          }
          className="border p-2 w-full"
        />
        <textarea
          placeholder="Notes"
          value={newClient.notes}
          onChange={(e) =>
            setNewClient({ ...newClient, notes: e.target.value })
          }
          className="border p-2 w-full"
        />
        <button
          onClick={createClient}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Client
        </button>
      </div>

      <h3 className="text-lg font-semibold mb-2">📋 Existing Clients</h3>
      <ul className="space-y-4">
        {clients.map((c: any) => (
          <li key={c._id} className="border p-3 rounded relative">
            {editingId === c._id ? (
              <div className="space-y-2">
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="border p-1 w-full"
                />
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="border p-1 w-full"
                />
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="border p-1 w-full"
                />
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="border p-1 w-full"
                />
                <div className="flex gap-2">
                  <button
                    onClick={updateClient}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-400 px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="font-bold text-lg">{c.name}</p>
                <p className="text-sm text-gray-600">📞 {c.phone}</p>
                <p className="text-sm text-gray-600">✉️ {c.email}</p>
                <p className="text-sm italic">{c.notes}</p>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => startEdit(c)}
                    className="text-blue-600 underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteClient(c._id)}
                    className="text-red-600 underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
