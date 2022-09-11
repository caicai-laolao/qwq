import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState();
  const [name, setName] = useState("");
  const [fileurlList, setFileUrlList] = useState([]);
  return (
    <div>
      输入了：{name}
      <input
        onChange={(event) => {
          const canvas = document.getElementById("canvas");
          const ctx = canvas.getContext("2d");
          ctx.fillStyle = "black";

          ctx.fillText(event.target.value, 100, 100);
        }}
      ></input>
      <input
        multiple
        type="file"
        id="avatar"
        name="avatar"
        accept="image/png, image/jpeg>"
        onChange={(event) => {
          let x = -65;
          let y = 0;
          let t = 0;
          let array = [];
          for (const file of event.target.files) {
            const fileUrl = URL.createObjectURL(file);
            array.push(fileUrl);
            const canvas = document.getElementById("canvas");
            const ctx = canvas.getContext("2d");
            const image = new Image(50, 50);
            image.src = fileUrl;
            image.onload = () => {
              ctx.drawImage(image, x, y, 50, 50);
            };
            document.body.appendChild(image);

            t++;
            if (t % 2 === 1) {
              x = x + 65;
            }
            if (t % 2 === 0) {
              y = y + 65;
            }
          }

          setFileUrlList(array);
        }}
      ></input>
      {fileurlList.map((url) => {
        return <img src={url} width="200px" />;
      })}
      <img src={name} />
      <canvas
        id="canvas"
        style={{
          border: "2px solid #ddd",
          width: "300px",
          height: "300px",
        }}
      ></canvas>
      <button
        onClick={() => {
          const el = document.createElement("a");
          const canvas = document.getElementById("canvas");
          el.href = canvas.toDataURL();
          el.download = "文件名称";
          const event = new MouseEvent("click");
          el.dispatchEvent(event);
        }}
      >
        {" "}
        " sadsadsad"
      </button>
    </div>
  );
}

export default App;
