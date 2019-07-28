const makeUndoable = require('../src/makeUndoable');

const { ACTIONS } = makeUndoable;

const INCREMENT = 'INCREMENT';
const increment = { type: INCREMENT };
const undo = ACTIONS.undo();
const redo = ACTIONS.redo();
const CUSTOM_UNDO = 'CUSTOM_UNDO';
const CUSTOM_REDO = 'CUSTOM_REDO';
const customUndo = { type: CUSTOM_UNDO };
const customRedo = { type: CUSTOM_REDO };

const reducer = (state = 0, { type }) => {
    switch (type) {
    case INCREMENT:
        return state + 1;
    default:
        return state;
    }
};

describe('makeUndoable', () => {
    it('should return undoable reducer', () => {
        const undoable = makeUndoable(reducer);

        expect(undoable).to.be.a('function');
    });

    describe('undoable reducer', () => {
        const state = 0;
        let reducerSpy;
        let undoable;

        beforeEach(() => {
            reducerSpy = sinon.spy(reducer);
            undoable = makeUndoable(reducerSpy);
        });

        it('should call original reducer when called with any action except undo/redo', () => {
            undoable(state, increment);

            reducerSpy.should.have.been.calledOnce; // eslint-disable-line no-unused-expressions
        });

        it('should return previous state on undo action', () => {
            const newState = undoable(state, increment);
            const undoState = undoable(newState, undo);

            expect(undoState).to.be.equal(state);
        });

        it('shouldn\'t call original reducer on undo/redo action', () => {
            const newState = undoable(state, increment);

            reducerSpy.should.have.been.calledOnce; // eslint-disable-line no-unused-expressions

            undoable(newState, undo);

            reducerSpy.should.have.been.calledOnce; // eslint-disable-line no-unused-expressions
        });

        it('should return next state on redo action', () => {
            const newState = undoable(state, increment);
            const undoState = undoable(newState, undo);
            const redoState = undoable(undoState, redo);

            expect(redoState).to.be.equal(newState);
        });
    });

    it('should provide ability to use custom undo actionn', () => {
        const state = 0;
        const customTypes = {
            undo: CUSTOM_UNDO,
            redo: CUSTOM_REDO
        };

        const undoable = makeUndoable(reducer, { types: customTypes });
        const newState = undoable(state, INCREMENT);
        const undoState = undoable(newState, customUndo);

        expect(undoState).to.be.equal(state);
    });

    it('should provide ability to use custom redo actionn', () => {
        const state = 0;
        const customTypes = {
            undo: CUSTOM_UNDO,
            redo: CUSTOM_REDO
        };

        const undoable = makeUndoable(reducer, { types: customTypes });
        const newState = undoable(state, INCREMENT);
        const undoState = undoable(newState, customUndo);
        const redoState = undoable(undoState, customRedo);

        expect(redoState).to.be.equal(newState);
    });

    it('should provide ability to set custom history length', () => {
        const state = 0;

        const undoable = makeUndoable(reducer, { length: 1 });
        const newState1 = undoable(state, increment);
        const newState2 = undoable(newState1, increment);
        const undoState1 = undoable(newState2, undo);
        const undoState2 = undoable(undoState1, undo);

        expect(undoState2).to.be.equal(undoState1);
        expect(undoState2).to.be.equal(newState1);
    });
});
