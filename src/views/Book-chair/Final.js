import React from "react";
import { useParams } from "react-router-dom";
import "./Final.css";

function Final() {
  const { selected, totalprice } = useParams();

  return (
    <div className="final">
      <div className="showe">
        <img src="https://th.bing.com/th/id/OIP.4z1OjfnzBBQdMFkv0NV7pgHaLH?pid=ImgDet&rs=1" className="img" alt="img not found" />
        <h3>SELECTED SEATS</h3>
        {selected}
        <h3>TOTALPRICE : {totalprice}</h3>
      </div>
    </div>
  );
}

export default Final;
