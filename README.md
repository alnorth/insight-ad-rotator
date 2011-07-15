#Insight Ad Rotator

When used in an Insight site this allows you to display a series of images in a slideshow with each image linking to a different part of the site. Each image will be displayed with its title and description.

While I am an Insight developer this was written in my own time for use by a charity. It is not supported by Endis in any way.

##Installation

1. Create two media folders. The first will be for the javascript, css and images needed for drawing the rotator, the second will contain the actual images you would like to display.
1. Upload adrotate.js, adrotate.css, background.png, pager-selected.png, pager-unselected.png to the first folder.
1. Create a new document and edit the HTML source by clicking on the _Source_ button. Replace the current contents with the HTML in template_document.txt.
1. Click on the media folder that will contain your images, then right click on the XML icon in the top right corner and select _Copy link location_. Use this to replace \_\_PATH_FOLDER_XML\_\_. This is how the rotator knows which images to display.
1. Replace all the other entries like \_\_PATH_TO_CSS_FILE\_\_ with the correct paths. You can find out the paths of CSS and JS files by clicking on them in the media tab. To find the path of images click on them in the media tab, then right click on the image itself and select _Copy image location_, this works in Firefox anyway, I'm not sure about IE.
1. Set the image height and width and the other options to what you want and then save and publish the document.
1. Add the document to a layout wherever you would like it to be displayed on your site.

Now you can add images to the folder and they will automatically show up in the image rotator. The _Title_, _Caption_ and _Extra link_ options will all be used. Make sure that your images are all the right size, the image rotator doesn't do any resizing for you and your images will end up looking a bit odd.

The rotator orders images alphabetically by title. Of course, this probably won't always be the ordering that you would like. In order to let you order images any way you want the rotator will ignore any text before the first colon (:) in the title. You can see an example of this in example/example.xml.

##Options

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

## License

All files in this repository are provided under the Modified BSD License as described in LICENSE.txt.