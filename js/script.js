$(function() {

  // Active easy-pie-chart
  $('.chart').easyPieChart({
    barColor: "#93e4ae",
    trackColor: "#3c6",
    scaleColor: false,
    lineWidth: 14,
    lineCap: "square",
    animate: 3000
  });

  $('#sidebar a[data-toggle="collapse"]').on('click', function(e){
  	e.preventDefault();
  });

  // Make sure all columns are equal height
  if (window.document.documentElement.clientWidth > 768) {
    var maxHeight = 768;
    $('.fullheight').each(function(){
      var $el = $(this);
      var padding = parseInt($el.css('padding-top'), 10) + parseInt($el.css('padding-bottom'), 10);
      var pos = $el.offset();
      var expectedHeight = maxHeight - padding - pos.top;
      $el.height(expectedHeight);
    }); 
  }

  // Activate Bootstrap tooltips
  $('.with-tooltip').tooltip();

  // Activate Bootstrap carousel
  $('.carousel').each(function(){
    var $el = $(this);
    $el
      .carousel({pause: '',interval: 3000})
      .data({playing:true})
      .find('.pause')
      .click(function(e){
        e.preventDefault();
        $btn = $(this);
        if ($el.data('playing') == true) {
          $btn.removeClass('icon-cancel').addClass('icon-play');
          $el.carousel('pause').data({playing:false}); 
        } else {
          $btn.removeClass('icon-play').addClass('icon-cancel');
          $el.carousel('cycle').data({playing:true}); 
        }
      });
  });

  /* ========================
   * From this point, plugins
   * depend on #portfolio content
   * ========================
   */

  // This function is executed after portfolio content is loaded.
  // It just delays execution of some scripts.

  var loadCallback = function(data){

    $('#portfolio').append(data);

	// Isotope filtering 
    var $filtersContainer = $('.filters-container');

	// jScrollPane
    if (window.document.documentElement.clientWidth > 768) {
      $('.scrollable').jScrollPane({
        verticalDragMaxHeight: 90,
        verticalGutter: 10
      });
    }

    $filtersContainer.each(function(){
      var $el = $(this);
      var $containerToFilter = $( $el.data('container-to-filter') );
      if (window.document.documentElement.clientWidth > 768) {
        var scrollable = $containerToFilter.closest('.scrollable').data('jsp');
      } else {
        var scrollable = {reinitialise: function(){}};
      }

      // Check scrollbars after filtering.
	  $containerToFilter.imagesLoaded( function(){
			$containerToFilter.isotope({
				onLayout: function(){
					scrollable.reinitialise();
				},
				hiddenStyle: {'display':'none'},
				visibleStyle: {'display':'block'},
				resizable: false,
				transformsEnabled: false 
			});

      // Handle clicks.
      $el.on('click.isotope', '[data-filter]', function(e){
        e.preventDefault();
        var filter = $(this).data('filter');
        $containerToFilter.isotope({filter:filter});
      });
		});

	});
	
    // Activate panning effect on images
    $('img.panning-effect').wrap('<span class="panning-container">').each(function(){
      $(this).parent().css({'background-image': 'url(' + this.src + ')'});
    });

    // IMPORTANT: Collapse MUST be initialized after jScrollPane
    // so the first can listen to clicks.
    // Activate Collapse plugin from Bootstrap

    var collapseWithAccordions = $('.collapse').closest('.scrollable').data('jsp');
    if (window.document.documentElement.clientWidth < 768 || !collapseWithAccordions) {
      collapseWithAccordions = { reinitialise: function(){} };
    }
    $('.collapse').collapse().on('shown', function(){
      $(this).prev().find('[class*=icon-]').removeClass('icon-plus').addClass('icon-minus');
      collapseWithAccordions.reinitialise();
    }).on('hidden', function(){
      $(this).prev().find('[class*=icon-]').removeClass('icon-minus').addClass('icon-plus');
      collapseWithAccordions.reinitialise();
    });

    // fancyBox
    $('.fancybox').fancybox({padding: 3});
  	}
	
	//=================================== Button Animation =================================//
	$('#sidebar .button').hover(function() {
		$(this).toggleClass('animated wobble');
	});
	
	$('ul.socialnav li a').hover(function() {
		$(this).toggleClass('animated pulse');
	});
	
	$('nav.navbar li a, #portfolio-filter-container ul li a').hover(function() {
		$(this).toggleClass('animated fadeInLeft');
	});
	
	

  // Make ajax call for portfolio content;
  $.ajax('portfolio.html').done(loadCallback);

});
