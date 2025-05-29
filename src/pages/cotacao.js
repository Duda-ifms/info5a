import useSWR from 'swr';
import { fetcher } from '../lib/fetcher';

export default function Home() {
  const { data, error, isLoading } = useSWR(
    'https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL?token=927c456f9a4bec44887e5cc0e2d154c8f843f33855ec2ec0d15db596ee7d19cd',
    fetcher,
    { refreshInterval: 5000 } // Atualiza a cada 60s //1000 == 1 segundo refresh page
  );

  if (error) return <div>Erro ao carregar dados.</div>;
  if (isLoading || !data) return <div>Carregando...</div>;

  const usdbrl = data.USDBRL;

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Cotação Dólar Hoje (USD/BRL)</h1>
      <p><strong>Compra:</strong> R$ {usdbrl.bid}</p>
      <p><strong>Venda:</strong> R$ {usdbrl.ask}</p>
      <p><strong>Alta:</strong> R$ {usdbrl.high}</p>
      <p><strong>Baixa:</strong> R$ {usdbrl.low}</p>
      <p><strong>Variação:</strong> {usdbrl.varBid} ({usdbrl.pctChange}%)</p>
      <small>Atualizado: {new Date(Number(usdbrl.timestamp) * 1000).toLocaleString()}</small>
    </main>
  );
}

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function cotacao() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleBuscar = () => {
    if (startDate && endDate) {
      const inicio = startDate.toISOString().split('T')[0];
      const fim = endDate.toISOString().split('T')[0];
      alert(`Buscar cotação de ${inicio} até ${fim}`);
      // Aqui você pode fazer a requisição para a API
    } else {
      alert("Selecione as duas datas.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-lg font-semibold mb-4">Buscar Cotação USD/BRL</h2>

      <label className="block mb-2">Data Início:</label>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="dd/MM/yyyy"
        className="border p-2 w-full rounded"
        placeholderText="dd/mm/aaaa"
      />

      <label className="block mt-4 mb-2">Data Fim:</label>
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        dateFormat="dd/MM/yyyy"
        className="border p-2 w-full rounded"
        placeholderText="dd/mm/aaaa"
      />

      <button
        onClick={handleBuscar}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full"
      >
        Buscar
      </button>
    </div>
  );
}
