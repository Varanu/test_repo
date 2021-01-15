document.addEventListener('DOMContentLoaded', function() {

	window.addEventListener('scroll', breadcrumbFunction);
	window.addEventListener('scroll', visitClujFunction);
	window.addEventListener('scroll',cultureFunction);
	window.addEventListener('scroll',informationFunction);
	window.addEventListener('scroll',locationsFunction);



	var breadcrumb = document.querySelector("#wrapperBreadcrumb");
	var sticky = breadcrumb.offsetTop;

	var navbarHeight=$(document.querySelector("nav")).height();
	var breadcrumbHeight=$(document.querySelector("#wrapperBreadcrumb")).height();
	var navbarBreadcrumbHeight=navbarHeight+breadcrumbHeight;

	function breadcrumbFunction() {
		if (window.pageYOffset >= sticky) {
			breadcrumb.classList.add("sticky")
		} else {
			breadcrumb.classList.remove("sticky");
		}
	}

	//Attribute used to underline the secion names in sub-navbar
	var attSubNavbar1 = document.createAttribute("class");
	var attSubNavbar2 = document.createAttribute("class");
	var attSubNavbar3 = document.createAttribute("class");
	var attSubNavbar4 = document.createAttribute("class");
	attSubNavbar1.value = "underlineElement";
	attSubNavbar2.value = "underlineElement";
	attSubNavbar3.value = "underlineElement";
	attSubNavbar4.value = "underlineElement";

	var visitCluj = document.querySelector("#ObiectiveRecreationale");
	var offsetCluj = visitCluj.offsetTop;

	var culture = document.querySelector("#ObiectiveIstorice");
	var offsetCulture = culture.offsetTop;

	var information = document.querySelector("#ObiectiveSportive");
	var offsetInformation = information.offsetTop;

	var locations = document.querySelector("#ObiectiveReligioase");
	var offsetLocations = locations.offsetTop;

	var footer=document.querySelector(".page-footer");
	var offsetFooter=footer.offsetTop;



	function visitClujFunction() {
		if ((window.pageYOffset+navbarBreadcrumbHeight+500 >= offsetCluj) && (window.pageYOffset+navbarBreadcrumbHeight+500 <= offsetCulture)) {
			document.querySelector("#VisitClujSubNavbar").setAttributeNode(attSubNavbar1);
		} else {
			document.querySelector("#VisitClujSubNavbar").removeAttribute("class");
		}
	}

	function cultureFunction() {
		if ((window.pageYOffset+navbarBreadcrumbHeight+500 >= offsetCulture) && (window.pageYOffset+navbarBreadcrumbHeight+500 <= offsetInformation)) {
			document.querySelector("#CultureSubNavbar").setAttributeNode(attSubNavbar2);
		} else{
			document.querySelector("#CultureSubNavbar").removeAttribute("class");
		}
	}

	function informationFunction() {
		if ((window.pageYOffset+navbarBreadcrumbHeight+500 >= offsetInformation) && (window.pageYOffset+navbarBreadcrumbHeight+500 <= offsetLocations)) {
			document.querySelector("#InformationSubNavbar").setAttributeNode(attSubNavbar3);
		} else {
			document.querySelector("#InformationSubNavbar").removeAttribute("class");
		}
	}

	function locationsFunction() {
		if ((window.pageYOffset+navbarBreadcrumbHeight+500 >= offsetLocations) && (window.pageYOffset+navbarBreadcrumbHeight+500 <= offsetFooter)) {
			document.querySelector("#LocationsSubNavbar").setAttributeNode(attSubNavbar4);
		} else {
			document.querySelector("#LocationsSubNavbar").removeAttribute("class");
		}
	}

	$(function(){
		$("a[href*=\\#]:not([href=\\#])").on('click', function(){
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.substr(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top-160
				}, 1000);
				return false;
			}
		});
	});

})