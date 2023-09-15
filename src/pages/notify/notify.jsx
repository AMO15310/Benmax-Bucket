import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
function Notify() {
  return (
    <>
      <div className="list-wrapper">
        <div className="common">
          <Sidebar />
        </div>
        <div className="TopandDown">
          <div className="nav">
            <Navbar />
          </div>
          <div className="datatable">
            <Datatable />
          </div>
        </div>
      </div>
    </>
  );
}

export default Notify;
