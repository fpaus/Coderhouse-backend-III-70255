import cluster from "cluster";
import {cpus} from 'os';

const nroCpus =cpus().length;

const isPrimary = cluster.isPrimary;

const isWorker = cluster.isWorker;

if (isPrimary)
{
    console.log(`Proceso primaro: ${isPrimary} en el proceso ${process.pid}, entonces hago un fork`);
    for(let i = 0; i < nroCpus; i++){
        cluster.fork();
    }
} else {
    console.log(`Soy un worker: ${isWorker} en el proceso ${process.pid}`);
    console.log(`Soy el proceso ${process.pid}`)
}

