const characters = () => {
    const father = document.getElementById("father");

    father.innerHTML = `
    <div id="filters">
      <input type="text" id="name-filter" placeholder="filtrado por nombre">
      <select id="status-filter">
        <option value="">Filtrar por estado</option>
        <option value="alive">Vivo</option>
        <option value="dead">Muerto</option>
        <option value="unknown">Desconocido</option>
      </select>
      <select id="species-filter">
        <option value="">Filtrar por especie</option>
      </select>
    </div>

    <div class="container">
      <div id="characters"></div>
      <div class="pagination">
        <button id="prev-btn">Anterior</button>
        <span id="act-page"></span>
        <button id="next-btn">Siguiente</button>
      </div>
    </div>
    `;

    async function getSpecies() {
        const speciesSet = new Set();
        let page = 1;
        let morePages = true;

        const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
        const data = await res.json()
    
        while (morePages) {
            const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
            const data = await response.json();

            data.results.forEach(character => speciesSet.add(character.species));
    
            if (data.info.next) {
                page++;
            } else {
                morePages = false;
            }
        }
    
        return Array.from(speciesSet); // Convertimos el Set a Array
    }


    async function displaySpeciesFilter() {
        const speciesFilterEl = document.getElementById('species-filter');
        const speciesList = await getSpecies(); // Llamamos a la función que obtiene las especies

        for (const element of speciesList) {
            const options = document.createElement('option');
            options.value = element;
            options.innerText = element;

            speciesFilterEl.appendChild(options);
        }
    };

    displaySpeciesFilter()

    async function getCharacters(name, status, species, page) {
        let url = 'https://rickandmortyapi.com/api/character/';
    
        if (name || status || page) {
            url += '?';
            if (name) url += `name=${name}&`;
            if (status) url += `status=${status}&`;
            if (species) url += `species=${species}&`;
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

    async function displayCharacters(name, status, species, page) {
        const { info, results } = await getCharacters(name, status, species, page);

        totalPages = info.pages; // ✅ Ahora sí existe

        const charactersEl = document.getElementById('characters');
        charactersEl.innerHTML = '';

        results.forEach(character => {
            const card = document.createElement('div');
            card.classList.add('character-card');
            card.innerHTML = `
                <img src="${character.image}" />
                <h2>${character.name}</h2>
                <p>Status: ${character.status}</p>
                <p>Especie: ${character.species}</p>
            `;
            charactersEl.appendChild(card);
        });

        // Renderizar número de página actual
        const actPage = document.getElementById('act-page');
        actPage.innerHTML = `<p>Página ${currentPage} de ${totalPages}</p>`;
    }

    displayCharacters(null, null, currentPage);

    const nameFilterEl = document.getElementById('name-filter');
    const statusFilterEl = document.getElementById('status-filter');
    const speciesFilterEl = document.getElementById('species-filter');
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');

    nameFilterEl.addEventListener('input', () => {
        currentPage = 1; // Resetear página cuando se filtra
        displayCharacters(nameFilterEl.value, statusFilterEl.value,speciesFilterEl.value, currentPage);
    });

    statusFilterEl.addEventListener('change', () => {
        currentPage = 1;
        displayCharacters(nameFilterEl.value, statusFilterEl.value,speciesFilterEl.value, currentPage);
    });

    speciesFilterEl.addEventListener('change', () => {
        currentPage = 1;
        displayCharacters(nameFilterEl.value, statusFilterEl.value, speciesFilterEl.value, currentPage);
    });

    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayCharacters(nameFilterEl.value, statusFilterEl.value,speciesFilterEl.value, currentPage);
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayCharacters(nameFilterEl.value, statusFilterEl.value,speciesFilterEl.value, currentPage);
        }
    });
};

export default characters;
