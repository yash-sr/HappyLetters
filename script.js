var firebase = require("firebase");
var config = require('./HappyLetters/config.json');


firebase.initializeApp(config);

var letterData={ l1:
  { content: 'letter for Yash', date: '28-3-2019', time: '00:43' }};
var dbRefObject = firebase.database().ref();
dbRefObject.once('value', (snap)=>{
letterData = snap.val().letter;
console.log(letterData);
})
firebase.database().ref().update({
  count: 1,
  letter: letterData
});




var five = require("johnny-five"),
  board, photoresistor, servo;

board = new five.Board();
board.on("ready", function() {



  // Create a new `photoresistor` hardware instance.
  photoresistor = new five.Sensor({
    pin: "A2",
    freq: 700
  });

  //Create a new Servo
  servo = new five.Servo({
    pin: 10,
    startAt: 0,
    range: [0, 110],
    
  });



  led= new five.Led(7);

  // Inject the `sensor` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    pot: photoresistor
  });
  var counter = 1;

  function writeUserData() {
   
   counter++;
   var d= new Date();
   var currtime = `${d.getHours()}:${d.getMinutes()}`;
   var currdate = `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`;
   newLetterData ={
   ["l"+counter]  : {
     content: "Got a new letter",
     date: currdate,
     time: currtime
   }}

   function jsonConcat(o1, o2) {
    for (var key in o2) {
     o1[key] = o2[key];
    }
    return o1;
   }

  var finalLetterData ={};
  finalLetterData = jsonConcat(letterData, newLetterData);
// finalLetterData = jsonConcat(finalLetterData, newLetterData);

   console.log(finalLetterData);

    firebase.database().ref().update({
      count: counter,
      letter: finalLetterData
    }).then(()=>    console.log("curr count:",counter))
  }

// var flag=false;
var check=false;
var trig=0;
  // "data" get the current reading from the photoresistor
  photoresistor.on("data", function() {
    
    // console.log(this.value);
    if(this.value>1000){
      
      if(check==false) {
        writeUserData();
        check=true;
      }
      servo.to(110);
    led.on();
  }
    else {
      trig+=1;
      if(trig>3){
      led.off();
      trig=0;
      servo.to(0);      
      check=false;
      }
    };
  });


});
