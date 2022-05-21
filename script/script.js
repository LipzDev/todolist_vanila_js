var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var inputText = document.querySelector('input');
var btn = document.querySelector('button');
var list = document.querySelector('ul');
var task = JSON.parse(localStorage.getItem('todoContent') || '') || [];
// CRIANDO A TASK NA TELA
function listTasks() {
    task.forEach(function (content, index) {
        list.innerHTML +=
            "<li>\n      <input type=\"checkbox\" onClick={setIsChecked(".concat(index, ")} ").concat(content.state && 'checked', "/>\n       ").concat(content.state ? "<strike>".concat(content.message, "</strike>") : "<span>".concat(content.message, "</span>"), "\n      <button onClick={deleteTask(").concat(index, ")}>Excluir</button>\n     </li>");
    });
}
// COLOCANDO CHECK NA TASK
function setIsChecked(index) {
    var newList = __spreadArray([], task, true);
    newList[index].state = !newList[index].state;
    task = newList;
    list.innerHTML = "";
    saveInLocalStorage();
    listTasks();
}
// EXCLUINDO A TASK
function deleteTask(itemId) {
    var newList = __spreadArray([], task, true);
    newList.splice(itemId, 1);
    task = newList;
    list.innerHTML = "";
    saveInLocalStorage();
    listTasks();
}
// SALVANDO DADOS NO LOCALSTORAGE
function saveInLocalStorage() {
    localStorage.setItem('todoContent', JSON.stringify(task));
}
// PEGANDO TEXTO
function createTask() {
    task = __spreadArray(__spreadArray([], task, true), [
        {
            message: inputText.value,
            state: false
        },
    ], false);
    inputText.value = '';
    list.innerHTML = "";
    saveInLocalStorage();
    listTasks();
}
btn.addEventListener('click', createTask);
listTasks();
