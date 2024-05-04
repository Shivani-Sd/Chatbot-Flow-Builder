import { useEffect } from "react";

import "./styles.css";

interface SnackbarProps {
  setShowSnackbar: (value: React.SetStateAction<boolean>) => void;
}

const Snackbar: React.FC<SnackbarProps> = ({ setShowSnackbar }) => {
  // Hook to autohide snackbar after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSnackbar(false);
    }, 3000);

    return () => clearTimeout(timer);
  });

  return (
    <div id="snackbar">
      <div id="snackbar-content">Cannot save Flow</div>
    </div>
  );
};

export default Snackbar;
