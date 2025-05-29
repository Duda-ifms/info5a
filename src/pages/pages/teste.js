import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Teste() {
  const [data, setData] = useState(null);

  return (
    <div style={{ padding: 20 }}>
      <h2>Selecionar uma data:</h2>
      <DatePicker
        selected={data}
        onChange={(date) => setData(date)}
        dateFormat="dd/MM/yyyy"
        placeholderText="dd/mm/aaaa"
      />
    </div>
  );
}
