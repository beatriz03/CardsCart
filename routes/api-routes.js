var db = require("../models");

module.exports = function(app) {
  
  // GET route for getting all of the posts
  app.get("/api/contacts/", function(req, res) {
    db.contact.findAll({})
      .then(function(dbContact) {
        res.json(dbContact);
      })
  });


  // POST route for saving a new post
  app.post("/api/contacts", function(req, res) {
    console.log(req.body);
    db.Contact.create({
      name: req.body.name,
      birthday: req.body.birthday,
      streetAddress: req.body.streetAddress,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      additionalNotes: req.body.additionalNotes
    })
      .then(function(dbContact) {
        res.json(dbContact);
      });
  });

  // DELETE route for deleting posts
  app.delete("/api/contacts/:id", function(req, res) {
    db.Contact.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbContact) {
        res.json(dbContact);
      });
  });

  // PUT route for updating posts
  app.put("/api/contacts", function(req, res) {
    db.Contact.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbContact) {
        res.json(dbContact);
      });
  });
};
