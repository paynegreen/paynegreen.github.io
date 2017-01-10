$(document).ready(function () {
	$('#toggle').click(function () {
		if ($("#toggle").hasClass("not-loaded")) {
			$("#demo-settings").show();
			$("#toggle").removeClass("not-loaded");
		}; 
		if ($("#toggle").hasClass("open")) {
			$("#demo-settings").animate({left:"-=320"}, 200);
			$("#toggle").animate({left:"0"}, 200);
			$("#toggle").removeClass("open");
		} else {
			$("#demo-settings, #toggle").animate({left:"+=260"}, 200);
			$("#toggle").addClass("open");
		}
	})

	var $id;
	var $oldBg = 'shattered';
	$(".change").click(function () { 
		$('.change').removeClass('active');
		$(this).addClass('active');
		$id = $(this).attr('id');
		$("#hypnosis-bg").hide();
	    $("body").removeClass($oldBg);
	    $("body").addClass($id);
	    $oldBg = $id;
	});

	var $id2;
	var $oldShadow = 'light-shadow';
	$(".shadow").click(function () { 
		$('.shadow').removeClass('active');
		$(this).addClass('active');
		$id2 = $(this).attr('id');
	    $("body").removeClass($oldShadow);
	    $("body").addClass($id2);
	    $oldShadow = $id2;
	});
});// JavaScript Document