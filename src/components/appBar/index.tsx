import { useState } from "react";

import "./styles.css";

interface AppBarProps {
  handleSave: () => void;
}

const AppBar: React.FC<AppBarProps> = ({ handleSave }) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  // Trigger save action, set clicked state to true to show feedback, and reset clicked state after a short delay.
  const onClickSave = () => {
    handleSave();
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 300);
  };

  return (
    <div id="app-bar">
      <div id='button-container'>
        <button
          className={isClicked ? "button-clicked" : ""}
          id="save-button"
          onClick={onClickSave}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AppBar;
