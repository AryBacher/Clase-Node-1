/*console.log("Hello")
console.log("Nacho")

for (var i = 0; i < 9; i++) {
    console.log(i);
}

// Git en Powershell: 
// git init - Para Iniciar
// git status - Para ver el Estado
// git branch -M main - Cambiamos de master a main
// git remote add origin https://github.com/AryBacher/Clase-Node-1
// git add (filename)
// git commit -m "feat: first commit"
// git push
// git push origin main
// git pull origin main */

const express = require("express");
const app = express();
const port = 9000;

app.use(express.json());

const menu = require('./menu.json');

const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
    { id: 3, name: "John Smith" },
    { id: 4, name: "Jane Smith" },
];

app.get("/", (req, res) => {
    res.send("API running OK ...")
});

app.get("/users", (req, res) => {
    res.json(users)
});

app.get("/users/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const user = users.find((user) => user.id === id);

    if (!user)
        res.status(404).send("User not found");
    else
        res.status(200).json(user);
});

//Ejercicio 1
app.get("/menu", (req, res) => {
    res.json(menu)
});

//Ejercicio 2
app.get("/menu/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const menus = menu.find((menus) => menus.id === id);

    if (!menus)
        res.status(404).send("Dish not found");
    else
        res.status(200).json(menus);
});

//Ejercicio 3
app.get("/principales", (req, res) => {
    const principales2 = menu.filter((menus) => menus.tipo === "principal");

    res.json(principales2);
});

//Ejercicio 4
app.get("/postres", (req, res) => {
    const postres2 = menu.filter((menus) => menus.tipo === "postre");

    res.json(postres2);
});

//Ejercicio 5
app.get("/bebidas", (req, res) => {
    const bebidas2 = menu.filter((menus) => menus.tipo === "bebida");

    res.json(bebidas2);
});

//Ejercicio 6
app.post("/pedido", (req, res) => {
    const pedido = req.body.productos

    //const menus = menu.find((menus) => menus.id === id);

    //const id_menus = menu.filter((menus) => menus.id === id);

    //console.log(id_menus)

    const precio = pedido.reduce((acc, plato) => {

    }, 0);

    //res.json(pedido)
});

app.listen(port, () => {
    console.log(`> Server running on port ${port}`);
});