const locations = () => {
    const father = document.getElementById("father")

    father.innerHTML = `
    <div id="filters">
      <input type="text" id="name-filter" placeholder="filtrado por nombre">
      <select id="type-filter">
        <option value="">Filtrar por tipo</option>
      </select>
    </div>

    <div class="container">
      <div id="location"></div>
      <div class="pagination">
        <button id="prev-btn">Anterior</button>
        <span id="act-page"></span>
        <button id="next-btn">Siguiente</button>
      </div>
    </div>
    `

    async function getLocation(name, type, page) {
        let url = 'https://rickandmortyapi.com/api/location/';
    
        if (name || type || page) {
            url += '?';
            if (name) url += `name=${name}&`;
            if (type) url += `type=${type}&`;
            if (page) url += `page=${page}&`;
        }
    
        const response = await fetch(url);
        const data = await response.json();
    
        return {
            info: data.info,    // Información de paginación
            results: data.results // Lista de personajes
        };
    }

    // Paginación
    let currentPage = 1;
    let totalPages = 1; // Se actualizará con info.pages

    async function displayLocation(name, type, page) {
        const { info, results } = await getLocation(name, type, page);

        totalPages = info.pages; // ✅ Ahora sí existe

        const locationEl = document.getElementById('location');
        locationEl.innerHTML = '';

        results.forEach(location => {
            const card = document.createElement('div');
            card.classList.add('location-card');
            card.innerHTML = `
                <h2>${location.name}</h2>
                <p>Tipo: ${location.type}</p>
                <p>Dimension: ${location.dimension}</p>
                <p>Residentes: ${location.residents}</p>
            `;
            locationEl.appendChild(card);
        });

        // Renderizar número de página actual
        const actPage = document.getElementById('act-page');
        actPage.innerHTML = `<p>Página ${currentPage} de ${totalPages}</p>`;
    }

    displayLocation(null, null, currentPage);
}

export default locations