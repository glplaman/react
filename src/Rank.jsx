import { useEffect, useState, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";
import "./Rank.css";
import logo from "./assets/starCup.svg";
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

export default function Rank() {
  const [ranks, setRanks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState("软件项目管理");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    getRanks();
  }, [course]);

  const getRanks = async () => {
    setIsLoading(true);
    const { error, data } = await supabase.from("ranks").select().eq("ucourse", course);
    if (error) {
      console.error(error);
      return;
    }
    setRanks(data);
    setIsLoading(false);
  };

  const requestSort = (key) => {
    let direction = "asc";
    // 如果点击的是当前正在排序的列，则切换方向；否则默认为升序
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedRanks = useMemo(() => {
    if (!ranks || !sortConfig.key) return ranks;

    // 复制一份数组以免修改原数据
    const sortableItems = [...ranks];

    sortableItems.sort((a, b) => {
      // 处理可能为 null 的情况
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    return sortableItems;
  }, [ranks, sortConfig]);

  return (
    <div className="container">
      <nav>
        <img src={logo} alt="" />
        <ul>
          <li onClick={() => setCourse("软件项目管理")} className={course == "软件项目管理" ? "active" : ""}>
            软件项目管理
          </li>
          <li onClick={() => setCourse("计算机应用基础")} className={course == "计算机应用基础" ? "active" : ""}>
            计算机应用基础
          </li>
        </ul>
      </nav>
      {isLoading ? (
        <div className="mask">Loading</div>
      ) : !ranks || ranks.length == 0 ? (
        <div>数据为空</div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th onClick={() => requestSort("usn")}>学号 {sortConfig.key === "usn" && (sortConfig.direction === "asc" ? "↑" : "↓")}</th>
                <th onClick={() => requestSort("uname")}>姓名 {sortConfig.key === "uname" && (sortConfig.direction === "asc" ? "↑" : "↓")}</th>
                <th onClick={() => requestSort("ucredit")}>积分 {sortConfig.key === "ucredit" && (sortConfig.direction === "asc" ? "↑" : "↓")}</th>
                <th>课程</th>
                <th onClick={() => requestSort("uclass")}>班级 {sortConfig.key === "uclass" && (sortConfig.direction === "asc" ? "↑" : "↓")}</th>
                <th onClick={() => requestSort("updated_at")}>更新时间 {sortConfig.key === "updated_at" && (sortConfig.direction === "asc" ? "↑" : "↓")}</th>
              </tr>
            </thead>

            <tbody>
              {sortedRanks.map((item) => (
                <tr key={item.id}>
                  <td>{item.usn}</td>
                  <td>{item.uname}</td>
                  <td>{item.ucredit}</td>
                  <td>{item.ucourse}</td>
                  <td>{item.uclass}</td>
                  <td>{item.updated_at ? new Date(item.updated_at).toLocaleString("zh-CN") : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
