import BarcodeImageReader from "./test";

export default function UploadPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">Quét barcode từ ảnh</h1>
      <BarcodeImageReader />
    </main>
  );
}
