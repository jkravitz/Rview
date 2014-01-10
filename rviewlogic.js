// Code created by Jordan Kravitz, jkravitz61@gmail.com
// Feel free to use any part of this code for non-monetary projects. Please contact me otherwise.

var imagesToZoom;
var imagesToZoomList; 

document.onkeydown = function(e) {
  if (e.keyCode == 27) { 
    var toDelete = document.getElementById('photoThing');
    if(!toDelete)
      toDelete = document.getElementById('videoThing');
    if(toDelete)
      toDelete.remove();
   }   
};

// Run script as soon as the document's DOM is ready...on reddit this never happens so extension forces it
document.addEventListener('DOMContentLoaded', function () {
 imagesToZoomList = document.getElementsByClassName('thumbnail');
 imagesToZoom = [].slice.call(imagesToZoomList);// turns into an array so it can be worked with like normal js
  //alert(imagesToZoom[0].href);
  var i =0;
  while(imagesToZoom[i]){
      var tempClassName = imagesToZoom[i].className;
      //only want nodes that arent 'default' or 'self' aka thumbnails that are useful
      if(tempClassName.indexOf('self')== -1 && tempClassName.indexOf('default')== -1 && 
        ( imagesToZoomList[i].href.indexOf('.png')!=-1 || imagesToZoomList[i].href.indexOf('.jpg')!=-1
          || imagesToZoomList[i].href.indexOf('.gif')!=-1)
        ){
          imagesToZoom[i].className = tempClassName + " photoPopUp"

          imagesToZoom[i].id=i;
          var link= document.getElementById(i);
          //click logic for clicking on thumbnail
          link.addEventListener('click', function(link){
            //function that occurs when a thumbnail is clicked
            link.preventDefault();
            var divContainer = document.createElement('div');
            divContainer.setAttribute('id', 'photoThing');
            document.body.appendChild(divContainer);
            divContainer.addEventListener('click', function(){
               document.getElementById('photoThing').remove();
            });
            divContainer.addEventListener('backbutton', function(){
              document.getElementById('photoThing').remove();
              //somehow override default...
            });  
            var photoContainer = document.createElement('div');
            photoContainer.setAttribute('id', 'actualPhotoContainer');
            divContainer.appendChild(photoContainer);

            var alink = document.createElement("a");
            alink.setAttribute("href", this.href);
            alink.setAttribute("id", "imageLinkToClickOn" )

            var image = document.createElement("img");
            image.setAttribute("id", "actualPhoto");
            image.setAttribute("src", this.href);
            image.setAttribute("alt", "");

            photoContainer.appendChild(alink);
            alink.appendChild(image);



          });      
      }
      else if(imagesToZoomList[i].href.indexOf('imgur.com')!=-1){ 
        //need to verify link before anonymous functions
        imagesToZoom[i].className = tempClassName + " photoPopUp";

        imagesToZoom[i].id=i;
        var link= document.getElementById(i);
        //click logic for clicking on thumbnail
        link.addEventListener('click', function(link){
        //function that occurs when a thumbnail is clicked
          link.preventDefault();
          var divContainer = document.createElement('div');
          divContainer.setAttribute('id', 'photoThing');
          divContainer.addEventListener('click', function(){
             document.getElementById('photoThing').remove();
          });
          divContainer.addEventListener('backbutton', function(){
            document.getElementById('photoThing').remove();
          });  
          var startIndex= this.href.indexOf('imgur.com/')+10;//relevant part of link
          var endIndex=startIndex;
          while(this.href.charAt(endIndex))
            endIndex++;//find the end index
          var substring = this.href.substring(startIndex, endIndex);

          var photoContainer = document.createElement('div');
          photoContainer.setAttribute('id', 'actualPhotoContainer');

          //create link to click on image to view original link
          var alink = document.createElement("a");
          alink.setAttribute("href", this.href);
          alink.setAttribute("id", "imageLinkToClickOn" )

          var image = document.createElement("img");
            image.setAttribute("src", 'http://i.imgur.com/'+ substring + '.gif');
          if(image.width>0 && image.height>0){//real image, not an album
            image.setAttribute("id", "actualPhoto");
            image.setAttribute("alt", this.href);
            /*image.onerror = function (e) {
              alert(e)
                window.location.replace(e.href); //quit popup photo
            };*/
            document.body.appendChild(divContainer);
            divContainer.appendChild(photoContainer);
            photoContainer.appendChild(alink);
            alink.appendChild(image);
          }
          else{
            window.location.href = this.href; //quit popup photo
          }

          });

      }
      else if(imagesToZoomList[i].href.indexOf('youtube')!=-1 && imagesToZoomList[i].href.indexOf('v=')!=-1){//could link to comments and such
        imagesToZoom[i].id=i;
        imagesToZoom[i].className = tempClassName + " youtubePopUp";

        var link= document.getElementById(i);
        //click logic for clicking on thumbnail
        link.addEventListener('click', function(link){
          //function that occurs when a thumbnail is clicked
          link.preventDefault();
          var divContainer = document.createElement('div');
          divContainer.setAttribute('id', 'videoThing');
          document.body.appendChild(divContainer);
          divContainer.addEventListener('click', function(){
             document.getElementById('videoThing').remove();
          });
          divContainer.addEventListener('backbutton', function(){
            document.getElementById('videoThing').remove();
            //somehow override default...   
          });  
          var videoContainer = document.createElement('div');
          videoContainer.setAttribute('id', 'actualVideoContainer');
          divContainer.appendChild(videoContainer);

          var startYoutubeAddress = this.href.indexOf('v=') + 2;
          var endYoutubeAddress = startYoutubeAddress;
          while (this.href.charAt(endYoutubeAddress))
            endYoutubeAddress++;
          var videoSubAddress = this.href.substring(startYoutubeAddress,endYoutubeAddress);
          //var video =  '<iframe title="YouTube video player" class="youtube-player" type="text/html" width="640" height="390" src="' + this.href + ' frameborder="0" allowFullScreen></iframe>';
          var videoToAdd = document.createElement('iframe');
          videoToAdd.title = "YouTube video player";
          videoToAdd.class = "youtube-player"; 
          videoToAdd.type = "text/html";
          videoToAdd.width = 640;
          videoToAdd.height = 390;
          videoToAdd.src = "http://www.youtube.com/embed/" + videoSubAddress;//qw1vm_wdpy0"//this.href;
          videoToAdd.frameBorder =0;


          //videoToAdd.setAttribute(allowFullScreen,"");
         // video.setAttribute("id", "actualVideo");
          document.getElementById('actualVideoContainer').appendChild(videoToAdd);
        });  
      }
  i++;
  }


});



