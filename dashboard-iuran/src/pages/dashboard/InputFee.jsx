import React, { useState, useEffect } from "react";

export function InputFee() {
  const [formData, setFormData] = useState({
    categories_id: "",
    pemilik_iuran: "",
    deskripsi: "",
    jenis_iuran: "",
    jumlah_iuran: "",
  });

  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]); // State untuk menyimpan data kategori

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/categories", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Sertakan token jika diperlukan
          },
        });

        if (!response.ok) {
          throw new Error("Gagal mengambil data kategori");
        }

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Gagal mengambil data kategori:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/fees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass JWT token
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Gagal untuk membuat iuran baru");
      }

      const data = await response.json();
      setMessage("Fee created successfully!");
      setFormData({
        categories_id: "",
        pemilik_iuran: "",
        deskripsi: "",
        jenis_iuran: "",
        jumlah_iuran: "",
      });
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Buat iuran baru</h2>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Kategori</label>
          <select
            name="categories_id"
            value={formData.categories_id}
            onChange={(e) =>
              setFormData({ ...formData, categories_id: parseInt(e.target.value) })
            }
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="">Pilih kategori</option>
            {categories.map((category) => (
              <option key={category.categories_id} value={category.categories_id}>
                {category.namaCategories} 
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Pemilik Iuran</label>
          <input
            type="text"
            name="pemilik_iuran"
            value={formData.pemilik_iuran}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Deskripsi</label>
          <textarea
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium">Jenis Iuran</label>
          <input
            type="text"
            name="jenis_iuran"
            value={formData.jenis_iuran}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Jumlah Iuran</label>
          <input
            type="number"
            step="0.01"
            name="jumlah_iuran"
            value={formData.jumlah_iuran}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Kirim
        </button>
      </form>
    </div>
  );
}

export default InputFee;
