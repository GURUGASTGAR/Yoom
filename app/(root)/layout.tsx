import StreamVideoProvider from "@/providers/StreamClientProvider";
import { ReactNode } from "react";

export default function layout({ children }:{ children:ReactNode }) {
  return (
    <main>
        <StreamVideoProvider>
          {children}
        </StreamVideoProvider>
    </main>
  )
}
