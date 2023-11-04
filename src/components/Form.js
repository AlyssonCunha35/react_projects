import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Form({ items, setItems, update, setUpdate }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (Object.keys(update).length > 0) {
      setDescription(update.description);
      setQuantity(update.quantity);
    }
  }, [update]);

  function handleSubmit(e) {
    e.preventDefault();

    if ([description].includes("") || description.length < 3) {
      toast.error("Not Found Or Very Short");
    } else {
      //Construct Object
      const objectItems = {
        description,
        quantity,
        packed: false,
      };

      if (update.id) {
        //Edit
        objectItems.id = update.id;

        const itemUpdated = items.map((updateState) =>
          updateState.id === update.id ? objectItems : updateState
        );
        setItems(itemUpdated);
        setUpdate({});
        toast.success("Item Updated");
      } else {
        objectItems.id = Date.now();
        setItems([...items, objectItems]);
        toast.success("Item Added");
      }

      setDescription("");
    }
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>{update.id ? "EDIT" : "ADD"}</button>
    </form>
  );
}
