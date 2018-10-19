// Capture Button Click //

$("#add-artist").on("click", function(event){
    event.preventDefault();
 });
 
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
    console.log(queryURL);
 
    $.ajax({url:queryURL,method:'GET'})
    .done(function(response){
        if(response.page.totalPages<1){
            console.log("Artist not Available");
        }
        else{
            console.table(response._embedded.attractions[0]);
            if(response._embedded.attractions[0].upcomingEvents._total>0){
                getEvents(response._embedded.attractions[0].id);
            }
            else{console.log("Artist Has No Upcoming Shows")};
        }
    });
 }
 
 function getEvents(artistId){
    var queryURL="https://app.ticketmaster.com/discovery/v2/events.json?apikey=EmeiA0oiWGnbz7iXCD6XGf5YLb9StWec&attractionId="+artistId;
 
    $.ajax({
     url:queryURL,
     method:'GET'
   })
   .done(function(response){
     // console.table(response._embedded.events);
     var events = response._embedded.events;
     if(events.length >= 10){
       for (var i = 0; i < 10; i++) {
         var event = events[i];
         var eventArr = [
           event.name,
           event._embedded.venues[0].name,
           event._embedded.venues[0].city.name,
           event._embedded.venues[0].state.stateCode,
           event._embedded.venues[0].country.countryCode,
           event.url,
           event.dates.start.localDate,
           event.dates.start.localTime,
           'Min Price: ' + event.priceRanges[0].min + event.priceRanges[0].currency,
           'Max Price: ' + event.priceRanges[0].max + event.priceRanges[0].currency
         ];
         console.table(eventArr);
       }
     } else{
       for (var i = 0; i < events.length; i++) {
         var event = events[i];
         var eventArr = [
           event.name,
           event._embedded.venues[0].name,
           event._embedded.venues[0].city.name,
           event._embedded.venues[0].state.stateCode,
           event._embedded.venues[0].country.countryCode,
           event.url,
           event.dates.start.localDate,
           event.dates.start.localTime,
           'Min Price: ' + event.priceRanges[0].min + event.priceRanges[0].currency,
           'Max Price: ' + event.priceRanges[0].max + event.priceRanges[0].currency
         ];
         console.table(eventArr);
       }
     }
   });
 }