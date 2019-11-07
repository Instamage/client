//Makes sign up / registration form visible & hides sign in form

jQuery(function($){
	$('.accountb a').click(function(){
	$('.register').show()
	})

	$(document).ready(function(){
	$(".accountb a").click(function(){
		$(".signin").hide();
	});
		
});
})

//Hides sign up / registration form & makes sign in form visible again

$(document).ready(function(){
	$('.accounta a').click(function(){
	$('.signin').show()
	})

	$(document).ready(function(){
	$(".accounta a").click(function(){
		$(".register").hide();
	});
		
});
})