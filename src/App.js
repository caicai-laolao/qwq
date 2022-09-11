import './App.css';
import { useState } from 'react';

function App() {
  const [name, setName] = useState('许卯红');
  const [fileUrlList, setFileUrlList] = useState([]);

  const drawImage = (urlList) => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    let x = 0;
    let y = 0;
    let t = 0;
    urlList.forEach((fileUrl) => {
      const image = new Image(240, 400);
      image.src = fileUrl;
      image.style.display = 'none';
      image.onload = () => {
        ctx.drawImage(
          image,
          x,
          y,
          240 * window.devicePixelRatio,
          (400 / 240) * 240 * window.devicePixelRatio
        );
      };
      document.body.appendChild(image);
      t++;
      if (t % 2 === 1) {
        x = x + 65;
      }
      if (t % 2 === 0) {
        y = y + 65;
      }
    });
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        alignItems: 'center',
      }}
    >
      <div>
        姓名:
        <input
          value={name}
          placeholder="请输入姓名"
          onChange={(event) => {
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            ctx.fillText(event.target.value, 100, 100);
            setName(event.target.value);
          }}
        />
      </div>
      <input
        multiple
        type="file"
        id="avatar"
        name="avatar"
        accept="image/png, image/jpeg>"
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
          display: 'flex',
          gap: 8,
        }}
      >
        {fileUrlList.map((url) => {
          return <img src={url} width="40px" key={url} alt="url" />;
        })}
      </div>
      <div
        style={{
          display: 'flex',
          gap: 8,
        }}
      >
        <button
          onClick={() => {
            drawImage(fileUrlList);
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');

            ctx.fillText(name, canvas.width, canvas.height);
          }}
        >
          生成图片
        </button>
        <button
          onClick={() => {
            const el = document.createElement('a');
            const canvas = document.getElementById('canvas');
            el.href = canvas.toDataURL();
            el.download = '文件名称';
            const event = new MouseEvent('click');
            el.dispatchEvent(event);
          }}
        >
          下载图片
        </button>
      </div>
      <canvas
        id="canvas"
        style={{
          border: '1px solid #ddd',
          width: '480px',
          height: '640px',
        }}
        width={480 * window.devicePixelRatio}
        height={640 * window.devicePixelRatio}
      />

      <h4>图片预览</h4>
    </div>
  );
}

export default App;
