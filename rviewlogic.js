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
          || imagesToZoomList[i].href.indexOf('.gif')!=-1)
        ){
          imagesToZoom[i].className = tempClassName + " photoPopUp"
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
     // }
      
  }
  else if(imagesToZoomList[i].href.indexOf('imgur.com')!=-1){ 
    //need to verify link before anonymous functions
    imagesToZoom[i].className = tempClassName + " photoPopUp";

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
      var substring = this.href.substring(startIndex, endIndex);

      //create link to click on image to view original link
      var alink = document.createElement("a");
      alink.setAttribute("href", this.href);
      alink.setAttribute("id", "imageLinkToClickOn" )

      var image = document.createElement("img");
      image.setAttribute("id", "actualPhoto");
      //need to do check here to see if this is an album or if sigle photo
      //single photo-> we good
      //album -> abort, just go to imgur
      image.setAttribute("src", 'http://i.imgur.com/'+ substring + '.gif');
      image.setAttribute("alt", "");

      var container= document.getElementById('photoThing').appendChild(alink);
      container = document.getElementById('imageLinkToClickOn').appendChild(image);
      });

  }
  i++;
  }


});

