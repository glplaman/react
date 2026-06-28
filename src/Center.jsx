import { useEffect, useState } from "react";
import "./Center.css";

export default function () {
  const [user, setUser] = useState({ name: "", credit: 0 });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };
  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="item">
          <label>姓名</label>
          <input
            type="text"
            onChange={(e) => {
              setUser((prev) => ({ ...prev, name: e.target.value }));
            }}
          />
        </div>
        <div className="item">
          <label>积分</label>
          <input
            type="text"
            onChange={(e) => {
              setUser((prev) => ({ ...prev, credit: e.target.value }));
            }}
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
