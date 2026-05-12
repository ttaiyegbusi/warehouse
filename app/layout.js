import "./globals.css";
import { UserProvider } from "@/lib/UserContext";

export const metadata = {
  title: "Warehouse",
  description: "Manage your finances and inbox",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
