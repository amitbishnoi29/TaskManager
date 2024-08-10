"use client";
import { navItems } from "@/data/navItems";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathName = usePathname();
  const getActive = href => pathName === href ? 'text-blue-500' : 'text-gray-500'
  return (
    <nav className="fixed bottom-0 left-0 right-0 backdrop-blur-xl shadow-xl p-4 flex justify-around">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={`flex flex-col items-center ${getActive(item.href)}`}
        >
          <item.icon className="h-6 w-6" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
