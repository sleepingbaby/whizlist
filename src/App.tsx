import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <img
          style={{ width: "400px" }}
          src="https://img.freepik.com/free-vector/abstract-grunge-style-coming-soon-with-black-splatter_1017-26690.jpg?w=2000&t=st=1688609405~exp=1688610005~hmac=5e3498ee07a167123563de6961b1bd1cda474039194c50b9bc38a55bb5ce4d76"
          alt="coming soon"
        ></img>
      </div>
    </>
  );
}

export default App;
