  var g_PGS_Type  = "";
  var g_PGS_DeviceId = "";
  var g_PGS_UserToken ="";
  var g_PGS_PartCode = "";
  var g_PGS_TimeOffset = 0;
  var g_PGS_Version = "";
  var g_options = {};


  function doGenerateInternal()
  {
	var now=""+Date.now();
	
	var time= parseInt(now.substring(0, now.length-3)) -  g_PGS_TimeOffset;
    var code=generateDynamicCode(g_PGS_DeviceId,time,g_PGS_UserToken,g_PGS_UserToken,g_PGS_PartCode,g_PGS_Version);
    var data =  g_PGS_Type + code;
    
    generateQRcode(data);

    //var data1 = data.replace(/[^\d|'']/g,'').replace(/(\d{4})(?=\d)/g,"$1 ");
    jQuery('#qrcodeNum').text(data);
  }

  function generateQRcode(data)
  {
    var width = 256;
    var height = 256;
    var background = "#efefef";
    var foreground = "#424647";
    if (g_options["width"]) {
      width = g_options["width"];
    };
    if (g_options["height"]) {
      height = g_options["height"];
    };
    if (g_options["foreground"]) {
      foreground = g_options["foreground"];
    };
    if (g_options["background"]) {
      background = g_options["background"];
    };
    jQuery('#qrcodeCanvas').empty();
    jQuery('#qrcodeCanvas').qrcode({
      width: width,
      height: height,
      background: background,
      foreground: foreground,
      text: data
    });
  }

  function doGenerate(type,deviceId,userToken,partCode,timeOffset,version,options) {
    g_PGS_Type =  type;
    g_PGS_DeviceId = deviceId;
    g_PGS_UserToken =userToken;
    g_PGS_PartCode = partCode;
    g_PGS_TimeOffset = timeOffset;
    g_PGS_Version = version;
    
    g_options = options;
    if (!g_options) {g_options = {}};
    
    var timeId=setInterval(doGenerateInternal, 1000);
    doGenerateInternal();
    return timeId;
  }
  
  
  function generateToken(deviceId,time,userId)
{
	var tokenValueString = "";
	var otpstr = time + deviceId + userId;
	var otphex = hex_md5(otpstr);

	var i = 0;
  var digitNum = 0;

	while (i < otphex.length &&  digitNum < 6)
	{
		var c = otphex[i++];
		if (!isNaN(c))
		{
			tokenValueString += c;
			digitNum++;
		}
	}

	return tokenValueString;
}

function generateDynamicCode(deviceId,time,userId,userKey,partCode,version)
{
	if (8 != userKey.length)
	{
		return null;
	}
	var token =  generateToken(deviceId, time, userId);
	var temp = userKey + token;
	var result = encodeNumberID(temp,partCode.substr(0,3),version);

	return result;
}