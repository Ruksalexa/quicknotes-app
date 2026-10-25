const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
let notes = [];


function render() {
  notesList.textContent = "";

  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];

    const li = document.createElement("li");
    li.classList.add("category-" + note.category);

    const text = document.createElement("p");
    text.textContent = note.text;

    const meta = document.createElement("p");
    meta.classList.add("note-meta");
    const label = note.category.charAt(0).toUpperCase() + note.category.slice(1);
    meta.textContent = label + " | " + note.createdAt;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    li.appendChild(text);
    li.appendChild(meta);
    li.appendChild(deleteBtn);
    notesList.appendChild(li);
  }
}

// When the form is submitted
noteForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const newNote = {
    id: Date.now(),
    text: noteInput.value,
    category: noteCategory.value,
    createdAt: new Date().toLocaleString()
  };

  notes.push(newNote);
  render();
  noteInput.value = "";
});