import Link from "next/link";
export default function Footer() {
  return (
    <section>
      <div className="flex">
        <div className="absolute bottom-0 left-0 right-0 p-4 mt-4 flex justify-center border-t border-[#3E3E3E]">
          <Link href="/focus">FocusFlow</Link>
        </div>
      </div>
    </section>
  );
}
