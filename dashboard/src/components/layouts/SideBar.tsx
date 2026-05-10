import Logo from "./Logo";
import Nav from "./Nav";

export default function SideBar() {
  return (
    <aside className="w-60 py-6 h-screen bg-white ">
      <div className="py-0.5">
        <Logo />
      </div>
      <div className="pt-3">
        <Nav />
      </div>
    </aside>
  );
}
