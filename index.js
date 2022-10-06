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
const mysql = require("mysql2")
const port = 9000;

app.use(express.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "menu"
});

connection.connect((err) => {
    if (err) return console.log("Error Connectiong to DB");
    console.log("> Connected to database");
})

//Ejercicio 1
app.get("/menu", (req, res) => {
    connection.query("SELECT * FROM PLATO", (err,rows) =>{
        if (err) return res.status(500).send("Error al pedir el menú")
        res.json(rows)
    })
});

//Ejercicio 2
app.get("/menu/:id", (req, res) => {
    const id = parseInt(req.params.id);
    connection.query("SELECT * FROM plato WHERE id = ?", [id], (err,rows) => {
        if (err) return res.status(500).send("El ID ingresado no existe")
        else if (!rows.length) return res.status(500).send("El ID no ha sido ingresado")
        res.json(rows)
    })
});

//Ejercicio 3
app.get("/principales", (req, res) => {
    connection.query("SELECT * FROM plato WHERE tipo = ?", ["principal"], (err,rows) => {
        if (!rows.length) return res.status(500).send("No hay platos principales")
        res.json(rows)
    })
});

//Ejercicio 4
app.get("/postres", (req, res) => {
    connection.query("SELECT * FROM plato WHERE tipo = ?", ["postre"], (err,rows) => {
        if (!rows.length) return res.status(500).send("No hay platos de postre")
        res.json(rows)
    })
});

//Ejercicio 5
app.get("/bebidas", (req, res) => {
    connection.query("SELECT * FROM plato WHERE tipo = ?", ["bebida"], (err,rows) => {
        if (!rows.length) return res.status(500).send("No hay bebidas disponsibles")
        res.json(rows)
    })
});

//Ejercicio 6
app.post("/pedido", (req, res) => {
    const pedido = req.body.productos
    console.log(pedido.id)
    connection.query("SELECT precio FROM plato WHERE id = ?", [pedido.id], (err,rows) => {

    })
    connection.query("SELECT precio FROM plato WHERE id in (?, ?)", [pedido.id], (err,rows) => {
        
    })

    const precio = pedido.reduce((precio_total, plato) => {
        const plato_id = menu.find((menus) => menus.id === plato.id)
        return precio_total + plato_id.precio * plato.cantidad
    }, 0);

    res.json({"msg": "Pedido recibido", "precio": precio});
});

app.get("users/:id"), (req, res) => {
    connection.query("SELECT * FROM users"), (err, rows, fields) => {
        if (err) 
            console.log(err);
        
        res.json(rows)
    }
}

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

// //Ejercicio 1
// app.get("/menu", (req, res) => {
//     res.json(menu)
// });

// //Ejercicio 2
// app.get("/menu/:id", (req, res) => {
//     const id = parseInt(req.params.id);
//     const menus = menu.find((menus) => menus.id === id);

//     if (!menus)
//         res.status(404).send("Dish not found");
//     else
//         res.status(200).json(menus);
// });

// //Ejercicio 3
// app.get("/principales", (req, res) => {
//     const principales2 = menu.filter((menus) => menus.tipo === "principal");

//     res.json(principales2);
// });

// //Ejercicio 4
// app.get("/postres", (req, res) => {
//     const postres2 = menu.filter((menus) => menus.tipo === "postre");

//     res.json(postres2);
// });

// //Ejercicio 5
// app.get("/bebidas", (req, res) => {
//     const bebidas2 = menu.filter((menus) => menus.tipo === "bebida");

//     res.json(bebidas2);
// });

// //Ejercicio 6
// app.post("/pedido", (req, res) => {
//     const pedido = req.body.productos

//     const precio = pedido.reduce((precio_total, plato) => {
//         const plato_id = menu.find((menus) => menus.id === plato.id)
//         return precio_total + plato_id.precio * plato.cantidad
//     }, 0);

//     res.json({"msg": "Pedido recibido", "precio": precio});
// });

app.listen(port, () => {
    console.log(`> Server running on port ${port}`);
});