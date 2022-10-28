interface LogoProps {
  title: string;
}

export function Logo ({title}: LogoProps) {
  return (
    <div className="mt-5">
      <span className="text-[24px] font-logo">
        {title}
        <span className="text-blue-500">
          .
        </span>
      </span>
    </div>
  )
}