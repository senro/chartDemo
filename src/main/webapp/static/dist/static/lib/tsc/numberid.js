function plusEncode(r){var n=biFromString(r,10),e=biFromString(plusFactor,10),o=biAdd(n,e);return biToString(o,10)}function isDigitNumber(r){return null!=r&&""!=r?!isNaN(r):!1}function transforEncode(r){for(var n=new Array,e="",o=0;NUMID_PART_LEN>o;o++)n[encryptionIndexTo[o]-1]=r[encryptionIndexFrom[o]-1];for(o=0;NUMID_PART_LEN>o;o++)e+=n[o];return e}function getSumEncode(r){for(var n=0,e=0,o=0;NUMID_PART_LEN>o;o++)n+=r[o]*weight[o];return e=n%10,e+""}function encodeNumberID(r,n,e){var o="";return isDigitNumber(r)?(o=plusEncode(r),o=transforEncode(o),o+=n,o+=getSumEncode(o),o+=e.substr(0,2)):!1}var NUMID_PART_LEN=14,encryptionIndexFrom=new Array(1,2,3,4,5,6,7,8,9,10,11,12,13,14),encryptionIndexTo=new Array(10,9,1,3,2,4,6,13,5,14,8,7,11,12),weight=new Array(1,2,7,8,4,1,5,3,2,3,2,3,8,7),plusFactor="6548279314643";