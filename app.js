import express from "express";
import cluster from "cluster";
import { cpus } from 'os';


const nroCpus = cpus().length;

const isPrimary = cluster.isPrimary;
const isWorker = cluster.isWorker;


if (isPrimary) {
    console.log(`Proceso primaro: ${isPrimary} en el proceso ${process.pid}, entonces hago un fork`);
    for (let i = 0; i < nroCpus; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker) => {
        console.log(`worker with pid ${worker.process.pid} has exited. Creating new worker`);
        cluster.fork();
    })
    // cluster.on('message', (worker) => console.log(`Mensaje recibido del worker ${worker.process.pid}`));
}
else {
    console.log(`Soy un worker: ${isWorker} en el proceso ${process.pid}`);
    console.log(`Soy el proceso ${process.pid}`)
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
        for (let i = 0; i < 5e8; i++) {
            sum += 1;
        }
        res.send({ process: process.pid, sum });
    });
    const PORT = 8080

    app.listen(PORT, () => console.log(` process ${process.pid} listening on port ${PORT}`));

}

