const addBtn = document.getElementById('add-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const sparkleContainer = document.getElementById('sparkle-container');

function createSparkles(x, y) {
  for (let i = 0; i < 20; i++) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.left = `${x + Math.random() * 100 - 50}px`;
    sparkle.style.top = `${y + Math.random() * 40 - 20}px`;
    sparkle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
    sparkleContainer.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
  }
}

addBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const li = document.createElement('li');

  const checkboxBox = document.createElement('div');
  checkboxBox.className = 'checkbox-box';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkboxBox.appendChild(checkbox);

  const span = document.createElement('span');
  span.textContent = taskText;

  const delBtn = document.createElement('button');
  delBtn.textContent = '🗑️';
  delBtn.classList.add('delete-btn');

  checkbox.addEventListener('change', () => {
    li.classList.toggle('completed');
    if (checkbox.checked) {
      const rect = li.getBoundingClientRect();
      createSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
  });

  delBtn.addEventListener('click', () => {
    taskList.removeChild(li);
  });

  li.appendChild(checkboxBox);
  li.appendChild(span);
  li.appendChild(delBtn);
  taskList.appendChild(li);

  taskInput.value = '';
});
