import Link from "next/link";
export default function Footer() {
  return (
    <section>
      <div className="flex">
        <div className="absolute bottom-0 left-0 right-0 bg-black/10 p-4 mt-4 flex justify-center">
          <Link href="/focus">FocusFlow</Link>
        </div>
      </div>
    </section>
  );
}
