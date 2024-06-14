import { ReactNode } from "react";

export default function layout({ children }:{ children:ReactNode }) {
  return (
    <main className="relative">
        Navbar
        {children}
        Footer
    </main>
  )
}
