const imageContainer = document.getElementById('image-container');
const loader = document.getElementById ('loader');

let ready = false;
let imageLoaded = 0;
let totalImages = 30;
let photosArray = [];

//  Unsplash API
const count = 30;
const apiKey = 'QSUP4o4G_8D9avvBsbuWjgL9QlST4tIIfbsLL7PRnnQ';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imagesLoaded(){
    console.log('image loaded');
    imageLoaded++;
    // console.log(imagesLoaded);
    if (imageLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log(imageLoaded, totalImages)
    }
}
// Helper Function to Set Attributes on DOM Elements
function setAttribute(element,attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create Element for links & photos, Add to DOM
function displayPhotos() {
    imageLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    // Run function for each object in photosArray
    console.log(photosArray);
    photosArray.forEach((photo) => {
        // Create <a> to links to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttribute(item,{
            herf: photo.links.html,
            target:'_blank',
        });
        // Create <img> for photo
        // const img = document.createElement('img');
        let img = new Image();
            img.src = photo.urls.regular,
            img.alt = photo.alt_description,
            img.title = photo.alt_description,
        // img.setAttribute('src',photo.urls.regular);
        // img.setAttribute('alt',photo.alt_description);
        // // img.setAttribute('title',photo.alt_description);
        // setAttribute(img,{
        //     scr: photo.urls.regular,
        //     alt: photo.alt_description,
        //     title: photo.alt_description,
        // });
        // Event Listener, Check when each is finished loading
        img.addEventListener('load', imagesLoaded)
        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// Get photos from Unsplash API

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // Catch Error Here 
    }
}

// check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        loader.hidden = false;
        getPhotos();

    }
}); 

// On Load 
getPhotos();