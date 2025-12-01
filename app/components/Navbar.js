import Link from "next/link";
export default function Navbar() {
  return (
    <section>
      <div className="flex">
        <div className="top-0 left-0 right-0 bg-black/20 p-4 fixed flex justify-around text-center">
          <Link href="/focus" className="pl-30">Focus</Link>
          <Link href="/tasks" className="">Tasks</Link>
          <Link href="/login" className="pr-30">Login</Link>
        </div>
      </div>
    </section>
  );
}