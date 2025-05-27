const addBtn = document.getElementById('add-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

addBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();

  if (taskText === '') return;

  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = taskText;
  span.addEventListener('click', () => {
    li.classList.toggle('completed');
  });

  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.classList.add('delete-btn');
  delBtn.addEventListener('click', () => {
    taskList.removeChild(li);
  });

  li.appendChild(span);
  li.appendChild(delBtn);
  taskList.appendChild(li);

  taskInput.value = '';
});
