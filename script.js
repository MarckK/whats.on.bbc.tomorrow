// TV Schedule example

$(document).ready(function(){
  retrieveGenres();

  $(document).on('click', 'li', function() {
    getTomorrowsSchedule($(this).attr("id"));
})})



function retrieveGenres() {
  // AJAX call using jQuery that retrieve and process the result
    $.ajax({
    url: "http://www.bbc.co.uk/tv/programmes/genres.json",
    dataType: 'json',
 //   beforeSend: function() {
//$("#programmes").empty();
//    }
    }).done(function(data) {
        getGenresList(data);
    })
}


function getGenresList(data) {
    $(data.categories).each(function() {
        $("#genres").append("<li id=\"" + this.key + "\">" + this.title + "</li>");
 //       $("li")
  //          .attr("id", this.key)
 //           .html(this.title)
  //          .appendTo("#genres");
    })
}


function getTomorrowsSchedule(genre) {
    $("#programmes").empty();
    var url = "http://www.bbc.co.uk/tv/programmes/genres/" + genre + "/schedules/tomorrow.json";
    $.getJSON(url, function(data) {
        console.log(data.broadcasts);
        processEpisode(data.broadcasts);
       
    })
}

function processEpisode(episodes) {
    $.each(episodes, function(index, episode) {
    var item_html = "<li></li>"
    var image = "<img src=http://ichef.bbci.co.uk/images/ic/272x153/image/" + episode.programme.image.pid + ".jpg />";
 //   if (episode.programme.image === undefined || episode.programme.image.pid === undefined) {
  //    image = "<img src=http://placehold.it/272x153 />";
 //   }
    item_html +=  "<h2>\"" + episode.programme.display_titles.title + "\"</h2>" +
          "<h2>\"" + episode.programme.short_synopsis + "\"</h2>" +
          "<h2>" + formatDate(episode.start, episode.end) + "</h2>" +
          "<h2>" + "Duration: " + (episode.programme.duration / 60) + " minutes" + "</h2>" +
          "<h2>" + episode.programme.ownership.service.title + "</h2>" +
          "<img src=http://ichef.bbci.co.uk/images/ic/272x153/image/" + episode.programme.image.pid + ".jpg />"
          ;
    $("#programmes").append(item_html);
  })
}

 function formatDate(start, end) { 

    var start_date = new Date(start);
    var end_date = new Date(end);

    var day = start_date.getDate();
    var month = start_date.getMonth() + 1; // the returned months are 0-11
    var year = start_date.getFullYear();

    var start_hour = start_date.getHours();
    var start_mins = start_date.getMinutes();

    var end_hour = end_date.getHours();
    var end_mins = end_date.getMinutes();

    var date = day + "/" + month + "/" + year + " ";

    // add leading 0 and return last two characters to make sure we use 00:00 format
    date +=  ("0"+start_hour).slice(-2) + ":" + ("0"+start_mins).slice(-2) + " - " +
        ('0' + end_hour).slice(-2) + ":" +  ( "0" + end_mins).slice(-2);

    return date;
}
