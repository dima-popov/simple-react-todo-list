import { createStore } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { getData, setData } from './data';

const list: [number, any][] = getData();

function reducer(
  state: { inputValue: any; listValue: any[] },
  action: { type: string; payload?: any },
) {
  switch (action.type) {
    case 'input/update':
      return { ...state, inputValue: action.payload };
    case 'list/delete':
      return {
        inputValue: state.inputValue,
        listValue: [...state.listValue.filter((e) => e[1] !== action.payload)],
      };
    case 'list/add':
      return {
        inputValue: '',
        listValue: [
          ...state.listValue,
          [
            Date.now(),
            {
              text: state.inputValue || '------',
              ready: false,
              id: uuidv4(),
              date: `${new Date().toDateString()}, ${new Date().toTimeString()}`,
            },
          ],
        ],
      };
    case 'list/update':
      return { inputValue: state.inputValue, listValue: [...state.listValue] };
    default:
      return state;
  }
}

const store = createStore(reducer, { inputValue: '', listValue: list });

store.subscribe(() => {
  setData(JSON.stringify(store.getState().listValue));
});

export default store;
