var protocol = window.location.protocol + '//',
    host = window.location.host,
    //ajaxMethod='{{ajaxMethod}}',
    apiHost='{{apiHost}}',
    //jsonp='{{jsonp}}',
    baseUrl = protocol + host +'{{baseUrl}}';

window.baseUrl = baseUrl;
window.apiHost = apiHost;
window.loginUrl=window.baseUrl + '/login.html';

window.env='{{env}}';
window.loginUrl=window.baseUrl+'/login.html';