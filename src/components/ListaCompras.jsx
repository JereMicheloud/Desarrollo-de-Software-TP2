import React, { useState } from 'react';

function ListaCompras({ lista, actualizarItems, editarNombre, editarColor }) {
  const [nuevoItem, setNuevoItem] = useState('');
  const [nuevaCantidad, setNuevaCantidad] = useState(1);

  const [editandoIndex, setEditandoIndex] = useState(null);
  const [nuevoNombreEditado, setNuevoNombreEditado] = useState('');
  const [nuevaCantidadEditada, setNuevaCantidadEditada] = useState(1);

  const [editandoLista, setEditandoLista] = useState(false);
  const [nuevoNombreLista, setNuevoNombreLista] = useState(lista.nombre);
  const [nuevoColorLista, setNuevoColorLista] = useState(lista.color);

  const handleAgregarItem = () => {
    if (!nuevoItem.trim() || nuevaCantidad <= 0) return;
    const nuevosItems = [
      ...lista.items,
      { nombre: nuevoItem.trim(), cantidad: nuevaCantidad }
    ];
    actualizarItems(nuevosItems);
    setNuevoItem('');
    setNuevaCantidad(1);
  };

  const handleEliminar = (index) => {
    const nuevosItems = lista.items.filter((_, i) => i !== index);
    actualizarItems(nuevosItems);
  };

  const comenzarEdicion = (index) => {
    setEditandoIndex(index);
    setNuevoNombreEditado(lista.items[index].nombre);
    setNuevaCantidadEditada(lista.items[index].cantidad);
  };

  const guardarEdicion = (index) => {
    if (!nuevoNombreEditado.trim() || nuevaCantidadEditada <= 0) return;
    const nuevosItems = [...lista.items];
    nuevosItems[index] = {
      nombre: nuevoNombreEditado.trim(),
      cantidad: nuevaCantidadEditada
    };
    actualizarItems(nuevosItems);
    cancelarEdicion();
  };

  const cancelarEdicion = () => {
    setEditandoIndex(null);
    setNuevoNombreEditado('');
    setNuevaCantidadEditada(1);
  };

  const guardarEdicionLista = () => {
    if (!nuevoNombreLista.trim()) return;
    editarNombre(nuevoNombreLista);
    editarColor(nuevoColorLista);
    setEditandoLista(false);
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      {/* Mostrar nombre y botón de editar */}
      {!editandoLista ? (
        <>
          <h2 style={{ color: lista.color }}>{lista.nombre}</h2>
          <button onClick={() => setEditandoLista(true)}>✏️ Editar lista</button>
        </>
      ) : (
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            value={nuevoNombreLista}
            onChange={(e) => setNuevoNombreLista(e.target.value)}
          />
          <input
            type="color"
            value={nuevoColorLista}
            onChange={(e) => setNuevoColorLista(e.target.value)}
            style={{ marginLeft: '0.5rem' }}
          />
          <button onClick={guardarEdicionLista}>💾 Guardar</button>
          <button onClick={() => setEditandoLista(false)}>❌ Cancelar</button>
        </div>
      )}

      {/* Agregar item */}
      <input
        type="text"
        placeholder="Producto"
        value={nuevoItem}
        onChange={(e) => setNuevoItem(e.target.value)}
      />
      <input
        type="number"
        min="1"
        value={nuevaCantidad}
        onChange={(e) => setNuevaCantidad(parseInt(e.target.value))}
        style={{ width: '60px', marginLeft: '0.5rem' }}
      />
      <button onClick={handleAgregarItem}>Agregar</button>

      {/* Lista de items */}
      <ul style={{ marginTop: '1rem' }}>
        {lista.items.map((item, index) => (
          <li key={index}>
            {editandoIndex === index ? (
              <>
                <input
                  type="text"
                  value={nuevoNombreEditado}
                  onChange={(e) => setNuevoNombreEditado(e.target.value)}
                />
                <input
                  type="number"
                  min="1"
                  value={nuevaCantidadEditada}
                  onChange={(e) =>
                    setNuevaCantidadEditada(parseInt(e.target.value))
                  }
                  style={{ width: '60px', marginLeft: '0.5rem' }}
                />
                <button onClick={() => guardarEdicion(index)}>💾</button>
                <button onClick={cancelarEdicion}>❌</button>
              </>
            ) : (
              <>
                {item.nombre} (x{item.cantidad})
                <button onClick={() => comenzarEdicion(index)}>✏️</button>
                <button onClick={() => handleEliminar(index)}>🗑️</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaCompras;
