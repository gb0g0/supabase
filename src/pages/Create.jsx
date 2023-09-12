import { useState } from "react";
import supabase from "../config/supabseClient";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState(null);
  const [creating, setCreating] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setCreating(true);
    e.preventDefault();
    if (!title || !method || !rating) {
      setFormError("Pls fill all field correctly");
      setCreating(false);
      return;
    }
    
    const { data, error } = await supabase
      .from("smoothies")
      .insert([{ title, method, rating }]);

    if (error) {
      console.log(error);
      setFormError("Pls fill all field correctly");
      setCreating(false);
    }
    if (data) {
      setFormError(null);
      console.log(data);
    }
    setCreating(false);
    navigate("/");
  };
  return (
    <div className="page create">
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
        {creating ? (
          <button disabled>Creating</button>
        ) : (
          <button>Create Smoothie Recipe</button>
        )}

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};
export default Create;
