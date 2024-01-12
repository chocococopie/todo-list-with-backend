import React, { useState } from "react";

function CheckboxExample() {
  // State to track if checkbox is checked
  const [isChecked, setIsChecked] = useState(false);

  // Handle checkbox change event
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div style={{ display : "flex" }}>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </label>
    </div>
  );
}

export default CheckboxExample;
