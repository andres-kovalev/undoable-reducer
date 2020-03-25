[![ci](https://img.shields.io/circleci/build/github/andres-kovalev/undoable-reducer.svg?style=flat-square&logo=circleci)](https://circleci.com/gh/andres-kovalev/undoable-reducer)
[![codecov](https://img.shields.io/codecov/c/github/andres-kovalev/undoable-reducer.svg?style=flat-square&logo=codecov&token=1280f2cf41a24522add9857967be2a73)](https://codecov.io/gh/andres-kovalev/undoable-reducer)
[![downloads](https://img.shields.io/npm/dm/undoable-reducer.svg?style=flat-square&logo=data:image/svg+xml;base64,PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDAwcHgiIGhlaWdodD0iNDAwcHgiIHhtbDpzcGFjZT0icHJlc2VydmUiCj48ZyBmaWxsPSJ3aGl0ZSI+PHBhdGggZD0iTTM3OSwxODAuNWgtMTAydi0xMDBoLTE1M3YxMDBoLTEwMmwxNzguNSwxNzguNWwxNzguNSwtMTc4LDUiLz48L2c+PC9zdmc+Cg==)](https://www.npmjs.com/package/undoable-reducer)
[![node](https://img.shields.io/node/v/undoable-reducer.svg?style=flat-square&logo=node.js&color=007ec6)](https://nodejs.org/)
[![npm](https://img.shields.io/npm/v/undoable-reducer.svg?style=flat-square&logo=npm)](https://www.npmjs.com/package/undoable-reducer)
[![MIT](https://img.shields.io/npm/l/undoable-reducer.svg?color=007ec6&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAA5ElEQVR4AY3SJWyDcRQE8G+MsnIg63XNmMm2ZuB9xjyv5tWYfAZ2TD6tGW9qzHCX3H9bX4rJz7y7K3t8NK20OT7ogHnYl3ndfK5nRwFYgxf4Nl6UBVzfjcoholIiEXbdsBS2TCERdks5HIaPVIfqDnN4HCO8gUm5iZEfc/gYI+gBT3pi5I8M3szxE0LgSYg303ljcGqOtAHFshEjP+VwOkbwCvXyGiOf5rASrkwQhhIJm4zdKg4zYBDe/z8j72Te0bu6GRxSIUzAHXxBF3jSpdudOoX2/5oDQVgEP3ji1y3Ijhv9ABp7euvVsybrAAAAAElFTkSuQmCC&style=flat-square)](https://github.com/andres-kovalev/undoable-reducer/blob/master/LICENSE)
[![npm bundle size](https://img.shields.io/bundlephobia/min/undoable-reducer.svg?style=flat-square&logo=data:image/svg+xml;base64,PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDAwcHgiIGhlaWdodD0iNDAwcHgiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnIGZpbGw9IndoaXRlIj48cGF0aCBkPSJNNzUsMzBoMTc1bDEwMCwxMDB2MjQwaC0yNzV2LTI0MCIvPjwvZz48ZyBmaWxsPSIjREREIj48cGF0aCBkPSJNMjUwLDMwbDEwMCwxMDBoLTEwMHYtMTAwIi8+PC9nPjwvc3ZnPgo=)](https://www.npmjs.com/package/undoable-reducer)

# undoable-reducer

Simple utility to make reducers undoable.

# Description

`undoable-reducer` provides simple utility to make any reducer undoable.

Here is a small [demo](https://codesandbox.io/s/undoable-reducer-playground-xgqtn).

# Installation

As any other npm package `undoable-reducer` can be added to your project by following command:

```bash
npm i -S undoable-reducer
```

# API

## makeUndoable(reducer, options)

To make any reducer undoable just pass it to `makeUndoable()` function as 1st argument:

```js
import makeUndoable from 'undoable-reducer';

const reducer = (state, action) => {
    ...
};

export default makeUndoable(reducer);
```

To use undo/redo functionality, `undoable-reducer` exports action types for undo and redo actions:

```js
import { TYPES } from 'undoable-reducer';

const Component = ({ dispatch }) => {
    ...
    dispatch({ type: TYPES.undo });
};
```

`undoable-reducer` exports action creators as well:

```js
import { ACTIONS } from 'undoable-reducer';

const Component = ({ dispatch }) => {
    ...
    dispatch(ACTIONS.undo());
};
```

To use undo/redo functionality across several reducers `makeUndoable()` can be applied to combined reducer...

```js
import makeUndoable from 'undoable-reducer';
import combineReducers from 'redux';
import theme from './theme';
import locale from './locale';
import editor from './locale';

// to add undo/redo functionality to whole state
export default makeUndoable(combineReducers({
    theme, locale, editor
}));
```

or any specific reducer:

```js
...

// to add undo/redo functionality editor state only
export default combineReducers({
    theme, locale,
    editor: makeUndoable(editor)
});
```

`makeUndoable()` function can be configured using `options` parameter.

In some cases we may want to use custom undo/redo actions. To do so we just need to pass undo and redo action types during `makeUndoable()` call:

```js
import { CUSTOM_UNDO as undo, CUSTOM_REDO as redo } from '../actions/editor';

export default makeUndoable(editorReducer, {
    types: { undo, redo }
})
```

By doing so we can group several states under the same undo/redo history.

There is another option `length` to set maximum history length for undoable reducer (which is 10 by default):

```js
// use will be able to undo (and then redo) up to 20 times
export default makeUndoable(reducer, { length: 20 });
```
