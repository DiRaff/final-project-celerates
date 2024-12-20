import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Tambahkan import useNavigate

export function SignUp() {
  const navigate = useNavigate(); // Deklarasikan navigate
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    nama: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    alamat: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {

        
        alert("User created successfully!");
        navigate("/auth/sign-in"); // Arahkan pengguna ke halaman Sign-In
      } else {
        alert(data.error || "Error creating user");
      }
    } catch (error) {
      console.error(error);
      alert("An unexpected error occurred");
    }
  };


  return (
    <section className="m-8 flex">
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Daftar anggota
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            
          </Typography>
        </div>
        <form
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
          onSubmit={handleSubmit}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Nama Pengguna
            </Typography>
            <Input
              size="lg"
              placeholder="Nama Pengguna"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
              <Typography
    variant="small"
    color="blue-gray"
    className="-mb-3 font-medium"
  >
    Nama Lengkap
            </Typography>
            <Input
              size="lg"
    placeholder="Nama Lengkap"
    name="nama"
    value={formData.nama}
    onChange={handleChange}
    required
            />
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Password
            </Typography>
            <Input
              size="lg"
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
    Tanggal Lahir
  </Typography>
  <Input
    type="date"
    size="lg"
    name="tanggal_lahir"
    value={formData.tanggal_lahir}
    onChange={handleChange}
    required
  />


              <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
    Jenis Kelamin
  </Typography>
  <Input
    name="jenis_kelamin"
    value={formData.jenis_kelamin}
    onChange={handleChange}
    className="border-gray-300 rounded-lg focus:border-gray-900 focus:ring-0"
    required
  />

            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Alamat
            </Typography>
            <Textarea
              label="Alamat"
              size="lg"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          {error && (
            <Typography variant="small" color="red" className="mt-2">
              {error}
            </Typography>
          )}
          {success && (
            <Typography variant="small" color="green" className="mt-2">
              {success}
            </Typography>
          )}

          <Button className="mt-6" fullWidth type="submit">
            Daftar
          </Button>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
