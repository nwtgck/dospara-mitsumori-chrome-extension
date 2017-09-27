
var productBoxs = document.querySelectorAll(".productBox");
console.log(productBoxs);

// Get the number of products in the cart
var nProducts = productBoxs.length;


// (from: http://takuya-1st.hatenablog.jp/entry/2014/02/05/161927)
document.xpath = function(expression) {
  ret = document.evaluate(expression,document,null,XPathResult.ANY_TYPE,null);
  switch(ret.resultType){
   case 1: return ret.numberValue;
   case 2: return ret.stringValue;
   case 3: return ret.booleanValue;
   case 4:
   case 5:
           a=[];
           while(e=ret.iterateNext()){a.push(e);};
           return a;
   default: return ret;
   }
}



var productArray = [];
for(var n = 1; n <= nProducts; n++){
  // Name
  var _name = document.xpath(`//*[@id="cartItems"]/div[${n}]/div/div[2]/div[1]/table[1]/tbody/tr/td[1]/div`);
  var name = _name[0].innerText;
  console.log(name);
  // Item count
  var _itemCount = document.xpath(`//*[@id="item_${n}_qty"]`);
  var itemCount = _itemCount[0].value;
  console.log(itemCount);
  // Price
  var _price = document.xpath(`//*[@id="cartItems"]/div[${n}]/div/div[2]/div[2]`);
  var priceStr = _price[0].innerText.replace(' 円（税込）', '').replace(',', '');
  console.log(priceStr);
  // Detail
  var _detail = document.xpath(`//*[@id="cartItems"]/div[${n}]/div/div[2]/div[1]/table[2]/tbody/tr[3]/td/a[1]`);
  var itemLink = _detail[0].getAttribute('href');
  console.log(itemLink);

  // Push data
  productArray.push([name, itemCount, priceStr, itemLink]);
}



// (from: https://stackoverflow.com/a/14966131/2885946)
var data = productArray;
var csvContent = "data:text/csv;charset=utf-8,";
data.forEach(function(infoArray, index){

   dataString = infoArray.join(",");
   csvContent += index < data.length ? dataString+ "\n" : dataString;

});

var encodedUri = encodeURI(csvContent);
window.open(encodedUri);
