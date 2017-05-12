/*jslint browser: true*/
/*global console*/

var myapp = myapp || {};
myapp.pages = myapp.pages || {};


myapp.pages.IndexPageController = function (myapp, $$) {
  'use strict';
  
  var bg = 'img/img-bg.jpg';
  var logo = 'img/logo.png';
  bg = (localStorage.getItem('bg')!=null)?localStorage.getItem('bg'):bg;
  logo = (localStorage.getItem('logo')!=null)?localStorage.getItem('logo'):logo;

  (function () {
    var options = {
      'bgcolor': "url('"+bg+"')", //'#0da6ec',
      'fontcolor': '#000',
      'onOpened': function () {
        // console.log("welcome screen opened");
        $$('a[data-cmd="never-show-welcome-screen"]').on('click',function (e) {
          welcomescreen.close();
          $$(this).attr("style","opacity:0.5;");
          localStorage.setItem('welcome-screen-status',false);
        });
      },
      'onClosed': function () {
        console.log("welcome screen closed");
        // mobile.ini();
      }
    },
    welcomescreen_slides = [
      {
        id: 'slide0',
        picture: '<div class="tutorialicon"><img width="200px" src="'+logo+'"/></div>',
        text: 'Welcome to K12 Grading System. In the <a class="tutorial-next-link color-red" href="#">next steps</a> we will guide you through a manual that will teach you how to use this app.'
      },
      {
        id: 'slide1',
        picture: '<div class="tutorialicon color-red"><img width="200px" src="'+logo+'"/></div>',
        text: 'Enter your Server\'s IP Address. If you do not know the server\'s IP Address ask your system administrator.'
      },
      {
        id: 'szlide2',
        picture: '<div class="tutorialicon color-red"><img width="200px" src="'+logo+'"/></div>',
        text: 'Login to your account. Just like in web version, login to your account to view your student\'s grades'
      },
      {
        id: 'slide3',
        picture: '<div class="tutorialicon color-red"><img width="200px" src="'+logo+'"/></div>',
        text: 'Thanks! You are now ready.<br><br><a href="#" class="button button-raised button-fill color-orange ripple-white tutorial-close-btn">Start</a>\n\n<a data-cmd="never-show-welcome-screen" style="position: relative;top: 20px;">Dont show this again</a>'
      }
    ],
    welcomescreen = myapp.welcomescreen(welcomescreen_slides, options);

    var welcomeScreen = localStorage.getItem('welcome-screen-status');
    welcomeScreen = (welcomeScreen == null) ? true : welcomeScreen;
    if((welcomeScreen == 'false')){
      welcomescreen.close();
    }
    
    $$(document).on('click', '.tutorial-close-btn', function () {
      welcomescreen.close();
    });

    $$('.tutorial-open-btn').click(function () {
      welcomescreen.open();  
      localStorage.setItem('welcome-screen-status',true);
    });
    
    $$(document).on('click', '.tutorial-next-link', function (e) {
      welcomescreen.next(); 
    });
    
    $$(document).on('click', '.tutorial-previous-slide', function (e) {
      welcomescreen.previous(); 
    });
  }());
};