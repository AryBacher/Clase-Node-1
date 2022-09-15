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

app.listen(port, () => {
    console.log(`> Server running on port ${port}`);
});