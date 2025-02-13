import { useTheme } from "@/context/theme-provider";
import { Link } from "react-router-dom";
import { Switch } from "./ui/switch";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <header className="sticky top-0 z-0 py-2 w-full border-b bg-background/95 backdrop-blur-0 supports-[backdrop-filter]:bg-background/40">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to={"/"}>
          <img src="/weather-watch.png" alt="weather logo" className="h-14" />
        </Link>

        <div>
          <div onClick={() => setTheme(isDark ? "light" : "dark")}>
            <Switch />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
