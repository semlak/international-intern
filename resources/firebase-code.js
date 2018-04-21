

// Firebase photo storage code

// Firebase initialization for project three .

// <script src="https://www.gstatic.com/firebasejs/4.13.0/firebase.js"></script>



  var config = {
    apiKey: "AIzaSyCSuecWnnFJo55VAuiEzvSfR1xLNRuwwkI",
    authDomain: "intern-project-4b679.firebaseapp.com",
    databaseURL: "https://intern-project-4b679.firebaseio.com",
    projectId: "intern-project-4b679",
    storageBucket: "",
    messagingSenderId: "1037796012544"
  };


firebase.initializeApp(config);


$(document).ready(function(){

    $("#submit").on("click", function(e){
        e.preventDefault();

        // Get Elements
        var uploader = document.getElementById("uploader");
        var fileButton = document.getElementById("dog_file");

        // Get file
        var file = fileButton.files[0];
        console.log(file);

        // Create storage ref
        var storageRef = firebase.storage().ref("profile_pics/" + Date.now() + file.name);

        // Upload file
        var task = storageRef.put(file);

        var dogImage = "";
   

        // Update progress bar
        task.on("state_changed",
            function progress(snapshot) {
                console.log(snapshot);
            },

            function error (err) {
            },

            function complete() {
                console.log("COMPLETE!");

                // Once complete - get the stored image URL
                storageRef.getDownloadURL().then(function(url) {

                    dogImage = url;
                    localStorage.setItem("myDogUrl", dogImage);
                    localStorage.setItem("myDogName", $("input[name='dog_name']").val().trim());
                    localStorage.setItem("myDogComment", "Woof! Woof!");
                    console.log("dog,dog,dog");
                    console.log(dogImage);

                    var dogRecord = {
                        dogName: $("input[name='dog_name']").val().trim(),
                        ownerName: $("input[name='owner_name']").val().trim(),
                        dogPhoto: dogImage
                    }

                    console.log(dogRecord);


                    $.post("/api/newDog", dogRecord,
                        function(data){
                        console.log("we are hitting it");
                        console.log(data);
                        window.location.href = "/dashboard";
                    });

            });

        });

    });

});
