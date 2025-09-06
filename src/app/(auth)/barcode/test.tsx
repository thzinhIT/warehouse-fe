"use client";

import { useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { BarcodeFormat, DecodeHintType } from "@zxing/library";

export default function BarcodeImageReader() {
  const [result, setResult] = useState<string>("");
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (imgRef.current) {
        imgRef.current.src = reader.result as string;

        // 👇 Chờ ảnh load xong mới decode
        imgRef.current.onload = async () => {
          try {
            const hints = new Map();
            hints.set(DecodeHintType.POSSIBLE_FORMATS, [
              BarcodeFormat.QR_CODE,
              BarcodeFormat.CODE_128,
              BarcodeFormat.EAN_13,
              BarcodeFormat.EAN_8,
              BarcodeFormat.UPC_A,
              BarcodeFormat.UPC_E,
            ]);

            const codeReader = new BrowserMultiFormatReader(hints);

            // ép kiểu cho chắc chắn
            const decodeResult = await codeReader.decodeFromImageElement(
              imgRef.current as HTMLImageElement
            );

            setResult(decodeResult.getText());
          } catch (err) {
            console.error(" Không đọc được mã:", err);
            setResult("Không nhận diện được mã");
          }
        };
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <img
        ref={imgRef}
        alt="barcode preview"
        className="max-w-xs border rounded"
      />
      <p className="text-lg font-semibold">Kết quả: {result || "Chưa có"}</p>
    </div>
  );
}
