//show random quotes with author

//loading page before code executes
$(document).ready(function() {
    var quote;
    var author;

    //obtaining data from a JSON api with an AJAX request
    //need JSONP b/c of access-control-origin-error
    function randomQuote() {
      $.ajax({
          url: "http://api.forismatic.com/api/1.0/",
          jsonp: "jsonp",
          dataType: "jsonp",
          data: {
              method: "getQuote",
              lang: "en",
              format: "jsonp"
          },
          //callback object to use data
          success: function( response ) {
              quote = response.quoteText;
              author = response.quoteAuthor;
              $("#quote").text(quote);
              if (author) {
                  $("#author").text("- " + author);
              } else {
                  $("#author").text("- Unknown");
              }
          }
      });
    }
    randomQuote();

    //obtaining a new quote with each click
    $("#quoteButton").click(function(event){
        event.preventDefault();
      randomQuote();
    });

    //connecting to twitter to post quote
    $("#twitterButton").click(function(event){
        event.preventDefault();
      window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(quote + "-" + author));
    });

});
