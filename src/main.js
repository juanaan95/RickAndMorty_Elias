import './style.css'
import characters from "./components/characters"
import header from './components/header'

const app = document.getElementById("app")

const hed = document.createElement("header")
hed.id = "header"

const container = document.createElement("div")
container.id = "father"

header(hed)

app.appendChild(hed)
app.appendChild(container)

characters()