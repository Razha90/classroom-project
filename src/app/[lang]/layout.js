import localFont from "next/font/local";
import "../globals.css";
import {Inter, Josefin_Sans} from 'next/font/google'

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const inter = Inter({
  display: "swap",
  subsets: ['latin']
});

const josefinSans = Josefin_Sans({
  display: "swap",
  subsets: ['latin']
})



export const metadata = {
  title: "Classroom",
  description: "A classroom app",
};

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  return (
    <html lang={lang}>
      <body
        className={` antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
