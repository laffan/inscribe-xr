import { useEffect } from "react";
import LogoutButton from "./LogoutButton";

const BottomBar = () => {
  
  return (
    <div className="BottomBar">
      <div className="BottomBar__Left">
        <a href="/credits">Credits</a>
      </div>

      <div className="BottomBar__Right">
        <LogoutButton />
      </div>
    </div>
  );
};

export default BottomBar;
