/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wswilo2gk8n1n91")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lwnlbix3",
    "name": "restaurant_id",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wswilo2gk8n1n91")

  // remove
  collection.schema.removeField("lwnlbix3")

  return dao.saveCollection(collection)
})
