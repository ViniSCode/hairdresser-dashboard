import Link from "next/link";

interface LogoProps {
  title: string;
}

export function Logo ({title}: LogoProps) {
  return (
    <Link href="/">
      <div className="mt-5 md:mt-0 ml-20 lg:ml-0 lg:mt-5 cursor-pointer">
        <span className="text-[24px] font-logo">
          {title}
          <span className="text-blue-500">
            .
          </span>
        </span>
      </div>
    </Link>
  )
}