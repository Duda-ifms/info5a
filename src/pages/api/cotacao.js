export default async function handler(req, res) {
  const { start, end } = req.query;

  const url = `https://economia.awesomeapi.com.br/json/daily/USD-BRL/?start_date=${start.replaceAll('-', '')}&end_date=${end.replaceAll('-', '')}`;

  try {
    const resposta = await fetch(url);
    const dados = await resposta.json();

    const resultado = {};
    dados.forEach((item) => {
      const dataFormatada = new Date(item.timestamp * 1000).toLocaleDateString('pt-BR');
      resultado[dataFormatada] = parseFloat(item.bid);
    });

    res.status(200).json(resultado);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar cotação' });
  }
}
