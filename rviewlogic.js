// Code created by Jordan Kravitz,


var imagesToZoom;
var imagesToZoomList; 


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
          || imagesToZoomList[i].href.indexOf('.gif')!=-1 || imagesToZoomList[i].href.indexOf('imgur.com')!=-1
          || imagesToZoomList[i].href.indexOf('livememe')!=-1) 
        ){
        imagesToZoom[i].id=i;
        var link= document.getElementById(i);
        //click logic for clicking on thumbnail
        var tempNum = i;
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
          });  
          var alink = document.createElement("a");
          alink.setAttribute("href", this.href);
          alink.setAttribute("id", "imageLinkToClickOn" )

          var image = document.createElement("img");
          image.setAttribute("id", "actualPhoto");
          image.setAttribute("src", this.href);
          image.setAttribute("alt", "");

          var container= document.getElementById('photoThing').appendChild(alink);
          container = document.getElementById('imageLinkToClickOn').appendChild(image);

        });
      }
      //scrape imgur link...get first image
      else if(imagesToZoomList[i].href.indexOf('imgur.com')!=-1){
          //yay string concatenation! 
          

          imagesToZoom[i].id=i;
          var link= document.getElementById(i);
          //click logic for clicking on thumbnail
          var tempNum = i;
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
            });  
            var startIndex= this.href.indexOf('imgur.com/')+10;//relevant part of link
            var endIndex=startIndex;
            while(this.href.charAt(endIndex))
              endIndex++;//find the end index
            var substring = imagesToZoomList[this.id].href.substring(startIndex, endIndex);
            var alink = document.createElement("a");
            alink.setAttribute("href", 'http://i.imgur.com/'+ substring + '.gif');
            alink.setAttribute("id", "imageLinkToClickOn" )

            var image = document.createElement("img");
            image.setAttribute("id", "actualPhoto");
            image.setAttribute("src", 'http://i.imgur.com/'+ substring + '.gif');
            image.setAttribute("alt", "");

            var container= document.getElementById('photoThing').appendChild(alink);
            container = document.getElementById('imageLinkToClickOn').appendChild(image);

          });
      }
      i++;
  }


});

