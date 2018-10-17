// Capture Button Click //

$("#add-artist").on("click", function(event){
   event.preventDefault();
})

// Click Submit-Button //

$("#submit-button").on("click", function(event){
   event.preventDefault();
   //console.log($('#artist').val());
   var artist = $("#artist").val().trim();

   loadDoc(artist);
});

// Send Request to Server //

function loadDoc(artistName) {
   var queryURL="https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=EmeiA0oiWGnbz7iXCD6XGf5YLb9StWec&keyword="+artistName;
   console.log(queryURL)

   $.ajax({url:queryURL,method:'GET'})
   .done(function(response){
       console.log(response);
       $('#artist').prepend("<p>Artist: "+response.data[i].artist+"</p>");
   });
};