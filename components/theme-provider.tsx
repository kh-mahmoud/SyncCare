"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

function ThemeModeProvider({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
        >
            {children}
        </ThemeProvider>
    );
    
}

export default ThemeModeProvider;
