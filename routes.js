module.exports = function(app){
    var actions = require("./controllers/actions");
    app.get("/actions/get/:id",actions.getById);
}