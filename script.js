$(document).ready(function () {
  $("#myForm").submit(function (e) {
    e.preventDefault();

    var url = $("#url").val();

    //api key from google credentials
    var apiKey = "AIzaSyC6lIYvlo5ACamiCrwdRolpPJxr4uLOQzo";

    //getting video id from the url
    var videoId = getVideoId(url);

    var apiUrl =
      "https://www.googleapis.com/youtube/v3/videos?key=" +
      apiKey +
      "&fields=items(snippet(title,description,tags,thumbnails))&part=snippet&id=" +
      videoId;

    //making a seimpe get request to youtube api.
    generateInfo(apiUrl);
  });

  //getting video id from the url
  function getVideoId(url) {
    return url.split("v=")[1];
  }

  //get info from api
  function generateInfo(apiUrl) {
    //holding data which is coming from api
    $.get(apiUrl, function (data) {
      console.log(data);

      //clear out when making a new request
      $("#result").empty();

      //clear out url input when making a new request
      $("#url").val("");

      var title = data.items[0].snippet.title;

      var description = unescape(data.items[0].snippet.description);

      var tags = data.items[0].snippet.tags;

      var thumbnail = data.items[0].snippet.thumbnails.maxres.url;

      var tagsResult = "";

      tags.forEach((tag) => {
        tagsResult += tag + ",";
      });

      //appending data in result div
      $("#result").append(`
  
              <h3 class ="text-center">Thumbnail:</h3>
  
              <img id="img" src="${thumbnail}" class="img-thumbnail" />
  
              <div class="form-group">
  
              <label for="title" class="text-center py-3 ">Title:</label>
              

              <input type="text" class="form-control" disabled="true" value="${title}"/>
  
              </div>
  
  
              <div class="form-group">
  
              <label for="description" class="text-center py-3" >Description:</label>
              
              <textarea cols="12" rows="9" class="form-control" disabled="true">${description}</textarea>
  
              </div>
  
  
              <div class="form-group">
  
              <label for="tags" class="text-center py-3">Tags:</label>
              
              <textarea cols="12" rows="5" class="form-control" disabled="true">${tagsResult}</textarea>
  
              </div>
              
              `);
    });
  }
});
