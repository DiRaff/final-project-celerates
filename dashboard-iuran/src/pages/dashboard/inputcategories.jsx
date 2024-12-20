import React, { useState } from "react";
import { Input, Button } from "@material-tailwind/react";

export function InputCategories() {
  const [namaCategories, setNamaCategories] = useState("");
  const [userId, setUserId] = useState(""); // Pastikan ini adalah userId yang valid
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!namaCategories.trim()) {
      setError("Nama kategori tidak boleh kosong.");
      return;
    }

    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ namaCategories, userId }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Gagal menambahkan kategori.");
      }

      const result = await response.json();
      setSuccess("Kategori berhasil ditambahkan!");
      setNamaCategories(""); // Reset input setelah sukses
    } catch (error) {
      setError(error.message || "Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-4">
      <Input
        size="lg"
        label="Nama Kategori"
        value={namaCategories}
        onChange={(e) => setNamaCategories(e.target.value)}
        error={!!error}
      />
      <Input
        size="lg"
        label="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        error={!!error}
      />
      <Button
        onClick={handleSubmit}
        color="blue"
        disabled={isLoading}
      >
        {isLoading ? "Memproses..." : "Tambah Kategori"}
      </Button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </div>
  );
}

export default InputCategories;
