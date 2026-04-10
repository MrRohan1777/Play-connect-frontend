import { useState } from "react";


export default function JoinGameModal({ gameId, onClose, onConfirm, error }) {

    const [playersCount, setPlayersCount] = useState(1);

    const handleSubmit = () => {

        const payload = {
            playersCount: Number(playersCount),
            leaderEmail: "rohan@email.com",
            leaderPhone: "1122334455"
        };

        onConfirm(gameId, payload);

    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

            <div className="bg-surface-container-highest/90 backdrop-blur-md border border-white/10 p-6 rounded-xl w-96 text-on-surface">

                <h2 className="text-xl font-headline font-black mb-4 text-on-surface">
                    Join Game
                </h2>

                <label className="block mb-2 text-on-surface-variant">
                    Number of players
                </label>

                <input
                    type="number"
                    min="1"
                    value={playersCount}
                    onChange={(e) => setPlayersCount(e.target.value)}
                    className="bg-surface-container-highest/80 backdrop-blur-md border-2 border-white/5 rounded-lg p-3 w-full mb-4 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                />

                <p className="text-sm text-on-surface-variant mb-4">
                    Your contact details will be shared with the host.
                </p>
                {error && (
                    <p className="text-red-500 text-sm mb-2">
                        {error}
                    </p>
                )}
                <div className="flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-surface-container-lowest/60 border border-white/10 text-on-surface-variant rounded-lg hover:opacity-90 transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-lg font-headline font-black tracking-tight hover:opacity-90 transition"
                    >
                        Confirm Join
                    </button>

                </div>

            </div>

        </div>
    );
}