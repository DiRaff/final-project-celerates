import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";

export function Dataiuran() {
  const [fees, setFees] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const feesResponse = await fetch("http://localhost:8000/api/fees", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const categoriesResponse = await fetch(
          "http://localhost:8000/api/categories",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!feesResponse.ok || !categoriesResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const feesData = await feesResponse.json();
        const categoriesData = await categoriesResponse.json();

        setFees(feesData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/fees/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete fee");
      }
      setFees(fees.filter((fee) => fee.fees_id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (fee) => {
    setEditData(fee);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/fees/${editData.fees_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(editData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update fee");
      }
      const updatedFee = await response.json();
      setFees(
        fees.map((fee) =>
          fee.fees_id === updatedFee.fees_id ? updatedFee : fee
        )
      );
      setEditData(null);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="red">{error}</Typography>;
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Data Iuran
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["No", "Pemilik Iuran", "Deskripsi", "Jenis Iuran", "Jumlah", "Actions"].map(
                  (el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {fees.map((fee, index) => {
                const className = `py-3 px-5 ${
                  index === fees.length - 1 ? "" : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={fee.fees_id}>
                    <td className={className}>{index + 1}</td>
                    <td className={className}>
                      {editData?.fees_id === fee.fees_id ? (
                        <Input
                          value={editData.pemilik_iuran}
                          onChange={(e) =>
                            setEditData({ ...editData, pemilik_iuran: e.target.value })
                          }
                        />
                      ) : (
                        fee.pemilik_iuran
                      )}
                    </td>
                    <td className={className}>
                      {editData?.fees_id === fee.fees_id ? (
                        <Input
                          value={editData.deskripsi}
                          onChange={(e) =>
                            setEditData({ ...editData, deskripsi: e.target.value })
                          }
                        />
                      ) : (
                        fee.deskripsi
                      )}
                    </td>
                    <td className={className}>
                      {editData?.fees_id === fee.fees_id ? (
                        <Select
                          value={editData.categories_id}
                          onChange={(e) =>
                            setEditData({ ...editData, categories_id: parseInt(e) })
                          }
                        >
                          {categories.map((category) => (
                            <Option
                              key={category.categories_id}
                              value={category.categories_id}
                              className="capitalize"
                            >
                              {category.namaCategories}
                            </Option>
                          ))}
                        </Select>
                      ) : (
                        categories.find(
                          (category) => category.categories_id === fee.categories_id
                        )?.namaCategories || "Unknown"
                      )}
                    </td>
                    <td className={className}>
                      {editData?.fees_id === fee.fees_id ? (
                        <Input
                          type="number"
                          value={editData.jumlah_iuran}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              jumlah_iuran: parseFloat(e.target.value),
                            })
                          }
                        />
                      ) : (
                        fee.jumlah_iuran
                      )}
                    </td>
                    <td className="py-8 px-5 flex items-center gap-4">
                      {editData?.fees_id === fee.fees_id ? (
                        <Button
                          size="sm"
                          onClick={handleSave}
                          className="text-xs font-semibold"
                        >
                          Save
                        </Button>
                      ) : (
                        <>
                          <Typography
                            as="button"
                            onClick={() => handleEdit(fee)}
                            className="text-xs font-semibold text-blue-gray-600"
                          >
                            Edit
                          </Typography>
                          <Typography
                            as="button"
                            onClick={() => handleDelete(fee.fees_id)}
                            className="text-xs font-semibold text-blue-gray-600"
                          >
                            Delete
                          </Typography>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Dataiuran;
