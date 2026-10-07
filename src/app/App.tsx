import { BrowserRouter } from 'react-router';
import { AppRouter } from './router';
import './styles.css';

export default function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}
