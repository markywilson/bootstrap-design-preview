var imgDir = "img";
var extension = "jpg";
var device;
var html = "";
var devices = {
    desktopLG: 'lg',
    desktop: 'md',
    // tablet: ['sm', 'md'],
    tablet: 'sm',
    mobile: 'xs'
};
var path = window.location.pathname.split('/');
var pageName = path[path.length - 1].split('.html')[0];

for (device in devices) {
    var visibilityClass = "";
    if (typeof devices[device] == "object") {
        for (var i = 0; i < devices[device].length; i++) {
            visibilityClass += 'visible-' + devices[device][i] + ' ';
        }
    } else {
        visibilityClass = 'visible-' + devices[device];
    }
    html += '<div class="' + visibilityClass + '"><img src="' + getPath(device) + '" class="preview-img" data-device="' + device + '"></div>';
}

var container = document.createElement('div');
container.id = 'container';
container.innerHTML = html;
document.title = capitalizeFirstLetter(pageName);
document.body.insertBefore(container, document.body.firstChild);


 
for (var i = 0; i < document.images.length; i++) {
    document.images[i].addEventListener('error', function(e) {
        var imgToRemove = e.target;
        var errorDevice = imgToRemove.getAttribute('data-device');
        var errorCont = document.createElement('div');
        errorCont.className = 'container';
        var errorMsg = '<h3>Error</h3>';
        errorMsg += '<div class="alert alert-danger" role="alert">';
        errorMsg += 'Image: <strong>' + pageName + '-' + errorDevice + '.' + extension + '</strong> is missing</div>';
        errorCont.innerHTML = errorMsg;
        imgToRemove.parentNode.appendChild(errorCont);
        imgToRemove.parentNode.removeChild(imgToRemove);
    });
}
 

function getPath(device) {
    return imgDir + '/' + pageName + '-' + device + '.' + extension;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}