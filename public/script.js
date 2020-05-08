const ulEl = document.querySelector("ul");
const formInputEl = document.querySelector(".form-control");

// When I click on the checkbox of a list item, I want to give the
// illusion I've completed the item by manipulating the HTML/CSS so
// it looks done. How did we do that when we hard coded our markup?

// We're expect ID to be a number
function toggleItem(id) {
  console.log("toggleItem id is", id);

  // the id is in the form of task-1, task-2, when
  // we really just want to pass 1, 2, etc.
  const pureId = id.split("task-")[1];

  // "1,2,3".split(",") => [1,2,3]
  // "task-1".split("task-") => [null, "1"]

  fetch(`/api/items/${pureId}`, { method: "PUT" })
    .then((response) => response.json())
    .then((data) => {
      const rowEl = document.getElementById(id);
      rowEl.classList.toggle("done");
    })
    .catch((error) => console.error("Error:", error));
}

// When I click on the delete button, I want to delete the <li> tag
// in the DOM so it looks like we actually deleted the item.
function deleteItem(id) {
  if (confirm("Are you sure you want to delete?")) {
    const rowEl = document.getElementById(id);
    rowEl.remove();
  }
}

// When I add some in the text box and press enter, it should add
// a new LI and append it to the UL tag. I can do this a couple of
// ways, but either way requires me to retrieve what I typed in my
// form.

// ...or the longer and complete
// way, using createElement and the DOM.
function submitForm() {
  event.preventDefault();

  console.log(formInputEl.value);

  // We'll have to get the value of our textbox (formInputEl.value)
  // Call the POST API to create a new item

  // FIXME - request.body doesn't seem to carry over JSON
  fetch("/api/items", {
    method: "POST",
    header: { "Content-Type": "application/json" },
    body: JSON.stringify({ item: formInputEl.value }),
  })
    .then((response) => response.json())
    .then((item) => addNewListItem(item))
    .catch((error) => console.error("Error", error));
  document.querySelector("form").reset();
}

// Call the GET items API when we load the client page
fetch("/api/items/")
  .then((response) => response.json())
  .then((data) => {
    console.log("From GET fetch", data);
    data.forEach((item) => {
      console.log(item);
      // add a new row to the DOM for each item
      addNewListItem(item);
    });
  })
  .catch((error) => {
    console.error("Error", error);
  });

// add a new row to the DOM for each item
// item is an object that has
// id, item and completed properties
function addNewListItem(item) {
  let taskId = "task-" + item.id;
  // createElement: creates DOM elements
  const liEl = document.createElement("li");

  // item.completed may equal true. If that's the case, then
  // we need to display the HTML of the completed item by
  // adding the done class.
  if (item.completed) {
    // maybe setAttribute("class", "done") will work but
    // i don't wanna test it now lol
    liEl.classList.add("done");
  }
  let isChecked = item.completed ? "checked" : "";

  liEl.setAttribute("id", taskId);
  liEl.innerHTML = `
    <label>
      <input onclick="toggleItem('${taskId}')" type="checkbox" ${isChecked} />
      ${item.item}
    </label>
    <button onclick="deleteItem('${taskId}')">
      Delete
    </button>`;

  // appendChild: appends that createElement'ed element to the DOM tree
  ulEl.appendChild(liEl);
}

// I could have ALSO not used innerHTML at ALL, and used a combination
// of createElements, appendChilds, setAttributes and addEventListeners.

// What do you think are the pros and cons of both? Which ones do
// you like better?

// Finally, what if I wanted to not include onsubmit to the index.html form?
// What if I just wanted to include it dynamically inside this JavaScript?
document.querySelector("form").addEventListener("submit", submitForm);
