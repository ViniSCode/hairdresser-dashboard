import { signOut } from "next-auth/react";
import Link from "next/link";
import {
  FiCalendar,
  FiLogOut, FiUser
} from "react-icons/fi";
export function NavItems() {
  const navItems = [{ path: "/appointments", icon: <FiCalendar size={22} /> }];

  async function handleLogout() {
    await signOut();
  }

  return (
    <div className="items-start justify-start mt-[3rem] flex flex-col gap-14">
      <Link href="/dashboard">
        <div className="flex items-center gap-4 transition-colors hover:text-yellow-500 cursor-pointer">
          <FiCalendar size={22} />
          <span className="text-md font-medium inline-block">Appointments</span>
        </div>
      </Link>
      <Link href="/profile">
        <div className="flex items-center gap-4 transition-colors hover:text-yellow-500 cursor-pointer">
          <FiUser size={22} />
          <span className="text-md font-medium inline-block">Profile</span>
        </div>
      </Link>
      <a
        onClick={handleLogout}
        className="flex items-center gap-4 transition-colors hover:text-yellow-500 cursor-pointer"
      >
        <FiLogOut size={22} />
        <span className="text-md font-medium inline-block transition-colors hover:text-yellow-500">
          Logout
        </span>
      </a>
    </div>
  );
}
