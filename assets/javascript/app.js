$(document).ready(function () {

  // Add api key and query url to retrieve data from giphy

  $("button").on("click", function () {

    // clear out previous gifs

    $("#gifs").empty();

    //Create variable for api key and input

    var apiKey = "ncuShis3xZz2zQx406kYlQCJjqb2lzqH";
    var input = $(this).data("name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + input + "&limit=10&offset=0&rating=G&lang=en";


    // Set the ajax method to GEt

    $.ajax({
        url: queryURL,
        method: 'GET'
      })
      .done(function (response) {

        // Console log response o make sure dat is pulling


        // Set variable for the data from the database

        var foodData = response.data;

        // Create for loop to loop through the food data

        for (var i = 0; i < foodData.length; i++) {

          // Creat variables and add html elements on the fly        

          var foodDiv = $("<div/>");

          var p = $("<p/>");

          p.text(foodData[i].rating);

          var foodImg = $("<img/>");

          foodImg.addClass("foodImage")

          //  Find still and animated images so make the gif's play and stop when clicked  

          //  Attribute food images and append and prepend them to areas

          foodImg.attr("src", foodData[i].images.fixed_height.url);

          foodImg.attr("data-still", foodData[i].images.fixed_height_still.url)

          foodImg.attr("data-animate", foodData[i].images.fixed_height.url).attr("data-state", "still");

          foodDiv.append(p);

          foodDiv.append(foodImg);

          foodDiv.prependTo($("#gifs"));
        }

        // Set up if eleses for what the images is doing when the user clicks on it

        $(".foodImage").on("click", function () {

          var state = $(this).attr("data-state");
          console.log(this);

          if (state == "still") {

            $(this).attr("src", $(this).data("animate"));

            $(this).attr("data-state", "animate");

          } else {

            $(this).attr("src", $(this).data("still"));

            $(this).attr("data-state", "still");
          }
        });
      });
  });


  // Create a function to add new buttons when the user types them in

  // Set up on click event

  $("#new-food-btn").on("click", function () {

    $("#gifs").empty();

    var input = $("#gif-input").val();


    // Don't create button if the user enters a blank response

    if (input == "") {
      return false;
    }

    // Here I tried to set the new button to allow the user to return to it later

    var newButton = $("<button/>").addClass("#gif-input").attr("data-name", input).text(input);
    console.log(input);


    $("#food-buttons").append(newButton);





    // Enter info again for the new values of the user entries to retrieve gifs

    // Set up divs and all html needed
    var apiKey = "ncuShis3xZz2zQx406kYlQCJjqb2lzqH";
    queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + input + "&limit=10&offset=0&rating=G&lang=en";


    $.ajax({
        url: queryURL,
        method: 'GET'
      })

      .done(function (response) {

        var foodData = response.data;

        for (var i = 0; i < foodData.length; i++) {

          var newFoodDiv = $("<div/>");

          var p = $("<p/>");

          p.text(foodData[i].rating);

          var foodImg = $("<img/>");

          foodImg.addClass("foodImage");

          foodImg.attr("src", foodData[i].images.fixed_height.url);

          foodImg.attr("data-still", foodData[i].images.fixed_height_still.url)

          foodImg.attr("data-animate", foodData[i].images.fixed_height.url).attr("data-state", "still");

          newFoodDiv.append(p);

          newFoodDiv.append(foodImg);

          newFoodDiv.prependTo($("#gifs"));
        }

        $(".foodImage").on("click", function () {

          var state = $(this).attr("data-state");
          console.log(this);

          if (state == "still") {

            $(this).attr("src", $(this).data("animate"));

            $(this).attr("data-state", "animate");

          } else {

            $(this).attr("src", $(this).data("still"));

            $(this).attr("data-state", "still");
          }
        });
      });

    $("#gif-input").val("");
    return false;
  })

});