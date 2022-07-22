import React, { useState, useRef } from "react";
import "./App.css";
import ImageFile from "./components/ImageFile";

function App() {
  const [imgList, setImgList] = useState<string[]>([]);
  const inputref = useRef<HTMLInputElement>(null);

  console.log(imgList);

  function addImage() {
    inputref.current?.click();
  }

  function pickImage(e: any) {
    const src = e.currentTarget.files?.[0];
    if (src) {
      const reader = new FileReader();
      reader.readAsDataURL(src);
      reader.onloadend = (e) => {
        setImgList((prev) => [...prev, e.target?.result as string]);
      };
    }
  }

  return (
    <>
      <input
        type="file"
        name="file"
        ref={inputref}
        onChange={pickImage}
      ></input>
      <div className="App">
        {!imgList.length ? (
          <div className="inital">
            <p className="center">
              사진이 없습니다.
              <br />
              이미지를 추가해주세요.{" "}
            </p>{" "}
          </div>
        ) : (
          <div className="gallery">
            {imgList.map((img, ind) => (
              <ImageFile key={ind} src={img} />
            ))}
          </div>
        )}
        <div className="addingBox center" onClick={addImage}>
          +
        </div>
      </div>
    </>
  );
}

export default App;
