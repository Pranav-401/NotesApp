const noteContainer = document.querySelector(".note-container");
const createBtn = document.querySelector(".btn");

function showNotes() {
  // Load notes from localStorage
  noteContainer.innerHTML = localStorage.getItem("notes") || "";

  // Add delete icon to existing notes if missing
  const notes = document.querySelectorAll(".input-box");
  notes.forEach((note) => {
    if (!note.querySelector("img")) {
      let img = document.createElement("img");
      img.src = "images/delete.png";
      img.className = "delete-icon";
      note.appendChild(img);
    }
  });
}

function updateStorage() {
  localStorage.setItem("notes", noteContainer.innerHTML);
}

// Show notes on load
showNotes();

createBtn.addEventListener("click", () => {
  // Create new note element
  let inputBox = document.createElement("p");
  let img = document.createElement("img");

  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", "true");
  img.src = "images/delete.png";
  img.className = "delete-icon";

  // Append the new note
  inputBox.appendChild(img);
  noteContainer.appendChild(inputBox);

  // Save to storage
  updateStorage();
});

// Delegate event listeners to the note container
noteContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    // Remove note if delete icon is clicked
    e.target.parentElement.remove();
    updateStorage();
  } else if (e.target.classList.contains("input-box")) {
    // Attach onkeyup event listener to editable notes
    e.target.addEventListener("keyup", updateStorage);
  }
});

// Prevent default Enter behavior and add a line break instead
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    document.execCommand("insertLineBreak");
    event.preventDefault();
  }
});
