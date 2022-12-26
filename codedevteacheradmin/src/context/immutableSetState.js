/* istanbul ignore file */
import produce from 'immer';
import { setStateApp } from './AppContext';

const immutableSetState = (updatedStateCBFn) => {

    setStateApp(produce(updatedStateCBFn));
};

export default immutableSetState;
