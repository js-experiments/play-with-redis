/**
 * Created by k33g_org on 23/05/14.
 */

var nohm = require('nohm').Nohm
  , redis = require('redis').createClient();

redis.on("error", function (err) {
  console.log("Error " + err);
});

redis.on("ready", function (err) {

  nohm.setClient(redis);

  console.log("Connected");

  var UserModel = nohm.model('User', {
    properties: {
      id: {
        type: 'string',
        unique: true
      },
      name: {
        type: 'string',
        index: true
      },
      email: {
        type: 'string',
        index: true
      },
      country: {
        type: 'string',
        index: true
      }
    }
  });


  //England

  UserModel.find({
    country: 'England'
  }, function (err, ids) {

    console.log("English people", ids.length)

    nohm.factory('User', ids[345], function (err) {
      if (err === 'not found') {
        console.log(err);
      } else if (err) {
        console.log(err); // database or unknown error
      } else {
        console.log(this.allProperties());
      }
    });

  });


});



