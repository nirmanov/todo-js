// Работа с локальным хранилищем
export function getTodoList(owner) {
  const todoList = JSON.parse(localStorage.getItem(`todoList_${owner}`)) || [];
  return todoList;
}

export function createTodoItem({
  owner,
  name
}) {
  const todoItem = {
    id: Date.now(),
    name,
    done: false,
  };
  const todoList = getTodoList(owner);
  todoList.push(todoItem);
  localStorage.setItem(`todoList_${owner}`, JSON.stringify(todoList));
  return todoItem;
}

export function switchTodoItemDone({
  todoItem,
  owner,
}) {
  todoItem.done = !todoItem.done;
  const todoList = getTodoList(owner);
  const index = todoList.findIndex(item => item.id === todoItem.id);
  if (index !== -1) {
    todoList[index].done = todoItem.done;
    localStorage.setItem(`todoList_${owner}`, JSON.stringify(todoList));
  }
}

export function deleteTodoItem({
  todoItem,
  element,
  owner,
}) {
  const todoList = getTodoList(owner);
  const index = todoList.findIndex(item => item.id === todoItem.id);
  if (!confirm('Вы уверены?')) {
    return;
  }
  if (index !== -1) {
    element.remove();
    todoList.splice(index, 1);
    localStorage.setItem(`todoList_${owner}`, JSON.stringify(todoList));
  }
}
