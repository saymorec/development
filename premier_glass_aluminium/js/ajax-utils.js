(function (global) {

/////       HELPER FUNCTIONS     //////

// Returns an HTTP request object
function getRequestObject() {
  if (global.XMLHttpRequest) {
    return (new XMLHttpRequest());
  }
  else if (global.ActiveXObject) {
    // For very old IE browsers (optional)
    return (new ActiveXObject("Microsoft.XMLHTTP"));
  }
  else {
    global.alert("Ajax is not supported!");
    return(null);
  }
}

// Only calls user provided 'responseHandler'
// function if response is ready
// and not an error
function handleResponse(request,
                        responseHandler) {
  if ((request.readyState == 4) &&
     (request.status == 200)) {

     responseHandler(request.responseText);
    }
  }

/////       END OF HELPER FUNCTIONS     //////

// Set up a namespace for our utility
var ajaxUtils = {};

// Makes an Ajax GET request to 'requestUrl'
ajaxUtils.sendGetRequest =
  function(requestUrl, responseHandler) {
    var request = getRequestObject();
    request.onreadystatechange =
      function() {
        handleResponse(request,
                       responseHandler);
      };
    request.open("GET", requestUrl, true);
    request.send(null); // for POST only
  };

// Expose utility to the global object
global.$ajaxUtils = ajaxUtils;

})(window);
