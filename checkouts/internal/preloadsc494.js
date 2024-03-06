
    (function() {
      var baseURL = "https://cdn.shopify.com/shopifycloud/checkout-web/assets/";
      var scripts = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/runtime.baseline.en.ff44db9c7fd7ea092d7f.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/35.baseline.en.5b701b1bf7ac0550b8c8.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/398.baseline.en.cd9721ecb74b38edac70.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/681.baseline.en.51a4556bd59fded71f19.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.baseline.en.e26070bd44514adffde2.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/751.baseline.en.b034168d5d5932189976.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/21.baseline.en.8b59330e0f9d7b483bf8.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/2.baseline.en.c9d37e98faa0a0d26ddd.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/100.baseline.en.a4f86ac8f0bbf8d9ab36.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/OnePage.baseline.en.aab26e0697fea7992db5.js"];
      var styles = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/35.baseline.en.610b27304eb57ae52c8f.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.baseline.en.f79e630f70b79519e81e.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/21.baseline.en.9abd9872d9c712c0373e.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/268.baseline.en.3fdd0e90c00a67a10f29.css"];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = ["https://cdn.shopify.com/s/files/1/0035/4195/8756/files/logo_defa8fec-898c-4e8e-98a4-702d3706e2e1_x320.png?v=1646387439"];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = [baseURL].concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res[0], next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        })();
      }

      function onLoaded() {
        preconnectAssets();
        prefetchAssets();
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  