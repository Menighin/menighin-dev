import IExperiment from './experiments/IExperiment';
import * as Experiments from './experiments/index';

const experiments = Object.values(Experiments);
const randomExperiment = experiments[Math.floor(Math.random() * experiments.length)] as IExperiment;

console.log(`Running experiment: ${randomExperiment.title}`);

randomExperiment.render();
