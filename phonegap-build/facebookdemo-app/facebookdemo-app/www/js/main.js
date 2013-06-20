FB.Event.subscribe('auth.login',  function(response) { alert('auth.login event');  });
FB.Event.subscribe('auth.logout', function(response) { alert('auth.logout event'); });

function login() {
    FB.login(
        function(response)
        {
            if (response.session)
            {
                alert('logged in');
            }
            else
            {
                alert('not logged in');
            }
        },
        { scope: "email" }
    );
}

document.addEventListener('deviceready', function() {
    try
    {
        alert('Device is ready! Make sure you set your app_id below this alert.');
        FB.init({ appId: "appid", nativeInterface: CDV.FB, useCachedDialogs: false });
        document.getElementById('data').innerHTML = "";
    }
    catch (e)
    {
        alert(e);
    }
}, false);