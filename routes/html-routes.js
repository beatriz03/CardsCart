var path = require("path");

module.exports = function(app) {


  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/index.html"));
  });
 
  app.get("/index", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/index.html"));
  });

  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/login.html"));
  });
  
  // app.get("/contact", function(req, res) {
  //   res.sendFile(path.join(__dirname, "/../public/contact.html"));
  // });

  // app.get("/addContact", function(req, res) {
  //   res.sendFile(path.join(__dirname, "/../public/addContact.html"));
  // });
  

};