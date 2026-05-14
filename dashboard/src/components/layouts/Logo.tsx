import Link from "next/link";

export default function Logo() {
  return (
    <div className="mx-auto w-fit mb-6 select-none">
      <Link
        href={"/"}
        className="font-extrabold text-2xl text-(--secondary-color)"
      >
        <span className="text-(--primary-color) mr-0.5">Dien</span>
        <span>May</span>
      </Link>
    </div>
  );
}
