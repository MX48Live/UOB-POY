$(document).ready(function () {
  //Find length of image
  var galleryLength = $('.box').find('.img').length;
  var galleryArray = [];

  //Add index to image
  var i = 0;
  $.each($('.box'), function(){
    var category = $(this).attr('data-category');
    var imgURL = $(this).attr('data-image');
    var nameTH = $(this).find('p.name span.th').text();
    var nameEN = $(this).find('p.name span.en').text();
    var descTH = $(this).attr('data-desc-th');
    var descEN = $(this).attr('data-desc-en');
    var projectNameTH = $(this).find('.project-name span.th').text();
    var projectNameEN = $(this).find('.project-name span.en').text();
    var mediumTH = $(this).find('.medium span.th').text();
    var mediumEN = $(this).find('.medium span.en').text();
    var size = $(this).find('.size span.th').text();
    $(this).find('.img').attr('gallery-no', i);

    galleryArray.push([i,category,nameTH,nameEN,imgURL,descTH,descEN,projectNameTH,projectNameEN,mediumTH,mediumEN,size]);
    i++
  });
  // console.log(galleryArray);
  
  //Get image position (i)
  $('.box').on('click', function(){
    var imgNo = parseInt($(this).find('.img').attr('gallery-no'));
    var imagURL = $(this).find('.img').attr('data-image');


    //add navigation
    $('body').addClass('gallery-scroll-lock');
    $('body').prepend('<div class="gallery-fullscreen"></div>');
    $('.gallery-fullscreen').prepend('<div class="close">x</div>');
    $('.gallery-fullscreen').prepend('<div class="gallery-control"></div>');
    $('.gallery-fullscreen').prepend('<div class="description"><img src=""></div>');
    $('.gallery-fullscreen').prepend('<div class="image"></div>');
    $('.gallery-control').append('<a href="#" class="prev"><i class="fa fa-arrow-left" aria-hidden="true"></i></a> <div class="img-no"><span class="current-number"></span> / <span class="max-number"></span></div> <a href="#" class="next"><i class="fa fa-arrow-right" aria-hidden="true"></i></a>');
    $('.gallery-fullscreen').append('<div class="detail"><div class="container"><div class="toggle"><p><i class="fa fa-angle-double-down" aria-hidden="true"></i> Show Info<p></div><div class="category"></div></div>            <div class="container"><div class="thai"></div><div class="english"></div></div></div>');

    //Default initiate value
    $('.gallery-fullscreen span.current-number').append(imgNo+1);
    $('.gallery-fullscreen span.max-number').append(galleryLength);
    $('.gallery-fullscreen .detail .category').append('<p><strong>'+galleryArray[imgNo][1]+'</strong></p>');
    $('.gallery-fullscreen .image').append('<img src="'+galleryArray[imgNo][4]+'">');
    $('.gallery-fullscreen .detail .thai').append('<p style="margin-bottom: 5px;"><strong>'+galleryArray[imgNo][2]+'</strong></p>');
    $('.gallery-fullscreen .detail .thai').append('<p>ชื่อผลงาน: '+galleryArray[imgNo][7]+'</p>');
    $('.gallery-fullscreen .detail .thai').append('<p>ประเภท: '+galleryArray[imgNo][9]+'</p>');
    $('.gallery-fullscreen .detail .thai').append('<p style="margin-bottom: 5px;">ขนาด (ซม): '+galleryArray[imgNo][11]+'</p>');
    $('.gallery-fullscreen .detail .thai').append('<p style="margin-bottom: 15px;">'+galleryArray[imgNo][5]+'</p>');

    $('.gallery-fullscreen .detail .english').append('<p style="margin-bottom: 5px;"><strong>'+galleryArray[imgNo][3]+'</strong></p>');
    $('.gallery-fullscreen .detail .english').append('<p>Title: '+galleryArray[imgNo][8]+'</p>');
    $('.gallery-fullscreen .detail .english').append('<p>Medium: '+galleryArray[imgNo][10]+'</p>');
    $('.gallery-fullscreen .detail .english').append('<p style="margin-bottom: 5px;">Size (cm): '+galleryArray[imgNo][11]+'</p>');
    $('.gallery-fullscreen .detail .english').append('<p style="margin-bottom: 15px;">'+galleryArray[imgNo][6]+'</p>');

    //Change value NEXT
    $('.gallery-control a').on('click', function(){
      $('.gallery-fullscreen span.current-number').empty();
      $('.gallery-fullscreen span.max-number').empty();
      $('.gallery-fullscreen .detail .category').empty();
      $('.gallery-fullscreen .image').empty();
      $('.gallery-fullscreen .detail .thai').empty();
      $('.gallery-fullscreen .detail .english').empty();

      if($(this).hasClass('next') === true){
        if(imgNo+1 < galleryLength) {
          imgNo++
        } else {
          imgNo = 0;
        }
      }
      if($(this).hasClass('prev') === true){
        if(imgNo < 1) {
          imgNo = galleryLength-1;
        } else {
          imgNo--
        }
      }      
      $('.gallery-fullscreen span.current-number').append(imgNo+1);
      $('.gallery-fullscreen span.max-number').append(galleryLength);

      $('.gallery-fullscreen .image').append('<img src="'+galleryArray[imgNo][4]+'">');
      $('.gallery-fullscreen .detail .category').append('<p><strong>'+galleryArray[imgNo][1]+'</strong></p>');
      $('.gallery-fullscreen .detail .thai').append('<p style="margin-bottom: 5px;"><strong>'+galleryArray[imgNo][2]+'</strong></p>');
      $('.gallery-fullscreen .detail .thai').append('<p>ชื่อผลงาน: '+galleryArray[imgNo][7]+'</p>');
      $('.gallery-fullscreen .detail .thai').append('<p>ประเภท: '+galleryArray[imgNo][9]+'</p>');
      $('.gallery-fullscreen .detail .thai').append('<p style="margin-bottom: 5px;">ขนาด (ซม): '+galleryArray[imgNo][11]+'</p>');
      $('.gallery-fullscreen .detail .thai').append('<p style="margin-bottom: 15px;">'+galleryArray[imgNo][5]+'</p>');

      $('.gallery-fullscreen .detail .english').append('<p style="margin-bottom: 5px;"><strong>'+galleryArray[imgNo][3]+'</strong></p>');
      $('.gallery-fullscreen .detail .english').append('<p>Title: '+galleryArray[imgNo][8]+'</p>');
      $('.gallery-fullscreen .detail .english').append('<p>Medium: '+galleryArray[imgNo][10]+'</p>');
      $('.gallery-fullscreen .detail .english').append('<p style="margin-bottom: 5px;">Size (cm): '+galleryArray[imgNo][11]+'</p>');
      $('.gallery-fullscreen .detail .english').append('<p style="margin-bottom: 15px;">'+galleryArray[imgNo][6]+'</p>');
    });

    //Toggle Detail block 
    $('.gallery-fullscreen .toggle').find('p').on('click', function(){
      $('.gallery-fullscreen .detail').toggleClass('show');
    });
    //Close the Gallery
    $('.gallery-fullscreen .close').on('click', function(){
      $('body').removeClass('gallery-scroll-lock');
      $('.gallery-fullscreen').remove();
    });
  });


});