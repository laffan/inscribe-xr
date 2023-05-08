import BottomBar from "./BottomBar";
import { useStoreState } from "easy-peasy";

const Layout = ({ pageName, children }) => {
  const status = useStoreState((state) => state.ui.status);

  return (
    <div className="Layout">
      <div
        className="Layout__Topbar"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <div className="Layout__Logo"></div>
        <div style={{ color: "red", paddingTop: 10, textAlign: "right" }}>
          {status}
        </div>
      </div>
      <div className={`Layout__Content ${pageName}`}>{children}</div>
      <div className="Layout__Bottombar">
        <div className="Layout__BottombarInner">
          <BottomBar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
