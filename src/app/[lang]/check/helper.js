// pages/index.js
'use client';
import { useSession, signIn, signOut } from "next-auth/react";

export default function Helper() {
  const { data: session } = useSession();
  

  if (session) {
    return (
      <>
        <p>Selamat datang, {session.user.name}!</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <>
      <p>Kamu belum login.</p>
      <a href="/">Sign in</a>
      {/* <button onClick={() => signIn()}>Sign in</button> */}
    </>
  );
}
