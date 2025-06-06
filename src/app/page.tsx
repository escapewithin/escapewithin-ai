import ChatAgent from '../../components/ChatAgent';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">EscapeWithin – Your Personal Travel Agent</h1>
      <ChatAgent />
    </main>
  );
}