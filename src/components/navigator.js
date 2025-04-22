import locations from './locations'
import episodios from './episodios'
import characters from './characters'

const options = [{
    name: "Personajes",
    function: () => characters()
},
{
    name: "Ubicaciones",
    function: () => locations()
},
{
    name: "Episodios",
    function: () => episodios()
}
]

const navigator = (father) => {

    options.forEach((options, index) => {
        const button = document.createElement("button")
        button.textContent = options.name
        button.classList.add("nav-button")
        
        if (index === 0) button.classList.add("active")
        
        button.addEventListener("click", () => {
            options.function()
            document.querySelectorAll(".nav-button").forEach(b => b.classList.remove("active"));
            button.classList.add("active");
        });

        father.appendChild(button);
    });
};

export default navigator