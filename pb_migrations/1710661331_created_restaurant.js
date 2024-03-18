/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "wswilo2gk8n1n91",
    "created": "2024-03-17 07:42:11.900Z",
    "updated": "2024-03-17 07:42:11.900Z",
    "name": "restaurant",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ibfztrdb",
        "name": "identifier",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ltymwbk3",
        "name": "password",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("wswilo2gk8n1n91");

  return dao.deleteCollection(collection);
})
