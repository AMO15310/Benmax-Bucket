import "./home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widgets/Widgets";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
// import List from "../../components/table/Table";

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
        <div className="others">
          <div className="widgets">
            <Widget type="Client" />
            <Widget type="Bills" />
            <Widget type="Paid" />
            <Widget type="Balances" />
          </div>
          <div className="charts">
            <Featured />
            <Chart aspect={3 / 1} title="Users revenue last 6 months" />
          </div>
          {/* <div className="listContainer">
            <div className="listTitle">Latest transactions</div>
            <div className="lists">
              <List />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
