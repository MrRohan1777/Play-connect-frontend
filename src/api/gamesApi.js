import axiosClient from "./axiosClient";

export const getNearbyGames = (lat, lng) => {
  return axiosClient.get("/games/nearbyGames", {
    params: {
      sport: "CRICKET",
      lat: lat,
      lng: lng,
      radius: 15000
    }
  });
};

export const getUserHostedGames = (userId) =>
  axiosClient.get(`/games/user/${userId}/hosted`);

export const getUserJoinedGames = (userId) =>
  axiosClient.get(`/games/user/${userId}/joined`);

export const cancelHostedGame = (gameId, body) =>
  axiosClient.patch(`/games/cancelGame/${gameId}`, body);