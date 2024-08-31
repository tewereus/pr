import React from "react";
import { useDispatch } from "react-redux";
useDispatch;

const CheckManager = () => {
  const dispatch = useDispatch();
  const [enteredValue, setEnteredValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(checkManager(enteredValue));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="mobile"
          value={enteredValue}
          placeholder="Mobile"
          onChange={(e) => setEnteredValue(e.target.value)}
          className="border rounded-lg h-10 pl-2 m-4"
        />
      </form>
    </div>
  );
};

export default CheckManager;
