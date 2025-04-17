function ListaTabs({ listas, listaActiva, setListaActiva, setListas }) {
  const eliminarLista = (index) => {
    const nuevasListas = listas.filter((_, i) => i !== index);
    setListas(nuevasListas);
    if (listaActiva === index) {
      setListaActiva(null);
    } else if (listaActiva > index) {
      setListaActiva(listaActiva - 1);
    }
  };

  return (
    <div className="lista-tabs">
      {listas.map((lista, index) => (
        <button
          key={index}
          className={index === listaActiva ? 'active' : ''}
          onClick={() => setListaActiva(index)}
        >
          {lista.nombre}
          <button onClick={(e) => { e.stopPropagation(); eliminarLista(index); }}> ❌</button>
        </button>
      ))}
    </div>
  );
}

export default ListaTabs;