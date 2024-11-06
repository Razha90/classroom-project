import { SessionProvider } from "next-auth/react";
import Helper from "./helper";

export default function Home() {

  return (
    <div>
      <h1>Home</h1>
      <p>Home page</p>
      <SessionProvider>
        <Helper />
      </SessionProvider>
    </div>
  );
}
