var $=require('egis-jquery');
var html=__inline("./layout.html");
function render(){
    $('body').append(html);
}
module.exports={
    render:render
};