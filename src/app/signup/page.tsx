"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup(e: any) {
    e.preventDefault();
    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/");
    } else {
      const data = await res.json();
      alert(data.error || "Signup failed");
    }
  }

  return (
    <form onSubmit={handleSignup} className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Agent Signup</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="block mb-2 border p-2 w-full"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="block mb-2 border p-2 w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="block mb-4 border p-2 w-full"
      />
      <button className="bg-green-500 text-white px-4 py-2 rounded">
        Create Account
      </button>
    </form>
  );
}
