var adrot_data;
var adrot_currentlyVisibleEl;
var adrot_currentlyVisibleIndex;
var adrot_imageData = [];
var adrot_currentTimer;

function adrot_init(data) {
	adrot_data = data;

	var container = $("#" + adrot_data.containerDivID);
	container.addClass("adrot_container");
	container.height(adrot_data.imageHeight);
	container.width(adrot_data.imageWidth);
	
	var imagesDiv = $(addDiv("adrot_images", container));
	imagesDiv.height(adrot_data.imageHeight);
	imagesDiv.width(adrot_data.imageWidth);
	
	var overlay = $(addDiv("adrot_overlay", container));
	overlay.css("background-image", "url("+ adrot_data.backgroundImg +")");
	addDiv("adrot_title", overlay);
	addDiv("adrot_description", overlay);
	addDiv("adrot_pager", overlay);
	
	$.ajax({
		type: "GET",
		url: adrot_data.xmlUrl,
		success: function(xml) {
			var imagesDiv = container.children(".adrot_images");
			var urlRoot = $(xml).find("album").attr("lgPath");
			$(xml).find("img").each(function() {
				var imgEl = document.createElement("img");
				imgEl.className = "adrot_image";
				imgEl.src = urlRoot + $(this).attr("tn");
				imagesDiv.append(imgEl);
				
				var titleText = $(this).attr("title");
				titleText = titleText.substring(titleText.indexOf(":") + 1); // Numbers before colon used to order stuff in Insight
				
				var img = {
					title: titleText,
					description: $(this).attr("caption"),
					el: $(imgEl),
					link: $(this).attr("link"),
					linkTarget: $(this).attr("target")
				};
				adrot_imageData[adrot_imageData.length] = img;
			});
			setImage(0, false);
		}
	});
}

function addDiv(css, into) {
	var div = document.createElement("div");
	div.className = css;
	into.append(div);
	return div;
}

function setOpacityFun(el) {
	if(el) {
		return function() {
			el.css("opacity", 0);
		};
	}
}

function setImage(index, fromPager) {
	if(index > adrot_imageData.length - 1) index = 0;
	
	if(adrot_currentlyVisibleIndex != index) {

		var img = adrot_imageData[index];
		var div = $("#" + adrot_data.containerDivID);
		var divOverlay = div.children(".adrot_overlay");
		
		if(adrot_currentlyVisibleEl) {
			adrot_currentlyVisibleEl.css("z-index", 1);
			img.el.css("opacity", 0);
			img.el.animate({opacity:1}, adrot_data.animationDuration, setOpacityFun(adrot_currentlyVisibleEl));
		} else {
			img.el.css("opacity", 1);
		}
		img.el.css("z-index", 2);
		adrot_currentlyVisibleEl = img.el;
		adrot_currentlyVisibleIndex = index;
		
		divOverlay.children(".adrot_title").html(img.title);
		divOverlay.children(".adrot_description").html(img.description);
		
		div.unbind("click");
		if(img.link) {
			if(img.linkTarget == "_blank") {
				div.click(function(event) {
					if(event.target.className != "adrot_pager_element") {
						var newWindow = window.open(img.link, "_blank");
					}
				});
			} else {
				div.click(function(event) {
					if(event.target.className != "adrot_pager_element") {
						document.location = img.link;
					}
				});
			}
		}
		
		setPager(index);

		var pagerWidth = 0;
		divOverlay.children(".adrot_pager").children().each( function(){ pagerWidth += $(this).width(); });
		divOverlay.children(".adrot_description").css("width", (adrot_data.imageWidth - 30 - pagerWidth));
		
		divOverlay.css("top", (adrot_data.imageHeight - divOverlay.height()) + "px");
	}
		
	if(fromPager) {
		clearTimeout(adrot_currentTimer);
		adrot_currentTimer = setTimeout(function() {setImage(index + 1, false);}, adrot_data.timeoutLengthPostPager);
	} else {
		adrot_currentTimer = setTimeout(function() {setImage(index + 1, false);}, adrot_data.timeoutLength);
	}
}

function setPageFun(i) {
	return function() {
		setImage(i, true);
	}
}

function setPager(selectedIndex) {
	var pagerDiv = $("#" + adrot_data.containerDivID + " .adrot_pager");
	
	pagerDiv.children().remove();	
	for(var i = 0; i < adrot_imageData.length; i++) {
		var imgEl = document.createElement("img");
		imgEl.className = "adrot_pager_element";
		imgEl.src = (i == selectedIndex ? adrot_data.pagerSelectedImg : adrot_data.pagerUnselectedImg);
		$(imgEl).click(setPageFun(i));
		pagerDiv.append(imgEl);
	}
}