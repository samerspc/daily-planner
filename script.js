document.getElementById('saveBtn').addEventListener('click', saveNote);
document.getElementById('clearBtn').addEventListener('click', clearNote);
document.getElementById('updateBtn').addEventListener('click', updateNote);

let editIndex = null;

function getFormattedDate() {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${day}.${month} ${hours}:${minutes}`;
}


function saveNote() {
    const note = document.getElementById('noteArea').value;
    if (note) {
        let savedNotes = JSON.parse(localStorage.getItem('savedNotes')) || [];
        savedNotes.push(note);
        localStorage.setItem('savedNotes', JSON.stringify(savedNotes));
        showMessage('Заметка сохранена!');
        displayNotes();
        clearNote();
    } else {
        showMessage('Заметка пуста, нечего сохранять.');
    }
}

function loadNote(index) {
    const savedNotes = JSON.parse(localStorage.getItem('savedNotes')) || [];
    document.getElementById('noteArea').value = savedNotes[index];
    document.getElementById('saveBtn').style.display = 'none';
    document.getElementById('updateBtn').style.display = 'inline-block';
    editIndex = index;
    showMessage('Заметка загружена для редактирования.');
}

function updateNote() {
    const savedNotes = JSON.parse(localStorage.getItem('savedNotes')) || [];
    if (editIndex !== null) {
        savedNotes[editIndex] = document.getElementById('noteArea').value;
        localStorage.setItem('savedNotes', JSON.stringify(savedNotes));
        showMessage('Заметка обновлена!');
        displayNotes();
        clearNote();
        resetButtons();
    }
}

function deleteNote(index) {
    let savedNotes = JSON.parse(localStorage.getItem('savedNotes')) || [];
    savedNotes.splice(index, 1);
    localStorage.setItem('savedNotes', JSON.stringify(savedNotes));
    showMessage('Заметка удалена!');
    displayNotes();
}

function clearNote() {
    document.getElementById('noteArea').value = '';
}

function displayNotes() {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = ''; // Очищаем список перед отображением
    const savedNotes = JSON.parse(localStorage.getItem('savedNotes')) || [];
    savedNotes.forEach((note, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span class="span">${getFormattedDate()}</span>
            <div>
                <button onclick="loadNote(${index})" class="button">Редактировать</button>
                <button onclick="deleteNote(${index})" class="button">Удалить</button>
            </div>`;
        notesList.appendChild(listItem);
    });
}

function resetButtons() {
    document.getElementById('saveBtn').style.display = 'inline-block';
    document.getElementById('updateBtn').style.display = 'none';
}

function showMessage(message) {
    const statusMessage = document.getElementById('statusMessage');
    statusMessage.textContent = message;
    setTimeout(() => {
        statusMessage.textContent = '';
    }, 2000);
}

// Отображаем заметки при загрузке страницы
document.addEventListener('DOMContentLoaded', displayNotes);
