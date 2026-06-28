import logo from "./assets/react.svg";
export default function () {
  let age = 18;
  let msg = "hi,there.";
  let arr = [0, 1, 2, 3, 4];
  return (
    <>
      <h1>hi,there.</h1>
      <img src={logo} alt="" />
      <p>{age}</p>
      <p>{age > 18 ? "a" : "b"}</p>
      <p>{msg.toUpperCase()}</p>
      <ul>
        {arr.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </>
  );
}
