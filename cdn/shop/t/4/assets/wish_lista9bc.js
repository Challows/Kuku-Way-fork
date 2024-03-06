/** Shopify CDN: Minification failed

Line 17:2 Transforming let to the configured target environment ("es5") is not supported yet
Line 18:10 Transforming rest arguments to the configured target environment ("es5") is not supported yet
Line 24:0 Transforming class syntax to the configured target environment ("es5") is not supported yet
Line 26:15 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 33:26 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 38:13 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 56:14 Transforming let to the configured target environment ("es5") is not supported yet
Line 102:22 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 107:25 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 112:22 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
... and 18 more hidden warnings

**/
function debounceNew(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

class dTX_WhistList {

    constructor() {
        this.wishListData = [];

        this.LOCAL_STORAGE_WISHLIST_KEY = 'shopify-wishlist';
        this.LOCAL_STORAGE_DELIMITER = ',';
    }

    setListLocalStorageKey(LOCAL_STORAGE_WISHLIST_KEY, LOCAL_STORAGE_DELIMITER) {
        this.LOCAL_STORAGE_WISHLIST_KEY = LOCAL_STORAGE_WISHLIST_KEY;
        this.LOCAL_STORAGE_DELIMITER = LOCAL_STORAGE_DELIMITER;
    }

    setupGrid(listType) {
        var wishlist = this.getWishlist();

        var requests = wishlist.map(function (handle) {
            var productTileTemplateUrl = '/products/' + handle + '?view=json';

            var getProductsList =  this.getProductResponse(productTileTemplateUrl);

            return getProductsList;
        }.bind(this));
      

       return Promise.all(requests).then(function (responses) {
              var wishlistProductCards = responses.join('%$$%');
              var wishlistProductCards = wishlistProductCards;

              var a_wishlistRecords = wishlistProductCards.split("%$$%");

              let recordsObj = [];

              if (Array.isArray(a_wishlistRecords) && a_wishlistRecords.length) {
                  var index = 0;
                  a_wishlistRecords.forEach(record => {
                      var a_record = record.split("~~");

                      var recordObj = {
                              id:             a_record[0],
                              product_title:  a_record[1],
                              product_handle: a_record[2],
                              product_image:  a_record[3],
                              vendor:         a_record[4],
                              type:           a_record[5],
                              money_price:    a_record[6],
                              price_min:      a_record[7],
                              price_max:      a_record[8],
                              available:      a_record[9],
                              price_varies:   a_record[10],
                              variant_id:     a_record[11],
                              variant_title:  a_record[12],
                              sku:            a_record[13],
                              quantity:       "1",
                              product_url:    '/products/'+a_record[2]
                      };

                      recordsObj[index] = recordObj;

                      index = index + 1;

                  });

              }

              return recordsObj;

         }).then(function(data) {
         
             this.wishListData = data;  
         
             return data;

         }.bind(this));

    }

    getWishListRecords()
    {
        return this.wishListData;
    }

    getCompareListRecords()
    {
        return this.wishListData;
    }

    getProductResponse(url) {

       var responseResult = axios.get(url)
          .then((response) => {
                var text = response.data;
                text = text.replace(/^\s*[\r\n]/gm, '');
                // console.log(text); 

                return text;
           });
           
        return responseResult;
        
      
//       var responseResult =  getDTProduct(url);
      
//       alert(responseResult);

//       return responseResult;
      
    }

    getTotalCount() {
		return this.getWishlist().length;
    }
  
    getWishlist() {
        var wishlist = localStorage.getItem(this.LOCAL_STORAGE_WISHLIST_KEY) || false;
        if (wishlist) return wishlist.split(this.LOCAL_STORAGE_DELIMITER);
        return [];
    }

    setWishlist(array) {
        var wishlist = array.join(this.LOCAL_STORAGE_DELIMITER);
        if (array.length) localStorage.setItem(this.LOCAL_STORAGE_WISHLIST_KEY, wishlist);
        else localStorage.removeItem(this.LOCAL_STORAGE_WISHLIST_KEY);
        return wishlist;
    }

    updateWishlist(handle) {
        var wishlist = this.getWishlist();
        var indexInWishlist = wishlist.indexOf(handle);
        if (indexInWishlist === -1) wishlist.push(handle);
        else wishlist.splice(indexInWishlist, 1);
        return this.setWishlist(wishlist);
    }

    removeWhishlist(handle) {
        var wishlist = this.getWishlist();

        wishlist = this.remove(wishlist, handle);

        return this.setWishlist(wishlist);  
    }

    resetWishlist() {
        return this.setWishlist([]);
    }

    isAddedIntoList(handle) {
        var wishlist = this.getWishlist();  
        
        return wishlist.includes(handle);
    }

    remove(arr) {
        var what, a = arguments, L = a.length, ax;
        while (L > 1 && arr.length) {
            what = a[--L];
            while ((ax= arr.indexOf(what)) !== -1) {
                arr.splice(ax, 1);
            }
        }
        return arr;
    };
}


async function getDTProduct(url) {
    
 
    try {
      let res = await fetch(url);

      return res.text().then(function (text) {      
        return text;
      });

        
    } catch (error) {
        console.log(error);
    }
}

class dTXWhishList extends HTMLElement {
    constructor() {
      super();

      this.dTWhistList = new dTX_WhistList();

      this.debouncedOnSubmit = debounceNew((event) => {
        this.onSubmitHandler(event);
      }, 500);


      this.addWishList = this.querySelector('.add-wishlist');      

      if (this.addWishList.hasAttribute("data-product_handle")) {
      	this.productHandle = this.addWishList.getAttribute('data-product_handle');

        this.addWishList.addEventListener('click', this.debouncedOnSubmit.bind(this));

      	this.initLoad();
      }
      
      /*
      this.productHandle = this.addWishList.getAttribute('data-product_handle');

      this.addWishList.addEventListener('click', this.debouncedOnSubmit.bind(this));

      this.initLoad();
      */
    }

    onSubmitHandler(event) {
        event.preventDefault();

        if (this.dTWhistList.isAddedIntoList(this.productHandle)) {
            window.location = "/pages/wishlist";
        } else {
            this.addWishList.classList.add("adding");

            this.dTWhistList.updateWishlist(this.productHandle);

            setTimeout(this.postAdd.bind(this), 4000);
        }
    }

    postAdd() {
      /*
        document.querySelector(".dtxc-wishlist-count").setAttribute(
          'count', 
          this.dTWhistList.getTotalCount()
        );
      */  

       document.querySelector(".dt-wishlist-cnt").setAttribute(
          'count', 
          this.dTWhistList.getTotalCount()
       );

      var COUNT_WISH_LIST = this.dTWhistList.getTotalCount();
      
      var setWishListCountNew = function(COUNT_WISH_LIST) {
          if (document.querySelector('.dt-wishlist-cnt')) {

              var cnt = COUNT_WISH_LIST;

              var elementList = document.querySelectorAll(".dt-wishlist-cnt");
              elementList.forEach((element) => {
                if (cnt > 0 ) {
                    element.innerHTML = cnt;
                    //element.style.display = 'block';
                } else {
                    element.innerHTML = 0;
                   // element.style.display = 'none';
                }
             });      
          }

      };

      setWishListCountNew(COUNT_WISH_LIST);
      
        
      this.addWishList.classList.remove("adding");
      this.addWishList.classList.add("added");   
    }

    initLoad() {
        if (this.dTWhistList.isAddedIntoList(this.productHandle)) {
            this.addWishList.classList.add("added");
        }    
    }
}    

customElements.define('dtx-wishlist', dTXWhishList);

class dTXProductDealTimer extends HTMLElement {
  constructor() {
    super();
    this.dtxDealTimer = this.querySelector('.dtx-deal-timer');
    
    this.initLoad();
    
  }
  
  initLoad() {
    if (this.dtxDealTimer) {
      var productID = this.dtxDealTimer.getAttribute('data-itemID');
      var targetTime = this.dtxDealTimer.getAttribute('data-time');      
      targetTime = targetTime.replace("@", "");      
      var datePart = targetTime.split(" ");
	  var time =  datePart[1];
      var targetDate = datePart[0].split("/");      
      var targetDateTime = targetDate['2'] + "/" + targetDate['0'] + "/" + targetDate['1'];
      var endTime = targetDateTime + " "+time;           
      var now = new Date(endTime);      
      endTime = now.getTime(); 
      jQuery(".lof-clock-" + productID + "-detail").lofCountDown({
        TargetDate: endTime,
          DisplayFormat: "<ul class='list-inline'><li class='day'>%%D%%<span>Days</span></li><li class='hours'>%%H%%<span>Hours</span></li><li class='mins'>%%M%%<span>Min</span></li><li class='seconds'>%%S%%<span>Sec</span></li></ul>",
        FinishMessage: "Expired"
      });
    }
    
  }
}  

customElements.define('dtx-product-dealtimer', dTXProductDealTimer);