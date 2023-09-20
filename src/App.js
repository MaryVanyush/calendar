import {Calendar} from './components/Calendar'
import './App.css';
import moment from 'moment';

function App() {
  const now = moment();
    return (
      <Calendar date={now} />
    );
}

export default App;
