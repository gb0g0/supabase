import supabase from "../config/supabseClient";
import { useState, useEffect } from "react";
import SmoothieCard from "../components/SmoothieCard";
const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase.from("smoothies").select();
      if (error) {
        setFetchError("Could not fetch smoothies");
        setSmoothies(null);
        console.log(error);
      }
      if (data) {
        setSmoothies(data);
        setFetchError(null);
      }
    };
    fetchSmoothies();
  }, []);

  return (
    <div>
      {fetchError && <p>{fetchError}</p>}
      {smoothies && (
        <div className="smoothies">
          <div className="smoothie-grid">
            {smoothies.map((smoothie) => (
              <SmoothieCard
                setSmoothies={setSmoothies}
                key={smoothie.id}
                {...smoothie}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default Home;
