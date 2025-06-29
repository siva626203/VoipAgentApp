import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ClientList from "@/components/ClientList";
import DialPad from "@/components/Dialpad";
import CallHistory from "@/components/CallHistory";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">VoIP Agent Dashboard</h1>
      <p className="mb-6">Welcome, {session?.user?.name}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section>
          <h2 className="text-lg font-semibold mb-2">📞 Dial Pad</h2>
          <DialPad />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">📋 Clients</h2>
          <ClientList />
        </section>
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-semibold mb-2">📊 Call History</h2>
        <CallHistory />
      </section>
    </main>
  );
}
