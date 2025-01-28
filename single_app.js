import express from "express";

const app = express();

app.get("/", (req, res) => {
    // cluster.emit('message');
    res.send({ message: `Proceso atendido en el pid: ${process.pid}` })
})

app.get("/operacion_sencilla", (req, res) => {
    let sum = 0;
    for (let i = 0; i < 10_000_000; i++) {
        sum += 1;
    }
    res.send({ sum });
});

app.get("/operacion_compleja", (req, res) => {
    let sum = 0;
    for (let i = 0; i < 5e9; i++) {
        sum += 1;
    }
    res.send({ process: process.pid, sum });
});
const PORT = 8080

app.listen(PORT, () => console.log(` process ${process.pid} listening on port ${PORT}`));