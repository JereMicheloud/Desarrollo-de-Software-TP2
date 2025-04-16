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
    <div style={{ marginBottom: '1rem' }}>
      {listas.map((lista, index) => (
        <button
          key={index}
          style={{
            marginRight: '0.5rem',
            backgroundColor: index === listaActiva ? '#ddd' : '#f0f0f0'
          }}
          onClick={() => setListaActiva(index)}
        >
          {lista.nombre}
          <span onClick={(e) => { e.stopPropagation(); eliminarLista(index); }}> ❌</span>
        </button>
      ))}
    </div>
  );
}
