import { useState, useEffect } from "react";

export default function useLocation() {

  const [location, setLocation] = useState(null);

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(
      (position) => {

        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });

      },
      () => {
        console.error("Location permission denied");
      }
    );

  }, []);

  return location;
}