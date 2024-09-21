'use client';

import React, { useState, useEffect } from 'react';
import { ThemeContext } from '@container/ThemeContext';
import { Catppuccin } from '@types';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Catppuccin["flavor"]>('mocha');

  useEffect(() => {
    document.body.classList.remove('latte', 'frappe', 'macchiato', 'mocha');
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// path: src/provider/ThemeProvider.tsx