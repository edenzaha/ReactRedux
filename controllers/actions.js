var request = require('superagent');

exports.getById = function(req,res){
    request
      .get("http://ip.jsontest.com/")
      .set('Accept', 'application/json')
      .end(function(err,resp){
        //MAGIC
        //alert(res.body.ip);
         res.send({ip:resp.body.ip});
      })
   
}