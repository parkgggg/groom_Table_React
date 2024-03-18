/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8n6sww6t3whiyak")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kgyaplws",
    "name": "status",
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
  const collection = dao.findCollectionByNameOrId("8n6sww6t3whiyak")

  // remove
  collection.schema.removeField("kgyaplws")

  return dao.saveCollection(collection)
})
