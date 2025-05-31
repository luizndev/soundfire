import React, { useEffect } from 'react';

const Transfer = () => {
  useEffect(() => {
    // Pega pathname e query string
    const path = window.location.pathname;  // ex: "/auth/google/callback"
    const query = window.location.search;   // ex: "?code=4%2F0AUJ..."
    const fullUrl = path + query;

    console.log('URL completa:', fullUrl);

    fetch('http://localhost:5000/auth/google/callback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: query }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao enviar dados');
        return res.json();
      })
      .then(data => {
        console.log('Resposta da API:', data);
      })
      .catch(err => {
        console.error('Erro:', err);
      });
  }, []);

  return (
    <div>
      <h2>Transfer</h2>
      <p>Enviando a URL completa para a API. Veja o console.</p>
    </div>
  );
};

export default Transfer;
