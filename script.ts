const inputText = document.querySelector('input') as HTMLInputElement;
const btn = document.querySelector('button') as HTMLButtonElement;
const list =  document.querySelector('ul') as HTMLUListElement;

type TaskContent = {  
  message: string,  
  state: boolean
}

let task: TaskContent[] = JSON.parse(localStorage.getItem('todoContent') || '')  || [];

// CRIANDO A TASK NA TELA

function listTasks(){
  task.forEach((content: TaskContent, index: number) => {
    list.innerHTML += 
    `<li>
      <input type="checkbox" onClick={setIsChecked(${index})} ${content.state && 'checked'}/>
       ${content.state ? `<strike>${content.message}</strike>` : `<span>${content.message}</span>`}
      <button onClick={deleteTask(${index})}>Excluir</button>
     </li>`
  })
}

// COLOCANDO CHECK NA TASK

function setIsChecked(index:number){
  const newList = [...task];
  newList[index].state = !newList[index].state;

  task = newList;
  list.innerHTML = ``
  saveInLocalStorage()
  listTasks()
}

// EXCLUINDO A TASK

function deleteTask(itemId: number){
  const newList = [...task];
  newList.splice(itemId, 1);
  task = newList;
  list.innerHTML = ``
  saveInLocalStorage()
  listTasks()
}

// SALVANDO DADOS NO LOCALSTORAGE

function saveInLocalStorage(){
  localStorage.setItem('todoContent', JSON.stringify(task))
}

// PEGANDO TEXTO

function createTask(){
  task = [
    ...task,
    {
      message: inputText.value,
      state: false
    },
    ];
  inputText.value = ''
  list.innerHTML = ``
  saveInLocalStorage()
  listTasks();
}

btn.addEventListener('click', createTask)

listTasks();
