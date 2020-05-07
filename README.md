### Get all items

GET `/api/items/`

Sample response body:

```json
[
    {
        "id": 1,
        "item": "get some eggs",
        "completed": true
    },
    {
        "id": 2,
        "item": "get some beer",
        "completed": false
    },
]
```

### Post an item

POST `/api/items/`

Sample request body:

```json
{
    "item": "the name of the thing we're including"
}
```

Once it does that, it should *return* the full object of the item (why, you think?)

```json
{
	"id": 3,
	"item": "the name of the thing we're launching",
	"completed": false
}
```
### Edit a task / mark a task as done

PUT `/api/items/:id`

```json
{
	"id": 2,
	"item": "get some beer",
	"completed": true
}
```
### Delete a task

DELETE `/api/item/:id`

Returns the item to delete.
{
	"id": 3,
	"item": "the name of the thing we're launching",
	"completed": false
}

## Create the Express server

```bash
# the yes flag bypasses the questions
$ yarn init --yes
$ yarn add express
$ yarn add nodemon --dev
```