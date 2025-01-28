import express from "express";

const app = express();

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
    res.send({ sum });
});

app.listen(8080, () => console.log("listening"));
