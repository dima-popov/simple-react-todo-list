function getData() {
  if (window.localStorage.getItem('todoList')) {
    return JSON.parse(window.localStorage.getItem('todoList'));
  }
  return [];
}

function setData(data: string) {
  window.localStorage.setItem('todoList', data);
}

export { getData, setData };
