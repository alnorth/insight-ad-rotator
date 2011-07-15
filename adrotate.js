
function InsightAdRotator(options) {
	
	var imageData = [],
		currentlyVisibleEl,
		currentlyVisibleIndex,
		currentTimer;

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
	
	function addImagesFromXml(xml, imagesDiv) {
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
			imageData[imageData.length] = img;
		});
		setImage(0, false);
	}
	
	function setImage(index, fromPager) {
		if(index > imageData.length - 1) index = 0;
		
		if(currentlyVisibleIndex != index) {

			var img = imageData[index];
			var div = $("#" + options.containerDivID);
			var divOverlay = div.children(".adrot_overlay");
			
			if(currentlyVisibleEl) {
				currentlyVisibleEl.css("z-index", 1);
				img.el.css("opacity", 0);
				img.el.animate({opacity:1}, options.animationDuration, setOpacityFun(currentlyVisibleEl));
			} else {
				img.el.css("opacity", 1);
			}
			img.el.css("z-index", 2);
			currentlyVisibleEl = img.el;
			currentlyVisibleIndex = index;
			
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
			divOverlay.children(".adrot_description").css("width", (options.imageWidth - 30 - pagerWidth));
			
			divOverlay.css("top", (options.imageHeight - divOverlay.height()) + "px");
		}
		
		if(fromPager) {
			clearTimeout(currentTimer);
			currentTimer = setTimeout(function() {setImage(index + 1, false);}, options.timeoutLengthPostPager);
		} else {
			currentTimer = setTimeout(function() {setImage(index + 1, false);}, options.timeoutLength);
		}
	}
	
	function setPageFun(i) {
		return function() {
			setImage(i, true);
		}
	}

	function setPager(selectedIndex) {
		var pagerDiv = $("#" + options.containerDivID + " .adrot_pager");
		
		pagerDiv.children().remove();	
		for(var i = 0; i < imageData.length; i++) {
			var imgEl = document.createElement("img");
			imgEl.className = "adrot_pager_element";
			imgEl.src = (i == selectedIndex ? options.pagerSelectedImg : options.pagerUnselectedImg);
			$(imgEl).click(setPageFun(i));
			pagerDiv.append(imgEl);
		}
	}
	
	function init() {
		var container = $("#" + options.containerDivID)
			.addClass("adrot_container")
			.height(options.imageHeight)
			.width(options.imageWidth);
		
		var imagesDiv = $(addDiv("adrot_images", container))
			.height(options.imageHeight)
			.width(options.imageWidth);
			
		var overlay = $(addDiv("adrot_overlay", container))
			.css("background-image", "url("+ options.backgroundImg +")");
		
		addDiv("adrot_title", overlay);
		addDiv("adrot_description", overlay);
		addDiv("adrot_pager", overlay);
		
		$.ajax({
			type: "GET",
			url: options.xmlUrl,
			success: function(xml) {
				addImagesFromXml(xml, imagesDiv);
			}
		});
	}
	
	init();
}
