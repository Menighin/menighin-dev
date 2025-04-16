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

// Help button
let helpOpened = false;
const helpButton = document.getElementById('help');
const helpDialog = document.getElementById('help-dialog');
const closeButton = document.getElementById('close-button');
const modalContent = document.getElementById('modal-content');

modalContent!!.innerHTML = chosenExperiment.helpHtml;

const modalOpenListener = () => {
    if (helpOpened) {
        helpDialog?.style.setProperty('display', 'none');
        helpOpened = false;
    } else {
        helpDialog?.style.setProperty('display', 'block');
        helpOpened = true;
    }
};

if (helpButton) {
    helpButton.addEventListener('click', modalOpenListener);
}

if (closeButton) {
    closeButton.addEventListener('click', modalOpenListener);
}
