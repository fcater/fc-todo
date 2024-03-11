"use client";

import React from "react";
import cn from "classnames";
import Link from "next/link";
import { AiFillFlag } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { Container, Flex } from "@radix-ui/themes";
import AuthStatus from "./components/AuthStatus";

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="8">
            <Link href="/">
              <Flex align="center" gap="2" className="hover:text-green-500">
                <label className="text-xs hover:cursor-pointer">fc-todo</label>
                <AiFillFlag />
              </Flex>
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: "主页", href: "/" },
    { label: "待办事项", href: "/todos/list?hasDone=false" },
    { label: "已完成", href: "/todos/list?hasDone=true" },
  ];

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={cn("nav-link hover:text-green-500", { "text-green-700": link.href === currentPath })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavBar;
