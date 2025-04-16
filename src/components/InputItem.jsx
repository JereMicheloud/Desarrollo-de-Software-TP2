import React, { useState } from 'react';

function InputItem({ onAgregar }) {
  const [texto, setTexto] = useState('');

  const handleAgregar = () => {
    if (texto.trim() === '') return;
    onAgregar(texto);
    setTexto('');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Ingresá un item"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />
      <button onClick={handleAgregar}>Agregar</button>
    </div>
  );
}

export default InputItem;
