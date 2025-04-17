import IExperiment from './IExperiment';
import QuadTreeExperiment from './quadtree/QuadTreeExperiment';

const experiments: Record<string, IExperiment> = {
    qt: new QuadTreeExperiment(),
};

export default experiments;
