import { useState } from "react";
import Layout from "../components/Layout";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import axiosClient from "../api/axiosClient";

export default function HostGame() {

  const [formData, setFormData] = useState({
    sport: "CRICKET",
    date: "",
    time: "",
    totalPlayers: "",
    remainingSpots: "",
    contactNumber: "",
    email: ""
  });

  const [position, setPosition] = useState(null);

  // handle map click
  function LocationSelector() {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
      }
    });
    return position ? <Marker position={position} /> : null;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!position) {
      alert("Please select location on map");
      return;
    }

    const payload = {
      ...formData,
      latitude: position.lat,
      longitude: position.lng
    };

    try {

      await axiosClient.post("/games/host", payload);

      alert("Game hosted successfully!");

    } catch (error) {

      const message =
        error?.response?.data?.message ||
        "Failed to host game";

      alert(message);
    }
  };

  return (
    <Layout>

      <h1 className="text-2xl font-headline font-black italic tracking-tighter text-primary mb-4">
        Host a Game
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-2xl mx-auto bg-surface-container-highest/80 backdrop-blur-md border border-white/10 p-6 rounded-2xl"
      >

        <select
          name="sport"
          value={formData.sport}
          onChange={handleChange}
          className="w-full bg-surface-container-highest/80 backdrop-blur-md border-2 border-white/5 rounded-lg p-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
        >
          <option value="CRICKET">Cricket</option>
          <option value="FOOTBALL">Football</option>
          <option value="BADMINTON">Badminton</option>
        </select>

        <input
          type="date"
          name="date"
          className="w-full bg-surface-container-highest/80 backdrop-blur-md border-2 border-white/5 rounded-lg p-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
          onChange={handleChange}
        />

        <input
          type="time"
          name="time"
          className="w-full bg-surface-container-highest/80 backdrop-blur-md border-2 border-white/5 rounded-lg p-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
          onChange={handleChange}
        />

        <input
          type="number"
          name="totalPlayers"
          placeholder="Total Players"
          className="w-full bg-surface-container-highest/80 backdrop-blur-md border-2 border-white/5 rounded-lg p-3 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
          onChange={handleChange}
        />

        <input
          type="number"
          name="remainingSpots"
          placeholder="Remaining Spots"
          className="w-full bg-surface-container-highest/80 backdrop-blur-md border-2 border-white/5 rounded-lg p-3 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
          onChange={handleChange}
        />

        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          className="w-full bg-surface-container-highest/80 backdrop-blur-md border-2 border-white/5 rounded-lg p-3 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full bg-surface-container-highest/80 backdrop-blur-md border-2 border-white/5 rounded-lg p-3 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
          onChange={handleChange}
        />

        {/* Map */}
        <div className="h-64 rounded-lg overflow-hidden border border-white/10">

          <MapContainer
            center={[18.5204, 73.8567]} // Pune default
            zoom={13}
            className="h-full w-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationSelector />
          </MapContainer>

        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary p-3 rounded font-headline font-black tracking-tight shadow-[0_0_20px_rgba(117,255,158,0.3)] hover:opacity-90 transition"
        >
          Host Game
        </button>

      </form>

    </Layout>
  );
}