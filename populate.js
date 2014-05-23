/**
 * Created by k33g_org on 23/05/14.
 */

var Faker = require("Faker")
  , nohm = require('nohm').Nohm
  , redis = require('redis').createClient();

redis.on("error", function (err) {
  console.log("Error " + err);
});

redis.on("ready", function (err) {

  nohm.setClient(redis);

  console.log("Connected");

  nohm.model('User', {
    properties: {
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

  console.log("Populating Database ...")

   for(var i = 0; i <= 100000; i++) {
     var user = nohm.factory('User');
     user.p({
         name: Faker.Name.findName()
       , email: Faker.Internet.email()
       , country: Faker.Address.ukCountry()
     });

     user.save(function (err) {});
     console.log(i)

   }
  console.log("the end")
  process.exit(1)

});



