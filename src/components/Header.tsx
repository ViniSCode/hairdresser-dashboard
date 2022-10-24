interface HeaderProps {
  title: string;
}

export function Header ({title}: HeaderProps) {
  return (
    <header className="pt-5 mb-2 px-4 bg-gray-700">
      <h1 className="text-white font-logo text-[26px]">{title}</h1>
      <div className="w-full h-[2px] bg-gray-600 mt-2"></div>
    </header>
  )
}