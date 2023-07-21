// Переключение между локальным и серверным хранилищем
export async function toggleStorage() {
  const currentStorage = getCurrentStorage();
  const newStorage = currentStorage === 'local' ? 'server' : 'local';
  setCurrentStorage(newStorage);
  location.reload();
}

// Установка текущего выбранного хранилища в localStorage
function setCurrentStorage(storage) {
  localStorage.setItem('storage', storage);
}


// Получение текущего выбранного хранилища из localStorage
function getCurrentStorage() {
  return localStorage.getItem('storage') || 'local';
}

// Получение функций для работы с хранилищем в зависимости от выбранного хранилища
export async function getStorageFunctions() {
  const currentStorage = getCurrentStorage();
  const switchBtn = document.getElementById('toggleStorageButton');
  switchBtn.textContent = currentStorage === 'local' ? 'Перейти на серверное хранилище' : 'Перейти на локальное хранилище';
  if (currentStorage === 'local') {
    // Динамический импорт функций для работы с локальным хранилищем
    const { getTodoList, createTodoItem, switchTodoItemDone, deleteTodoItem } = await import('./localStorage.js');
    console.log('local');
    return {
      getTodoList,
      createTodoItem,
      switchTodoItemDone,
      deleteTodoItem,
    };
  } else {
    // Динамический импорт функций для работы с серверным хранилищем
    const { getTodoList, createTodoItem, switchTodoItemDone, deleteTodoItem } = await import('./api.js');
    console.log('api');
    return {
      getTodoList,
      createTodoItem,
      switchTodoItemDone,
      deleteTodoItem,
    };
  }
}

// Экспорт функций для работы с хранилищем
// export const { getTodoList, createTodoItem, switchTodoItemDone, deleteTodoItem } = getStorageFunctions();
