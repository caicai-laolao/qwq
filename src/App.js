import './App.css';
import { useState } from 'react';

function App() {
  const [name, setName] = useState('许卯红');
  const [fileUrlList, setFileUrlList] = useState([]);

  const drawImage = (urlList) => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    urlList.forEach((fileUrl, index) => {
      const imgWidth = 150 * window.devicePixelRatio;
      const imgHeight = 2.175 * imgWidth;
      const image = new Image(imgWidth, imgHeight);
      image.src = fileUrl;
      image.style.display = 'none';
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
            setTimeout(() => {
              const canvas = document.getElementById('canvas');
              const ctx = canvas.getContext('2d');
              ctx.font = '80px serif';
              ctx.fillStyle = 'green';
              ctx.fillText(name, canvas.width / 2 - 120, canvas.height / 2);
            }, 200);
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
          width: '300px',
          height: '652px',
        }}
        width={300 * window.devicePixelRatio}
        height={652 * window.devicePixelRatio}
      />

      <h4>图片预览</h4>
    </div>
  );
}

export default App;
