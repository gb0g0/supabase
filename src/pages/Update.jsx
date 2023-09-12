import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../config/supabseClient";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState(null);
  const [updating, setUpdating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    if (!title || !method || !rating) {
      setFormError("Pls fill all field correctly");
      setUpdating(false);
      return;
    }
    const { data, error } = await supabase
      .from("smoothies")
      .update({ title, method, rating })
      .eq("id", id)
      .select();

    if (error) {
      console.log(error);
      setFormError("Pls fill all field correctly");
      setUpdating(false);
    }
    if (data) {
      console.log(data);
      setFormError(null);
      navigate("/")
    }
    setUpdating(false);

  };

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        navigate("/", { replace: true });
      }
      if (data) {
        console.log(data);
        setTitle(data.title);
        setMethod(data.method);
        setRating(data.rating);
      }
    };
    fetchSmoothies();
  }, [id, navigate]);
  return (
    <div className="page update">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <textarea
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        {updating ? (
          <button disabled>Updating</button>
        ) : (
          <button>Update Smoothie</button>
        )}

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};
export default Update;
