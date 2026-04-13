
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import HomePage from './pages/HomePage.jsx';
import ChatWrapper from './components/ChatWrapper.jsx';
import { LanguageProvider } from './contexts/LanguageContext.jsx';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <ChatWrapper />
      </Router>
    </LanguageProvider>
  );
}

export default App;
