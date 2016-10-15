import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
  
  window.fbAsyncInit = function() {
    FB.init({
      appId      : 'YOUR_APP_ID',
      xfbml      : true,
      version    : 'v2.8'
    });
    FB.AppEvents.logPageView();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
     
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
  'click .fb-login-btn'(){
      console.log('User click the login btn');
      
      FB.login(function(response){
        if (response.status === 'connected') {
            // Logged into your app and Facebook.
            console.log('connected');
            
            console.log(response.authResponse.accessToken);
        } else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app
            console.log('not_authorized');
        } else {
            console.log('not even login');
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
        }
      },{scope:['manage_pages','publish_pages']});
  }
});
