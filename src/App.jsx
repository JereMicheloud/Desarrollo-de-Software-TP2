import React, { useState } from 'react';
import ListaCompras from './components/ListaCompras.jsx';
import './App.css';

function App() {
  const [listas, setListas] = useState([]);
  const [listaSeleccionada, setListaSeleccionada] = useState(null);
  const [nuevoNombreLista, setNuevoNombreLista] = useState('');
  const [colorLista, setColorLista] = useState('#D4C098');

  const crearLista = () => {
    if (!nuevoNombreLista.trim()) return;
    const nuevaLista = {
      nombre: nuevoNombreLista.trim(),
      items: [],
      color: colorLista
    };
    const nuevasListas = [...listas, nuevaLista];
    setListas(nuevasListas);
    setListaSeleccionada(nuevasListas.length - 1);
    setNuevoNombreLista('');
    setColorLista('#D4C098');
  };

  const actualizarItems = (indexLista, nuevosItems) => {
    const nuevasListas = [...listas];
    nuevasListas[indexLista].items = nuevosItems;
    setListas(nuevasListas);
  };

  const eliminarLista = (index) => {
    const nuevasListas = listas.filter((_, i) => i !== index);
    setListas(nuevasListas);
    if (listaSeleccionada === index) {
      setListaSeleccionada(null);
    } else if (listaSeleccionada > index) {
      setListaSeleccionada(listaSeleccionada - 1);
    }
  };

  const editarNombreLista = (index, nuevoNombre) => {
    const nuevasListas = [...listas];
    nuevasListas[index].nombre = nuevoNombre;
    setListas(nuevasListas);
  };

  const editarColorLista = (index, nuevoColor) => {
    const nuevasListas = [...listas];
    nuevasListas[index].color = nuevoColor;
    setListas(nuevasListas);
  };

  return (
    <div className="app-container">
      <h1>🛒 Listas de Compras</h1>

      <div className="input-group">
        <input
          type="text"
          placeholder="Nombre de la lista"
          value={nuevoNombreLista}
          onChange={(e) => setNuevoNombreLista(e.target.value)}
          style={{ color: '#000000' }}
        />
        <input
          type="color"
          value={colorLista}
          onChange={(e) => setColorLista(e.target.value)}
        />
        <button className="btn-primary" onClick={crearLista}>
          Crear lista
        </button>
      </div>

      <div className="lista-tabs">
        {listas.map((lista, index) => (
          <button
            key={index}
            className={`lista-tab ${listaSeleccionada === index ? 'active' : ''}`}
            style={{ 
              backgroundColor: lista.color,
              color: '#000000'
            }}
            onClick={() => setListaSeleccionada(index)}
          >
            {lista.nombre}
            <button
              className="btn-icon"
              onClick={(e) => {
                e.stopPropagation();
                eliminarLista(index);
              }}
              style={{ color: '#000000' }}
            >
              ❌
            </button>
          </button>
        ))}
      </div>

      {listaSeleccionada !== null && (
        <ListaCompras
          lista={listas[listaSeleccionada]}
          actualizarItems={(items) => actualizarItems(listaSeleccionada, items)}
          editarNombre={(nuevoNombre) => editarNombreLista(listaSeleccionada, nuevoNombre)}
          editarColor={(nuevoColor) => editarColorLista(listaSeleccionada, nuevoColor)}
        />
      )}
    </div>
  );
}

export default App;