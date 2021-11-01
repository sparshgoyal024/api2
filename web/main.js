var gapi = gapi || {};

/* eslint-disable no-unused-vars */

// [START load_auth2_library]
function loadAuthClient () {
  gapi.load('auth2', initGoogleAuth);
}
// [END load_auth2_library]

// [START init_google_auth]
function initGoogleAuth (clientId = '500140982586-cvlvqe74fb5lg04peq2de65a16mkcp3s.apps.googleusercontent.com') {
  gapi.auth2.init({
    client_id: clientId,
    scope: 'https://www.googleapis.com/auth/userinfo.email'
  }).then(() => {
    document.getElementById('sign-in-btn').disabled = false;
  }).catch(err => {
    console.log(err);
  });
}
// [END init_google_auth]

// [START user_signin]
function signIn () {
  gapi.auth2.getAuthInstance().signIn().then(() => {
    document.getElementById('sign-in-btn').hidden = true;
    document.getElementById('sign-out-btn').hidden = false;
    document.getElementById('send-endpoint-btn').disabled = false;
    document.getElementById('send-api-btn').disabled = false;
  }).catch(err => {
    console.log(err);
  });
}
// [END user_signin]

// [START send_sample_request]
function endpointApiRequest(projectId = 'ca-lab') {
  var user = gapi.auth2.getAuthInstance().currentUser.get();

  console.log(user);
  var idToken = user.getAuthResponse().id_token;
    console.log(idToken);
  var endpoint = `https://ca-lab.appspot.com/_ah/api/email/v1/get/email`;

  var xhr = new XMLHttpRequest();
    console.log(xhr);
  xhr.open('GET', endpoint + '?access_token=' + encodeURIComponent(idToken));
  xhr.withCredentials = true;
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencode');
  xhr.onreadystatechange = function () {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      window.alert(xhr.responseText);
    }
  };
  xhr.send();
}

function apiGatewayRequest(projectId = 'ca-lab') {
  var user = gapi.auth2.getAuthInstance().currentUser.get();

  //console.log(user);
  var idToken = user.getAuthResponse().id_token;
  //  console.log(idToken);
  var endpoint = `https://ca-gateway-6drf0zzu.uc.gateway.dev/getUser`;

  var xhr = new XMLHttpRequest();
  //  console.log(xhr);
  xhr.open('GET', endpoint + '?access_token=' + encodeURIComponent(idToken));

  console.log("xhr.responseText");

  console.log(xhr.responseText);

  console.log("xhr.responseText");

  xhr.onreadystatechange = function () {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      window.alert(xhr.responseText);
    }
  }
  xhr.send();
}
// [END send_sample_request]

// [START user_signout]
function signOut () {
  gapi.auth2.getAuthInstance().signOut().then(() => {
    document.getElementById('sign-in-btn').hidden = false;
    document.getElementById('sign-out-btn').hidden = true;
    document.getElementById('send-request-btn').disabled = true;
  }).catch(err => {
    console.log(err);
  });
}
// [END user_signout]

/* eslint-enable no-unused-vars */
