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

exports.getZones = function(req,res){
    var KeyCDN = require('keycdn');
    var keycdn = new KeyCDN('sk_prod_ZDRmODcxMTU2Y2NjZjBmOGJj');

    keycdn.get('zones.json', function(err, results) {
        if (err) {
            res.send({data:  err});
            return;
        }

         res.send({data: results});        
    });   


    
}