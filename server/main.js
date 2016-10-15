import { Meteor } from 'meteor/meteor';

import FB from 'fb'; 

Meteor.startup(() => {
    // code to run on server at startup
    let accessToken = 'YOUR_ACCESS_TOKEN';
    
    FB.setAccessToken(accessToken);
    
    FB.api('/me/accounts', function (res) {
        if(!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return;
        }
        console.log(res);
        
        if(res){
            var firstPage = res.data[0];
            
            var pid = firstPage.id;
            var pat = firstPage.access_token;
            
            //fb page info
            FB.api('/'+pid, function(response) {
                console.log(response);
            });
            
            //fb page posts
            FB.api(`/${pid}/feed`, function(response) {
                if(response && response.data){
                    response.data.map(function(eachPost){
                        console.log('page post:',eachPost.message);
                    })
                }
            });         
            
        }
    });
});

//Flexible example of Meteor.wrapAsync 
//https://gist.github.com/rclai/b9331afd2fbabadb0074
Meteor.methods({
    
   'fbPage.getPageInfo'(){
       
       var convertAsyncToSync = Meteor.wrapAsync(function(url, callback) {
           FB.api('/me/accounts',function(res,error){
                callback(error, res);
           });
       });
        
        result = convertAsyncToSync("1");
        return result;

   },
   'fbPage.getPageFeeds'(){
       
       var convertAsyncToSync = Meteor.wrapAsync(function(url, callback) {
           FB.api('/me/accounts', function(res) {
               if (!res || res.error) {
                   console.log(!res ? 'error occurred' : res.error);
                   return;
               }
               console.log(res);

               if (res) {
                   var firstPage = res.data[0];

                   var pid = firstPage.id;
                   var pat = firstPage.access_token;

                   //fb page info
                   FB.api('/' + pid, function(response) {
                       console.log(response);
                   });

                   //fb page posts
                   FB.api(`/${pid}/feed`, function(response,error) {
                       if (response && response.data) {
                          callback(error,response)
                       }
                   });

               }
           });
       });
        
        result = convertAsyncToSync("1");
        return result;

   }   
   
});
