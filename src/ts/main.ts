import IExperiment from './experiments/IExperiment';
import Experiments from './experiments/index';

const urlParams = new URLSearchParams(window.location.search);
const queryParam = urlParams.get('experiment') ?? null;
let chosenExperiment: IExperiment;

if (queryParam !== null && Experiments.hasOwnProperty(queryParam)) {
    chosenExperiment = Experiments[queryParam] as IExperiment;
} else {
    const experiments = Object.values(Experiments);
    chosenExperiment = experiments[Math.floor(Math.random() * experiments.length)] as IExperiment;
}

console.log(`Running experiment: ${chosenExperiment.title}`);

chosenExperiment.render();
