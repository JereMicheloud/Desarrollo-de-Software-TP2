import React, { useState } from 'react';
import ListaCompras from './components/ListaCompras.jsx';

function App() {
  const [listas, setListas] = useState([]);
  const [listaSeleccionada, setListaSeleccionada] = useState(null);
  const [nuevoNombreLista, setNuevoNombreLista] = useState('');
  const [colorLista, setColorLista] = useState('#cccccc');

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
    setColorLista('#cccccc');
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
    <div style={{ padding: '2rem' }}>
      <h1>🛒 Listas de Compras</h1>

      {/* Crear nueva lista */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Nombre de la lista"
          value={nuevoNombreLista}
          onChange={(e) => setNuevoNombreLista(e.target.value)}
        />
        <input
          type="color"
          value={colorLista}
          onChange={(e) => setColorLista(e.target.value)}
          style={{ marginLeft: '0.5rem' }}
        />
        <button onClick={crearLista}>Crear lista</button>
      </div>

      {/* Tabs de listas */}
      <div style={{ marginBottom: '1rem' }}>
        {listas.map((lista, index) => (
          <button
            key={index}
            onClick={() => setListaSeleccionada(index)}
            style={{
              backgroundColor: lista.color,
              marginRight: '0.5rem',
              fontWeight: listaSeleccionada === index ? 'bold' : 'normal'
            }}
          >
            {lista.nombre}
            <button
              onClick={(e) => {
                e.stopPropagation();
                eliminarLista(index);
              }}
              style={{ marginLeft: '0.5rem' }}
            >
              ❌
            </button>
          </button>
        ))}
      </div>

      {/* Mostrar lista seleccionada */}
      {listaSeleccionada !== null && (
        <ListaCompras
          lista={listas[listaSeleccionada]}
          actualizarItems={(items) =>
            actualizarItems(listaSeleccionada, items)
          }
          editarNombre={(nuevoNombre) =>
            editarNombreLista(listaSeleccionada, nuevoNombre)
          }
          editarColor={(nuevoColor) =>
            editarColorLista(listaSeleccionada, nuevoColor)
          }
        />
      )}
    </div>
  );
}

export default App;
