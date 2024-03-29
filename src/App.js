import "./App.css";
import { useState } from "react";
//.
function App() {
  // 应该有个默认名字
  const [name, setName] = useState("许卯红");
  const [fileUrlList, setFileUrlList] = useState([]);

  const drawImage = (urlList) => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    urlList.forEach((fileUrl, index) => {
      const imgWidth = 150 * window.devicePixelRatio;
      const imgHeight = 2.175 * imgWidth;
      const image = new Image(imgWidth, imgHeight);
      image.src = fileUrl;
      image.style.display = "none";
      image.onload = () => {
        if (index === 0) {
          ctx.drawImage(image, 0, 0, imgWidth, imgHeight);
        }
        if (index === 1) {
          ctx.drawImage(image, imgWidth, 0, imgWidth, imgHeight);
        }
        if (index === 2) {
          ctx.drawImage(image, 0, imgHeight, imgWidth, imgHeight);
        }
        if (index === 3) {
          ctx.drawImage(image, imgWidth, imgHeight, imgWidth, imgHeight);
        }
      };
      document.body.appendChild(image);
    });
  };
  return (
    <div
      style={{
        left: "300",

        gap: 16,
        alignItems: "center",
        fontSize: 25,
      }}
    >
      <div>
        姓名:
        <input
          style={{
            fontSize: 25,
          }}
          value={name}
          placeholder="请输入姓名"
          onChange={(event) => {
            const canvas = document.getElementById("canvas");
            const ctx = canvas.getContext("2d");
            ctx.fillText(event.target.value, 100, 100);
            setName(event.target.value);
          }}
        />
      </div>
      <input
        style={{
          fontSize: 25,
        }}
        multiple
        type="file"
        id="avatar"
        name="avatar"
        onChange={(event) => {
          let array = [];
          for (const file of event.target.files) {
            const fileUrl = URL.createObjectURL(file);
            array.push(fileUrl);
          }
          setFileUrlList(array);
        }}
      />
      <div
        style={{
          display: "flex",
          gap: 8,
        }}
      >
        <button
          style={{
            fontSize: 25,
          }}
          onClick={() => {
            drawImage(fileUrlList);
            setTimeout(() => {
              const canvas = document.getElementById("canvas");
              const ctx = canvas.getContext("2d");
              ctx.font = "80px serif";
              ctx.fillStyle = "green";
              ctx.fillText(name, canvas.width / 2 - 120, canvas.height / 2);
            }, 150);
            setTimeout(() => {
              const el = document.createElement("a");
              const canvas = document.getElementById("canvas");
              el.href = canvas.toDataURL();
              el.download = "文件名称";
              const event = new MouseEvent("click");
              el.dispatchEvent(event);
            }, 300);
          }}
        >
          获取图片
        </button>
      </div>
      <div
        style={{
          display: "flex",

          gap: 8,
        }}
      >
        <div>
          <span
            style={{
              display: "block",
              marginBottom: 12,
            }}
          >
            预览图片:
          </span>
          <div
            style={{
              display: "flex",
              gap: 8,
              width: 210,
              flexWrap: "wrap",
            }}
          >
            {fileUrlList.map((url) => {
              return <img src={url} width="100px" key={url} alt="url" />;
            })}
          </div>
        </div>
        <canvas
          id="canvas"
          style={{
            border: "1px solid #ddd",
            width: "300px",
            height: "652px",
          }}
          width={300 * window.devicePixelRatio}
          height={652 * window.devicePixelRatio}
        />
      </div>
    </div>
  );
}

export default App;
