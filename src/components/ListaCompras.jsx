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
    <div className="lista-compras">
      <div className="lista-header">
        {!editandoLista ? (
          <div className="lista-titulo">
            <h2>{lista.nombre}</h2>
            <button 
              className="btn-icon btn-edit"
              onClick={() => setEditandoLista(true)}
            >
              ✏️
            </button>
          </div>
        ) : (
          <div className="input-group">
            <input
              type="text"
              value={nuevoNombreLista}
              onChange={(e) => setNuevoNombreLista(e.target.value)}
              placeholder="Nuevo nombre"
            />
            <input
              type="color"
              value={nuevoColorLista}
              onChange={(e) => setNuevoColorLista(e.target.value)}
            />
            <button 
              className="btn-icon btn-success"
              onClick={guardarEdicionLista}
            >
              💾
            </button>
            <button 
              className="btn-icon btn-delete"
              onClick={() => setEditandoLista(false)}
            >
              ❌
            </button>
          </div>
        )}
      </div>

      <div className="input-group">
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
        />
        <button 
          className="btn-primary"
          onClick={handleAgregarItem}
        >
          Agregar
        </button>
      </div>

      <ul className="items-lista">
        {lista.items.map((item, index) => (
          <li key={index}>
            {editandoIndex === index ? (
              <div className="editar-item">
                <input
                  type="text"
                  value={nuevoNombreEditado}
                  onChange={(e) => setNuevoNombreEditado(e.target.value)}
                />
                <input
                  type="number"
                  min="1"
                  value={nuevaCantidadEditada}
                  onChange={(e) => setNuevaCantidadEditada(parseInt(e.target.value))}
                />
                <button 
                  className="btn-icon btn-success"
                  onClick={() => guardarEdicion(index)}
                >
                  💾
                </button>
                <button 
                  className="btn-icon btn-delete"
                  onClick={cancelarEdicion}
                >
                  ❌
                </button>
              </div>
            ) : (
              <>
                <span>{item.nombre} (x{item.cantidad})</span>
                <div className="item-actions">
                  <button 
                    className="btn-icon btn-edit"
                    onClick={() => comenzarEdicion(index)}
                  >
                    ✏️
                  </button>
                  <button 
                    className="btn-icon btn-delete"
                    onClick={() => handleEliminar(index)}
                  >
                    🗑️
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaCompras;