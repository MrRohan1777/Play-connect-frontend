import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

export default function Participants() {
  const { gameId } = useParams();

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-headline font-black italic tracking-tighter text-primary mb-6">
          Participants
        </h1>
        <p className="text-on-surface-variant">
          Participants for game <span className="text-on-surface">{gameId}</span> UI is not implemented yet.
        </p>
      </div>
    </Layout>
  );
}