import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { ThemeProvider } from "./context/theme-provider";
import Dashboard from "./Pages/Dashboard";
import City from "./Pages/City";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark">
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/city/:cityName" element={<City />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
