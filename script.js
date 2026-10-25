const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const errorMessage = document.querySelector("#error-message");
const noteCount = document.querySelector("#note-count");
const searchInput = document.querySelector("#search-input");
let notes = [];
//local storage store
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Load the notes from localStorage
function loadNotes() {
  const saved = localStorage.getItem("notes");
  if (saved !== null) {
    notes = JSON.parse(saved);
  }
}
function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = "You have " + notes.length + " notes.";
  }
}

function deleteNote(id) {
  notes = notes.filter(function (note) {
    return note.id !== id;
  });
  saveNotes();
  render();
}

function render() {
  notesList.textContent = "";
  const searchWord = searchInput.value.trim().toLowerCase();
  const visibleNotes = notes.filter(function (note) {
    return note.text.toLowerCase().includes(searchWord);
  });

  if (notes.length > 0 && visibleNotes.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.textContent = "No notes match your search.";
    notesList.appendChild(emptyItem);
  }

  for (let i = 0; i < visibleNotes.length; i++) {
    const note = visibleNotes[i];

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
    deleteBtn.addEventListener("click", function () {
      deleteNote(note.id);
    });

    li.appendChild(text);
    li.appendChild(meta);
    li.appendChild(deleteBtn);
    notesList.appendChild(li);
  }

  updateCount();
}

// When the form is submitted
noteForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = noteInput.value.trim();

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";

  const newNote = {
    id: Date.now(),
    text: text,
    category: noteCategory.value,
    createdAt: new Date().toLocaleString()
  };

  notes.push(newNote);
  saveNotes();
  render();
  noteInput.value = "";
});

// Search as the user types
searchInput.addEventListener("input", render);

// When the page first loads
loadNotes();
render();