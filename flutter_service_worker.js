'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "canvaskit/canvaskit.js": "62b9906717d7215a6ff4cc24efbd1b5c",
"canvaskit/profiling/canvaskit.js": "3783918f48ef691e230156c251169480",
"canvaskit/profiling/canvaskit.wasm": "6d1b0fc1ec88c3110db88caa3393c580",
"canvaskit/canvaskit.wasm": "b179ba02b7a9f61ebc108f82c5a1ecdb",
"main.dart.js": "493a003f0d1e4471457f131531e79bae",
"assets/AssetManifest.json": "f2223e66d4feecfccab25409cee42dab",
"assets/assets/20220717%2523design%2523%25E7%25AD%2596%25E7%2595%25A5%25E6%25A8%25A1%25E5%25BC%258F.md": "3879419c1a31eda11d33c41c1012f92f",
"assets/assets/20220706%2523design%2523%25E4%25BA%25AB%25E5%2585%2583%25E6%25A8%25A1%25E5%25BC%258F.md": "ab00e57caf6115d63a7ee63fbfe9d51b",
"assets/assets/20220629%2523design%2523%25E5%258D%2595%25E4%25BE%258B%25E6%25A8%25A1%25E5%25BC%258F.md": "b3af60b1a4c48eb2b80fcbb2e553798f",
"assets/assets/20220108%2523design%2523%25E8%25AE%25BE%25E8%25AE%25A1%25E6%25A8%25A1%25E5%25BC%258F%25E4%25B8%2583%25E5%25A4%25A7%25E5%258E%259F%25E5%2588%2599.md": "faed2125b25b837bdcd13b68476f69b8",
"assets/assets/20220701%2523design%2523%25E7%25BB%2584%25E5%2590%2588%25E6%25A8%25A1%25E5%25BC%258F.md": "62948d09442ae733839d5c396a20ff9f",
"assets/assets/20220631%2523design%2523%25E6%25A1%25A5%25E6%258E%25A5%25E6%25A8%25A1%25E5%25BC%258F.md": "7d9ebf5bf1dd25f24201ea84b66469be",
"assets/assets/20220716%2523design%2523%25E6%25A8%25A1%25E6%259D%25BF%25E6%25A8%25A1%25E5%25BC%258F.md": "7f56040446789cb1c0e4f2059d59f7ce",
"assets/assets/20220711%2523design%2523%25E8%25BF%25AD%25E4%25BB%25A3%25E5%2599%25A8%25E6%25A8%25A1%25E5%25BC%258F.md": "d38ace8651b585656ccfe0c44a04e512",
"assets/assets/20220714%2523design%2523%25E8%25A7%2582%25E5%25AF%259F%25E8%2580%2585%25E6%25A8%25A1%25E5%25BC%258F.md": "92047de3d5bb0ef4c83104058d934397",
"assets/assets/20220104%2523kotlin%2523kotlin%25E5%259F%25BA%25E6%259C%25AC%25E4%25BD%25BF%25E7%2594%25A8.md": "28ff86ca8ee304ed3b4a60d33cde1d5d",
"assets/assets/20220816%2523coroutine%2523%25E5%258D%258F%25E7%25A8%258B%25EF%25BC%2588coroutine%25EF%25BC%2589.md": "c4a0335dd57f8c3cbf9b1d3327d33add",
"assets/assets/20220709%2523design%2523%25E5%2591%25BD%25E4%25BB%25A4%25E6%25A8%25A1%25E5%25BC%258F.md": "4c105e20290c7e7e02a1733449327b6b",
"assets/assets/20220715%2523design%2523%25E7%258A%25B6%25E6%2580%2581%25E6%25A8%25A1%25E5%25BC%258F.md": "0620743eef96a0c267167b54589d6ea6",
"assets/assets/20220707%2523design%2523%25E4%25BB%25A3%25E7%2590%2586%25E6%25A8%25A1%25E5%25BC%258F.md": "83fc1ea0603b61943264688fc4c82f0b",
"assets/assets/20220105%2523android%2523mvx%25E8%25AE%25BE%25E8%25AE%25A1%25E5%25BC%2580%25E5%258F%2591%25E6%25A8%25A1%25E5%25BC%258F.md": "453cb11d2f1d6f691307abb04c8d0a38",
"assets/assets/20220103%2523kotlin%2523kotlin%2520%25E4%25BF%25AE%25E9%25A5%25B0%25E8%25AF%258D.md": "cdcac82c3373fc8acec46cefc4f29052",
"assets/assets/20220108%2523design%252323%25E7%25A7%258D%25E8%25AE%25BE%25E8%25AE%25A1%25E6%25A8%25A1%25E5%25BC%258F.md": "a2f0788ddeb6f1671974715b7f4daf4f",
"assets/assets/20220708%2523design%2523%25E8%25B4%25A3%25E4%25BB%25BB%25E9%2593%25BE%25E6%25A8%25A1%25E5%25BC%258F.md": "0b85bf643997ea8dea43183de88f866a",
"assets/assets/20220704%2523design%2523%25E8%25A3%2585%25E9%25A5%25B0%25E5%2599%25A8%25E6%25A8%25A1%25E5%25BC%258F.md": "6f7f4da0611f4a4569fc84ebbda07d8b",
"assets/assets/20220705%2523design%2523%25E5%25A4%2596%25E8%25A7%2582%25E6%25A8%25A1%25E5%25BC%258F.md": "5fc720bf77932bf1ff03d35d16f00a1d",
"assets/assets/20220219%2523dart%2523dart_actions.md": "1a68d6926302b370c90494f3339ca24d",
"assets/assets/20220106%2523android%2523vector.md": "5922431dbd8f3ac828f41a8deccca0c5",
"assets/assets/20220713%2523design%2523%25E5%25A4%2587%25E5%25BF%2598%25E5%25BD%2595%25E6%25A8%25A1%25E5%25BC%258F.md": "ba43a2563d02a7c499668dece5661c6c",
"assets/assets/20220107%2523android%2523%25E7%25BD%2591%25E7%25BB%259C%25E4%25BC%2598%25E5%258C%2596.md": "a79bc59dcc0ea634ec906c98c0a21619",
"assets/assets/20220627%2523design%2523%25E5%25BB%25BA%25E9%2580%25A0%25E8%2580%2585%25E6%25A8%25A1%25E5%25BC%258F.md": "509b2f75eef44c7e92483f838b7d00b4",
"assets/assets/20220219%2523flutter%2523github_actions.md": "44b28fbe712fe3634fbaedbbbec6861d",
"assets/assets/20220718%2523design%2523%25E8%25AE%25BF%25E9%2597%25AE%25E8%2580%2585%25E6%25A8%25A1%25E5%25BC%258F.md": "7f53dd5479e157b93afcb030e9a603e9",
"assets/assets/20220710%2523design%2523%25E8%25A7%25A3%25E9%2587%258A%25E5%2599%25A8%25E6%25A8%25A1%25E5%25BC%258F.md": "25d766a2d0898afa1e17f9365f55e848",
"assets/assets/20220101%2523android%2523adb%25E5%2591%25BD%25E4%25BB%25A4%25E7%259B%25AE%25E5%25BD%2595.md": "833bab70dc3f35b0d14d6eece15eae68",
"assets/assets/20220630%2523design%2523%25E9%2580%2582%25E9%2585%258D%25E5%2599%25A8%25E6%25A8%25A1%25E5%25BC%258F.md": "139fd2c304c1a7b82742a07971586950",
"assets/assets/20220712%2523design%2523%25E4%25B8%25AD%25E4%25BB%258B%25E8%2580%2585%25E6%25A8%25A1%25E5%25BC%258F.md": "fa29927f30d3a83a2883e0d1fd967272",
"assets/assets/20220102%2523android%2523jetpack%25E6%2596%2587%25E6%25A1%25A3.md": "40449de944ecbea906f7173aa53af1f2",
"assets/assets/20220218%2523other%2523github_actions.md": "44b28fbe712fe3634fbaedbbbec6861d",
"assets/assets/20220628%2523design%2523%25E5%258E%259F%25E5%259E%258B%25E6%25A8%25A1%25E5%25BC%258F.md": "55b4c6c26faceee5cd494edf6d1f2cf5",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/fonts/siyuan.ttf": "e03c482299f5ce3faa53b9f3d1e560dd",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/images/chain_of_responsibility_pattern.png": "575fececfb32574db5a356df2df36a1e",
"assets/images/flyweight_pattern.png": "1bb7a165ae58d78d535fbdcf5ca4d8aa",
"assets/images/facade_pattern.png": "d65749a65ed367eb007f7aca27b4869f",
"assets/images/adapter_class.png": "240757aafe94bb21d1ca9f348fbb8d2e",
"assets/images/factory_method.png": "6f0cb284ae6694cc94839280779e9a1b",
"assets/images/decorator_pattern.png": "3c9b88aeb0fc9178e705552ab4fe3d8d",
"assets/images/observerdesign.jpg": "5d5914dc6e0f198452401188ee7065b5",
"assets/images/composite_pattern.png": "a379751d34a110294efcd692b9d169cf",
"assets/images/singleton_pattern.png": "538d9ea0b912b8e8a5856a1177a79aa3",
"assets/images/builder_pattern.png": "a40b1fe1944811adb1e5d7589a7027b6",
"assets/images/proxy_pattern.png": "fb541ff888baf4edf6408d20d586308c",
"assets/images/bridge_pattern.png": "264918c6f076d9119d8ca65c6d9eecd6",
"assets/images/avatar.jpg": "88871e00e510022c92db61261b3a1533",
"assets/images/command_pattern.png": "925afd1e96a18132abb0fa32ea2d553b",
"assets/images/adapter_object.png": "3743b6949ff50e16a282901bedd0d834",
"assets/images/abstract_factory.png": "311409d9c036837a1c4522b29707a2de",
"assets/images/prototype_pattern.png": "810d174121e52cfaa04693bd7c94a2f1",
"assets/images/adapter_interface.png": "ab344dc50de03c918ad21a73c7b526dd",
"assets/images/github.png": "7d90864ef543bd34b771d2a5398c1a77",
"assets/FontManifest.json": "6ef111fa20c5e0b9e82a5b7c1da445fd",
"assets/NOTICES": "8d1dac0715bbef271853aba7f8d26a76",
"index.html": "128aa6abad21c874eb19c941e672b466",
"/": "128aa6abad21c874eb19c941e672b466",
"favicon.png": "7a4b8f038971a3a26743667b631983cd",
"version.json": "bd2cd0b519ec5349713e13b479192a45",
"CNAME": "4b8967741aa4001cc3fc81d7b096991d",
"manifest.json": "85aba1390278ce1f76e765d487a779ec",
"icons/Icon-maskable-192.png": "15e107ddbe3a40e3224d296be16e8ed8",
"icons/Icon-maskable-512.png": "a56e5d3084a58e2f2c8cbef632a01ffb",
"icons/Icon-192.png": "15e107ddbe3a40e3224d296be16e8ed8",
"icons/Icon-512.png": "a56e5d3084a58e2f2c8cbef632a01ffb"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
