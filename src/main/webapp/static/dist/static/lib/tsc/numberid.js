var NUMID_PART_LEN = 14;

var encryptionIndexFrom=new Array(1,2,3,4,5,6,7,8,9,10,11,12,13,14);
var encryptionIndexTo=new Array(10,9,1,3,2,4,6,13,5,14,8,7,11,12);
var weight=new Array(1,2,7,8,4,1,5,3,2,3,2,3,8,7);
var plusFactor = "6548279314643";

function plusEncode(szInNumberID)
{
	var b1 = biFromString(szInNumberID, 10);
	var b2 = biFromString(plusFactor,10);

	var re = biAdd(b1,b2);

	return biToString(re,10);
}

function isDigitNumber(szInNumberID)
{
	if (szInNumberID!=null && szInNumberID!="")
    {
        return !isNaN(szInNumberID);
    }
    return false;
}

function transforEncode(szNumberID)
{
	var szTemp = new Array();
	var szOutNumberID = "";
    var i = 0;
    for ( ; i < NUMID_PART_LEN; i++) {
        szTemp[ encryptionIndexTo[i]-1 ] = szNumberID[ encryptionIndexFrom[i]-1 ];
    }

    i = 0;
    for ( ; i < NUMID_PART_LEN; i++) {
		szOutNumberID +=  szTemp[i];
    }

	return szOutNumberID;
}

function getSumEncode(szNumberID)
{
    var sum = 0;
    var modresult = 0;
    var i = 0;
    for (; i < NUMID_PART_LEN; i++) {
		sum = sum + (szNumberID[i]) * weight[i];
    }
    modresult = sum % 10;
	return modresult + "";
    //return (modresult + '0');
}

function encodeNumberID(szInNumberID,partnerCode,version)
{
	var  szOutNumberID = "";
    // check input if all are digits
    if( !isDigitNumber( szInNumberID ) )
        return false;

	szOutNumberID = plusEncode( szInNumberID);

	szOutNumberID = transforEncode( szOutNumberID );

    szOutNumberID += partnerCode;
    
	szOutNumberID += getSumEncode( szOutNumberID );

	szOutNumberID += version.substr(0,2);

	return szOutNumberID;
}