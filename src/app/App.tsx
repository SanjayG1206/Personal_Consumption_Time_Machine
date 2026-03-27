import { RouterProvider } from "react-router";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { router } from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { SustainabilityProvider } from "./context/SustainabilityContext";

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AuthProvider>
        <SustainabilityProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" richColors />
        </SustainabilityProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}