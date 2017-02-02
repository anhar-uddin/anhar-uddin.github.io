$(document).ready(function () {

  'use strict'

  // Loading heavy images with placeholder firstly
  if (document.querySelector('.js-header-background')){
    var headerBlock = document.querySelector('.js-header-background');
    // load large image and show it
    var imgLarge = new Image();
    var imgSmall = headerBlock.querySelector('.js-hero-image-small');
    imgLarge.src = headerBlock.dataset.large;
    imgLarge.classList.add('hero__image');
    imgLarge.addEventListener('load', function (event) {
      headerBlock.classList.add('hero__image-block--is-loaded');
      insertAfter(imgLarge, imgSmall);
    });
  }

  // Append child after certain element
  function insertAfter(elem, refElem) {
    var parent = refElem.parentNode;
    var next = refElem.nextSibling;
    if (next) {
      return parent.insertBefore(elem, next);
    } else {
      return parent.appendChild(elem);
    }
  }

  // Main nav menu actions
  var toggleMenu = function() {
    $('.js-main-header').toggleClass("main-header--is-shown");
    $('.js-mobile-menu-btn .icon-bar').toggleClass("icon-bar--is-toggled");
    $('.js-main-header__brand').toggleClass("main-header__brand--is-hidden");
  }

  $(".js-mobile-menu-btn").on('click', function () {
    toggleMenu();
  });

  // Masonry grid
  // external js: masonry.pkgd.js, imagesloaded.pkgd.js
  // init Masonry
  if (document.querySelector('.grid')){
    var $grid = $('.grid').masonry({
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      gutter: '.gutter-sizer',
      percentPosition: true
    });
    // layout Isotope after each image loads
    $grid.imagesLoaded().progress( function() {
      $grid.masonry();
    });
  };

  // Like button - comment section
  $('.js-comment-like').on('click', function(event){
    $(this).toggleClass('comment__like--is-like');
  });

  // Comment form action
  $('#comment-form').on('submit', function () {
      var name = $('input[name="username"]').val();
      var email = $('input[name="email"]').val();
      var message = $('input[name="comment"]').val();

      var formData = {
          name: name,
          email: email,
          message: message
      };

      $.ajax({
        type: "POST",
        url: '/comment.php',
        data: formData,
        success: function() {
          $('#form-submit-errors').text("Success!");
        },
        error: function() {
          $('#form-submit-errors').text("Something went wrong...");
        }
      });

      return false;
  });

  // Contact form action
  $('#contact-form').on('submit',function () {
      var name = $('input[name="username"]').val();
      var email = $('input[name="email"]').val();
      var message = $('input[name="comment"]').val();

      var formData = {
          name: name,
          email: email,
          message: message
      };

      $.ajax({
        type: "POST",
        url: '/contact.php',
        data: formData,
        success: function() {
          $('#form-submit-errors').text("Success!");
        },
        error: function() {
          $('#form-submit-errors').text("Something went wrong...");
        }
      });

      return false;
  });

  // Filtering for portfolio
  if (document.querySelector('.js-sorting-btns')){
    var sortingBtns = $('.js-sorting-btns');
    var prevActiveBtn = sortingBtns.find('.sort-nav__item--is-active');
    sortItems(sortingBtns, prevActiveBtn);
  }

  function sortItems(buttonsList, prevActiveBtn){
    buttonsList.on('click', 'button', function(event){
      event.preventDefault();
      var targetBtn = $(event.target);

      if (prevActiveBtn) prevActiveBtn.removeClass('sort-nav__item--is-active');

      targetBtn.addClass('sort-nav__item--is-active');
      prevActiveBtn = targetBtn;

      var targetTag = targetBtn.data('sorting-target-tag');
      if ($grid){
        var portfolioItems = $('.grid-item');
      } else{
        var portfolioItems = $('.js-sorted-blocks').children();
      }

      if (targetTag === 'all') {
        portfolioItems.fadeIn('slow', function(){
          if ($grid) $grid.masonry();
        });
      } else {
        portfolioItems.hide('slow', function(){
          if ($grid) $grid.masonry();
        });
      }

      portfolioItems.each(function(index, value){
        var item = $(value);
        if (item.data('sorting-tag') === targetTag) {
          item.fadeIn('slow', function() {
            if ($grid) $grid.masonry();
          });
        }
      });
    });
  }

  // lightGallery inicialization
  if (document.getElementById('lightgallery')) {
     $("#lightgallery").lightGallery();
  }
});
