  import { ChangeEvent, useState } from "react";

  const FileInput = () => {
    const [images, setImages] = useState<string[]>([]);
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      const files: FileList | null = e.target.files; // 타입 정리하기
      if (files) {
        for (let i = 0; i < files.length; i++) {
          const file: File | null = files.item(i);
          console.log(`files[${i}]:`, file);

          if (!file) return;
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            const result = reader.result as string;
            setImages((prev) => [...prev, result]);
          };
        }
      }
    };
    return (
      <div>
        <p>FileInput</p>
        <input type="file" onChange={onChange} multiple accept="images/*" />
        <div>
          {images.map((image, idx) => (
            <img
              src={image}
              alt=""
              key={idx}
              width={200}
              style={{ objectFit: "contain" }}
            />
          ))}
        </div>
      </div>
    );
  };

  export default FileInput;
