import React, { useReducer } from "react";

type State = {
  isRequestInProgress: boolean;
  requestStep: 'start' | 'pending' | 'finished' | 'idle'
}

enum ActionTypes {
  start = 'START_REQUEST',
  pending = 'PENDING_REQUEST',
  finish = 'FINISH_REQUEST',
  reset = 'RESET_REQUEST'
}

type Action = {
  type: ActionTypes.start | ActionTypes.pending | ActionTypes.finish | ActionTypes.reset 
}

const initialState: State = {
  isRequestInProgress: false,
  requestStep: 'idle',
};

function requestReducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionTypes.start:
      return { ...state, isRequestInProgress: true, requestStep: 'start' };
    case ActionTypes.pending:
      return { ...state, isRequestInProgress: true, requestStep: 'pending' };
    case ActionTypes.finish:
      return { ...state, isRequestInProgress: false, requestStep: 'finished' };
    case ActionTypes.reset:
      return { ...state, isRequestInProgress: false, requestStep: 'idle' };
    default:
      return state;
  }
}

export function RequestComponent() {
  const [requestState, requestDispatch] = useReducer(requestReducer, initialState);

  const startRequest = () => {
    requestDispatch({ type: ActionTypes.start });
    // Імітуємо запит до сервера
    setTimeout(() => {
      requestDispatch({ type: ActionTypes.pending });
      // Імітуємо отримання відповіді від сервера
      setTimeout(() => {
        requestDispatch({ type: ActionTypes.finish });
      }, 2000);
    }, 2000);
  };

  const resetRequest = () => {
    requestDispatch({ type: ActionTypes.reset });
  };

  return (
    <div>
      <button onClick={startRequest}>Почати запит</button>
      <button onClick={resetRequest}>Скинути запит</button>
      <p>Стан запиту: {requestState.requestStep}</p>
    </div>
  );
}

export default RequestComponent;
