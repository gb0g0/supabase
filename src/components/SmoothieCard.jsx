import { Link } from "react-router-dom";
import supabase from "../config/supabseClient";

const SmoothieCard = (smoothie, setSmoothies) => {
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("smoothies")
      .delete()
      .eq("id", smoothie.id)
      .select();

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
      // console.log("called", id);
      setSmoothies((prevSmoothies) => {
        return prevSmoothies.filter((sm) => sm.id !== smoothie.id);
      });
    }
  };

  return (
    <div className="smoothie-card">
      <h3>{smoothie.title}</h3>
      <p>{smoothie.method}</p>
      <div className="rating">{smoothie.rating}</div>
      <div className="button">
        <Link to={"/" + smoothie.id}>
          <i className="material-icons">edit</i>
        </Link>
        <i className="material-icons" onClick={handleDelete}>
          delete
        </i>
      </div>
    </div>
  );
};
export default SmoothieCard;
