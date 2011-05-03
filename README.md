#Insight Ad Rotator

When used in an Insight site this allows you to display a series of images in a slideshow with each image linking to a different part of the site. Each image will be displayed with its title and description.

While I am an Insight developer this was written in my own time for use by a charity. It is not supported by Endis in any way.

Values to supply in data:

<dl>
	<dt>containerDivID</dt>
	<dd>The div that the ad rotator will be added to. This should already exist on the page.</dd>
	
	<dt>xmlUrl</dt>
	<dd>The URL of the XML feed to take get image info from.</dd>
	
	<dt>imageHeight</dt>
	<dd>The height of the images displayed. In pixels.</dd>
	
	<dt>imageWidth</dt>
	<dd>The width of the images displayed. In pixels.</dd>
	
	<dt>animationDuration</dt>
	<dd>How long the fading between images should take. In milliseconds.</dd>
	
	<dt>timeoutLength</dt>
	<dd>How long to stay on each image before moving to the next. In milliseconds.</dd>
	
	<dt>timeoutLengthPostPager</dt>
	<dd>How long to stay on an image before moving to the next one after the user has clicked on the pager. In milliseconds.</dd>
	
	<dt>pagerSelectedImg</dt>
	<dd>Path of the pager image for the selected image.</dd>
	
	<dt>pagerUnselectedImg</dt>
	<dd>Path of the pager image for images that aren't selected.</dd>
	
	<dt>backgroundImg</dt>
	<dd>Path of the background image for the area displaying the title, description and pager images. It's suggested that you use the semi-transparent 1 pixel image included in this repo.</dd>
</dl>
