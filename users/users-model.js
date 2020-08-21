const db = require("../database/dbConfig");

module.exports = {
  find,
  findById,
  findBy,
  add,
};

function find() {
  return db("users").select("id", "username");
}

function findById(id) {
  return db("users").where({ id }).first();
}

function findBy(filter) {
  return db("users").where(filter).orderBy("id");
}

function add(user) {
  return db("users")
    .insert(user)
    .returning("id")
    .then(([id]) => {
      return findById(id);
    });
}
