"use client";
import { useEffect, useState } from 'react';

export default function GetCheck({tokenAPI}) {
  // State untuk menyimpan data respons atau pesan error
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Fungsi untuk memanggil API
  async function fetchData() {
    try {
      // Ambil token dari sessionStorage

      const response = await fetch(`${window.location.origin}/api/simple`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Token-API": tokenAPI, // Tambahkan token ke header Authorization
        },
      });

      // Cek jika respon tidak ok, lempar error
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      setData(result); // Simpan data hasil response
    } catch (err) {
      console.log(err);
      setError(err.message); // Simpan pesan error
    }
  }

  // Memanggil fetchData saat komponen dimuat
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Get Check</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
