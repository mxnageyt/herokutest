/**
 * Required External Modules
 */

const express = require("express");
const path = require("path");

/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || "8000";

/**
 *  App Configuration
 */

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const items = [];
let id = 0;

/**
 * Routes Definitions
 */

app.get("/", (request, response) => {
  response.status(200).send("TO DO App");
});

app.get("/api/items", (request, response, next) => {
  response.json(items);
});

app.post("/api/items", (request, response, next) => {
  const incomingItem = request.body;
  if (incomingItem.item) {
    id = id + 1;
    const newItem = {
      id: id,
      item: incomingItem.item,
      completed: false,
    };
    items.push(newItem);
    response.json(newItem);
  } else {
    response.status(400).json({ error: "item needs a description" });
  }
});

app.put("/api/items/:id", (request, response, next) => {
  const itemID = Number(request.params.id);
  const itemToComplete = items.find((item) => item.id === itemID);

  if (itemToComplete) {
    // toggle the value
    itemToComplete.completed = !itemToComplete.completed;

    // replace the previous item with the item of item.id
    // with the itemToComplete object
    const itemIndex = items.indexOf(itemToComplete);
    items.splice(itemIndex, 1, itemToComplete);
    response.json(itemToComplete);
  } else {
    response.status(404).json({ error: "ID not found" });
  }
});

app.delete("/api/items/:id", (request, response, next) => {
  const itemID = Number(request.params.id);
  // Find the item to delete by ID
  const itemToDelete = items.find((item) => item.id === itemID);

  if (itemToDelete) {
    const itemIndex = items.indexOf(itemToDelete);
    items.splice(itemIndex, 1);
    response.json(itemToDelete);
  } else {
    response.status(404).json({ error: "ID not found" });
  }
});

/**
 * Server Activation
 */

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
