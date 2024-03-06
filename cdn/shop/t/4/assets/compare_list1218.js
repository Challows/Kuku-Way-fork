/** Shopify CDN: Minification failed

Line 17:2 Transforming let to the configured target environment ("es5") is not supported yet
Line 18:10 Transforming rest arguments to the configured target environment ("es5") is not supported yet
Line 24:0 Transforming class syntax to the configured target environment ("es5") is not supported yet
Line 26:15 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 33:26 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 38:13 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 56:14 Transforming let to the configured target environment ("es5") is not supported yet
Line 102:25 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 107:25 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 112:22 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
... and 15 more hidden warnings

**/
function debounceNew(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

class dTX_CompareList {

    constructor() {
        this.compareListData = [];

        this.LOCAL_STORAGE_COMPARELIST_KEY = 'shopify-comparelist';
        this.LOCAL_STORAGE_DELIMITER = ',';
    }

    setListLocalStorageKey(LOCAL_STORAGE_COMPARELIST_KEY, LOCAL_STORAGE_DELIMITER) {
        this.LOCAL_STORAGE_COMPARELIST_KEY = LOCAL_STORAGE_COMPARELIST_KEY;
        this.LOCAL_STORAGE_DELIMITER = LOCAL_STORAGE_DELIMITER;
    }

    setupGrid(listType) {
        var comparelist = this.getcomparelist();

        var requests = comparelist.map(function (handle) {
            var productTileTemplateUrl = '/products/' + handle + '?view=json';

            var getProductsList =  this.getProductResponse(productTileTemplateUrl);

            return getProductsList;
        }.bind(this));
      

       return Promise.all(requests).then(function (responses) {
              var comparelistProductCards = responses.join('%$$%');
              var comparelistProductCards = comparelistProductCards;

              var a_comparelistRecords = comparelistProductCards.split("%$$%");

              let recordsObj = [];

              if (Array.isArray(a_comparelistRecords) && a_comparelistRecords.length) {
                  var index = 0;
                  a_comparelistRecords.forEach(record => {
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
         
             this.compareListData = data;  
         
             return data;

         }.bind(this));

    }

    getcompareListRecords()
    {
        return this.compareListData;
    }

    getCompareListRecords()
    {
        return this.compareListData;
    }

    getProductResponse(url) {

       var responseResult = axios.get(url)
          .then((response) => {
                var text = response.data;
                text = text.replace(/^\s*[\r\n]/gm, '');                
                return text;
           });
           
        return responseResult;
    }

    getTotalCount() {
    return this.getcomparelist().length;      
    }
  
    getcomparelist() {
        var comparelist = localStorage.getItem(this.LOCAL_STORAGE_COMPARELIST_KEY) || false;      
        if (comparelist) return comparelist.split(this.LOCAL_STORAGE_DELIMITER);
        return [];
    }

    setcomparelist(array) {
        var comparelist = array.join(this.LOCAL_STORAGE_DELIMITER);
        if (array.length) localStorage.setItem(this.LOCAL_STORAGE_COMPARELIST_KEY, comparelist);
        else localStorage.removeItem(this.LOCAL_STORAGE_COMPARELIST_KEY);
        return comparelist;
      
        console.log("A="+comparelist.length);
      
    }

    updatecomparelist(handle) {
        
      var comparelist = localStorage.getItem(this.LOCAL_STORAGE_COMPARELIST_KEY) || false;
    
        var comparelist = this.getcomparelist();
        var indexIncomparelist = comparelist.indexOf(handle);
        if (indexIncomparelist === -1) comparelist.push(handle);
        else comparelist.splice(indexIncomparelist, 1);
        return this.setcomparelist(comparelist);
    }

    removeWhishlist(handle) {
        var comparelist = this.getcomparelist();

        comparelist = this.remove(comparelist, handle);

        return this.setcomparelist(comparelist);  
    }

    resetcomparelist() {
        return this.setcomparelist([]);
    }

    isAddedIntoList(handle) {
        var comparelist = this.getcomparelist();  
        
        return comparelist.includes(handle);
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



class dTXCompare extends HTMLElement {
    constructor() {
      super();

      this.dTCompareList = new dTX_CompareList();
      this.dTCompareList.setListLocalStorageKey('dt-product-compare-list', ',');

      this.debouncedOnSubmit = debounceNew((event) => {
        this.onSubmitHandler(event);
      }, 500);


      this.addcompareList = this.querySelector('.add-compare');
          

      if (this.addcompareList.hasAttribute("data-product_handle")) {
        this.productHandle = this.addcompareList.getAttribute('data-product_handle');

        this.addcompareList.addEventListener('click', this.debouncedOnSubmit.bind(this));

        this.initLoad();
      }


    }

    onSubmitHandler(event) {
        event.preventDefault();
      console.log(this.dTCompareList.getcomparelist().length);
      if(this.dTCompareList.getcomparelist().length > 3 && !this.addcompareList.classList.contains("added")) {
        console.log(this.dTCompareList.getcomparelist().length);
       alert(DT_THEME.strings.minCompareProduct);
      } else {      
        if (this.dTCompareList.isAddedIntoList(this.productHandle)) {
             window.location = "/pages/compare";
        } else {
            this.addcompareList.classList.add("adding");

            this.dTCompareList.updatecomparelist(this.productHandle);

          
          
            setTimeout(this.postAdd.bind(this), 4000);
        }
      }
    }

    postAdd() {
      
        this.addcompareList.classList.remove("adding");
        this.addcompareList.classList.add("added");   
    }

    initLoad() {
        if (this.dTCompareList.isAddedIntoList(this.productHandle)) {
            this.addcompareList.classList.add("added");
        }    
    }
}    

customElements.define('dtx-compare', dTXCompare);


