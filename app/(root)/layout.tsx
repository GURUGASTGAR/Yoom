import { ReactNode } from "react";

export default function layout({ children }:{ children:ReactNode }) {
  return (
    <main>
        Navbar
        {children}
        Footer
    </main>
  )
}
