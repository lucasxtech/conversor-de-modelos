import React from 'react';
import WhatsAppPricingCalculator from './WhatsAppPricingCalculator.jsx';
import { ThemeProvider } from './ThemeContext.jsx';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <WhatsAppPricingCalculator />
    </ThemeProvider>
  );
}

export default App;