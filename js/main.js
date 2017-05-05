$(document).ready(function() {
	var searchIcon = $('#searchIcon');
	var searchBox = $('#searchBox');
	var cross = $('#cross');

	searchIcon.click(function() {
		searchIcon.hide();
		searchBox.removeClass('hide').addClass('active').animate({
			width: '60%'
		}, 1000, function() {
			cross.removeClass('hide').addClass('cross');
		});
	});

	cross.click(function() {
		cross.removeClass('cross').addClass('hide');
		searchBox.animate({
			width: '10%'
		}, 1000, function() {
			searchBox.removeClass('active').addClass('hide');
			searchIcon.show();
		});
	});

	searchBox.keypress(function(e) {
		if (e.keyCode===13) {
		
		var searchString=searchBox.val();
		
		$.ajax({
			url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max',
			data: {
				gsrsearch:searchString
			},
			dataType: 'jsonp',
			jsonp: "callback",
			success: function(data) {
				
					var ulbox=$('#searchContent');
					ulbox.empty();
					var pages=data.query.pages;
					
					var arrIndex=[0];
					
					for (var k in pages) {
						arrIndex[pages[k].index]=k;								
					}
					
					for (var i=1;i<arrIndex.length;i++)
		
					{
										
					var templi=$('<li></li>');
					var tempspan=$('<span></span>');
					tempspan.text(pages[arrIndex[i]].title);
					var tempa=$('<a></a>');
					tempa.attr({'href':'https://en.wikipedia.org/?curid='+arrIndex[i],'target':'_blank'});
					tempa.text(pages[arrIndex[i]].extract);
					templi.append(tempspan,tempa);
					ulbox.append(templi);
					
					}
					
					
					$('#searchContent li').hover(function(){
						$(this).children('span').toggleClass('litodo');
						$(this).children('a').toggleClass('atodo');
					});
			}
		});

		
		}
		
		
	});




});