"use client";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathName = usePathname();

  return (
    <section className="w-full max-w-full lg:max-w-[264px]  ">
      <nav className="flex gap-6 flex-row justify-center h-full pt-6 lg:pt-16 lg:justify-normal text-black nav-adjustment  lg:flex-col  ">
        {sidebarLinks.map((item) => {
          const isActive =
            pathName === item.route || pathName.startsWith(`${item.route}`);
          return (
            <div key={item.route}>
              <Link
                href={item.route}
                key={item.label}
                className={`flex items-center justify-center gap-3 rounded-md ${
                  isActive ? "border-b-2 border-blue-500" : ""
                }`}
              >
                <p
                  className={
                    isActive
                      ? " text-blue-500 font-semibold"
                      : "text-zinc-950 font-normal"
                  }
                >
                  {item.label}
                </p>
              </Link>
            </div>
          );
        })}
      </nav>
    </section>
  );
};

export default NavBar;
