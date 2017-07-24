//////////////////////////////////////////////////////////////////////////
//                                                                      //
//                                                                      //
//           Coded by Alex Collin for freecodecamp's assignment         //
//                      "Random Quote Generator"                        //
//                                                                      //
//                                                                      //                
//////////////////////////////////////////////////////////////////////////
var quoteApi = 'https://crossorigin.me/https://talaikis.com/api/quotes/random/';
var wikiApi = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=';
var twitterApi = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=';
var category;
var quote;
var author;
var wikiLink;


//Stuff to do on page load...
$(document).ready(function() {
    //Dynamicaly rearange some elements based on window size
    $(window).on('resize', function() {
        reorder();
    });
    //Event listener for generated content via javascript
    $(document).on("click", "#generate", function() {
        callQuote();
    });
    callQuote();
    reorder();
});


//Wikipedia API call based on Quote Author Name
function wikiSearch(term) {
    $.ajax({
        url: wikiApi + term + '&format=json&callback=?',
        method: 'GET',
        dataType: "json",
        success: function(data, status, JqXHR) {
            console.log(data);
            $(".wiki").html(data[2][0]);
            wikiLink = data[3][0];
            console.log(wikiLink);
        }
    });
}

//Main API call. GETting random quotes genres and authors.
function callQuote() {

    $("#generate").html('<div class="loader"></div>');

    $.ajax({
        url: quoteApi,
        method: 'GET',
        dataType: "json",
        success: function(data) {
            console.log(data);
            category = data.cat;
            quote = data.quote;
            author = data.author;
            $(".categ").html("Category: " + category);
            $(".quote").html('"' + quote + '"');
            $(".auth").html(author);
            wikiSearch(author);

            $("#generate").text('Generate');
        }
    });
}

//Dynamic element reorder function
function reorder() {
    if ($(window).width() > 1199 - 17) {
        $('#title1').html('');
        $('#title2').html('A better Random Quote Generator');
        $("#generate,#tweet,#gotowiki").remove();
        $('#aboutCont').append('<div class="btngroup"><div id="generate" class="genbtn">Generate</div><div id="gotowiki" class="genbtn">See on Wikipedia</div><i id="tweet" class="fa fa-twitter" aria-hidden="true"></i></div>');
    } else {
        $('#title2').html('');
        $('#title1').html('A better Random Quote Generator');
        $("#generate,#tweet,#gotowiki").remove();
        $('#1stcol').append('<div class="btngroup"><div id="generate" class="genbtn">Generate</div><div id="gotowiki" class="genbtn">See on Wikipedia</div><i id="tweet" class="fa fa-twitter" aria-hidden="true"></i></div>');
    }
};

// Opens new window to share the current quote on Twitter
$(document).on('click', '#tweet', function() {

    window.open(twitterApi + encodeURIComponent('"~' + quote + '~"\n' + author + '\nhttps://codepen.io/duelstein/full/VzZzPP/'), '2ndwindow', 'width=550, height=500');

});
//Open Wikipedia Page of current Author
$(document).on('click', '#gotowiki', function() {

    window.open(wikiLink, 'wikipediaAuthor', 'width=700, height=900');

});