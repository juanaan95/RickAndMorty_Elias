import navigator from './navigator'

const header = (father) => {
    father.innerHTML = `
        <div class="info">
            <img id="logo" src="logo.png" alt="logo rick and morty"/>
            <h1>WIKI</h1>
        </div>
        <div class="fondo"></div>
    `;    
    const nav = document.createElement("nav")
    nav.id = "nav"
    navigator(nav)
    father.appendChild(nav)
}

export default header;