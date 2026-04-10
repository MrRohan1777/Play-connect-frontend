import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import GameCard from "../components/GameCard";
import JoinGameModal from "../components/JoinGameModal";
import useLocation from "../hooks/useLocation";
import { getNearbyGames } from "../api/gamesApi";
import {
    extractParticipationId,
    joinGame,
    saveParticipationIdForGame,
} from "../api/participationApi";

export default function Home() {

    const location = useLocation();

    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedGame, setSelectedGame] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {

        if (!location) return;

        async function fetchGames() {

            try {

                const res = await getNearbyGames(location.lat, location.lon);

                setGames(res.data.data.games);

            } catch (error) {

                const message =
                    error?.response?.data?.message ||
                    "Something went wrong";

                setErrorMessage(message);

            } finally {

                setLoading(false);

            }

        }

        fetchGames();

    }, [location]);


    const handleJoinClick = (gameId) => {
        setSelectedGame(gameId);
    };


    const handleConfirmJoin = async (gameId, payload) => {

        try {

            const res = await joinGame(gameId, payload);
            console.log("[joinGame] raw response data:", res?.data);
            const participationId = extractParticipationId(res);
            if (participationId) {
                saveParticipationIdForGame(gameId, participationId);
            }
            console.log("[joinGame] participationId:", participationId);

            alert("You joined the game!");

            setSelectedGame(null);

        } catch (error) {

            const message =
                error?.response?.data?.message ||
                "Something went wrong";

            setErrorMessage(message);
        }

    };


    return (
        <Layout showBottomNav={true}>
            <section className="mb-10 relative overflow-hidden rounded-xl bg-surface-container-low p-8">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                <div className="relative z-10">
                    <h2 className="font-headline font-black text-4xl md:text-6xl leading-tight tracking-tight">
                        READY TO <br />
                        <span className="text-primary italic">GAME ON?</span>
                    </h2>
                    <div className="flex flex-wrap gap-3 mt-4">
                        <span className="px-4 py-1.5 rounded-full bg-primary text-on-primary text-xs font-bold uppercase tracking-wider">
                            Nearby
                        </span>
                        <span className="px-4 py-1.5 rounded-full bg-surface-container-highest text-on-surface-variant text-xs font-bold uppercase tracking-wider">
                            Trending
                        </span>
                    </div>
                </div>
            </section>

            {loading && (
                <p className="text-on-surface-variant">Loading nearby games...</p>
            )}

            {!loading && games.length === 0 && (
                <p className="text-on-surface-variant">
                    No games found near your location.
                </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {games.map((game) => (
                    <GameCard
                        key={game.id}
                        game={game}
                        onJoin={handleJoinClick}
                    />
                ))}

            </div>

            {/* Performance Stats (Bento) */}
            <section className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2 bg-[#191f2f] p-8 rounded-lg flex flex-col justify-between">
                    <div>
                        <h4 className="font-headline font-black text-xl mb-1 uppercase italic tracking-tighter">
                            Your Momentum
                        </h4>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                            Global Ranking: Top 5%
                        </p>
                    </div>
                    <div className="mt-8 flex items-end gap-2">
                        <span className="text-6xl font-black font-headline text-primary">
                            84
                        </span>
                        <span className="text-sm font-bold text-slate-500 pb-2">
                            SCORE
                        </span>
                    </div>
                </div>

                <div className="bg-primary/5 p-6 rounded-lg border border-primary/10">
                    <span className="material-symbols-outlined text-primary mb-4">
                        bolt
                    </span>
                    <p className="text-3xl font-black font-headline leading-tight">
                        12
                    </p>
                    <p className="text-[10px] font-bold uppercase text-slate-500 tracking-widest">
                        Wins this week
                    </p>
                </div>

                <div className="bg-surface-container-high p-6 rounded-lg">
                    <span className="material-symbols-outlined text-primary mb-4">
                        group
                    </span>
                    <p className="text-3xl font-black font-headline leading-tight">
                        242
                    </p>
                    <p className="text-[10px] font-bold uppercase text-slate-500 tracking-widest">
                        Players Met
                    </p>
                </div>
            </section>


            {/* JOIN MODAL */}
            {selectedGame && (
                <JoinGameModal
                    gameId={selectedGame}
                    error={errorMessage}
                    onClose={() => {
                        setSelectedGame(null);
                        setErrorMessage("");
                    }}
                    onConfirm={handleConfirmJoin}
                />
            )}



        </Layout>


    );
}