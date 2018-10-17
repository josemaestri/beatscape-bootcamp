var search = function(input){
  apiURL = 'https://maps.googleapis.com/maps/api/place/autocomplete/output/';
  // ?key=AIzaSyCH0qC1zXSFhf3POWVnYUv0OnP6V27jMOc&types=(cities)&input='+input;
  // console.log(apiURL);
  $.ajax({
    url: apiURL,
    type: 'GET',
    data: {
      key: 'AIzaSyCH0qC1zXSFhf3POWVnYUv0OnP6V27jMOc',
      types: '(cities)',
      input: input
    },
  })
  .done(function(response) {
    console.log("success");
    console.log(response);
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });
  
}


// https://maps.googleapis.com/maps/api/place/autocomplete/output/?key=AIzaSyCH0qC1zXSFhf3POWVnYUv0OnP6V27jMOc&types=(cities)&callback=searchbar