export default function HomePage() {
  return (
    <div className="home bg-(--bg-light-white) h-screen space-y-6 p-8">
      <h1 className="text-[32px] font-bold">Dash board</h1>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-3">Total User</div>
        <div className="col-span-3">Total User</div>
        <div className="col-span-3">Total User</div>
        <div className="col-span-3">Total User</div>
      </div>
    </div>
  );
}
