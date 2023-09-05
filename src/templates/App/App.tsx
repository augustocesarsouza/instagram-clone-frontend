import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import * as Styled from './styled';
import AppContent from '../AppContent/AppContent';

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
