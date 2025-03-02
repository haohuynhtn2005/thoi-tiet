import './App.css';
import { Chart } from 'chart.js/auto';
import { CategoryScale } from 'chart.js/auto';
import Wrapper from './components/Wrapper.jsx';
import { Outlet } from 'react-router-dom';

Chart.register(CategoryScale);

function App() {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
}

export default App;
