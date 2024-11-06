"use client";

import { useEffect, useState } from "react";

export default function Page() {
  // State untuk menyimpan data API
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data dari API saat komponen dimuat
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/auth/signup");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        console.log("kocak",result);
        setData(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Set loading selesai
      }
    };

    fetchData();
  }, []);

  // Render tampilan sesuai kondisi
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h1>Title</h1>
      <p>Data dari API: {data}</p>
    </>
  );
}
