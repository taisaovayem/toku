import { Footer } from "@/components";
import * as React from "react";
import { Theme, Container, Box } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";

export function CommontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider attribute="class">
      <Theme>
        <Container>
          <main>{children}</main>
          <Footer />
        </Container>
      </Theme>
    </ThemeProvider>
  );
}
