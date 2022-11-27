import "./home.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

function Home() {
  return (
    <div className="dashb">
      <div className="common">
        <Sidebar />
      </div>
      <div className="TopandDown">
        <div className="nav">
          <Navbar />
        </div>
        <div className="others">Dashboard</div>
      </div>
    </div>
  );
}

export default Home;
