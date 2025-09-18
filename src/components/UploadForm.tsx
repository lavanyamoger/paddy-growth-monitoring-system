import React, { useState } from "react";

const UploadForm: React.FC<{ onUpload: () => void }> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [date, setDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("date", date);

    await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    setFile(null);
    setDate("");
    onUpload();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md">
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="ml-2"
      />
      <button type="submit" className="ml-2 px-4 py-1 bg-green-500 text-white rounded">
        Upload
      </button>
    </form>
  );
};

export default UploadForm;
