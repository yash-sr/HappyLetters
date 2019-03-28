document.getElementById("ho").onload = () => {

  var dbRefObject = firebase.database().ref()
          var count = 0;
               console.log('test log'); // logging
           
               // Sync object changes
               dbRefObject.on('value', snap => {
                 var data = snap.val();
                console.log()
               });
            };
