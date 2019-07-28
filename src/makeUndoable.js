
const uuidv1 = require('uuid/v1');
const uuidv5 = require('uuid/v5');

const mapValues = (object, map) => Object.entries(object).reduce(
    (reduced, [ key, value ]) => Object.assign(reduced, {
        [key]: map(value)
    }), {}
);

const NAMESPACE = uuidv1();

const [ undo, redo ] = [ 'undo', 'redo' ].map(
    type => `${ type }-${ uuidv5(type, NAMESPACE) }`
);
const TYPES = { undo, redo };
const ACTIONS = mapValues(
    TYPES,
    type => () => ({ type })
);

function makeUndoable(reducer, { types = TYPES, length = 10 } = {}) {
    const history = {
        past: [],
        future: []
    };

    const updateHistory = (timeline, state) => {
        timeline.push(state);
        if (timeline.length > length) {
            timeline.shift();
        }
    };

    return (state, action) => {
        const { past, future } = history;

        switch (action.type) {
        case types.undo:
            if (!past.length) {
                return state;
            }

            updateHistory(future, state);

            return past.pop();
        case types.redo:
            if (!future.length) {
                return state;
            }

            updateHistory(past, state);

            return future.pop();
        default:
            // eslint-disable-next-line no-case-declarations
            const newState = reducer(state, action);

            if (newState === state) {
                return state;
            }

            future.length = 0;
            updateHistory(past, state);

            return newState;
        }
    };
}

module.exports = Object.assign(
    makeUndoable,
    { TYPES, ACTIONS }
);
