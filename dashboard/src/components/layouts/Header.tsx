import { Bell, Mail } from "lucide-react";
import SearchInput from "./SearchInput";
import AdminProfile from "./AdminProfile";

export default function Header() {
  return (
    <header className="pt-6 pb-4 px-10">
      <div className="flex justify-between items-center">
        <SearchInput />
        <div className="flex items-center gap-4">
          <div className="notification">
            <Bell />
          </div>
          <div className="message">
            <Mail />
          </div>
          <div>
            <AdminProfile />
          </div>
        </div>
      </div>
    </header>
  );
}
