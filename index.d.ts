type UndoableTypes = {
    undo: string;
    redo: string;
}

type Map<T, D> = {
    [K in keyof T]: D;
}

type Action = { type: string };

type ActionCreator = () => Action;

type Reducer<S, A extends Action> = (state: S, action: A) => S;

type Options = {
    /**
     * History length
     */
    length?: number;
    /**
     * Custom undo/redo action types
     */
    types?: UndoableTypes
}

/**
 * Makes reducer undoable
 * @param reducer reducer function to enhance
 * @param options undoable reducer configuration
 * @returns enhanced reducer
 */
export default function makeUndoable<S, A extends Action>(reducer: Reducer<S, A>, options?: Options): Reducer<S, A>;

export const TYPES: UndoableTypes;
export const ACTIONS: Map<UndoableTypes, () => Action>;
