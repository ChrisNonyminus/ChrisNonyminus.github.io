

// The Module object: Our interface to the outside world. We import
// and export values on it. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(Module) { ..generated code.. }
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to check if Module already exists (e.g. case 3 above).
// Substitution will be replaced with actual code on later stage of the build,
// this way Closure Compiler will not mangle it (e.g. case 4. above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module = typeof Module != 'undefined' ? Module : {};

// See https://caniuse.com/mdn-javascript_builtins_object_assign

// --pre-jses are emitted after the Module integration code, so that they can
// refer to Module (if they choose; they can also define Module)

  if (!Module.expectedDataFileDownloads) {
    Module.expectedDataFileDownloads = 0;
  }

  Module.expectedDataFileDownloads++;
  (function() {
    // When running as a pthread, FS operations are proxied to the main thread, so we don't need to
    // fetch the .data bundle on the worker
    if (Module['ENVIRONMENT_IS_PTHREAD']) return;
    var loadPackage = function(metadata) {

      var PACKAGE_PATH = '';
      if (typeof window === 'object') {
        PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
      } else if (typeof process === 'undefined' && typeof location !== 'undefined') {
        // web worker
        PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
      }
      var PACKAGE_NAME = 'MetalNes.data';
      var REMOTE_PACKAGE_BASE = 'MetalNes.data';
      if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
        Module['locateFile'] = Module['locateFilePackage'];
        err('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
      }
      var REMOTE_PACKAGE_NAME = Module['locateFile'] ? Module['locateFile'](REMOTE_PACKAGE_BASE, '') : REMOTE_PACKAGE_BASE;

      var REMOTE_PACKAGE_SIZE = metadata['remote_package_size'];
      var PACKAGE_UUID = metadata['package_uuid'];

      function fetchRemotePackage(packageName, packageSize, callback, errback) {
        if (typeof process === 'object' && typeof process.versions === 'object' && typeof process.versions.node === 'string') {
          require('fs').readFile(packageName, function(err, contents) {
            if (err) {
              errback(err);
            } else {
              callback(contents.buffer);
            }
          });
          return;
        }
        var xhr = new XMLHttpRequest();
        xhr.open('GET', packageName, true);
        xhr.responseType = 'arraybuffer';
        xhr.onprogress = function(event) {
          var url = packageName;
          var size = packageSize;
          if (event.total) size = event.total;
          if (event.loaded) {
            if (!xhr.addedTotal) {
              xhr.addedTotal = true;
              if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
              Module.dataFileDownloads[url] = {
                loaded: event.loaded,
                total: size
              };
            } else {
              Module.dataFileDownloads[url].loaded = event.loaded;
            }
            var total = 0;
            var loaded = 0;
            var num = 0;
            for (var download in Module.dataFileDownloads) {
            var data = Module.dataFileDownloads[download];
              total += data.total;
              loaded += data.loaded;
              num++;
            }
            total = Math.ceil(total * Module.expectedDataFileDownloads/num);
            if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
          } else if (!Module.dataFileDownloads) {
            if (Module['setStatus']) Module['setStatus']('Downloading data...');
          }
        };
        xhr.onerror = function(event) {
          throw new Error("NetworkError for: " + packageName);
        }
        xhr.onload = function(event) {
          if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            var packageData = xhr.response;
            callback(packageData);
          } else {
            throw new Error(xhr.statusText + " : " + xhr.responseURL);
          }
        };
        xhr.send(null);
      };

      function handleError(error) {
        console.error('package error:', error);
      };

      var fetchedCallback = null;
      var fetched = Module['getPreloadedPackage'] ? Module['getPreloadedPackage'](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;

      if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);

    function runWithFS() {

      function assert(check, msg) {
        if (!check) throw msg + new Error().stack;
      }
Module['FS_createPath']("/", "assets", true, true);
Module['FS_createPath']("/assets", "fonts", true, true);
Module['FS_createPath']("/assets", "roms", true, true);
Module['FS_createPath']("/assets/roms", "nes-test-roms", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "apu_mixer", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/apu_mixer", "source", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/apu_mixer/source", "common", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "apu_mixer_recordings", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "apu_reset", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/apu_reset", "source", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/apu_reset/source", "common", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "apu_test", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/apu_test", "rom_singles", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/apu_test", "source", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/apu_test/source", "common", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "blargg_apu_2005.07.30", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/blargg_apu_2005.07.30", "source", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "blargg_nes_cpu_test5", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/blargg_nes_cpu_test5", "source", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/blargg_nes_cpu_test5/source", "common", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "blargg_ppu_tests_2005.09.15b", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/blargg_ppu_tests_2005.09.15b", "source", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "branch_timing_tests", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "cpu_dummy_reads", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/cpu_dummy_reads", "source", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/cpu_dummy_reads/source", "common", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "cpu_exec_space", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/cpu_exec_space", "source", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/cpu_exec_space/source", "common", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "cpu_interrupts_v2", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/cpu_interrupts_v2", "rom_singles", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/cpu_interrupts_v2", "source", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/cpu_interrupts_v2/source", "common", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "cpu_reset", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/cpu_reset", "source", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/cpu_reset/source", "common", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "cpu_timing_test6", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/cpu_timing_test6", "source", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "dmc_dma_during_read4", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/dmc_dma_during_read4", "source", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/dmc_dma_during_read4/source", "common", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "dmc_tests", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "dpcmletterbox", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/dpcmletterbox", "obj", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/dpcmletterbox/obj", "nes", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/dpcmletterbox", "src", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/dpcmletterbox", "tilesets", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/dpcmletterbox", "tools", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "exram", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "full_palette", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "instr_misc", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/instr_misc", "rom_singles", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/instr_misc", "source", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/instr_misc/source", "common", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "instr_test-v3", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/instr_test-v3", "rom_singles", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/instr_test-v3", "source", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/instr_test-v3/source", "common", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "instr_timing", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/instr_timing", "rom_singles", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/instr_timing", "source", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/instr_timing/source", "common", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "MMC1_A12", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "mmc3_irq_tests", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/mmc3_irq_tests", "source", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "mmc3_test", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/mmc3_test", "source", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/mmc3_test/source", "common", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "mmc3_test_2", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/mmc3_test_2", "rom_singles", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/mmc3_test_2", "source", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/mmc3_test_2/source", "common", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "nes15-1.0.0", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/nes15-1.0.0", "bin2pkb", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/nes15-1.0.0", "clib", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/nes15-1.0.0", "fifteen", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/nes15-1.0.0", "gfx", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/nes15-1.0.0", "nes-lib", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/nes15-1.0.0", "pcx2chr", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/nes15-1.0.0", "snd", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/nes15-1.0.0", "src", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "nes_instr_test", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/nes_instr_test", "nsf_singles", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/nes_instr_test", "rom_singles", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/nes_instr_test", "source", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/nes_instr_test/source", "common", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "nmi_sync", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "nrom368", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "ny2011", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "oam_read", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/oam_read", "source", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/oam_read/source", "common", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "oam_stress", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/oam_stress", "source", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/oam_stress/source", "common", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "other", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "PaddleTest3", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "pal_apu_tests", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "ppu_open_bus", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/ppu_open_bus", "source", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/ppu_open_bus/source", "common", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "ppu_vbl_nmi", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/ppu_vbl_nmi", "rom_singles", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/ppu_vbl_nmi", "source", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/ppu_vbl_nmi/source", "common", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "read_joy3", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/read_joy3", "source", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/read_joy3/source", "common", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "scanline", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "scanline-a1", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "scrolltest", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "soundtest", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "sprdma_and_dmc_dma", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "spritecans-2011", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/spritecans-2011", "obj", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/spritecans-2011/obj", "nes", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/spritecans-2011", "src", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/spritecans-2011", "tilesets", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/spritecans-2011", "tools", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "sprite_hit_tests_2005.10.05", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/sprite_hit_tests_2005.10.05", "source", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "sprite_overflow_tests", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "stars_se", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "stomper", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "stress", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "tutor", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "tvpassfail", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "vaus-test", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/vaus-test", "obj", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/vaus-test/obj", "nes", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/vaus-test", "src", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/vaus-test", "tilesets", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/vaus-test", "tools", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "vbl_nmi_timing", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/vbl_nmi_timing", "source", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/vbl_nmi_timing/source", "support", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "volume_tests", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/volume_tests", "obj", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/volume_tests/obj", "nes", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/volume_tests", "recordings", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms/volume_tests", "src", true, true);
Module['FS_createPath']("/assets/roms/nes-test-roms", "window5", true, true);
Module['FS_createPath']("/assets", "shaders", true, true);
Module['FS_createPath']("/assets", "system-def", true, true);
Module['FS_createPath']("/assets/system-def", "2a03", true, true);
Module['FS_createPath']("/assets/system-def", "2c02", true, true);
Module['FS_createPath']("/assets", "textures", true, true);

      /** @constructor */
      function DataRequest(start, end, audio) {
        this.start = start;
        this.end = end;
        this.audio = audio;
      }
      DataRequest.prototype = {
        requests: {},
        open: function(mode, name) {
          this.name = name;
          this.requests[name] = this;
          Module['addRunDependency']('fp ' + this.name);
        },
        send: function() {},
        onload: function() {
          var byteArray = this.byteArray.subarray(this.start, this.end);
          this.finish(byteArray);
        },
        finish: function(byteArray) {
          var that = this;
          // canOwn this data in the filesystem, it is a slide into the heap that will never change
          Module['FS_createDataFile'](this.name, null, byteArray, true, true, true);
          Module['removeRunDependency']('fp ' + that.name);
          this.requests[this.name] = null;
        }
      };

      var files = metadata['files'];
      for (var i = 0; i < files.length; ++i) {
        new DataRequest(files[i]['start'], files[i]['end'], files[i]['audio'] || 0).open('GET', files[i]['filename']);
      }

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        // Reuse the bytearray from the XHR as the source for file reads.
          DataRequest.prototype.byteArray = byteArray;
          var files = metadata['files'];
          for (var i = 0; i < files.length; ++i) {
            DataRequest.prototype.requests[files[i].filename].onload();
          }          Module['removeRunDependency']('MetalNes.data');

      };
      Module['addRunDependency']('MetalNes.data');

      if (!Module.preloadResults) Module.preloadResults = {};

      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }

    }
    if (Module['calledRun']) {
      runWithFS();
    } else {
      if (!Module['preRun']) Module['preRun'] = [];
      Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
    }

    }
    loadPackage({"files": [{"filename": "/assets/fonts/Cousine-Regular.ttf", "start": 0, "end": 43912}, {"filename": "/assets/fonts/DroidSans.ttf", "start": 43912, "end": 233956}, {"filename": "/assets/fonts/Karla-Regular.ttf", "start": 233956, "end": 250804}, {"filename": "/assets/fonts/ProggyClean.ttf", "start": 250804, "end": 292012}, {"filename": "/assets/fonts/ProggyTiny.ttf", "start": 292012, "end": 327668}, {"filename": "/assets/fonts/Roboto-Medium.ttf", "start": 327668, "end": 490256}, {"filename": "/assets/fonts/Roboto-Regular.ttf", "start": 490256, "end": 661528}, {"filename": "/assets/roms/nes-test-roms/status.txt", "start": 661528, "end": 673524}, {"filename": "/assets/roms/nes-test-roms/test_roms.xml", "start": 673524, "end": 761283}, {"filename": "/assets/roms/nes-test-roms/apu_mixer/dmc.nes", "start": 761283, "end": 802259}, {"filename": "/assets/roms/nes-test-roms/apu_mixer/noise.nes", "start": 802259, "end": 843235}, {"filename": "/assets/roms/nes-test-roms/apu_mixer/readme.txt", "start": 843235, "end": 847175}, {"filename": "/assets/roms/nes-test-roms/apu_mixer/square.nes", "start": 847175, "end": 888151}, {"filename": "/assets/roms/nes-test-roms/apu_mixer/triangle.nes", "start": 888151, "end": 929127}, {"filename": "/assets/roms/nes-test-roms/apu_mixer/source/dmc.s", "start": 929127, "end": 930128}, {"filename": "/assets/roms/nes-test-roms/apu_mixer/source/nes.cfg", "start": 930128, "end": 931474}, {"filename": "/assets/roms/nes-test-roms/apu_mixer/source/noise.s", "start": 931474, "end": 932912}, {"filename": "/assets/roms/nes-test-roms/apu_mixer/source/readme.txt", "start": 932912, "end": 936822}, {"filename": "/assets/roms/nes-test-roms/apu_mixer/source/square.s", "start": 936822, "end": 939541}, {"filename": "/assets/roms/nes-test-roms/apu_mixer/source/triangle.s", "start": 939541, "end": 940338}, {"filename": "/assets/roms/nes-test-roms/apu_mixer/source/common/ascii.chr", "start": 940338, "end": 941874}, {"filename": "/assets/roms/nes-test-roms/apu_mixer/source/common/build_rom.s", "start": 941874, "end": 943449}, {"filename": "/assets/roms/nes-test-roms/apu_mixer/source/common/console.s", "start": 943449, "end": 949181}, {"filename": "/assets/roms/nes-test-roms/apu_mixer/source/common/crc.s", "start": 949181, "end": 950931}, {"filename": "/assets/roms/nes-test-roms/apu_mixer/source/common/delay.s", "start": 950931, "end": 954558}, {"filename": "/assets/roms/nes-test-roms/apu_mixer/source/common/devcart.bin", "start": 954558, "end": 954814}, {"filename": "/assets/roms/nes-test-roms/apu_mixer/source/common/macros.inc", "start": 954814, "end": 958251}, {"filename": "/assets/roms/nes-test-roms/apu_mixer/source/common/neshw.inc", "start": 958251, "end": 959143}, {"filename": "/assets/roms/nes-test-roms/apu_mixer/source/common/ppu.s", "start": 959143, "end": 962406}, {"filename": "/assets/roms/nes-test-roms/apu_mixer/source/common/print.s", "start": 962406, "end": 965494}, {"filename": "/assets/roms/nes-test-roms/apu_mixer/source/common/shell.inc", "start": 965494, "end": 966012}, {"filename": "/assets/roms/nes-test-roms/apu_mixer/source/common/shell.s", "start": 966012, "end": 968890}, {"filename": "/assets/roms/nes-test-roms/apu_mixer/source/common/shell_misc.s", "start": 968890, "end": 972190}, {"filename": "/assets/roms/nes-test-roms/apu_mixer/source/common/testing.s", "start": 972190, "end": 974147}, {"filename": "/assets/roms/nes-test-roms/apu_mixer/source/common/text_out.s", "start": 974147, "end": 975304}, {"filename": "/assets/roms/nes-test-roms/apu_mixer/source/common/vol_shell.inc", "start": 975304, "end": 977592}, {"filename": "/assets/roms/nes-test-roms/apu_mixer_recordings/dmc.mp3", "start": 977592, "end": 1060400, "audio": 1}, {"filename": "/assets/roms/nes-test-roms/apu_mixer_recordings/noise.mp3", "start": 1060400, "end": 1216351, "audio": 1}, {"filename": "/assets/roms/nes-test-roms/apu_mixer_recordings/square.mp3", "start": 1216351, "end": 1340955, "audio": 1}, {"filename": "/assets/roms/nes-test-roms/apu_mixer_recordings/triangle.mp3", "start": 1340955, "end": 1405739, "audio": 1}, {"filename": "/assets/roms/nes-test-roms/apu_reset/4015_cleared.nes", "start": 1405739, "end": 1446715}, {"filename": "/assets/roms/nes-test-roms/apu_reset/4017_timing.nes", "start": 1446715, "end": 1487691}, {"filename": "/assets/roms/nes-test-roms/apu_reset/4017_written.nes", "start": 1487691, "end": 1528667}, {"filename": "/assets/roms/nes-test-roms/apu_reset/irq_flag_cleared.nes", "start": 1528667, "end": 1569643}, {"filename": "/assets/roms/nes-test-roms/apu_reset/len_ctrs_enabled.nes", "start": 1569643, "end": 1610619}, {"filename": "/assets/roms/nes-test-roms/apu_reset/readme.txt", "start": 1610619, "end": 1614886}, {"filename": "/assets/roms/nes-test-roms/apu_reset/works_immediately.nes", "start": 1614886, "end": 1655862}, {"filename": "/assets/roms/nes-test-roms/apu_reset/source/4015_cleared.s", "start": 1655862, "end": 1656851}, {"filename": "/assets/roms/nes-test-roms/apu_reset/source/4017_timing.s", "start": 1656851, "end": 1657868}, {"filename": "/assets/roms/nes-test-roms/apu_reset/source/4017_written.s", "start": 1657868, "end": 1659002}, {"filename": "/assets/roms/nes-test-roms/apu_reset/source/irq_flag_cleared.s", "start": 1659002, "end": 1659561}, {"filename": "/assets/roms/nes-test-roms/apu_reset/source/len_ctrs_enabled.s", "start": 1659561, "end": 1660600}, {"filename": "/assets/roms/nes-test-roms/apu_reset/source/nes.cfg", "start": 1660600, "end": 1661946}, {"filename": "/assets/roms/nes-test-roms/apu_reset/source/readme.txt", "start": 1661946, "end": 1665856}, {"filename": "/assets/roms/nes-test-roms/apu_reset/source/works_immediately.s", "start": 1665856, "end": 1667164}, {"filename": "/assets/roms/nes-test-roms/apu_reset/source/common/ascii.chr", "start": 1667164, "end": 1668700}, {"filename": "/assets/roms/nes-test-roms/apu_reset/source/common/build_rom.s", "start": 1668700, "end": 1670275}, {"filename": "/assets/roms/nes-test-roms/apu_reset/source/common/console.s", "start": 1670275, "end": 1676007}, {"filename": "/assets/roms/nes-test-roms/apu_reset/source/common/crc.s", "start": 1676007, "end": 1677757}, {"filename": "/assets/roms/nes-test-roms/apu_reset/source/common/delay.s", "start": 1677757, "end": 1681384}, {"filename": "/assets/roms/nes-test-roms/apu_reset/source/common/devcart.bin", "start": 1681384, "end": 1681640}, {"filename": "/assets/roms/nes-test-roms/apu_reset/source/common/macros.inc", "start": 1681640, "end": 1685077}, {"filename": "/assets/roms/nes-test-roms/apu_reset/source/common/neshw.inc", "start": 1685077, "end": 1685969}, {"filename": "/assets/roms/nes-test-roms/apu_reset/source/common/ppu.s", "start": 1685969, "end": 1689232}, {"filename": "/assets/roms/nes-test-roms/apu_reset/source/common/print.s", "start": 1689232, "end": 1692320}, {"filename": "/assets/roms/nes-test-roms/apu_reset/source/common/run_at_reset.s", "start": 1692320, "end": 1693502}, {"filename": "/assets/roms/nes-test-roms/apu_reset/source/common/shell.inc", "start": 1693502, "end": 1694020}, {"filename": "/assets/roms/nes-test-roms/apu_reset/source/common/shell.s", "start": 1694020, "end": 1696898}, {"filename": "/assets/roms/nes-test-roms/apu_reset/source/common/shell_misc.s", "start": 1696898, "end": 1700198}, {"filename": "/assets/roms/nes-test-roms/apu_reset/source/common/testing.s", "start": 1700198, "end": 1702155}, {"filename": "/assets/roms/nes-test-roms/apu_reset/source/common/text_out.s", "start": 1702155, "end": 1703312}, {"filename": "/assets/roms/nes-test-roms/apu_test/apu_test.nes", "start": 1703312, "end": 1834400}, {"filename": "/assets/roms/nes-test-roms/apu_test/readme.txt", "start": 1834400, "end": 1840262}, {"filename": "/assets/roms/nes-test-roms/apu_test/rom_singles/1-len_ctr.nes", "start": 1840262, "end": 1881238}, {"filename": "/assets/roms/nes-test-roms/apu_test/rom_singles/2-len_table.nes", "start": 1881238, "end": 1922214}, {"filename": "/assets/roms/nes-test-roms/apu_test/rom_singles/3-irq_flag.nes", "start": 1922214, "end": 1963190}, {"filename": "/assets/roms/nes-test-roms/apu_test/rom_singles/4-jitter.nes", "start": 1963190, "end": 2004166}, {"filename": "/assets/roms/nes-test-roms/apu_test/rom_singles/5-len_timing.nes", "start": 2004166, "end": 2045142}, {"filename": "/assets/roms/nes-test-roms/apu_test/rom_singles/6-irq_flag_timing.nes", "start": 2045142, "end": 2086118}, {"filename": "/assets/roms/nes-test-roms/apu_test/rom_singles/7-dmc_basics.nes", "start": 2086118, "end": 2127094}, {"filename": "/assets/roms/nes-test-roms/apu_test/rom_singles/8-dmc_rates.nes", "start": 2127094, "end": 2168070}, {"filename": "/assets/roms/nes-test-roms/apu_test/source/1-len_ctr.s", "start": 2168070, "end": 2169721}, {"filename": "/assets/roms/nes-test-roms/apu_test/source/2-len_table.s", "start": 2169721, "end": 2170298}, {"filename": "/assets/roms/nes-test-roms/apu_test/source/3-irq_flag.s", "start": 2170298, "end": 2171280}, {"filename": "/assets/roms/nes-test-roms/apu_test/source/4-jitter.s", "start": 2171280, "end": 2172534}, {"filename": "/assets/roms/nes-test-roms/apu_test/source/5-len_timing.s", "start": 2172534, "end": 2174095}, {"filename": "/assets/roms/nes-test-roms/apu_test/source/6-irq_flag_timing.s", "start": 2174095, "end": 2175155}, {"filename": "/assets/roms/nes-test-roms/apu_test/source/7-dmc_basics.s", "start": 2175155, "end": 2179687}, {"filename": "/assets/roms/nes-test-roms/apu_test/source/8-dmc_rates.s", "start": 2179687, "end": 2180669}, {"filename": "/assets/roms/nes-test-roms/apu_test/source/nes.cfg", "start": 2180669, "end": 2182015}, {"filename": "/assets/roms/nes-test-roms/apu_test/source/readme.txt", "start": 2182015, "end": 2185925}, {"filename": "/assets/roms/nes-test-roms/apu_test/source/common/apu_shell.inc", "start": 2185925, "end": 2186526}, {"filename": "/assets/roms/nes-test-roms/apu_test/source/common/ascii.chr", "start": 2186526, "end": 2188062}, {"filename": "/assets/roms/nes-test-roms/apu_test/source/common/build_rom.s", "start": 2188062, "end": 2189637}, {"filename": "/assets/roms/nes-test-roms/apu_test/source/common/console.s", "start": 2189637, "end": 2195369}, {"filename": "/assets/roms/nes-test-roms/apu_test/source/common/crc.s", "start": 2195369, "end": 2197119}, {"filename": "/assets/roms/nes-test-roms/apu_test/source/common/delay.s", "start": 2197119, "end": 2200746}, {"filename": "/assets/roms/nes-test-roms/apu_test/source/common/devcart.bin", "start": 2200746, "end": 2201002}, {"filename": "/assets/roms/nes-test-roms/apu_test/source/common/macros.inc", "start": 2201002, "end": 2204439}, {"filename": "/assets/roms/nes-test-roms/apu_test/source/common/neshw.inc", "start": 2204439, "end": 2205331}, {"filename": "/assets/roms/nes-test-roms/apu_test/source/common/ppu.s", "start": 2205331, "end": 2208594}, {"filename": "/assets/roms/nes-test-roms/apu_test/source/common/print.s", "start": 2208594, "end": 2211682}, {"filename": "/assets/roms/nes-test-roms/apu_test/source/common/shell.inc", "start": 2211682, "end": 2212200}, {"filename": "/assets/roms/nes-test-roms/apu_test/source/common/shell.s", "start": 2212200, "end": 2215078}, {"filename": "/assets/roms/nes-test-roms/apu_test/source/common/shell_misc.s", "start": 2215078, "end": 2218378}, {"filename": "/assets/roms/nes-test-roms/apu_test/source/common/sync_apu.s", "start": 2218378, "end": 2218878}, {"filename": "/assets/roms/nes-test-roms/apu_test/source/common/sync_dmc.s", "start": 2218878, "end": 2219942}, {"filename": "/assets/roms/nes-test-roms/apu_test/source/common/testing.s", "start": 2219942, "end": 2221899}, {"filename": "/assets/roms/nes-test-roms/apu_test/source/common/test_main_chans.s", "start": 2221899, "end": 2222397}, {"filename": "/assets/roms/nes-test-roms/apu_test/source/common/text_out.s", "start": 2222397, "end": 2223554}, {"filename": "/assets/roms/nes-test-roms/blargg_apu_2005.07.30/01.len_ctr.nes", "start": 2223554, "end": 2239954}, {"filename": "/assets/roms/nes-test-roms/blargg_apu_2005.07.30/02.len_table.nes", "start": 2239954, "end": 2256354}, {"filename": "/assets/roms/nes-test-roms/blargg_apu_2005.07.30/03.irq_flag.nes", "start": 2256354, "end": 2272754}, {"filename": "/assets/roms/nes-test-roms/blargg_apu_2005.07.30/04.clock_jitter.nes", "start": 2272754, "end": 2289154}, {"filename": "/assets/roms/nes-test-roms/blargg_apu_2005.07.30/05.len_timing_mode0.nes", "start": 2289154, "end": 2305554}, {"filename": "/assets/roms/nes-test-roms/blargg_apu_2005.07.30/06.len_timing_mode1.nes", "start": 2305554, "end": 2321954}, {"filename": "/assets/roms/nes-test-roms/blargg_apu_2005.07.30/07.irq_flag_timing.nes", "start": 2321954, "end": 2338354}, {"filename": "/assets/roms/nes-test-roms/blargg_apu_2005.07.30/08.irq_timing.nes", "start": 2338354, "end": 2354754}, {"filename": "/assets/roms/nes-test-roms/blargg_apu_2005.07.30/09.reset_timing.nes", "start": 2354754, "end": 2371154}, {"filename": "/assets/roms/nes-test-roms/blargg_apu_2005.07.30/10.len_halt_timing.nes", "start": 2371154, "end": 2387554}, {"filename": "/assets/roms/nes-test-roms/blargg_apu_2005.07.30/11.len_reload_timing.nes", "start": 2387554, "end": 2403954}, {"filename": "/assets/roms/nes-test-roms/blargg_apu_2005.07.30/readme.txt", "start": 2403954, "end": 2408929}, {"filename": "/assets/roms/nes-test-roms/blargg_apu_2005.07.30/tests.txt", "start": 2408929, "end": 2413718}, {"filename": "/assets/roms/nes-test-roms/blargg_apu_2005.07.30/source/01.len_ctr.asm", "start": 2413718, "end": 2416022}, {"filename": "/assets/roms/nes-test-roms/blargg_apu_2005.07.30/source/02.len_table.asm", "start": 2416022, "end": 2417286}, {"filename": "/assets/roms/nes-test-roms/blargg_apu_2005.07.30/source/03.irq_flag.asm", "start": 2417286, "end": 2419047}, {"filename": "/assets/roms/nes-test-roms/blargg_apu_2005.07.30/source/04.clock_jitter.asm", "start": 2419047, "end": 2421005}, {"filename": "/assets/roms/nes-test-roms/blargg_apu_2005.07.30/source/05.len_timing_mode0.asm", "start": 2421005, "end": 2423895}, {"filename": "/assets/roms/nes-test-roms/blargg_apu_2005.07.30/source/06.len_timing_mode1.asm", "start": 2423895, "end": 2426751}, {"filename": "/assets/roms/nes-test-roms/blargg_apu_2005.07.30/source/07.irq_flag_timing.asm", "start": 2426751, "end": 2428503}, {"filename": "/assets/roms/nes-test-roms/blargg_apu_2005.07.30/source/08.irq_timing.asm", "start": 2428503, "end": 2429773}, {"filename": "/assets/roms/nes-test-roms/blargg_apu_2005.07.30/source/09.reset_timing.asm", "start": 2429773, "end": 2431090}, {"filename": "/assets/roms/nes-test-roms/blargg_apu_2005.07.30/source/10.len_halt_timing.asm", "start": 2431090, "end": 2433126}, {"filename": "/assets/roms/nes-test-roms/blargg_apu_2005.07.30/source/11.len_reload_timing.asm", "start": 2433126, "end": 2435763}, {"filename": "/assets/roms/nes-test-roms/blargg_apu_2005.07.30/source/apu_util.asm", "start": 2435763, "end": 2437159}, {"filename": "/assets/roms/nes-test-roms/blargg_apu_2005.07.30/source/prefix_apu.asm", "start": 2437159, "end": 2438164}, {"filename": "/assets/roms/nes-test-roms/blargg_nes_cpu_test5/cpu.nes", "start": 2438164, "end": 2708516}, {"filename": "/assets/roms/nes-test-roms/blargg_nes_cpu_test5/official.nes", "start": 2708516, "end": 2978868}, {"filename": "/assets/roms/nes-test-roms/blargg_nes_cpu_test5/readme.txt", "start": 2978868, "end": 2983251}, {"filename": "/assets/roms/nes-test-roms/blargg_nes_cpu_test5/source/nes.cfg", "start": 2983251, "end": 2984264}, {"filename": "/assets/roms/nes-test-roms/blargg_nes_cpu_test5/source/readme.txt", "start": 2984264, "end": 2987485}, {"filename": "/assets/roms/nes-test-roms/blargg_nes_cpu_test5/source/common/ascii.chr", "start": 2987485, "end": 2995677}, {"filename": "/assets/roms/nes-test-roms/blargg_ppu_tests_2005.09.15b/palette_ram.nes", "start": 2995677, "end": 3012077}, {"filename": "/assets/roms/nes-test-roms/blargg_ppu_tests_2005.09.15b/power_up_palette.nes", "start": 3012077, "end": 3028477}, {"filename": "/assets/roms/nes-test-roms/blargg_ppu_tests_2005.09.15b/readme.txt", "start": 3028477, "end": 3030856}, {"filename": "/assets/roms/nes-test-roms/blargg_ppu_tests_2005.09.15b/sprite_ram.nes", "start": 3030856, "end": 3047256}, {"filename": "/assets/roms/nes-test-roms/blargg_ppu_tests_2005.09.15b/vbl_clear_time.nes", "start": 3047256, "end": 3063656}, {"filename": "/assets/roms/nes-test-roms/blargg_ppu_tests_2005.09.15b/vram_access.nes", "start": 3063656, "end": 3080056}, {"filename": "/assets/roms/nes-test-roms/blargg_ppu_tests_2005.09.15b/source/palette_ram.asm", "start": 3080056, "end": 3082300}, {"filename": "/assets/roms/nes-test-roms/blargg_ppu_tests_2005.09.15b/source/power_up_palette.asm", "start": 3082300, "end": 3083138}, {"filename": "/assets/roms/nes-test-roms/blargg_ppu_tests_2005.09.15b/source/prefix_ppu.asm", "start": 3083138, "end": 3084209}, {"filename": "/assets/roms/nes-test-roms/blargg_ppu_tests_2005.09.15b/source/sprite_ram.asm", "start": 3084209, "end": 3087055}, {"filename": "/assets/roms/nes-test-roms/blargg_ppu_tests_2005.09.15b/source/vbl_clear_time.asm", "start": 3087055, "end": 3088094}, {"filename": "/assets/roms/nes-test-roms/blargg_ppu_tests_2005.09.15b/source/vram_access.asm", "start": 3088094, "end": 3091610}, {"filename": "/assets/roms/nes-test-roms/branch_timing_tests/1.Branch_Basics.nes", "start": 3091610, "end": 3108010}, {"filename": "/assets/roms/nes-test-roms/branch_timing_tests/2.Backward_Branch.nes", "start": 3108010, "end": 3124410}, {"filename": "/assets/roms/nes-test-roms/branch_timing_tests/3.Forward_Branch.nes", "start": 3124410, "end": 3140810}, {"filename": "/assets/roms/nes-test-roms/branch_timing_tests/readme.txt", "start": 3140810, "end": 3143208}, {"filename": "/assets/roms/nes-test-roms/cpu_dummy_reads/cpu_dummy_reads.nes", "start": 3143208, "end": 3184184}, {"filename": "/assets/roms/nes-test-roms/cpu_dummy_reads/source/cpu_dummy_reads.s", "start": 3184184, "end": 3186760}, {"filename": "/assets/roms/nes-test-roms/cpu_dummy_reads/source/nes.cfg", "start": 3186760, "end": 3188301}, {"filename": "/assets/roms/nes-test-roms/cpu_dummy_reads/source/readme.txt", "start": 3188301, "end": 3192033}, {"filename": "/assets/roms/nes-test-roms/cpu_dummy_reads/source/common/ascii.chr", "start": 3192033, "end": 3194081}, {"filename": "/assets/roms/nes-test-roms/cpu_dummy_reads/source/common/console.s", "start": 3194081, "end": 3197438}, {"filename": "/assets/roms/nes-test-roms/cpu_dummy_reads/source/common/crc.s", "start": 3197438, "end": 3198781}, {"filename": "/assets/roms/nes-test-roms/cpu_dummy_reads/source/common/delay.s", "start": 3198781, "end": 3201430}, {"filename": "/assets/roms/nes-test-roms/cpu_dummy_reads/source/common/macros.inc", "start": 3201430, "end": 3202693}, {"filename": "/assets/roms/nes-test-roms/cpu_dummy_reads/source/common/nes.inc", "start": 3202693, "end": 3203229}, {"filename": "/assets/roms/nes-test-roms/cpu_dummy_reads/source/common/print.s", "start": 3203229, "end": 3205749}, {"filename": "/assets/roms/nes-test-roms/cpu_dummy_reads/source/common/serial.s", "start": 3205749, "end": 3206734}, {"filename": "/assets/roms/nes-test-roms/cpu_dummy_reads/source/common/shell.inc", "start": 3206734, "end": 3213576}, {"filename": "/assets/roms/nes-test-roms/cpu_dummy_reads/source/common/testing.s", "start": 3213576, "end": 3215961}, {"filename": "/assets/roms/nes-test-roms/cpu_exec_space/readme.txt", "start": 3215961, "end": 3222990}, {"filename": "/assets/roms/nes-test-roms/cpu_exec_space/test_cpu_exec_space_apu.nes", "start": 3222990, "end": 3263966}, {"filename": "/assets/roms/nes-test-roms/cpu_exec_space/test_cpu_exec_space_ppuio.nes", "start": 3263966, "end": 3304942}, {"filename": "/assets/roms/nes-test-roms/cpu_exec_space/source/Makefile", "start": 3304942, "end": 3305625}, {"filename": "/assets/roms/nes-test-roms/cpu_exec_space/source/readme.txt", "start": 3305625, "end": 3309485}, {"filename": "/assets/roms/nes-test-roms/cpu_exec_space/source/test_cpu_exec_space_apu.s", "start": 3309485, "end": 3313910}, {"filename": "/assets/roms/nes-test-roms/cpu_exec_space/source/test_cpu_exec_space_ppuio.s", "start": 3313910, "end": 3329987}, {"filename": "/assets/roms/nes-test-roms/cpu_exec_space/source/common/ascii_1.chr", "start": 3329987, "end": 3331523}, {"filename": "/assets/roms/nes-test-roms/cpu_exec_space/source/common/ascii_2.chr", "start": 3331523, "end": 3333059}, {"filename": "/assets/roms/nes-test-roms/cpu_exec_space/source/common/ascii_3.chr", "start": 3333059, "end": 3334595}, {"filename": "/assets/roms/nes-test-roms/cpu_exec_space/source/common/build_rom.s", "start": 3334595, "end": 3336284}, {"filename": "/assets/roms/nes-test-roms/cpu_exec_space/source/common/colors.inc", "start": 3336284, "end": 3337085}, {"filename": "/assets/roms/nes-test-roms/cpu_exec_space/source/common/console.s", "start": 3337085, "end": 3341665}, {"filename": "/assets/roms/nes-test-roms/cpu_exec_space/source/common/crc.s", "start": 3341665, "end": 3343415}, {"filename": "/assets/roms/nes-test-roms/cpu_exec_space/source/common/delay.s", "start": 3343415, "end": 3347050}, {"filename": "/assets/roms/nes-test-roms/cpu_exec_space/source/common/macros.inc", "start": 3347050, "end": 3350172}, {"filename": "/assets/roms/nes-test-roms/cpu_exec_space/source/common/neshw.inc", "start": 3350172, "end": 3350773}, {"filename": "/assets/roms/nes-test-roms/cpu_exec_space/source/common/ppu.s", "start": 3350773, "end": 3352939}, {"filename": "/assets/roms/nes-test-roms/cpu_exec_space/source/common/print.s", "start": 3352939, "end": 3358657}, {"filename": "/assets/roms/nes-test-roms/cpu_exec_space/source/common/shell.inc", "start": 3358657, "end": 3359175}, {"filename": "/assets/roms/nes-test-roms/cpu_exec_space/source/common/shell.s", "start": 3359175, "end": 3364166}, {"filename": "/assets/roms/nes-test-roms/cpu_exec_space/source/common/testing.s", "start": 3364166, "end": 3366128}, {"filename": "/assets/roms/nes-test-roms/cpu_exec_space/source/common/text_out.s", "start": 3366128, "end": 3367285}, {"filename": "/assets/roms/nes-test-roms/cpu_interrupts_v2/cpu_interrupts.nes", "start": 3367285, "end": 3449221}, {"filename": "/assets/roms/nes-test-roms/cpu_interrupts_v2/readme.txt", "start": 3449221, "end": 3456583}, {"filename": "/assets/roms/nes-test-roms/cpu_interrupts_v2/rom_singles/1-cli_latency.nes", "start": 3456583, "end": 3497559}, {"filename": "/assets/roms/nes-test-roms/cpu_interrupts_v2/rom_singles/2-nmi_and_brk.nes", "start": 3497559, "end": 3538535}, {"filename": "/assets/roms/nes-test-roms/cpu_interrupts_v2/rom_singles/3-nmi_and_irq.nes", "start": 3538535, "end": 3579511}, {"filename": "/assets/roms/nes-test-roms/cpu_interrupts_v2/rom_singles/4-irq_and_dma.nes", "start": 3579511, "end": 3620487}, {"filename": "/assets/roms/nes-test-roms/cpu_interrupts_v2/rom_singles/5-branch_delays_irq.nes", "start": 3620487, "end": 3661463}, {"filename": "/assets/roms/nes-test-roms/cpu_interrupts_v2/source/1-cli_latency.s", "start": 3661463, "end": 3665484}, {"filename": "/assets/roms/nes-test-roms/cpu_interrupts_v2/source/2-nmi_and_brk.s", "start": 3665484, "end": 3667381}, {"filename": "/assets/roms/nes-test-roms/cpu_interrupts_v2/source/3-nmi_and_irq.s", "start": 3667381, "end": 3669371}, {"filename": "/assets/roms/nes-test-roms/cpu_interrupts_v2/source/4-irq_and_dma.s", "start": 3669371, "end": 3670835}, {"filename": "/assets/roms/nes-test-roms/cpu_interrupts_v2/source/4-nmi_and_dma.s", "start": 3670835, "end": 3672133}, {"filename": "/assets/roms/nes-test-roms/cpu_interrupts_v2/source/5-branch_delays_irq.s", "start": 3672133, "end": 3675140}, {"filename": "/assets/roms/nes-test-roms/cpu_interrupts_v2/source/nes.cfg", "start": 3675140, "end": 3676486}, {"filename": "/assets/roms/nes-test-roms/cpu_interrupts_v2/source/readme.txt", "start": 3676486, "end": 3680396}, {"filename": "/assets/roms/nes-test-roms/cpu_interrupts_v2/source/common/ascii.chr", "start": 3680396, "end": 3681932}, {"filename": "/assets/roms/nes-test-roms/cpu_interrupts_v2/source/common/build_rom.s", "start": 3681932, "end": 3683507}, {"filename": "/assets/roms/nes-test-roms/cpu_interrupts_v2/source/common/console.s", "start": 3683507, "end": 3689239}, {"filename": "/assets/roms/nes-test-roms/cpu_interrupts_v2/source/common/crc.s", "start": 3689239, "end": 3690989}, {"filename": "/assets/roms/nes-test-roms/cpu_interrupts_v2/source/common/delay.s", "start": 3690989, "end": 3694616}, {"filename": "/assets/roms/nes-test-roms/cpu_interrupts_v2/source/common/devcart.bin", "start": 3694616, "end": 3694872}, {"filename": "/assets/roms/nes-test-roms/cpu_interrupts_v2/source/common/macros.inc", "start": 3694872, "end": 3698309}, {"filename": "/assets/roms/nes-test-roms/cpu_interrupts_v2/source/common/neshw.inc", "start": 3698309, "end": 3699201}, {"filename": "/assets/roms/nes-test-roms/cpu_interrupts_v2/source/common/ppu.s", "start": 3699201, "end": 3702464}, {"filename": "/assets/roms/nes-test-roms/cpu_interrupts_v2/source/common/print.s", "start": 3702464, "end": 3705970}, {"filename": "/assets/roms/nes-test-roms/cpu_interrupts_v2/source/common/shell.inc", "start": 3705970, "end": 3706488}, {"filename": "/assets/roms/nes-test-roms/cpu_interrupts_v2/source/common/shell.s", "start": 3706488, "end": 3709399}, {"filename": "/assets/roms/nes-test-roms/cpu_interrupts_v2/source/common/shell_misc.s", "start": 3709399, "end": 3712715}, {"filename": "/assets/roms/nes-test-roms/cpu_interrupts_v2/source/common/sync_apu.s", "start": 3712715, "end": 3713215}, {"filename": "/assets/roms/nes-test-roms/cpu_interrupts_v2/source/common/sync_vbl.s", "start": 3713215, "end": 3717097}, {"filename": "/assets/roms/nes-test-roms/cpu_interrupts_v2/source/common/testing.s", "start": 3717097, "end": 3719054}, {"filename": "/assets/roms/nes-test-roms/cpu_interrupts_v2/source/common/text_out.s", "start": 3719054, "end": 3720211}, {"filename": "/assets/roms/nes-test-roms/cpu_reset/ram_after_reset.nes", "start": 3720211, "end": 3761187}, {"filename": "/assets/roms/nes-test-roms/cpu_reset/readme.txt", "start": 3761187, "end": 3764583}, {"filename": "/assets/roms/nes-test-roms/cpu_reset/registers.nes", "start": 3764583, "end": 3805559}, {"filename": "/assets/roms/nes-test-roms/cpu_reset/source/nes.cfg", "start": 3805559, "end": 3806905}, {"filename": "/assets/roms/nes-test-roms/cpu_reset/source/ram_after_reset.s", "start": 3806905, "end": 3807948}, {"filename": "/assets/roms/nes-test-roms/cpu_reset/source/readme.txt", "start": 3807948, "end": 3811858}, {"filename": "/assets/roms/nes-test-roms/cpu_reset/source/registers.s", "start": 3811858, "end": 3813121}, {"filename": "/assets/roms/nes-test-roms/cpu_reset/source/common/ascii.chr", "start": 3813121, "end": 3814657}, {"filename": "/assets/roms/nes-test-roms/cpu_reset/source/common/build_rom.s", "start": 3814657, "end": 3816256}, {"filename": "/assets/roms/nes-test-roms/cpu_reset/source/common/console.s", "start": 3816256, "end": 3822110}, {"filename": "/assets/roms/nes-test-roms/cpu_reset/source/common/crc.s", "start": 3822110, "end": 3823860}, {"filename": "/assets/roms/nes-test-roms/cpu_reset/source/common/delay.s", "start": 3823860, "end": 3827487}, {"filename": "/assets/roms/nes-test-roms/cpu_reset/source/common/devcart.bin", "start": 3827487, "end": 3827743}, {"filename": "/assets/roms/nes-test-roms/cpu_reset/source/common/macros.inc", "start": 3827743, "end": 3830863}, {"filename": "/assets/roms/nes-test-roms/cpu_reset/source/common/neshw.inc", "start": 3830863, "end": 3831576}, {"filename": "/assets/roms/nes-test-roms/cpu_reset/source/common/ppu.s", "start": 3831576, "end": 3833742}, {"filename": "/assets/roms/nes-test-roms/cpu_reset/source/common/print.s", "start": 3833742, "end": 3836637}, {"filename": "/assets/roms/nes-test-roms/cpu_reset/source/common/run_at_reset.s", "start": 3836637, "end": 3837926}, {"filename": "/assets/roms/nes-test-roms/cpu_reset/source/common/shell.inc", "start": 3837926, "end": 3838444}, {"filename": "/assets/roms/nes-test-roms/cpu_reset/source/common/shell.s", "start": 3838444, "end": 3844259}, {"filename": "/assets/roms/nes-test-roms/cpu_reset/source/common/testing.s", "start": 3844259, "end": 3846221}, {"filename": "/assets/roms/nes-test-roms/cpu_reset/source/common/text_out.s", "start": 3846221, "end": 3847378}, {"filename": "/assets/roms/nes-test-roms/cpu_timing_test6/cpu_timing_test.nes", "start": 3847378, "end": 3863778}, {"filename": "/assets/roms/nes-test-roms/cpu_timing_test6/readme.txt", "start": 3863778, "end": 3869499}, {"filename": "/assets/roms/nes-test-roms/cpu_timing_test6/source/cpu_timing_test.asm", "start": 3869499, "end": 3879113}, {"filename": "/assets/roms/nes-test-roms/dmc_dma_during_read4/dma_2007_read.nes", "start": 3879113, "end": 3911897}, {"filename": "/assets/roms/nes-test-roms/dmc_dma_during_read4/dma_2007_write.nes", "start": 3911897, "end": 3944681}, {"filename": "/assets/roms/nes-test-roms/dmc_dma_during_read4/dma_4016_read.nes", "start": 3944681, "end": 3977465}, {"filename": "/assets/roms/nes-test-roms/dmc_dma_during_read4/double_2007_read.nes", "start": 3977465, "end": 4010249}, {"filename": "/assets/roms/nes-test-roms/dmc_dma_during_read4/read_write_2007.nes", "start": 4010249, "end": 4043033}, {"filename": "/assets/roms/nes-test-roms/dmc_dma_during_read4/source/dma_2007_read.s", "start": 4043033, "end": 4044257}, {"filename": "/assets/roms/nes-test-roms/dmc_dma_during_read4/source/dma_2007_write.s", "start": 4044257, "end": 4045547}, {"filename": "/assets/roms/nes-test-roms/dmc_dma_during_read4/source/dma_4016_read.s", "start": 4045547, "end": 4046385}, {"filename": "/assets/roms/nes-test-roms/dmc_dma_during_read4/source/double_2007_read.s", "start": 4046385, "end": 4047560}, {"filename": "/assets/roms/nes-test-roms/dmc_dma_during_read4/source/nes.cfg", "start": 4047560, "end": 4049101}, {"filename": "/assets/roms/nes-test-roms/dmc_dma_during_read4/source/readme.txt", "start": 4049101, "end": 4051874}, {"filename": "/assets/roms/nes-test-roms/dmc_dma_during_read4/source/read_write_2007.s", "start": 4051874, "end": 4052998}, {"filename": "/assets/roms/nes-test-roms/dmc_dma_during_read4/source/common/ascii.chr", "start": 4052998, "end": 4055046}, {"filename": "/assets/roms/nes-test-roms/dmc_dma_during_read4/source/common/common.inc", "start": 4055046, "end": 4056092}, {"filename": "/assets/roms/nes-test-roms/dmc_dma_during_read4/source/common/console.s", "start": 4056092, "end": 4059449}, {"filename": "/assets/roms/nes-test-roms/dmc_dma_during_read4/source/common/crc.s", "start": 4059449, "end": 4060792}, {"filename": "/assets/roms/nes-test-roms/dmc_dma_during_read4/source/common/delay.s", "start": 4060792, "end": 4063441}, {"filename": "/assets/roms/nes-test-roms/dmc_dma_during_read4/source/common/macros.inc", "start": 4063441, "end": 4064704}, {"filename": "/assets/roms/nes-test-roms/dmc_dma_during_read4/source/common/nes.inc", "start": 4064704, "end": 4065256}, {"filename": "/assets/roms/nes-test-roms/dmc_dma_during_read4/source/common/print.s", "start": 4065256, "end": 4067776}, {"filename": "/assets/roms/nes-test-roms/dmc_dma_during_read4/source/common/serial.s", "start": 4067776, "end": 4068795}, {"filename": "/assets/roms/nes-test-roms/dmc_dma_during_read4/source/common/shell.inc", "start": 4068795, "end": 4075637}, {"filename": "/assets/roms/nes-test-roms/dmc_dma_during_read4/source/common/sync_dmc.s", "start": 4075637, "end": 4078400}, {"filename": "/assets/roms/nes-test-roms/dmc_dma_during_read4/source/common/testing.s", "start": 4078400, "end": 4080785}, {"filename": "/assets/roms/nes-test-roms/dmc_tests/buffer_retained.nes", "start": 4080785, "end": 4097185}, {"filename": "/assets/roms/nes-test-roms/dmc_tests/latency.nes", "start": 4097185, "end": 4113585}, {"filename": "/assets/roms/nes-test-roms/dmc_tests/status.nes", "start": 4113585, "end": 4129985}, {"filename": "/assets/roms/nes-test-roms/dmc_tests/status_irq.nes", "start": 4129985, "end": 4146385}, {"filename": "/assets/roms/nes-test-roms/dpcmletterbox/CHANGES.txt", "start": 4146385, "end": 4147043}, {"filename": "/assets/roms/nes-test-roms/dpcmletterbox/dpcmletterbox.nes", "start": 4147043, "end": 4171635}, {"filename": "/assets/roms/nes-test-roms/dpcmletterbox/makefile", "start": 4171635, "end": 4172822}, {"filename": "/assets/roms/nes-test-roms/dpcmletterbox/NROM.ini", "start": 4172822, "end": 4173883}, {"filename": "/assets/roms/nes-test-roms/dpcmletterbox/README.txt", "start": 4173883, "end": 4176299}, {"filename": "/assets/roms/nes-test-roms/dpcmletterbox/obj/nes/index.txt", "start": 4176299, "end": 4176329}, {"filename": "/assets/roms/nes-test-roms/dpcmletterbox/src/nes.h", "start": 4176329, "end": 4177201}, {"filename": "/assets/roms/nes-test-roms/dpcmletterbox/src/reset.s", "start": 4177201, "end": 4187933}, {"filename": "/assets/roms/nes-test-roms/dpcmletterbox/tilesets/ac16.png", "start": 4187933, "end": 4189579}, {"filename": "/assets/roms/nes-test-roms/dpcmletterbox/tools/pilbmp2nes.py", "start": 4189579, "end": 4193400}, {"filename": "/assets/roms/nes-test-roms/exram/mmc5exram.asm", "start": 4193400, "end": 4200877}, {"filename": "/assets/roms/nes-test-roms/exram/mmc5exram.chr", "start": 4200877, "end": 4209069}, {"filename": "/assets/roms/nes-test-roms/exram/mmc5exram.imk", "start": 4209069, "end": 4209150}, {"filename": "/assets/roms/nes-test-roms/exram/mmc5exram.nes", "start": 4209150, "end": 4233742}, {"filename": "/assets/roms/nes-test-roms/full_palette/flowing_palette.nes", "start": 4233742, "end": 4274718}, {"filename": "/assets/roms/nes-test-roms/full_palette/full_palette.nes", "start": 4274718, "end": 4315694}, {"filename": "/assets/roms/nes-test-roms/full_palette/full_palette.s", "start": 4315694, "end": 4318682}, {"filename": "/assets/roms/nes-test-roms/full_palette/full_palette_smooth.nes", "start": 4318682, "end": 4359658}, {"filename": "/assets/roms/nes-test-roms/full_palette/full_palette_smooth.s", "start": 4359658, "end": 4362793}, {"filename": "/assets/roms/nes-test-roms/instr_misc/instr_misc.nes", "start": 4362793, "end": 4428345}, {"filename": "/assets/roms/nes-test-roms/instr_misc/readme.txt", "start": 4428345, "end": 4432307}, {"filename": "/assets/roms/nes-test-roms/instr_misc/rom_singles/01-abs_x_wrap.nes", "start": 4432307, "end": 4473283}, {"filename": "/assets/roms/nes-test-roms/instr_misc/rom_singles/02-branch_wrap.nes", "start": 4473283, "end": 4514259}, {"filename": "/assets/roms/nes-test-roms/instr_misc/rom_singles/03-dummy_reads.nes", "start": 4514259, "end": 4555235}, {"filename": "/assets/roms/nes-test-roms/instr_misc/rom_singles/04-dummy_reads_apu.nes", "start": 4555235, "end": 4596211}, {"filename": "/assets/roms/nes-test-roms/instr_misc/source/01-abs_x_wrap.s", "start": 4596211, "end": 4596717}, {"filename": "/assets/roms/nes-test-roms/instr_misc/source/02-branch_wrap.s", "start": 4596717, "end": 4597244}, {"filename": "/assets/roms/nes-test-roms/instr_misc/source/03-dummy_reads.s", "start": 4597244, "end": 4599385}, {"filename": "/assets/roms/nes-test-roms/instr_misc/source/04-dummy_reads_apu.s", "start": 4599385, "end": 4601440}, {"filename": "/assets/roms/nes-test-roms/instr_misc/source/nes.cfg", "start": 4601440, "end": 4602699}, {"filename": "/assets/roms/nes-test-roms/instr_misc/source/readme.txt", "start": 4602699, "end": 4606609}, {"filename": "/assets/roms/nes-test-roms/instr_misc/source/common/ascii.chr", "start": 4606609, "end": 4608145}, {"filename": "/assets/roms/nes-test-roms/instr_misc/source/common/build_rom.s", "start": 4608145, "end": 4609728}, {"filename": "/assets/roms/nes-test-roms/instr_misc/source/common/console.s", "start": 4609728, "end": 4615582}, {"filename": "/assets/roms/nes-test-roms/instr_misc/source/common/crc.s", "start": 4615582, "end": 4617332}, {"filename": "/assets/roms/nes-test-roms/instr_misc/source/common/delay.s", "start": 4617332, "end": 4620959}, {"filename": "/assets/roms/nes-test-roms/instr_misc/source/common/devcart.bin", "start": 4620959, "end": 4621215}, {"filename": "/assets/roms/nes-test-roms/instr_misc/source/common/macros.inc", "start": 4621215, "end": 4624335}, {"filename": "/assets/roms/nes-test-roms/instr_misc/source/common/neshw.inc", "start": 4624335, "end": 4625048}, {"filename": "/assets/roms/nes-test-roms/instr_misc/source/common/ppu.s", "start": 4625048, "end": 4627214}, {"filename": "/assets/roms/nes-test-roms/instr_misc/source/common/print.s", "start": 4627214, "end": 4630109}, {"filename": "/assets/roms/nes-test-roms/instr_misc/source/common/shell.inc", "start": 4630109, "end": 4630627}, {"filename": "/assets/roms/nes-test-roms/instr_misc/source/common/shell.s", "start": 4630627, "end": 4635616}, {"filename": "/assets/roms/nes-test-roms/instr_misc/source/common/testing.s", "start": 4635616, "end": 4637578}, {"filename": "/assets/roms/nes-test-roms/instr_misc/source/common/text_out.s", "start": 4637578, "end": 4638735}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/all_instrs.nes", "start": 4638735, "end": 4900895}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/official_only.nes", "start": 4900895, "end": 5163055}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/readme.txt", "start": 5163055, "end": 5171721}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/rom_singles/01-implied.nes", "start": 5171721, "end": 5212697}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/rom_singles/02-immediate.nes", "start": 5212697, "end": 5253673}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/rom_singles/03-zero_page.nes", "start": 5253673, "end": 5294649}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/rom_singles/04-zp_xy.nes", "start": 5294649, "end": 5335625}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/rom_singles/05-absolute.nes", "start": 5335625, "end": 5376601}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/rom_singles/06-abs_xy.nes", "start": 5376601, "end": 5417577}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/rom_singles/07-ind_x.nes", "start": 5417577, "end": 5458553}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/rom_singles/08-ind_y.nes", "start": 5458553, "end": 5499529}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/rom_singles/09-branches.nes", "start": 5499529, "end": 5540505}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/rom_singles/10-stack.nes", "start": 5540505, "end": 5581481}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/rom_singles/11-jmp_jsr.nes", "start": 5581481, "end": 5622457}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/rom_singles/12-rts.nes", "start": 5622457, "end": 5663433}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/rom_singles/13-rti.nes", "start": 5663433, "end": 5704409}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/rom_singles/14-brk.nes", "start": 5704409, "end": 5745385}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/rom_singles/15-special.nes", "start": 5745385, "end": 5786361}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/source/01-implied.s", "start": 5786361, "end": 5787723}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/source/02-immediate.s", "start": 5787723, "end": 5789025}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/source/03-zero_page.s", "start": 5789025, "end": 5790670}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/source/04-zp_xy.s", "start": 5790670, "end": 5792661}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/source/05-absolute.s", "start": 5792661, "end": 5794247}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/source/06-abs_xy.s", "start": 5794247, "end": 5796774}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/source/07-ind_x.s", "start": 5796774, "end": 5798412}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/source/08-ind_y.s", "start": 5798412, "end": 5799812}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/source/09-branches.s", "start": 5799812, "end": 5800587}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/source/10-stack.s", "start": 5800587, "end": 5802054}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/source/11-jmp_jsr.s", "start": 5802054, "end": 5802467}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/source/12-rts.s", "start": 5802467, "end": 5802965}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/source/13-rti.s", "start": 5802965, "end": 5803502}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/source/14-brk.s", "start": 5803502, "end": 5804121}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/source/15-special.s", "start": 5804121, "end": 5805339}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/source/nes.cfg", "start": 5805339, "end": 5806792}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/source/readme.txt", "start": 5806792, "end": 5810702}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/source/common/ascii.chr", "start": 5810702, "end": 5812238}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/source/common/bootloader.bin", "start": 5812238, "end": 5812494}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/source/common/build_rom.s", "start": 5812494, "end": 5814713}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/source/common/console.s", "start": 5814713, "end": 5820482}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/source/common/crc.s", "start": 5820482, "end": 5822197}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/source/common/crc_fast.s", "start": 5822197, "end": 5827531}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/source/common/delay.s", "start": 5827531, "end": 5831467}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/source/common/instr_test.inc", "start": 5831467, "end": 5832937}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/source/common/instr_test_end.s", "start": 5832937, "end": 5835546}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/source/common/macros.inc", "start": 5835546, "end": 5841528}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/source/common/neshw.inc", "start": 5841528, "end": 5842420}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/source/common/ppu.s", "start": 5842420, "end": 5845725}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/source/common/print.s", "start": 5845725, "end": 5849237}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/source/common/shell.inc", "start": 5849237, "end": 5849755}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/source/common/shell.s", "start": 5849755, "end": 5852691}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/source/common/shell_misc.s", "start": 5852691, "end": 5856373}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/source/common/testing.s", "start": 5856373, "end": 5858354}, {"filename": "/assets/roms/nes-test-roms/instr_test-v3/source/common/text_out.s", "start": 5858354, "end": 5859511}, {"filename": "/assets/roms/nes-test-roms/instr_timing/instr_timing.nes", "start": 5859511, "end": 5892295}, {"filename": "/assets/roms/nes-test-roms/instr_timing/readme.txt", "start": 5892295, "end": 5896300}, {"filename": "/assets/roms/nes-test-roms/instr_timing/rom_singles/1-instr_timing.nes", "start": 5896300, "end": 5937276}, {"filename": "/assets/roms/nes-test-roms/instr_timing/rom_singles/2-branch_timing.nes", "start": 5937276, "end": 5978252}, {"filename": "/assets/roms/nes-test-roms/instr_timing/source/1-instr_timing.s", "start": 5978252, "end": 5986365}, {"filename": "/assets/roms/nes-test-roms/instr_timing/source/2-branch_timing.s", "start": 5986365, "end": 5988978}, {"filename": "/assets/roms/nes-test-roms/instr_timing/source/nes.cfg", "start": 5988978, "end": 5990324}, {"filename": "/assets/roms/nes-test-roms/instr_timing/source/readme.txt", "start": 5990324, "end": 5994234}, {"filename": "/assets/roms/nes-test-roms/instr_timing/source/common/ascii.chr", "start": 5994234, "end": 5995770}, {"filename": "/assets/roms/nes-test-roms/instr_timing/source/common/build_rom.s", "start": 5995770, "end": 5997369}, {"filename": "/assets/roms/nes-test-roms/instr_timing/source/common/console.s", "start": 5997369, "end": 6003223}, {"filename": "/assets/roms/nes-test-roms/instr_timing/source/common/crc.s", "start": 6003223, "end": 6004973}, {"filename": "/assets/roms/nes-test-roms/instr_timing/source/common/delay.s", "start": 6004973, "end": 6008600}, {"filename": "/assets/roms/nes-test-roms/instr_timing/source/common/devcart.bin", "start": 6008600, "end": 6008856}, {"filename": "/assets/roms/nes-test-roms/instr_timing/source/common/macros.inc", "start": 6008856, "end": 6011976}, {"filename": "/assets/roms/nes-test-roms/instr_timing/source/common/neshw.inc", "start": 6011976, "end": 6012689}, {"filename": "/assets/roms/nes-test-roms/instr_timing/source/common/ppu.s", "start": 6012689, "end": 6014855}, {"filename": "/assets/roms/nes-test-roms/instr_timing/source/common/print.s", "start": 6014855, "end": 6017750}, {"filename": "/assets/roms/nes-test-roms/instr_timing/source/common/shell.inc", "start": 6017750, "end": 6018268}, {"filename": "/assets/roms/nes-test-roms/instr_timing/source/common/shell.s", "start": 6018268, "end": 6024083}, {"filename": "/assets/roms/nes-test-roms/instr_timing/source/common/testing.s", "start": 6024083, "end": 6026045}, {"filename": "/assets/roms/nes-test-roms/instr_timing/source/common/text_out.s", "start": 6026045, "end": 6027202}, {"filename": "/assets/roms/nes-test-roms/MMC1_A12/alphabet.chr", "start": 6027202, "end": 6028226}, {"filename": "/assets/roms/nes-test-roms/MMC1_A12/joypad.asm", "start": 6028226, "end": 6029481}, {"filename": "/assets/roms/nes-test-roms/MMC1_A12/joypad.lib", "start": 6029481, "end": 6030321}, {"filename": "/assets/roms/nes-test-roms/MMC1_A12/linkfile.txt", "start": 6030321, "end": 6030430}, {"filename": "/assets/roms/nes-test-roms/MMC1_A12/maping.asm", "start": 6030430, "end": 6030937}, {"filename": "/assets/roms/nes-test-roms/MMC1_A12/MMC1.asm", "start": 6030937, "end": 6031570}, {"filename": "/assets/roms/nes-test-roms/MMC1_A12/mmc1.lib", "start": 6031570, "end": 6031918}, {"filename": "/assets/roms/nes-test-roms/MMC1_A12/mmc1_a12.asm", "start": 6031918, "end": 6041334}, {"filename": "/assets/roms/nes-test-roms/MMC1_A12/mmc1_a12.nes", "start": 6041334, "end": 6172422}, {"filename": "/assets/roms/nes-test-roms/MMC1_A12/snrom.bin", "start": 6172422, "end": 6172438}, {"filename": "/assets/roms/nes-test-roms/mmc3_irq_tests/1.Clocking.nes", "start": 6172438, "end": 6188838}, {"filename": "/assets/roms/nes-test-roms/mmc3_irq_tests/2.Details.nes", "start": 6188838, "end": 6205238}, {"filename": "/assets/roms/nes-test-roms/mmc3_irq_tests/3.A12_clocking.nes", "start": 6205238, "end": 6221638}, {"filename": "/assets/roms/nes-test-roms/mmc3_irq_tests/4.Scanline_timing.nes", "start": 6221638, "end": 6238038}, {"filename": "/assets/roms/nes-test-roms/mmc3_irq_tests/5.MMC3_rev_A.nes", "start": 6238038, "end": 6254438}, {"filename": "/assets/roms/nes-test-roms/mmc3_irq_tests/6.MMC3_rev_B.nes", "start": 6254438, "end": 6270838}, {"filename": "/assets/roms/nes-test-roms/mmc3_irq_tests/readme.txt", "start": 6270838, "end": 6275654}, {"filename": "/assets/roms/nes-test-roms/mmc3_irq_tests/source/1.Clocking.asm", "start": 6275654, "end": 6278025}, {"filename": "/assets/roms/nes-test-roms/mmc3_irq_tests/source/2.Details.asm", "start": 6278025, "end": 6280560}, {"filename": "/assets/roms/nes-test-roms/mmc3_irq_tests/source/3.A12_clocking.asm", "start": 6280560, "end": 6282883}, {"filename": "/assets/roms/nes-test-roms/mmc3_irq_tests/source/4.Scanline_timing.asm", "start": 6282883, "end": 6284529}, {"filename": "/assets/roms/nes-test-roms/mmc3_irq_tests/source/5.MMC3_rev_A.asm", "start": 6284529, "end": 6285301}, {"filename": "/assets/roms/nes-test-roms/mmc3_irq_tests/source/6.MMC3_rev_B.asm", "start": 6285301, "end": 6286174}, {"filename": "/assets/roms/nes-test-roms/mmc3_irq_tests/source/console.asm", "start": 6286174, "end": 6287999}, {"filename": "/assets/roms/nes-test-roms/mmc3_irq_tests/source/debug.asm", "start": 6287999, "end": 6290377}, {"filename": "/assets/roms/nes-test-roms/mmc3_irq_tests/source/delays.asm", "start": 6290377, "end": 6293210}, {"filename": "/assets/roms/nes-test-roms/mmc3_irq_tests/source/ppu_sync.asm", "start": 6293210, "end": 6296352}, {"filename": "/assets/roms/nes-test-roms/mmc3_irq_tests/source/ppu_util.asm", "start": 6296352, "end": 6298180}, {"filename": "/assets/roms/nes-test-roms/mmc3_irq_tests/source/prefix_cpu.asm", "start": 6298180, "end": 6298571}, {"filename": "/assets/roms/nes-test-roms/mmc3_irq_tests/source/prefix_mmc3.asm", "start": 6298571, "end": 6301477}, {"filename": "/assets/roms/nes-test-roms/mmc3_irq_tests/source/prefix_mmc3_validation.asm", "start": 6301477, "end": 6302008}, {"filename": "/assets/roms/nes-test-roms/mmc3_irq_tests/source/prefix_swap.asm", "start": 6302008, "end": 6302078}, {"filename": "/assets/roms/nes-test-roms/mmc3_irq_tests/source/runtime_swapcart.asm", "start": 6302078, "end": 6302507}, {"filename": "/assets/roms/nes-test-roms/mmc3_irq_tests/source/validation.asm", "start": 6302507, "end": 6304949}, {"filename": "/assets/roms/nes-test-roms/mmc3_test/1-clocking.nes", "start": 6304949, "end": 6345925}, {"filename": "/assets/roms/nes-test-roms/mmc3_test/2-details.nes", "start": 6345925, "end": 6386901}, {"filename": "/assets/roms/nes-test-roms/mmc3_test/3-A12_clocking.nes", "start": 6386901, "end": 6427877}, {"filename": "/assets/roms/nes-test-roms/mmc3_test/4-scanline_timing.nes", "start": 6427877, "end": 6468853}, {"filename": "/assets/roms/nes-test-roms/mmc3_test/5-MMC3.nes", "start": 6468853, "end": 6509829}, {"filename": "/assets/roms/nes-test-roms/mmc3_test/6-MMC6.nes", "start": 6509829, "end": 6550805}, {"filename": "/assets/roms/nes-test-roms/mmc3_test/readme.txt", "start": 6550805, "end": 6553997}, {"filename": "/assets/roms/nes-test-roms/mmc3_test/source/1-clocking.s", "start": 6553997, "end": 6555730}, {"filename": "/assets/roms/nes-test-roms/mmc3_test/source/2-details.s", "start": 6555730, "end": 6557554}, {"filename": "/assets/roms/nes-test-roms/mmc3_test/source/3-A12_clocking.s", "start": 6557554, "end": 6559280}, {"filename": "/assets/roms/nes-test-roms/mmc3_test/source/4-scanline_timing.s", "start": 6559280, "end": 6561873}, {"filename": "/assets/roms/nes-test-roms/mmc3_test/source/5-MMC3.s", "start": 6561873, "end": 6562499}, {"filename": "/assets/roms/nes-test-roms/mmc3_test/source/6-MMC6.s", "start": 6562499, "end": 6563324}, {"filename": "/assets/roms/nes-test-roms/mmc3_test/source/nes.cfg", "start": 6563324, "end": 6564583}, {"filename": "/assets/roms/nes-test-roms/mmc3_test/source/readme.txt", "start": 6564583, "end": 6568493}, {"filename": "/assets/roms/nes-test-roms/mmc3_test/source/common/ascii.chr", "start": 6568493, "end": 6570029}, {"filename": "/assets/roms/nes-test-roms/mmc3_test/source/common/build_rom.s", "start": 6570029, "end": 6571627}, {"filename": "/assets/roms/nes-test-roms/mmc3_test/source/common/console.s", "start": 6571627, "end": 6577481}, {"filename": "/assets/roms/nes-test-roms/mmc3_test/source/common/crc.s", "start": 6577481, "end": 6579231}, {"filename": "/assets/roms/nes-test-roms/mmc3_test/source/common/delay.s", "start": 6579231, "end": 6582858}, {"filename": "/assets/roms/nes-test-roms/mmc3_test/source/common/devcart.bin", "start": 6582858, "end": 6583114}, {"filename": "/assets/roms/nes-test-roms/mmc3_test/source/common/macros.inc", "start": 6583114, "end": 6586234}, {"filename": "/assets/roms/nes-test-roms/mmc3_test/source/common/neshw.inc", "start": 6586234, "end": 6586947}, {"filename": "/assets/roms/nes-test-roms/mmc3_test/source/common/ppu.s", "start": 6586947, "end": 6589113}, {"filename": "/assets/roms/nes-test-roms/mmc3_test/source/common/print.s", "start": 6589113, "end": 6592008}, {"filename": "/assets/roms/nes-test-roms/mmc3_test/source/common/shell.inc", "start": 6592008, "end": 6592526}, {"filename": "/assets/roms/nes-test-roms/mmc3_test/source/common/shell.s", "start": 6592526, "end": 6598246}, {"filename": "/assets/roms/nes-test-roms/mmc3_test/source/common/sync_vbl.s", "start": 6598246, "end": 6601959}, {"filename": "/assets/roms/nes-test-roms/mmc3_test/source/common/testing.s", "start": 6601959, "end": 6603921}, {"filename": "/assets/roms/nes-test-roms/mmc3_test/source/common/test_mmc3.inc", "start": 6603921, "end": 6605781}, {"filename": "/assets/roms/nes-test-roms/mmc3_test/source/common/text_out.s", "start": 6605781, "end": 6606938}, {"filename": "/assets/roms/nes-test-roms/mmc3_test_2/readme.txt", "start": 6606938, "end": 6611984}, {"filename": "/assets/roms/nes-test-roms/mmc3_test_2/rom_singles/1-clocking.nes", "start": 6611984, "end": 6652960}, {"filename": "/assets/roms/nes-test-roms/mmc3_test_2/rom_singles/2-details.nes", "start": 6652960, "end": 6693936}, {"filename": "/assets/roms/nes-test-roms/mmc3_test_2/rom_singles/3-A12_clocking.nes", "start": 6693936, "end": 6734912}, {"filename": "/assets/roms/nes-test-roms/mmc3_test_2/rom_singles/4-scanline_timing.nes", "start": 6734912, "end": 6775888}, {"filename": "/assets/roms/nes-test-roms/mmc3_test_2/rom_singles/5-MMC3.nes", "start": 6775888, "end": 6816864}, {"filename": "/assets/roms/nes-test-roms/mmc3_test_2/rom_singles/6-MMC3_alt.nes", "start": 6816864, "end": 6857840}, {"filename": "/assets/roms/nes-test-roms/mmc3_test_2/source/1-clocking.s", "start": 6857840, "end": 6860266}, {"filename": "/assets/roms/nes-test-roms/mmc3_test_2/source/2-details.s", "start": 6860266, "end": 6862351}, {"filename": "/assets/roms/nes-test-roms/mmc3_test_2/source/3-A12_clocking.s", "start": 6862351, "end": 6864077}, {"filename": "/assets/roms/nes-test-roms/mmc3_test_2/source/4-scanline_timing.s", "start": 6864077, "end": 6866670}, {"filename": "/assets/roms/nes-test-roms/mmc3_test_2/source/5-MMC3.s", "start": 6866670, "end": 6867363}, {"filename": "/assets/roms/nes-test-roms/mmc3_test_2/source/6-MMC3_alt.s", "start": 6867363, "end": 6868980}, {"filename": "/assets/roms/nes-test-roms/mmc3_test_2/source/nes.cfg", "start": 6868980, "end": 6870326}, {"filename": "/assets/roms/nes-test-roms/mmc3_test_2/source/readme.txt", "start": 6870326, "end": 6874236}, {"filename": "/assets/roms/nes-test-roms/mmc3_test_2/source/common/ascii.chr", "start": 6874236, "end": 6875772}, {"filename": "/assets/roms/nes-test-roms/mmc3_test_2/source/common/build_rom.s", "start": 6875772, "end": 6877347}, {"filename": "/assets/roms/nes-test-roms/mmc3_test_2/source/common/console.s", "start": 6877347, "end": 6883079}, {"filename": "/assets/roms/nes-test-roms/mmc3_test_2/source/common/crc.s", "start": 6883079, "end": 6884829}, {"filename": "/assets/roms/nes-test-roms/mmc3_test_2/source/common/delay.s", "start": 6884829, "end": 6888456}, {"filename": "/assets/roms/nes-test-roms/mmc3_test_2/source/common/devcart.bin", "start": 6888456, "end": 6888712}, {"filename": "/assets/roms/nes-test-roms/mmc3_test_2/source/common/macros.inc", "start": 6888712, "end": 6892149}, {"filename": "/assets/roms/nes-test-roms/mmc3_test_2/source/common/neshw.inc", "start": 6892149, "end": 6893041}, {"filename": "/assets/roms/nes-test-roms/mmc3_test_2/source/common/ppu.s", "start": 6893041, "end": 6896304}, {"filename": "/assets/roms/nes-test-roms/mmc3_test_2/source/common/print.s", "start": 6896304, "end": 6899392}, {"filename": "/assets/roms/nes-test-roms/mmc3_test_2/source/common/shell.inc", "start": 6899392, "end": 6899910}, {"filename": "/assets/roms/nes-test-roms/mmc3_test_2/source/common/shell.s", "start": 6899910, "end": 6902788}, {"filename": "/assets/roms/nes-test-roms/mmc3_test_2/source/common/shell_misc.s", "start": 6902788, "end": 6906088}, {"filename": "/assets/roms/nes-test-roms/mmc3_test_2/source/common/sync_vbl.s", "start": 6906088, "end": 6909801}, {"filename": "/assets/roms/nes-test-roms/mmc3_test_2/source/common/testing.s", "start": 6909801, "end": 6911758}, {"filename": "/assets/roms/nes-test-roms/mmc3_test_2/source/common/test_mmc3.inc", "start": 6911758, "end": 6913725}, {"filename": "/assets/roms/nes-test-roms/mmc3_test_2/source/common/text_out.s", "start": 6913725, "end": 6914882}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/game.cfg", "start": 6914882, "end": 6915969}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/LICENSE", "start": 6915969, "end": 6917297}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/Makefile", "start": 6917297, "end": 6919296}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/nes15-NTSC.nes", "start": 6919296, "end": 6947984}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/nes15-PAL.nes", "start": 6947984, "end": 6976672}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/README", "start": 6976672, "end": 6979853}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/bin2pkb/bin2pkb.c", "start": 6979853, "end": 6981414}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/bin2pkb/Makefile", "start": 6981414, "end": 6981902}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/clib/binio.c", "start": 6981902, "end": 6989050}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/clib/binio.h", "start": 6989050, "end": 6995408}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/clib/img8.c", "start": 6995408, "end": 6996281}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/clib/img8.h", "start": 6996281, "end": 6998433}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/clib/img8_pcx.c", "start": 6998433, "end": 7002284}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/clib/neschr.c", "start": 7002284, "end": 7006405}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/clib/neschr.h", "start": 7006405, "end": 7010013}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/clib/packbits.c", "start": 7010013, "end": 7013515}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/clib/packbits.h", "start": 7013515, "end": 7017076}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/fifteen/fifteen.inc", "start": 7017076, "end": 7019425}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/fifteen/fifteen.s", "start": 7019425, "end": 7039239}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/fifteen/Makefile", "start": 7039239, "end": 7039731}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/fifteen/test.cfg", "start": 7039731, "end": 7040182}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/fifteen/test.s", "start": 7040182, "end": 7041439}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/gfx/bgd.pal", "start": 7041439, "end": 7041455}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/gfx/cursor.pcx", "start": 7041455, "end": 7042504}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/gfx/edges.pcx", "start": 7042504, "end": 7043601}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/gfx/font.pcx", "start": 7043601, "end": 7046591}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/gfx/nums.pcx", "start": 7046591, "end": 7048878}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/gfx/play.nam", "start": 7048878, "end": 7049902}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/gfx/spr.pal", "start": 7049902, "end": 7049918}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/gfx/tile.pcx", "start": 7049918, "end": 7050857}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/gfx/title.nam", "start": 7050857, "end": 7051881}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/nes-lib/apu.inc", "start": 7051881, "end": 7052477}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/nes-lib/bcd.inc", "start": 7052477, "end": 7054826}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/nes-lib/bcd16.s", "start": 7054826, "end": 7055421}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/nes-lib/bcd16_from_bin.s", "start": 7055421, "end": 7056196}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/nes-lib/bcd16_to_vrub.s", "start": 7056196, "end": 7057213}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/nes-lib/joy.inc", "start": 7057213, "end": 7059330}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/nes-lib/joy_read1.s", "start": 7059330, "end": 7059754}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/nes-lib/joy_repeat1.s", "start": 7059754, "end": 7060456}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/nes-lib/joy_update1.s", "start": 7060456, "end": 7061064}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/nes-lib/lfsr32.inc", "start": 7061064, "end": 7061643}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/nes-lib/lfsr32.s", "start": 7061643, "end": 7062151}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/nes-lib/muse.inc", "start": 7062151, "end": 7073283}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/nes-lib/muse.s", "start": 7073283, "end": 7092779}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/nes-lib/oam.inc", "start": 7092779, "end": 7093560}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/nes-lib/oam_clear.s", "start": 7093560, "end": 7093883}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/nes-lib/pkb.inc", "start": 7093883, "end": 7095035}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/nes-lib/pkb.s", "start": 7095035, "end": 7095269}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/nes-lib/pkb_to_vram.s", "start": 7095269, "end": 7096076}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/nes-lib/ppu.inc", "start": 7096076, "end": 7096920}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/nes-lib/vrub.inc", "start": 7096920, "end": 7099648}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/nes-lib/vrub.s", "start": 7099648, "end": 7099872}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/nes-lib/vrub_from_mem.s", "start": 7099872, "end": 7100981}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/pcx2chr/Makefile", "start": 7100981, "end": 7101509}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/pcx2chr/pcx2chr.c", "start": 7101509, "end": 7104663}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/snd/mus0.s", "start": 7104663, "end": 7117599}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/snd/mus1.s", "start": 7117599, "end": 7118765}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/snd/sfx0.s", "start": 7118765, "end": 7119195}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/snd/sfx1.s", "start": 7119195, "end": 7119707}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/snd/snd.inc", "start": 7119707, "end": 7120204}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/snd/snd.s", "start": 7120204, "end": 7121324}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/src/game.inc", "start": 7121324, "end": 7122259}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/src/game.s", "start": 7122259, "end": 7124612}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/src/gfx.inc", "start": 7124612, "end": 7128432}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/src/gfx.s", "start": 7128432, "end": 7139502}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/src/header.s", "start": 7139502, "end": 7139825}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/src/nmi.inc", "start": 7139825, "end": 7141066}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/src/nmi.s", "start": 7141066, "end": 7142055}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/src/play.inc", "start": 7142055, "end": 7142496}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/src/play.s", "start": 7142496, "end": 7152525}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/src/title.inc", "start": 7152525, "end": 7152973}, {"filename": "/assets/roms/nes-test-roms/nes15-1.0.0/src/title.s", "start": 7152973, "end": 7154180}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/readme.txt", "start": 7154180, "end": 7161929}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/nsf_singles/01-implied.nsf", "start": 7161929, "end": 7194825}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/nsf_singles/02-immediate.nsf", "start": 7194825, "end": 7227721}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/nsf_singles/03-zero_page.nsf", "start": 7227721, "end": 7260617}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/nsf_singles/04-zp_xy.nsf", "start": 7260617, "end": 7293513}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/nsf_singles/05-absolute.nsf", "start": 7293513, "end": 7326409}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/nsf_singles/06-abs_xy.nsf", "start": 7326409, "end": 7359305}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/nsf_singles/07-ind_x.nsf", "start": 7359305, "end": 7392201}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/nsf_singles/08-ind_y.nsf", "start": 7392201, "end": 7425097}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/nsf_singles/09-branches.nsf", "start": 7425097, "end": 7457993}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/nsf_singles/10-stack.nsf", "start": 7457993, "end": 7490889}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/nsf_singles/11-special.nsf", "start": 7490889, "end": 7523785}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/rom_singles/01-implied.nes", "start": 7523785, "end": 7564761}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/rom_singles/02-immediate.nes", "start": 7564761, "end": 7605737}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/rom_singles/03-zero_page.nes", "start": 7605737, "end": 7646713}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/rom_singles/04-zp_xy.nes", "start": 7646713, "end": 7687689}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/rom_singles/05-absolute.nes", "start": 7687689, "end": 7728665}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/rom_singles/06-abs_xy.nes", "start": 7728665, "end": 7769641}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/rom_singles/07-ind_x.nes", "start": 7769641, "end": 7810617}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/rom_singles/08-ind_y.nes", "start": 7810617, "end": 7851593}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/rom_singles/09-branches.nes", "start": 7851593, "end": 7892569}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/rom_singles/10-stack.nes", "start": 7892569, "end": 7933545}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/rom_singles/11-special.nes", "start": 7933545, "end": 7974521}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/source/01-implied.s", "start": 7974521, "end": 7975897}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/source/02-immediate.s", "start": 7975897, "end": 7977213}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/source/03-zero_page.s", "start": 7977213, "end": 7978872}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/source/04-zp_xy.s", "start": 7978872, "end": 7980877}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/source/05-absolute.s", "start": 7980877, "end": 7982477}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/source/06-abs_xy.s", "start": 7982477, "end": 7985018}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/source/07-ind_x.s", "start": 7985018, "end": 7986555}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/source/08-ind_y.s", "start": 7986555, "end": 7987969}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/source/09-branches.s", "start": 7987969, "end": 7988758}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/source/10-stack.s", "start": 7988758, "end": 7990239}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/source/11-special.s", "start": 7990239, "end": 7991457}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/source/nes.cfg", "start": 7991457, "end": 7993361}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/source/nsf.cfg", "start": 7993361, "end": 7994436}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/source/readme.txt", "start": 7994436, "end": 7997319}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/source/common/ascii.chr", "start": 7997319, "end": 7999367}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/source/common/build_nsf.s", "start": 7999367, "end": 8001432}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/source/common/build_rom.s", "start": 8001432, "end": 8002841}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/source/common/console.s", "start": 8002841, "end": 8006732}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/source/common/crc.s", "start": 8006732, "end": 8008096}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/source/common/crc_fast.s", "start": 8008096, "end": 8009166}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/source/common/delay.s", "start": 8009166, "end": 8012800}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/source/common/instr_test.inc", "start": 8012800, "end": 8013553}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/source/common/instr_test_end.s", "start": 8013553, "end": 8015854}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/source/common/macros.inc", "start": 8015854, "end": 8018195}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/source/common/neshw.inc", "start": 8018195, "end": 8018795}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/source/common/ppu.s", "start": 8018795, "end": 8021040}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/source/common/print.s", "start": 8021040, "end": 8023728}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/source/common/shell.inc", "start": 8023728, "end": 8024106}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/source/common/shell.s", "start": 8024106, "end": 8029540}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/source/common/testing.s", "start": 8029540, "end": 8031737}, {"filename": "/assets/roms/nes-test-roms/nes_instr_test/source/common/text_out.s", "start": 8031737, "end": 8033270}, {"filename": "/assets/roms/nes-test-roms/nmi_sync/demo_ntsc.nes", "start": 8033270, "end": 8074246}, {"filename": "/assets/roms/nes-test-roms/nmi_sync/demo_ntsc.s", "start": 8074246, "end": 8076942}, {"filename": "/assets/roms/nes-test-roms/nmi_sync/demo_pal.nes", "start": 8076942, "end": 8117918}, {"filename": "/assets/roms/nes-test-roms/nmi_sync/demo_pal.s", "start": 8117918, "end": 8120618}, {"filename": "/assets/roms/nes-test-roms/nmi_sync/nmi_sync.s", "start": 8120618, "end": 8123923}, {"filename": "/assets/roms/nes-test-roms/nmi_sync/readme.txt", "start": 8123923, "end": 8132926}, {"filename": "/assets/roms/nes-test-roms/nmi_sync/unrom.cfg", "start": 8132926, "end": 8133651}, {"filename": "/assets/roms/nes-test-roms/nrom368/compile_all.bat", "start": 8133651, "end": 8133690}, {"filename": "/assets/roms/nes-test-roms/nrom368/crt0.s", "start": 8133690, "end": 8138032}, {"filename": "/assets/roms/nes-test-roms/nrom368/fail368.nes", "start": 8138032, "end": 8179008}, {"filename": "/assets/roms/nes-test-roms/nrom368/famitone.s", "start": 8179008, "end": 8200594}, {"filename": "/assets/roms/nes-test-roms/nrom368/music.s", "start": 8200594, "end": 8200594}, {"filename": "/assets/roms/nes-test-roms/nrom368/nes.cfg", "start": 8200594, "end": 8202880}, {"filename": "/assets/roms/nes-test-roms/nrom368/neslib.h", "start": 8202880, "end": 8208200}, {"filename": "/assets/roms/nes-test-roms/nrom368/neslib.s", "start": 8208200, "end": 8221074}, {"filename": "/assets/roms/nes-test-roms/nrom368/nrom368.chr", "start": 8221074, "end": 8229266}, {"filename": "/assets/roms/nes-test-roms/nrom368/nrom368.prg", "start": 8229266, "end": 8294802}, {"filename": "/assets/roms/nes-test-roms/nrom368/runtime.lib", "start": 8294802, "end": 8401847}, {"filename": "/assets/roms/nes-test-roms/nrom368/sounds.s", "start": 8401847, "end": 8401847}, {"filename": "/assets/roms/nes-test-roms/nrom368/test1.c", "start": 8401847, "end": 8403261}, {"filename": "/assets/roms/nes-test-roms/nrom368/test1.nes", "start": 8403261, "end": 8460621}, {"filename": "/assets/roms/nes-test-roms/nrom368/tileset.chr", "start": 8460621, "end": 8468813}, {"filename": "/assets/roms/nes-test-roms/nrom368/_c.bat", "start": 8468813, "end": 8469115}, {"filename": "/assets/roms/nes-test-roms/ny2011/ny2011.nes", "start": 8469115, "end": 8510091}, {"filename": "/assets/roms/nes-test-roms/oam_read/oam_read.nes", "start": 8510091, "end": 8551067}, {"filename": "/assets/roms/nes-test-roms/oam_read/readme.txt", "start": 8551067, "end": 8555291}, {"filename": "/assets/roms/nes-test-roms/oam_read/source/nes.cfg", "start": 8555291, "end": 8556430}, {"filename": "/assets/roms/nes-test-roms/oam_read/source/oam_read.s", "start": 8556430, "end": 8557312}, {"filename": "/assets/roms/nes-test-roms/oam_read/source/readme.txt", "start": 8557312, "end": 8560195}, {"filename": "/assets/roms/nes-test-roms/oam_read/source/common/ascii.chr", "start": 8560195, "end": 8561731}, {"filename": "/assets/roms/nes-test-roms/oam_read/source/common/build_rom.s", "start": 8561731, "end": 8563302}, {"filename": "/assets/roms/nes-test-roms/oam_read/source/common/console.s", "start": 8563302, "end": 8567258}, {"filename": "/assets/roms/nes-test-roms/oam_read/source/common/crc.s", "start": 8567258, "end": 8569008}, {"filename": "/assets/roms/nes-test-roms/oam_read/source/common/delay.s", "start": 8569008, "end": 8572635}, {"filename": "/assets/roms/nes-test-roms/oam_read/source/common/devcart.bin", "start": 8572635, "end": 8572891}, {"filename": "/assets/roms/nes-test-roms/oam_read/source/common/macros.inc", "start": 8572891, "end": 8576013}, {"filename": "/assets/roms/nes-test-roms/oam_read/source/common/neshw.inc", "start": 8576013, "end": 8576614}, {"filename": "/assets/roms/nes-test-roms/oam_read/source/common/ppu.s", "start": 8576614, "end": 8578567}, {"filename": "/assets/roms/nes-test-roms/oam_read/source/common/print.s", "start": 8578567, "end": 8581375}, {"filename": "/assets/roms/nes-test-roms/oam_read/source/common/shell.inc", "start": 8581375, "end": 8581893}, {"filename": "/assets/roms/nes-test-roms/oam_read/source/common/shell.s", "start": 8581893, "end": 8586859}, {"filename": "/assets/roms/nes-test-roms/oam_read/source/common/testing.s", "start": 8586859, "end": 8588821}, {"filename": "/assets/roms/nes-test-roms/oam_read/source/common/text_out.s", "start": 8588821, "end": 8589978}, {"filename": "/assets/roms/nes-test-roms/oam_stress/oam_stress.nes", "start": 8589978, "end": 8630954}, {"filename": "/assets/roms/nes-test-roms/oam_stress/readme.txt", "start": 8630954, "end": 8634277}, {"filename": "/assets/roms/nes-test-roms/oam_stress/source/nes.cfg", "start": 8634277, "end": 8635416}, {"filename": "/assets/roms/nes-test-roms/oam_stress/source/oam_stress.s", "start": 8635416, "end": 8637109}, {"filename": "/assets/roms/nes-test-roms/oam_stress/source/readme.txt", "start": 8637109, "end": 8639992}, {"filename": "/assets/roms/nes-test-roms/oam_stress/source/common/ascii.chr", "start": 8639992, "end": 8641528}, {"filename": "/assets/roms/nes-test-roms/oam_stress/source/common/build_multi.s", "start": 8641528, "end": 8643389}, {"filename": "/assets/roms/nes-test-roms/oam_stress/source/common/build_nsf.s", "start": 8643389, "end": 8645895}, {"filename": "/assets/roms/nes-test-roms/oam_stress/source/common/build_rom.s", "start": 8645895, "end": 8647466}, {"filename": "/assets/roms/nes-test-roms/oam_stress/source/common/console.s", "start": 8647466, "end": 8651422}, {"filename": "/assets/roms/nes-test-roms/oam_stress/source/common/crc.s", "start": 8651422, "end": 8653172}, {"filename": "/assets/roms/nes-test-roms/oam_stress/source/common/crc_fast.s", "start": 8653172, "end": 8654242}, {"filename": "/assets/roms/nes-test-roms/oam_stress/source/common/delay.s", "start": 8654242, "end": 8657869}, {"filename": "/assets/roms/nes-test-roms/oam_stress/source/common/devcart.bin", "start": 8657869, "end": 8658125}, {"filename": "/assets/roms/nes-test-roms/oam_stress/source/common/macros.inc", "start": 8658125, "end": 8661247}, {"filename": "/assets/roms/nes-test-roms/oam_stress/source/common/neshw.inc", "start": 8661247, "end": 8661848}, {"filename": "/assets/roms/nes-test-roms/oam_stress/source/common/ppu.s", "start": 8661848, "end": 8663801}, {"filename": "/assets/roms/nes-test-roms/oam_stress/source/common/print.s", "start": 8663801, "end": 8666609}, {"filename": "/assets/roms/nes-test-roms/oam_stress/source/common/shell.inc", "start": 8666609, "end": 8667127}, {"filename": "/assets/roms/nes-test-roms/oam_stress/source/common/shell.s", "start": 8667127, "end": 8672093}, {"filename": "/assets/roms/nes-test-roms/oam_stress/source/common/testing.s", "start": 8672093, "end": 8674055}, {"filename": "/assets/roms/nes-test-roms/oam_stress/source/common/text_out.s", "start": 8674055, "end": 8675212}, {"filename": "/assets/roms/nes-test-roms/other/2003-test.nes", "start": 8675212, "end": 8716188}, {"filename": "/assets/roms/nes-test-roms/other/8bitpeoples_-_deadline_console_invitro.nes", "start": 8716188, "end": 8748972}, {"filename": "/assets/roms/nes-test-roms/other/apocalypse.nes", "start": 8748972, "end": 8773564}, {"filename": "/assets/roms/nes-test-roms/other/apocalypse.src", "start": 8773564, "end": 8808125}, {"filename": "/assets/roms/nes-test-roms/other/BladeBuster.nes", "start": 8808125, "end": 9201357}, {"filename": "/assets/roms/nes-test-roms/other/blargg_litewall-2.nes", "start": 9201357, "end": 9242333}, {"filename": "/assets/roms/nes-test-roms/other/blargg_litewall-9.nes", "start": 9242333, "end": 9283309}, {"filename": "/assets/roms/nes-test-roms/other/BLOCKS.NES", "start": 9283309, "end": 9324285}, {"filename": "/assets/roms/nes-test-roms/other/CMC80s.NES", "start": 9324285, "end": 9373453}, {"filename": "/assets/roms/nes-test-roms/other/demo jitter.nes", "start": 9373453, "end": 9398045}, {"filename": "/assets/roms/nes-test-roms/other/demo.nes", "start": 9398045, "end": 9422637}, {"filename": "/assets/roms/nes-test-roms/other/dnsf2_enginetest3.nsf", "start": 9422637, "end": 9451438}, {"filename": "/assets/roms/nes-test-roms/other/DROPOFF7.NES", "start": 9451438, "end": 9983934}, {"filename": "/assets/roms/nes-test-roms/other/Duelito - Leame.txt", "start": 9983934, "end": 9984891}, {"filename": "/assets/roms/nes-test-roms/other/Duelito.nes", "start": 9984891, "end": 10017675}, {"filename": "/assets/roms/nes-test-roms/other/fceuxd.nes", "start": 10017675, "end": 10148763}, {"filename": "/assets/roms/nes-test-roms/other/firefly.asm", "start": 10148763, "end": 10154828}, {"filename": "/assets/roms/nes-test-roms/other/firefly.nes", "start": 10154828, "end": 10179420}, {"filename": "/assets/roms/nes-test-roms/other/FLAME.NES", "start": 10179420, "end": 10220396}, {"filename": "/assets/roms/nes-test-roms/other/GENIE.NES", "start": 10220396, "end": 10244988}, {"filename": "/assets/roms/nes-test-roms/other/GREYS.NES", "start": 10244988, "end": 10269580}, {"filename": "/assets/roms/nes-test-roms/other/high-hopes.nes", "start": 10269580, "end": 10466204}, {"filename": "/assets/roms/nes-test-roms/other/LINUS.ASM", "start": 10466204, "end": 10468344}, {"filename": "/assets/roms/nes-test-roms/other/LINUS.NSF", "start": 10468344, "end": 10484856}, {"filename": "/assets/roms/nes-test-roms/other/LINUSMUS.NES", "start": 10484856, "end": 10517640}, {"filename": "/assets/roms/nes-test-roms/other/litewall2.nes", "start": 10517640, "end": 10562712}, {"filename": "/assets/roms/nes-test-roms/other/litewall3.nes", "start": 10562712, "end": 10607784}, {"filename": "/assets/roms/nes-test-roms/other/litewall5.nes", "start": 10607784, "end": 10652856}, {"filename": "/assets/roms/nes-test-roms/other/logo (E).nes", "start": 10652856, "end": 10685640}, {"filename": "/assets/roms/nes-test-roms/other/manhole.nes", "start": 10685640, "end": 10710232}, {"filename": "/assets/roms/nes-test-roms/other/max-300.nes", "start": 10710232, "end": 11242728}, {"filename": "/assets/roms/nes-test-roms/other/midscanline.nes", "start": 11242728, "end": 11291896}, {"filename": "/assets/roms/nes-test-roms/other/minipack.nes", "start": 11291896, "end": 11308296}, {"filename": "/assets/roms/nes-test-roms/other/minipack.txt", "start": 11308296, "end": 11318507}, {"filename": "/assets/roms/nes-test-roms/other/MOTION.NES", "start": 11318507, "end": 11359483}, {"filename": "/assets/roms/nes-test-roms/other/nescafe.nes", "start": 11359483, "end": 11384075}, {"filename": "/assets/roms/nes-test-roms/other/NESMPROP.TXT", "start": 11384075, "end": 11388152}, {"filename": "/assets/roms/nes-test-roms/other/nestest.log", "start": 11388152, "end": 12193230}, {"filename": "/assets/roms/nes-test-roms/other/nestest.nes", "start": 12193230, "end": 12217822}, {"filename": "/assets/roms/nes-test-roms/other/nestest.txt", "start": 12217822, "end": 12236320}, {"filename": "/assets/roms/nes-test-roms/other/nestopia.nes", "start": 12236320, "end": 12367408}, {"filename": "/assets/roms/nes-test-roms/other/new-game.nes", "start": 12367408, "end": 12392000}, {"filename": "/assets/roms/nes-test-roms/other/nintendulator.nes", "start": 12392000, "end": 12523088}, {"filename": "/assets/roms/nes-test-roms/other/PCM.demo.wgraphics.nes", "start": 12523088, "end": 12785248}, {"filename": "/assets/roms/nes-test-roms/other/physics.0.1.nes", "start": 12785248, "end": 12809840}, {"filename": "/assets/roms/nes-test-roms/other/pulsar.nes", "start": 12809840, "end": 12940928}, {"filename": "/assets/roms/nes-test-roms/other/quantum_disco_brothers_by_wAMMA.nes", "start": 12940928, "end": 13006480}, {"filename": "/assets/roms/nes-test-roms/other/RasterChromaLuma.NES", "start": 13006480, "end": 13031072}, {"filename": "/assets/roms/nes-test-roms/other/RasterDemo.NES", "start": 13031072, "end": 13063856}, {"filename": "/assets/roms/nes-test-roms/other/RasterTest1.NES", "start": 13063856, "end": 13088448}, {"filename": "/assets/roms/nes-test-roms/other/RasterTest2.NES", "start": 13088448, "end": 13113040}, {"filename": "/assets/roms/nes-test-roms/other/RasterTest3.NES", "start": 13113040, "end": 13137632}, {"filename": "/assets/roms/nes-test-roms/other/RasterTest3a.NES", "start": 13137632, "end": 13162224}, {"filename": "/assets/roms/nes-test-roms/other/RasterTest3b.NES", "start": 13162224, "end": 13186816}, {"filename": "/assets/roms/nes-test-roms/other/RasterTest3c.NES", "start": 13186816, "end": 13211408}, {"filename": "/assets/roms/nes-test-roms/other/RasterTest3d.NES", "start": 13211408, "end": 13236000}, {"filename": "/assets/roms/nes-test-roms/other/RasterTest3e.NES", "start": 13236000, "end": 13260592}, {"filename": "/assets/roms/nes-test-roms/other/rastesam4.nes", "start": 13260592, "end": 13530944}, {"filename": "/assets/roms/nes-test-roms/other/read2004.nes", "start": 13530944, "end": 13555536}, {"filename": "/assets/roms/nes-test-roms/other/readme.txt", "start": 13555536, "end": 13555720}, {"filename": "/assets/roms/nes-test-roms/other/ReadmeCMC80s.TXT", "start": 13555720, "end": 13556991}, {"filename": "/assets/roms/nes-test-roms/other/ReadmeSayoonara!.txt", "start": 13556991, "end": 13558442}, {"filename": "/assets/roms/nes-test-roms/other/Retrocoders - Years behind.NES", "start": 13558442, "end": 13623994}, {"filename": "/assets/roms/nes-test-roms/other/S0.NES", "start": 13623994, "end": 13648586}, {"filename": "/assets/roms/nes-test-roms/other/Sayoonara!.NES", "start": 13648586, "end": 13689562}, {"filename": "/assets/roms/nes-test-roms/other/SimpleParallaxDemo.nes", "start": 13689562, "end": 13714154}, {"filename": "/assets/roms/nes-test-roms/other/smbdis.asm", "start": 13714154, "end": 14481383}, {"filename": "/assets/roms/nes-test-roms/other/snow.nes", "start": 14481383, "end": 14522359}, {"filename": "/assets/roms/nes-test-roms/other/snow.txt", "start": 14522359, "end": 14524890}, {"filename": "/assets/roms/nes-test-roms/other/SPRITE.NES", "start": 14524890, "end": 14549482}, {"filename": "/assets/roms/nes-test-roms/other/Streemerz_bundle.nes", "start": 14549482, "end": 15073786}, {"filename": "/assets/roms/nes-test-roms/other/TANESPOT.NES", "start": 15073786, "end": 15139338}, {"filename": "/assets/roms/nes-test-roms/other/TEST.NES", "start": 15139338, "end": 15172122}, {"filename": "/assets/roms/nes-test-roms/other/test001.nes", "start": 15172122, "end": 15303210}, {"filename": "/assets/roms/nes-test-roms/other/test28.nes", "start": 15303210, "end": 15827514}, {"filename": "/assets/roms/nes-test-roms/other/The Duel - Readme.txt", "start": 15827514, "end": 15828438}, {"filename": "/assets/roms/nes-test-roms/other/window2_ntsc.nes", "start": 15828438, "end": 15853030}, {"filename": "/assets/roms/nes-test-roms/other/window2_pal.nes", "start": 15853030, "end": 15877622}, {"filename": "/assets/roms/nes-test-roms/other/window_old_ntsc.nes", "start": 15877622, "end": 15902214}, {"filename": "/assets/roms/nes-test-roms/other/window_old_pal.nes", "start": 15902214, "end": 15926806}, {"filename": "/assets/roms/nes-test-roms/PaddleTest3/Info.txt", "start": 15926806, "end": 15927193}, {"filename": "/assets/roms/nes-test-roms/PaddleTest3/KaboomASM.bat", "start": 15927193, "end": 15927222}, {"filename": "/assets/roms/nes-test-roms/PaddleTest3/PaddleTest.asm", "start": 15927222, "end": 15933040}, {"filename": "/assets/roms/nes-test-roms/PaddleTest3/PaddleTest.nes", "start": 15933040, "end": 15957632}, {"filename": "/assets/roms/nes-test-roms/PaddleTest3/PaddleTestGraphics.chr", "start": 15957632, "end": 15965824}, {"filename": "/assets/roms/nes-test-roms/PaddleTest3/PaddleTestScreen.bin", "start": 15965824, "end": 15966848}, {"filename": "/assets/roms/nes-test-roms/PaddleTest3/Palette.bin", "start": 15966848, "end": 15966880}, {"filename": "/assets/roms/nes-test-roms/pal_apu_tests/01.len_ctr.nes", "start": 15966880, "end": 15983280}, {"filename": "/assets/roms/nes-test-roms/pal_apu_tests/02.len_table.nes", "start": 15983280, "end": 15999680}, {"filename": "/assets/roms/nes-test-roms/pal_apu_tests/03.irq_flag.nes", "start": 15999680, "end": 16016080}, {"filename": "/assets/roms/nes-test-roms/pal_apu_tests/04.clock_jitter.nes", "start": 16016080, "end": 16032480}, {"filename": "/assets/roms/nes-test-roms/pal_apu_tests/05.len_timing_mode0.nes", "start": 16032480, "end": 16048880}, {"filename": "/assets/roms/nes-test-roms/pal_apu_tests/06.len_timing_mode1.nes", "start": 16048880, "end": 16065280}, {"filename": "/assets/roms/nes-test-roms/pal_apu_tests/07.irq_flag_timing.nes", "start": 16065280, "end": 16081680}, {"filename": "/assets/roms/nes-test-roms/pal_apu_tests/08.irq_timing.nes", "start": 16081680, "end": 16098080}, {"filename": "/assets/roms/nes-test-roms/pal_apu_tests/10.len_halt_timing.nes", "start": 16098080, "end": 16114480}, {"filename": "/assets/roms/nes-test-roms/pal_apu_tests/11.len_reload_timing.nes", "start": 16114480, "end": 16130880}, {"filename": "/assets/roms/nes-test-roms/pal_apu_tests/readme.txt", "start": 16130880, "end": 16136610}, {"filename": "/assets/roms/nes-test-roms/ppu_open_bus/ppu_open_bus.nes", "start": 16136610, "end": 16177586}, {"filename": "/assets/roms/nes-test-roms/ppu_open_bus/readme.txt", "start": 16177586, "end": 16181272}, {"filename": "/assets/roms/nes-test-roms/ppu_open_bus/source/nes.cfg", "start": 16181272, "end": 16182411}, {"filename": "/assets/roms/nes-test-roms/ppu_open_bus/source/ppu_open_bus.s", "start": 16182411, "end": 16185176}, {"filename": "/assets/roms/nes-test-roms/ppu_open_bus/source/readme.txt", "start": 16185176, "end": 16188059}, {"filename": "/assets/roms/nes-test-roms/ppu_open_bus/source/common/ascii.chr", "start": 16188059, "end": 16189595}, {"filename": "/assets/roms/nes-test-roms/ppu_open_bus/source/common/build_rom.s", "start": 16189595, "end": 16191178}, {"filename": "/assets/roms/nes-test-roms/ppu_open_bus/source/common/console.s", "start": 16191178, "end": 16195134}, {"filename": "/assets/roms/nes-test-roms/ppu_open_bus/source/common/crc.s", "start": 16195134, "end": 16196884}, {"filename": "/assets/roms/nes-test-roms/ppu_open_bus/source/common/delay.s", "start": 16196884, "end": 16200511}, {"filename": "/assets/roms/nes-test-roms/ppu_open_bus/source/common/devcart.bin", "start": 16200511, "end": 16200767}, {"filename": "/assets/roms/nes-test-roms/ppu_open_bus/source/common/macros.inc", "start": 16200767, "end": 16203889}, {"filename": "/assets/roms/nes-test-roms/ppu_open_bus/source/common/neshw.inc", "start": 16203889, "end": 16204490}, {"filename": "/assets/roms/nes-test-roms/ppu_open_bus/source/common/ppu.s", "start": 16204490, "end": 16206656}, {"filename": "/assets/roms/nes-test-roms/ppu_open_bus/source/common/print.s", "start": 16206656, "end": 16209464}, {"filename": "/assets/roms/nes-test-roms/ppu_open_bus/source/common/shell.inc", "start": 16209464, "end": 16209982}, {"filename": "/assets/roms/nes-test-roms/ppu_open_bus/source/common/shell.s", "start": 16209982, "end": 16214971}, {"filename": "/assets/roms/nes-test-roms/ppu_open_bus/source/common/testing.s", "start": 16214971, "end": 16216933}, {"filename": "/assets/roms/nes-test-roms/ppu_open_bus/source/common/text_out.s", "start": 16216933, "end": 16218090}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/ppu_vbl_nmi.nes", "start": 16218090, "end": 16480250}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/readme.txt", "start": 16480250, "end": 16487037}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/rom_singles/01-vbl_basics.nes", "start": 16487037, "end": 16528013}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/rom_singles/02-vbl_set_time.nes", "start": 16528013, "end": 16568989}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/rom_singles/03-vbl_clear_time.nes", "start": 16568989, "end": 16609965}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/rom_singles/04-nmi_control.nes", "start": 16609965, "end": 16650941}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/rom_singles/05-nmi_timing.nes", "start": 16650941, "end": 16691917}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/rom_singles/06-suppression.nes", "start": 16691917, "end": 16732893}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/rom_singles/07-nmi_on_timing.nes", "start": 16732893, "end": 16773869}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/rom_singles/08-nmi_off_timing.nes", "start": 16773869, "end": 16814845}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/rom_singles/09-even_odd_frames.nes", "start": 16814845, "end": 16855821}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/rom_singles/10-even_odd_timing.nes", "start": 16855821, "end": 16896797}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/source/01-vbl_basics.s", "start": 16896797, "end": 16897850}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/source/02-vbl_set_time.s", "start": 16897850, "end": 16898537}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/source/03-vbl_clear_time.s", "start": 16898537, "end": 16899076}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/source/04-nmi_control.s", "start": 16899076, "end": 16901927}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/source/05-nmi_timing.s", "start": 16901927, "end": 16902680}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/source/06-suppression.s", "start": 16902680, "end": 16903653}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/source/07-nmi_on_timing.s", "start": 16903653, "end": 16904339}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/source/08-nmi_off_timing.s", "start": 16904339, "end": 16905040}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/source/09-even_odd_frames.s", "start": 16905040, "end": 16906188}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/source/10-even_odd_timing.s", "start": 16906188, "end": 16907699}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/source/nes.cfg", "start": 16907699, "end": 16909152}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/source/readme.txt", "start": 16909152, "end": 16913062}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/source/common/ascii.chr", "start": 16913062, "end": 16914598}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/source/common/bootloader.bin", "start": 16914598, "end": 16914854}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/source/common/build_rom.s", "start": 16914854, "end": 16916464}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/source/common/console.s", "start": 16916464, "end": 16922196}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/source/common/crc.s", "start": 16922196, "end": 16923911}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/source/common/delay.s", "start": 16923911, "end": 16927847}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/source/common/macros.inc", "start": 16927847, "end": 16933829}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/source/common/neshw.inc", "start": 16933829, "end": 16934721}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/source/common/ppu.s", "start": 16934721, "end": 16937984}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/source/common/print.s", "start": 16937984, "end": 16941496}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/source/common/shell.inc", "start": 16941496, "end": 16942014}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/source/common/shell.s", "start": 16942014, "end": 16944924}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/source/common/shell_misc.s", "start": 16944924, "end": 16948606}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/source/common/sync_vbl.s", "start": 16948606, "end": 16952488}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/source/common/testing.s", "start": 16952488, "end": 16954443}, {"filename": "/assets/roms/nes-test-roms/ppu_vbl_nmi/source/common/text_out.s", "start": 16954443, "end": 16955600}, {"filename": "/assets/roms/nes-test-roms/read_joy3/count_errors.nes", "start": 16955600, "end": 16996576}, {"filename": "/assets/roms/nes-test-roms/read_joy3/count_errors_fast.nes", "start": 16996576, "end": 17037552}, {"filename": "/assets/roms/nes-test-roms/read_joy3/test_buttons.nes", "start": 17037552, "end": 17078528}, {"filename": "/assets/roms/nes-test-roms/read_joy3/thorough_test.nes", "start": 17078528, "end": 17119504}, {"filename": "/assets/roms/nes-test-roms/read_joy3/source/count_errors.s", "start": 17119504, "end": 17120611}, {"filename": "/assets/roms/nes-test-roms/read_joy3/source/count_errors_fast.s", "start": 17120611, "end": 17121302}, {"filename": "/assets/roms/nes-test-roms/read_joy3/source/nes.cfg", "start": 17121302, "end": 17122843}, {"filename": "/assets/roms/nes-test-roms/read_joy3/source/readme.txt", "start": 17122843, "end": 17125616}, {"filename": "/assets/roms/nes-test-roms/read_joy3/source/read_joy.inc", "start": 17125616, "end": 17126858}, {"filename": "/assets/roms/nes-test-roms/read_joy3/source/test_buttons.s", "start": 17126858, "end": 17127855}, {"filename": "/assets/roms/nes-test-roms/read_joy3/source/thorough_test.s", "start": 17127855, "end": 17128847}, {"filename": "/assets/roms/nes-test-roms/read_joy3/source/common/ascii.chr", "start": 17128847, "end": 17130895}, {"filename": "/assets/roms/nes-test-roms/read_joy3/source/common/console.s", "start": 17130895, "end": 17134252}, {"filename": "/assets/roms/nes-test-roms/read_joy3/source/common/crc.s", "start": 17134252, "end": 17135613}, {"filename": "/assets/roms/nes-test-roms/read_joy3/source/common/delay.s", "start": 17135613, "end": 17138262}, {"filename": "/assets/roms/nes-test-roms/read_joy3/source/common/macros.inc", "start": 17138262, "end": 17139981}, {"filename": "/assets/roms/nes-test-roms/read_joy3/source/common/nes.inc", "start": 17139981, "end": 17140533}, {"filename": "/assets/roms/nes-test-roms/read_joy3/source/common/print.s", "start": 17140533, "end": 17143028}, {"filename": "/assets/roms/nes-test-roms/read_joy3/source/common/serial.s", "start": 17143028, "end": 17144047}, {"filename": "/assets/roms/nes-test-roms/read_joy3/source/common/shell.inc", "start": 17144047, "end": 17150889}, {"filename": "/assets/roms/nes-test-roms/read_joy3/source/common/sync_dmc.s", "start": 17150889, "end": 17151841}, {"filename": "/assets/roms/nes-test-roms/read_joy3/source/common/testing.s", "start": 17151841, "end": 17154226}, {"filename": "/assets/roms/nes-test-roms/scanline/scanline.asm", "start": 17154226, "end": 17160336}, {"filename": "/assets/roms/nes-test-roms/scanline/scanline.chr", "start": 17160336, "end": 17168528}, {"filename": "/assets/roms/nes-test-roms/scanline/scanline.imk", "start": 17168528, "end": 17168606}, {"filename": "/assets/roms/nes-test-roms/scanline/scanline.nes", "start": 17168606, "end": 17193198}, {"filename": "/assets/roms/nes-test-roms/scanline/scanline.umk", "start": 17193198, "end": 17193316}, {"filename": "/assets/roms/nes-test-roms/scanline/scanline.unif", "start": 17193316, "end": 17218001}, {"filename": "/assets/roms/nes-test-roms/scanline-a1/scanline.asm", "start": 17218001, "end": 17224111}, {"filename": "/assets/roms/nes-test-roms/scanline-a1/scanline.chr", "start": 17224111, "end": 17232303}, {"filename": "/assets/roms/nes-test-roms/scanline-a1/scanline.imk", "start": 17232303, "end": 17232381}, {"filename": "/assets/roms/nes-test-roms/scanline-a1/scanline.nes", "start": 17232381, "end": 17256973}, {"filename": "/assets/roms/nes-test-roms/scanline-a1/scanline.umk", "start": 17256973, "end": 17257091}, {"filename": "/assets/roms/nes-test-roms/scanline-a1/scanline.unif", "start": 17257091, "end": 17281776}, {"filename": "/assets/roms/nes-test-roms/scrolltest/makefile", "start": 17281776, "end": 17282084}, {"filename": "/assets/roms/nes-test-roms/scrolltest/nesedit.cfg", "start": 17282084, "end": 17282324}, {"filename": "/assets/roms/nes-test-roms/scrolltest/scroll.bin", "start": 17282324, "end": 17298708}, {"filename": "/assets/roms/nes-test-roms/scrolltest/scroll.nes", "start": 17298708, "end": 17315108}, {"filename": "/assets/roms/nes-test-roms/scrolltest/scroll.s", "start": 17315108, "end": 17353740}, {"filename": "/assets/roms/nes-test-roms/scrolltest/scrollhd.bin", "start": 17353740, "end": 17353756}, {"filename": "/assets/roms/nes-test-roms/scrolltest/scrollhd.s", "start": 17353756, "end": 17354025}, {"filename": "/assets/roms/nes-test-roms/scrolltest/scrtest.blk", "start": 17354025, "end": 17354601}, {"filename": "/assets/roms/nes-test-roms/scrolltest/scrtest.chr", "start": 17354601, "end": 17358697}, {"filename": "/assets/roms/nes-test-roms/scrolltest/scrtest.map", "start": 17358697, "end": 17359101}, {"filename": "/assets/roms/nes-test-roms/scrolltest/scrtest.pal", "start": 17359101, "end": 17359117}, {"filename": "/assets/roms/nes-test-roms/soundtest/README.TXT", "start": 17359117, "end": 17359156}, {"filename": "/assets/roms/nes-test-roms/soundtest/SNDTEST.ASM", "start": 17359156, "end": 17368695}, {"filename": "/assets/roms/nes-test-roms/soundtest/SNDTEST.CHR", "start": 17368695, "end": 17376887}, {"filename": "/assets/roms/nes-test-roms/soundtest/SNDTEST.NES", "start": 17376887, "end": 17401479}, {"filename": "/assets/roms/nes-test-roms/sprdma_and_dmc_dma/sprdma_and_dmc_dma.nes", "start": 17401479, "end": 17442455}, {"filename": "/assets/roms/nes-test-roms/sprdma_and_dmc_dma/sprdma_and_dmc_dma_512.nes", "start": 17442455, "end": 17483431}, {"filename": "/assets/roms/nes-test-roms/spritecans-2011/makefile", "start": 17483431, "end": 17485120}, {"filename": "/assets/roms/nes-test-roms/spritecans-2011/nes.ini", "start": 17485120, "end": 17486193}, {"filename": "/assets/roms/nes-test-roms/spritecans-2011/README.txt", "start": 17486193, "end": 17487196}, {"filename": "/assets/roms/nes-test-roms/spritecans-2011/spritecans.nes", "start": 17487196, "end": 17511788}, {"filename": "/assets/roms/nes-test-roms/spritecans-2011/zip.in", "start": 17511788, "end": 17512053}, {"filename": "/assets/roms/nes-test-roms/spritecans-2011/obj/nes/index.txt", "start": 17512053, "end": 17512115}, {"filename": "/assets/roms/nes-test-roms/spritecans-2011/src/music.s", "start": 17512115, "end": 17519261}, {"filename": "/assets/roms/nes-test-roms/spritecans-2011/src/musicseq.h", "start": 17519261, "end": 17521739}, {"filename": "/assets/roms/nes-test-roms/spritecans-2011/src/musicseq.s", "start": 17521739, "end": 17528230}, {"filename": "/assets/roms/nes-test-roms/spritecans-2011/src/nes.h", "start": 17528230, "end": 17529203}, {"filename": "/assets/roms/nes-test-roms/spritecans-2011/src/paldetect.s", "start": 17529203, "end": 17531297}, {"filename": "/assets/roms/nes-test-roms/spritecans-2011/src/sound.s", "start": 17531297, "end": 17538743}, {"filename": "/assets/roms/nes-test-roms/spritecans-2011/src/sprite.nam", "start": 17538743, "end": 17539767}, {"filename": "/assets/roms/nes-test-roms/spritecans-2011/src/sprite.s", "start": 17539767, "end": 17549691}, {"filename": "/assets/roms/nes-test-roms/spritecans-2011/tilesets/main.png", "start": 17549691, "end": 17550931}, {"filename": "/assets/roms/nes-test-roms/spritecans-2011/tools/8name.py", "start": 17550931, "end": 17571892}, {"filename": "/assets/roms/nes-test-roms/spritecans-2011/tools/mktables.py", "start": 17571892, "end": 17574163}, {"filename": "/assets/roms/nes-test-roms/spritecans-2011/tools/pilbmp2nes.py", "start": 17574163, "end": 17578322}, {"filename": "/assets/roms/nes-test-roms/sprite_hit_tests_2005.10.05/01.basics.nes", "start": 17578322, "end": 17594722}, {"filename": "/assets/roms/nes-test-roms/sprite_hit_tests_2005.10.05/02.alignment.nes", "start": 17594722, "end": 17611122}, {"filename": "/assets/roms/nes-test-roms/sprite_hit_tests_2005.10.05/03.corners.nes", "start": 17611122, "end": 17627522}, {"filename": "/assets/roms/nes-test-roms/sprite_hit_tests_2005.10.05/04.flip.nes", "start": 17627522, "end": 17643922}, {"filename": "/assets/roms/nes-test-roms/sprite_hit_tests_2005.10.05/05.left_clip.nes", "start": 17643922, "end": 17660322}, {"filename": "/assets/roms/nes-test-roms/sprite_hit_tests_2005.10.05/06.right_edge.nes", "start": 17660322, "end": 17676722}, {"filename": "/assets/roms/nes-test-roms/sprite_hit_tests_2005.10.05/07.screen_bottom.nes", "start": 17676722, "end": 17693122}, {"filename": "/assets/roms/nes-test-roms/sprite_hit_tests_2005.10.05/08.double_height.nes", "start": 17693122, "end": 17709522}, {"filename": "/assets/roms/nes-test-roms/sprite_hit_tests_2005.10.05/09.timing_basics.nes", "start": 17709522, "end": 17725922}, {"filename": "/assets/roms/nes-test-roms/sprite_hit_tests_2005.10.05/10.timing_order.nes", "start": 17725922, "end": 17742322}, {"filename": "/assets/roms/nes-test-roms/sprite_hit_tests_2005.10.05/11.edge_timing.nes", "start": 17742322, "end": 17758722}, {"filename": "/assets/roms/nes-test-roms/sprite_hit_tests_2005.10.05/readme.txt", "start": 17758722, "end": 17763995}, {"filename": "/assets/roms/nes-test-roms/sprite_hit_tests_2005.10.05/source/01.basics.asm", "start": 17763995, "end": 17766181}, {"filename": "/assets/roms/nes-test-roms/sprite_hit_tests_2005.10.05/source/02.alignment.asm", "start": 17766181, "end": 17768502}, {"filename": "/assets/roms/nes-test-roms/sprite_hit_tests_2005.10.05/source/03.corners.asm", "start": 17768502, "end": 17769814}, {"filename": "/assets/roms/nes-test-roms/sprite_hit_tests_2005.10.05/source/04.flip.asm", "start": 17769814, "end": 17770982}, {"filename": "/assets/roms/nes-test-roms/sprite_hit_tests_2005.10.05/source/05.left_clip.asm", "start": 17770982, "end": 17772723}, {"filename": "/assets/roms/nes-test-roms/sprite_hit_tests_2005.10.05/source/06.right_edge.asm", "start": 17772723, "end": 17774102}, {"filename": "/assets/roms/nes-test-roms/sprite_hit_tests_2005.10.05/source/07.screen_bottom.asm", "start": 17774102, "end": 17775577}, {"filename": "/assets/roms/nes-test-roms/sprite_hit_tests_2005.10.05/source/08.double_height.asm", "start": 17775577, "end": 17776906}, {"filename": "/assets/roms/nes-test-roms/sprite_hit_tests_2005.10.05/source/09.timing_basics.asm", "start": 17776906, "end": 17778977}, {"filename": "/assets/roms/nes-test-roms/sprite_hit_tests_2005.10.05/source/10.timing_order.asm", "start": 17778977, "end": 17780385}, {"filename": "/assets/roms/nes-test-roms/sprite_hit_tests_2005.10.05/source/11.edge_timing.asm", "start": 17780385, "end": 17781921}, {"filename": "/assets/roms/nes-test-roms/sprite_overflow_tests/1.Basics.nes", "start": 17781921, "end": 17798321}, {"filename": "/assets/roms/nes-test-roms/sprite_overflow_tests/2.Details.nes", "start": 17798321, "end": 17814721}, {"filename": "/assets/roms/nes-test-roms/sprite_overflow_tests/3.Timing.nes", "start": 17814721, "end": 17831121}, {"filename": "/assets/roms/nes-test-roms/sprite_overflow_tests/4.Obscure.nes", "start": 17831121, "end": 17847521}, {"filename": "/assets/roms/nes-test-roms/sprite_overflow_tests/5.Emulator.nes", "start": 17847521, "end": 17863921}, {"filename": "/assets/roms/nes-test-roms/sprite_overflow_tests/readme.txt", "start": 17863921, "end": 17867999}, {"filename": "/assets/roms/nes-test-roms/stars_se/Header_32k", "start": 17867999, "end": 17868015}, {"filename": "/assets/roms/nes-test-roms/stars_se/Make_StarsSE", "start": 17868015, "end": 17868109}, {"filename": "/assets/roms/nes-test-roms/stars_se/ReadmeStarsSE.TXT", "start": 17868109, "end": 17869032}, {"filename": "/assets/roms/nes-test-roms/stars_se/scrolltext.bin", "start": 17869032, "end": 17891534}, {"filename": "/assets/roms/nes-test-roms/stars_se/starsnam.asm", "start": 17891534, "end": 17897629}, {"filename": "/assets/roms/nes-test-roms/stars_se/StarsSE.asm", "start": 17897629, "end": 17908042}, {"filename": "/assets/roms/nes-test-roms/stars_se/StarsSE.CHR", "start": 17908042, "end": 17916234}, {"filename": "/assets/roms/nes-test-roms/stars_se/StarsSE.NES", "start": 17916234, "end": 17957210}, {"filename": "/assets/roms/nes-test-roms/stars_se/StarsSE.SPR", "start": 17957210, "end": 17957722}, {"filename": "/assets/roms/nes-test-roms/stomper/smwnsf.dat", "start": 17957722, "end": 18028378}, {"filename": "/assets/roms/nes-test-roms/stomper/smwstomp.asm", "start": 18028378, "end": 18039291}, {"filename": "/assets/roms/nes-test-roms/stomper/smwstomp.chr", "start": 18039291, "end": 18047483}, {"filename": "/assets/roms/nes-test-roms/stomper/smwstomp.imk", "start": 18047483, "end": 18047553}, {"filename": "/assets/roms/nes-test-roms/stomper/smwstomp.nes", "start": 18047553, "end": 18088529}, {"filename": "/assets/roms/nes-test-roms/stomper/smwstomp.umk", "start": 18088529, "end": 18088655}, {"filename": "/assets/roms/nes-test-roms/stomper/smwstomp.unif", "start": 18088655, "end": 18129731}, {"filename": "/assets/roms/nes-test-roms/stress/FIREWAVE.ASM", "start": 18129731, "end": 18130435}, {"filename": "/assets/roms/nes-test-roms/stress/Header_Mapper0", "start": 18130435, "end": 18130451}, {"filename": "/assets/roms/nes-test-roms/stress/Make_NEStress", "start": 18130451, "end": 18130531}, {"filename": "/assets/roms/nes-test-roms/stress/NEStress.asm", "start": 18130531, "end": 18220326}, {"filename": "/assets/roms/nes-test-roms/stress/NEStress.NES", "start": 18220326, "end": 18261302}, {"filename": "/assets/roms/nes-test-roms/stress/NEStress.txt", "start": 18261302, "end": 18266383}, {"filename": "/assets/roms/nes-test-roms/stress/SolarTitleNAM.asm", "start": 18266383, "end": 18272484}, {"filename": "/assets/roms/nes-test-roms/stress/Tanks.chr", "start": 18272484, "end": 18280676}, {"filename": "/assets/roms/nes-test-roms/stress/TanksFadePal.ASM", "start": 18280676, "end": 18281076}, {"filename": "/assets/roms/nes-test-roms/stress/TanksPal.ASM", "start": 18281076, "end": 18283942}, {"filename": "/assets/roms/nes-test-roms/tutor/make.bat", "start": 18283942, "end": 18283968}, {"filename": "/assets/roms/nes-test-roms/tutor/tutor.asm", "start": 18283968, "end": 18284324}, {"filename": "/assets/roms/nes-test-roms/tutor/tutor.nes", "start": 18284324, "end": 18308916}, {"filename": "/assets/roms/nes-test-roms/tutor/tutorchr.asm", "start": 18308916, "end": 18315552}, {"filename": "/assets/roms/nes-test-roms/tutor/tutorprg.asm", "start": 18315552, "end": 18323772}, {"filename": "/assets/roms/nes-test-roms/tvpassfail/health.nam", "start": 18323772, "end": 18324796}, {"filename": "/assets/roms/nes-test-roms/tvpassfail/mk.bat", "start": 18324796, "end": 18324985}, {"filename": "/assets/roms/nes-test-roms/tvpassfail/nes.ini", "start": 18324985, "end": 18325749}, {"filename": "/assets/roms/nes-test-roms/tvpassfail/palsquare.nam", "start": 18325749, "end": 18326773}, {"filename": "/assets/roms/nes-test-roms/tvpassfail/README.txt", "start": 18326773, "end": 18329019}, {"filename": "/assets/roms/nes-test-roms/tvpassfail/square.nam", "start": 18329019, "end": 18330043}, {"filename": "/assets/roms/nes-test-roms/tvpassfail/square.pal", "start": 18330043, "end": 18330059}, {"filename": "/assets/roms/nes-test-roms/tvpassfail/tiled.pal", "start": 18330059, "end": 18330827}, {"filename": "/assets/roms/nes-test-roms/tvpassfail/tv.chr", "start": 18330827, "end": 18339019}, {"filename": "/assets/roms/nes-test-roms/tvpassfail/tv.nam", "start": 18339019, "end": 18340043}, {"filename": "/assets/roms/nes-test-roms/tvpassfail/tv.nes", "start": 18340043, "end": 18364635}, {"filename": "/assets/roms/nes-test-roms/tvpassfail/tv.pal", "start": 18364635, "end": 18364651}, {"filename": "/assets/roms/nes-test-roms/tvpassfail/tv.s", "start": 18364651, "end": 18369731}, {"filename": "/assets/roms/nes-test-roms/tvpassfail/tvpassfail.zip", "start": 18369731, "end": 18375552}, {"filename": "/assets/roms/nes-test-roms/vaus-test/makefile", "start": 18375552, "end": 18378905}, {"filename": "/assets/roms/nes-test-roms/vaus-test/nes.ini", "start": 18378905, "end": 18379989}, {"filename": "/assets/roms/nes-test-roms/vaus-test/README.txt", "start": 18379989, "end": 18381496}, {"filename": "/assets/roms/nes-test-roms/vaus-test/vaus-test.nes", "start": 18381496, "end": 18406088}, {"filename": "/assets/roms/nes-test-roms/vaus-test/zip.in", "start": 18406088, "end": 18406294}, {"filename": "/assets/roms/nes-test-roms/vaus-test/obj/nes/index.txt", "start": 18406294, "end": 18406356}, {"filename": "/assets/roms/nes-test-roms/vaus-test/src/main.s", "start": 18406356, "end": 18423801}, {"filename": "/assets/roms/nes-test-roms/vaus-test/src/nes.h", "start": 18423801, "end": 18424891}, {"filename": "/assets/roms/nes-test-roms/vaus-test/src/ppuclear.s", "start": 18424891, "end": 18426881}, {"filename": "/assets/roms/nes-test-roms/vaus-test/src/ram.h", "start": 18426881, "end": 18426909}, {"filename": "/assets/roms/nes-test-roms/vaus-test/src/vauspads.s", "start": 18426909, "end": 18428685}, {"filename": "/assets/roms/nes-test-roms/vaus-test/tilesets/bggfx.png", "start": 18428685, "end": 18429413}, {"filename": "/assets/roms/nes-test-roms/vaus-test/tilesets/spritegfx.png", "start": 18429413, "end": 18430084}, {"filename": "/assets/roms/nes-test-roms/vaus-test/tools/pilbmp2nes.py", "start": 18430084, "end": 18434243}, {"filename": "/assets/roms/nes-test-roms/vbl_nmi_timing/1.frame_basics.nes", "start": 18434243, "end": 18450643}, {"filename": "/assets/roms/nes-test-roms/vbl_nmi_timing/2.vbl_timing.nes", "start": 18450643, "end": 18467043}, {"filename": "/assets/roms/nes-test-roms/vbl_nmi_timing/3.even_odd_frames.nes", "start": 18467043, "end": 18483443}, {"filename": "/assets/roms/nes-test-roms/vbl_nmi_timing/4.vbl_clear_timing.nes", "start": 18483443, "end": 18499843}, {"filename": "/assets/roms/nes-test-roms/vbl_nmi_timing/5.nmi_suppression.nes", "start": 18499843, "end": 18516243}, {"filename": "/assets/roms/nes-test-roms/vbl_nmi_timing/6.nmi_disable.nes", "start": 18516243, "end": 18532643}, {"filename": "/assets/roms/nes-test-roms/vbl_nmi_timing/7.nmi_timing.nes", "start": 18532643, "end": 18549043}, {"filename": "/assets/roms/nes-test-roms/vbl_nmi_timing/readme.txt", "start": 18549043, "end": 18553610}, {"filename": "/assets/roms/nes-test-roms/vbl_nmi_timing/source/support/chr.bin", "start": 18553610, "end": 18554082}, {"filename": "/assets/roms/nes-test-roms/volume_tests/empty.chr", "start": 18554082, "end": 18562274}, {"filename": "/assets/roms/nes-test-roms/volume_tests/makefile", "start": 18562274, "end": 18562947}, {"filename": "/assets/roms/nes-test-roms/volume_tests/nes.ini", "start": 18562947, "end": 18563700}, {"filename": "/assets/roms/nes-test-roms/volume_tests/README.txt", "start": 18563700, "end": 18567531}, {"filename": "/assets/roms/nes-test-roms/volume_tests/volumes.nes", "start": 18567531, "end": 18592123}, {"filename": "/assets/roms/nes-test-roms/volume_tests/zip.in", "start": 18592123, "end": 18592337}, {"filename": "/assets/roms/nes-test-roms/volume_tests/obj/nes/khan", "start": 18592337, "end": 18592337}, {"filename": "/assets/roms/nes-test-roms/volume_tests/recordings/fceux.ogg", "start": 18592337, "end": 19188915, "audio": 1}, {"filename": "/assets/roms/nes-test-roms/volume_tests/recordings/nes-001.ogg", "start": 19188915, "end": 19828668, "audio": 1}, {"filename": "/assets/roms/nes-test-roms/volume_tests/recordings/nestopia.ogg", "start": 19828668, "end": 20439821, "audio": 1}, {"filename": "/assets/roms/nes-test-roms/volume_tests/recordings/nintendulator.ogg", "start": 20439821, "end": 21067388, "audio": 1}, {"filename": "/assets/roms/nes-test-roms/volume_tests/src/hello.s", "start": 21067388, "end": 21069709}, {"filename": "/assets/roms/nes-test-roms/volume_tests/src/pads.s", "start": 21069709, "end": 21071625}, {"filename": "/assets/roms/nes-test-roms/volume_tests/src/sound.s", "start": 21071625, "end": 21076307}, {"filename": "/assets/roms/nes-test-roms/window5/colorwin.asm", "start": 21076307, "end": 21085085}, {"filename": "/assets/roms/nes-test-roms/window5/colorwin.chr", "start": 21085085, "end": 21093277}, {"filename": "/assets/roms/nes-test-roms/window5/colorwin_ntsc.nes", "start": 21093277, "end": 21117869}, {"filename": "/assets/roms/nes-test-roms/window5/colorwin_pal.nes", "start": 21117869, "end": 21142461}, {"filename": "/assets/roms/nes-test-roms/window5/header", "start": 21142461, "end": 21142477}, {"filename": "/assets/roms/nes-test-roms/window5/linkfile", "start": 21142477, "end": 21142520}, {"filename": "/assets/roms/nes-test-roms/window5/maping.asm", "start": 21142520, "end": 21143074}, {"filename": "/assets/roms/nes-test-roms/window5/win_timing.asm", "start": 21143074, "end": 21147001}, {"filename": "/assets/shaders/ChipRender.fx", "start": 21147001, "end": 21147606}, {"filename": "/assets/shaders/common.fxh", "start": 21147606, "end": 21147971}, {"filename": "/assets/shaders/ErrorShader.fx", "start": 21147971, "end": 21148314}, {"filename": "/assets/shaders/imgui.fx", "start": 21148314, "end": 21148754}, {"filename": "/assets/shaders/NTSCShader.fx", "start": 21148754, "end": 21149838}, {"filename": "/assets/shaders/OutShader.fx", "start": 21149838, "end": 21150278}, {"filename": "/assets/shaders/TexturedShader.fx", "start": 21150278, "end": 21150718}, {"filename": "/assets/system-def/2a03.js", "start": 21150718, "end": 21152674}, {"filename": "/assets/system-def/2c02.js", "start": 21152674, "end": 21156368}, {"filename": "/assets/system-def/4021.js", "start": 21156368, "end": 21158106}, {"filename": "/assets/system-def/74LS139.js", "start": 21158106, "end": 21163143}, {"filename": "/assets/system-def/74LS368.js", "start": 21163143, "end": 21166077}, {"filename": "/assets/system-def/74LS373.js", "start": 21166077, "end": 21174693}, {"filename": "/assets/system-def/cart-extraram.js", "start": 21174693, "end": 21176016}, {"filename": "/assets/system-def/cart-mmu0-chrram.js", "start": 21176016, "end": 21176554}, {"filename": "/assets/system-def/cart-mmu0-chrrom.js", "start": 21176554, "end": 21177070}, {"filename": "/assets/system-def/cart-mmu0-prgrom.js", "start": 21177070, "end": 21177614}, {"filename": "/assets/system-def/cart-mmu0.js", "start": 21177614, "end": 21178150}, {"filename": "/assets/system-def/nes-001.js", "start": 21178150, "end": 21183627}, {"filename": "/assets/system-def/nes-cart60.js", "start": 21183627, "end": 21186318}, {"filename": "/assets/system-def/nes-cart72.js", "start": 21186318, "end": 21190804}, {"filename": "/assets/system-def/nes-cic1.js", "start": 21190804, "end": 21191700}, {"filename": "/assets/system-def/nes-pad.js", "start": 21191700, "end": 21193265}, {"filename": "/assets/system-def/pslatch.js", "start": 21193265, "end": 21195987}, {"filename": "/assets/system-def/ROM32K.js", "start": 21195987, "end": 21197808}, {"filename": "/assets/system-def/ROM8K.js", "start": 21197808, "end": 21199559}, {"filename": "/assets/system-def/SRAM2K.js", "start": 21199559, "end": 21201310}, {"filename": "/assets/system-def/SRAM8K.js", "start": 21201310, "end": 21203408}, {"filename": "/assets/system-def/2a03/nodenames.js", "start": 21203408, "end": 21255270}, {"filename": "/assets/system-def/2a03/nodenames.txt", "start": 21255270, "end": 21286780}, {"filename": "/assets/system-def/2a03/segdefs.js", "start": 21286780, "end": 24554942}, {"filename": "/assets/system-def/2a03/segdefs.txt", "start": 24554942, "end": 27680055}, {"filename": "/assets/system-def/2a03/transdefs.js", "start": 27680055, "end": 28501955}, {"filename": "/assets/system-def/2a03/transdefs.txt", "start": 28501955, "end": 29190371}, {"filename": "/assets/system-def/2a03/transdefs2.js", "start": 29190371, "end": 30020284}, {"filename": "/assets/system-def/2a03/transdefs_named.js", "start": 30020284, "end": 31295207}, {"filename": "/assets/system-def/2c02/nodenames.js", "start": 31295207, "end": 31363789}, {"filename": "/assets/system-def/2c02/nodenames.txt", "start": 31363789, "end": 31511497}, {"filename": "/assets/system-def/2c02/nodenames_oamram.js", "start": 31511497, "end": 31607675}, {"filename": "/assets/system-def/2c02/nodenames_palram.js", "start": 31607675, "end": 31615783}, {"filename": "/assets/system-def/2c02/palettenodes.txt", "start": 31615783, "end": 31617735}, {"filename": "/assets/system-def/2c02/segdefs.js", "start": 31617735, "end": 35782689}, {"filename": "/assets/system-def/2c02/segdefs.txt", "start": 35782689, "end": 39769546}, {"filename": "/assets/system-def/2c02/spritenodes.txt", "start": 39769546, "end": 39792104}, {"filename": "/assets/system-def/2c02/transdefs.js", "start": 39792104, "end": 40935809}, {"filename": "/assets/system-def/2c02/transdefs.txt", "start": 40935809, "end": 41921102}, {"filename": "/assets/system-def/2c02/transdefs2.js", "start": 41921102, "end": 43065541}, {"filename": "/assets/system-def/2c02/transdefs_named.js", "start": 43065541, "end": 45434878}, {"filename": "/assets/textures/ColorTextureTest.png", "start": 45434878, "end": 45456395}, {"filename": "/assets/textures/ntsc_test.png", "start": 45456395, "end": 45598714}, {"filename": "/assets/textures/ntsc_test_info.png", "start": 45598714, "end": 45854072}], "remote_package_size": 45854072, "package_uuid": "5e34ec2f-b1d7-44ba-b63c-4afc719fa395"});

  })();


    // All the pre-js content up to here must remain later on, we need to run
    // it.
    if (Module['ENVIRONMENT_IS_PTHREAD']) Module['preRun'] = [];
    var necessaryPreJSTasks = Module['preRun'].slice();
  
    if (!Module['preRun']) throw 'Module.preRun should exist because file support used it; did a pre-js delete it?';
    necessaryPreJSTasks.forEach(function(task) {
      if (Module['preRun'].indexOf(task) < 0) throw 'All preRun tasks that exist before user pre-js code should remain after; did you replace Module or modify Module.preRun?';
    });
  

// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = Object.assign({}, Module);

var arguments_ = [];
var thisProgram = './this.program';
var quit_ = (status, toThrow) => {
  throw toThrow;
};

// Determine the runtime environment we are in. You can customize this by
// setting the ENVIRONMENT setting at compile time (see settings.js).

// Attempt to auto-detect the environment
var ENVIRONMENT_IS_WEB = typeof window == 'object';
var ENVIRONMENT_IS_WORKER = typeof importScripts == 'function';
// N.b. Electron.js environment is simultaneously a NODE-environment, but
// also a web environment.
var ENVIRONMENT_IS_NODE = typeof process == 'object' && typeof process.versions == 'object' && typeof process.versions.node == 'string';
var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

if (Module['ENVIRONMENT']) {
  throw new Error('Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -s ENVIRONMENT=web or -s ENVIRONMENT=node)');
}

// `/` should be present at the end if `scriptDirectory` is not empty
var scriptDirectory = '';
function locateFile(path) {
  if (Module['locateFile']) {
    return Module['locateFile'](path, scriptDirectory);
  }
  return scriptDirectory + path;
}

// Hooks that are implemented differently in different runtime environments.
var read_,
    readAsync,
    readBinary,
    setWindowTitle;

// Normally we don't log exceptions but instead let them bubble out the top
// level where the embedding environment (e.g. the browser) can handle
// them.
// However under v8 and node we sometimes exit the process direcly in which case
// its up to use us to log the exception before exiting.
// If we fix https://github.com/emscripten-core/emscripten/issues/15080
// this may no longer be needed under node.
function logExceptionOnExit(e) {
  if (e instanceof ExitStatus) return;
  let toLog = e;
  if (e && typeof e == 'object' && e.stack) {
    toLog = [e, e.stack];
  }
  err('exiting due to exception: ' + toLog);
}

var fs;
var nodePath;
var requireNodeFS;

if (ENVIRONMENT_IS_NODE) {
  if (!(typeof process == 'object' && typeof require == 'function')) throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');
  if (ENVIRONMENT_IS_WORKER) {
    scriptDirectory = require('path').dirname(scriptDirectory) + '/';
  } else {
    scriptDirectory = __dirname + '/';
  }

// include: node_shell_read.js


requireNodeFS = () => {
  // Use nodePath as the indicator for these not being initialized,
  // since in some environments a global fs may have already been
  // created.
  if (!nodePath) {
    fs = require('fs');
    nodePath = require('path');
  }
};

read_ = function shell_read(filename, binary) {
  requireNodeFS();
  filename = nodePath['normalize'](filename);
  return fs.readFileSync(filename, binary ? undefined : 'utf8');
};

readBinary = (filename) => {
  var ret = read_(filename, true);
  if (!ret.buffer) {
    ret = new Uint8Array(ret);
  }
  assert(ret.buffer);
  return ret;
};

readAsync = (filename, onload, onerror) => {
  requireNodeFS();
  filename = nodePath['normalize'](filename);
  fs.readFile(filename, function(err, data) {
    if (err) onerror(err);
    else onload(data.buffer);
  });
};

// end include: node_shell_read.js
  if (process['argv'].length > 1) {
    thisProgram = process['argv'][1].replace(/\\/g, '/');
  }

  arguments_ = process['argv'].slice(2);

  if (typeof module != 'undefined') {
    module['exports'] = Module;
  }

  process['on']('uncaughtException', function(ex) {
    // suppress ExitStatus exceptions from showing an error
    if (!(ex instanceof ExitStatus)) {
      throw ex;
    }
  });

  // Without this older versions of node (< v15) will log unhandled rejections
  // but return 0, which is not normally the desired behaviour.  This is
  // not be needed with node v15 and about because it is now the default
  // behaviour:
  // See https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode
  process['on']('unhandledRejection', function(reason) { throw reason; });

  quit_ = (status, toThrow) => {
    if (keepRuntimeAlive()) {
      process['exitCode'] = status;
      throw toThrow;
    }
    logExceptionOnExit(toThrow);
    process['exit'](status);
  };

  Module['inspect'] = function () { return '[Emscripten Module object]'; };

} else
if (ENVIRONMENT_IS_SHELL) {

  if ((typeof process == 'object' && typeof require === 'function') || typeof window == 'object' || typeof importScripts == 'function') throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

  if (typeof read != 'undefined') {
    read_ = function shell_read(f) {
      return read(f);
    };
  }

  readBinary = function readBinary(f) {
    let data;
    if (typeof readbuffer == 'function') {
      return new Uint8Array(readbuffer(f));
    }
    data = read(f, 'binary');
    assert(typeof data == 'object');
    return data;
  };

  readAsync = function readAsync(f, onload, onerror) {
    setTimeout(() => onload(readBinary(f)), 0);
  };

  if (typeof scriptArgs != 'undefined') {
    arguments_ = scriptArgs;
  } else if (typeof arguments != 'undefined') {
    arguments_ = arguments;
  }

  if (typeof quit == 'function') {
    quit_ = (status, toThrow) => {
      // Unlike node which has process.exitCode, d8 has no such mechanism. So we
      // have no way to set the exit code and then let the program exit with
      // that code when it naturally stops running (say, when all setTimeouts
      // have completed). For that reason we must call `quit` - the only way to
      // set the exit code - but quit also halts immediately, so we need to be
      // careful of whether the runtime is alive or not, which is why this code
      // path looks different than node. It also has the downside that it will
      // halt the entire program when no code remains to run, which means this
      // is not friendly for bundling this code into a larger codebase, and for
      // that reason the "shell" environment is mainly useful for testing whole
      // programs by themselves, basically.
      if (runtimeKeepaliveCounter) {
        throw toThrow;
      }
      logExceptionOnExit(toThrow);
      quit(status);
    };
  }

  if (typeof print != 'undefined') {
    // Prefer to use print/printErr where they exist, as they usually work better.
    if (typeof console == 'undefined') console = /** @type{!Console} */({});
    console.log = /** @type{!function(this:Console, ...*): undefined} */ (print);
    console.warn = console.error = /** @type{!function(this:Console, ...*): undefined} */ (typeof printErr != 'undefined' ? printErr : print);
  }

} else

// Note that this includes Node.js workers when relevant (pthreads is enabled).
// Node.js workers are detected as a combination of ENVIRONMENT_IS_WORKER and
// ENVIRONMENT_IS_NODE.
if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  if (ENVIRONMENT_IS_WORKER) { // Check worker, not web, since window could be polyfilled
    scriptDirectory = self.location.href;
  } else if (typeof document != 'undefined' && document.currentScript) { // web
    scriptDirectory = document.currentScript.src;
  }
  // blob urls look like blob:http://site.com/etc/etc and we cannot infer anything from them.
  // otherwise, slice off the final part of the url to find the script directory.
  // if scriptDirectory does not contain a slash, lastIndexOf will return -1,
  // and scriptDirectory will correctly be replaced with an empty string.
  // If scriptDirectory contains a query (starting with ?) or a fragment (starting with #),
  // they are removed because they could contain a slash.
  if (scriptDirectory.indexOf('blob:') !== 0) {
    scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf('/')+1);
  } else {
    scriptDirectory = '';
  }

  if (!(typeof window == 'object' || typeof importScripts == 'function')) throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

  // Differentiate the Web Worker from the Node Worker case, as reading must
  // be done differently.
  {
// include: web_or_worker_shell_read.js


  read_ = (url) => {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      xhr.send(null);
      return xhr.responseText;
  }

  if (ENVIRONMENT_IS_WORKER) {
    readBinary = (url) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.responseType = 'arraybuffer';
        xhr.send(null);
        return new Uint8Array(/** @type{!ArrayBuffer} */(xhr.response));
    };
  }

  readAsync = (url, onload, onerror) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = () => {
      if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
        onload(xhr.response);
        return;
      }
      onerror();
    };
    xhr.onerror = onerror;
    xhr.send(null);
  }

// end include: web_or_worker_shell_read.js
  }

  setWindowTitle = (title) => document.title = title;
} else
{
  throw new Error('environment detection error');
}

var out = Module['print'] || console.log.bind(console);
var err = Module['printErr'] || console.warn.bind(console);

// Merge back in the overrides
Object.assign(Module, moduleOverrides);
// Free the object hierarchy contained in the overrides, this lets the GC
// reclaim data used e.g. in memoryInitializerRequest, which is a large typed array.
moduleOverrides = null;
checkIncomingModuleAPI();

// Emit code to handle expected values on the Module object. This applies Module.x
// to the proper local x. This has two benefits: first, we only emit it if it is
// expected to arrive, and second, by using a local everywhere else that can be
// minified.

if (Module['arguments']) arguments_ = Module['arguments'];legacyModuleProp('arguments', 'arguments_');

if (Module['thisProgram']) thisProgram = Module['thisProgram'];legacyModuleProp('thisProgram', 'thisProgram');

if (Module['quit']) quit_ = Module['quit'];legacyModuleProp('quit', 'quit_');

// perform assertions in shell.js after we set up out() and err(), as otherwise if an assertion fails it cannot print the message
// Assertions on removed incoming Module JS APIs.
assert(typeof Module['memoryInitializerPrefixURL'] == 'undefined', 'Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['pthreadMainPrefixURL'] == 'undefined', 'Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['cdInitializerPrefixURL'] == 'undefined', 'Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['filePackagePrefixURL'] == 'undefined', 'Module.filePackagePrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['read'] == 'undefined', 'Module.read option was removed (modify read_ in JS)');
assert(typeof Module['readAsync'] == 'undefined', 'Module.readAsync option was removed (modify readAsync in JS)');
assert(typeof Module['readBinary'] == 'undefined', 'Module.readBinary option was removed (modify readBinary in JS)');
assert(typeof Module['setWindowTitle'] == 'undefined', 'Module.setWindowTitle option was removed (modify setWindowTitle in JS)');
assert(typeof Module['TOTAL_MEMORY'] == 'undefined', 'Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY');
legacyModuleProp('read', 'read_');
legacyModuleProp('readAsync', 'readAsync');
legacyModuleProp('readBinary', 'readBinary');
legacyModuleProp('setWindowTitle', 'setWindowTitle');
var IDBFS = 'IDBFS is no longer included by default; build with -lidbfs.js';
var PROXYFS = 'PROXYFS is no longer included by default; build with -lproxyfs.js';
var WORKERFS = 'WORKERFS is no longer included by default; build with -lworkerfs.js';
var NODEFS = 'NODEFS is no longer included by default; build with -lnodefs.js';


assert(!ENVIRONMENT_IS_SHELL, "shell environment detected but not enabled at build time.  Add 'shell' to `-s ENVIRONMENT` to enable.");




var STACK_ALIGN = 16;
var POINTER_SIZE = 4;

function getNativeTypeSize(type) {
  switch (type) {
    case 'i1': case 'i8': return 1;
    case 'i16': return 2;
    case 'i32': return 4;
    case 'i64': return 8;
    case 'float': return 4;
    case 'double': return 8;
    default: {
      if (type[type.length - 1] === '*') {
        return POINTER_SIZE;
      } else if (type[0] === 'i') {
        const bits = Number(type.substr(1));
        assert(bits % 8 === 0, 'getNativeTypeSize invalid bits ' + bits + ', type ' + type);
        return bits / 8;
      } else {
        return 0;
      }
    }
  }
}

function warnOnce(text) {
  if (!warnOnce.shown) warnOnce.shown = {};
  if (!warnOnce.shown[text]) {
    warnOnce.shown[text] = 1;
    err(text);
  }
}

// include: runtime_functions.js


// Wraps a JS function as a wasm function with a given signature.
function convertJsFunctionToWasm(func, sig) {

  // If the type reflection proposal is available, use the new
  // "WebAssembly.Function" constructor.
  // Otherwise, construct a minimal wasm module importing the JS function and
  // re-exporting it.
  if (typeof WebAssembly.Function == "function") {
    var typeNames = {
      'i': 'i32',
      'j': 'i64',
      'f': 'f32',
      'd': 'f64'
    };
    var type = {
      parameters: [],
      results: sig[0] == 'v' ? [] : [typeNames[sig[0]]]
    };
    for (var i = 1; i < sig.length; ++i) {
      type.parameters.push(typeNames[sig[i]]);
    }
    return new WebAssembly.Function(type, func);
  }

  // The module is static, with the exception of the type section, which is
  // generated based on the signature passed in.
  var typeSection = [
    0x01, // id: section,
    0x00, // length: 0 (placeholder)
    0x01, // count: 1
    0x60, // form: func
  ];
  var sigRet = sig.slice(0, 1);
  var sigParam = sig.slice(1);
  var typeCodes = {
    'i': 0x7f, // i32
    'j': 0x7e, // i64
    'f': 0x7d, // f32
    'd': 0x7c, // f64
  };

  // Parameters, length + signatures
  typeSection.push(sigParam.length);
  for (var i = 0; i < sigParam.length; ++i) {
    typeSection.push(typeCodes[sigParam[i]]);
  }

  // Return values, length + signatures
  // With no multi-return in MVP, either 0 (void) or 1 (anything else)
  if (sigRet == 'v') {
    typeSection.push(0x00);
  } else {
    typeSection = typeSection.concat([0x01, typeCodes[sigRet]]);
  }

  // Write the overall length of the type section back into the section header
  // (excepting the 2 bytes for the section id and length)
  typeSection[1] = typeSection.length - 2;

  // Rest of the module is static
  var bytes = new Uint8Array([
    0x00, 0x61, 0x73, 0x6d, // magic ("\0asm")
    0x01, 0x00, 0x00, 0x00, // version: 1
  ].concat(typeSection, [
    0x02, 0x07, // import section
      // (import "e" "f" (func 0 (type 0)))
      0x01, 0x01, 0x65, 0x01, 0x66, 0x00, 0x00,
    0x07, 0x05, // export section
      // (export "f" (func 0 (type 0)))
      0x01, 0x01, 0x66, 0x00, 0x00,
  ]));

   // We can compile this wasm module synchronously because it is very small.
  // This accepts an import (at "e.f"), that it reroutes to an export (at "f")
  var module = new WebAssembly.Module(bytes);
  var instance = new WebAssembly.Instance(module, {
    'e': {
      'f': func
    }
  });
  var wrappedFunc = instance.exports['f'];
  return wrappedFunc;
}

var freeTableIndexes = [];

// Weak map of functions in the table to their indexes, created on first use.
var functionsInTableMap;

function getEmptyTableSlot() {
  // Reuse a free index if there is one, otherwise grow.
  if (freeTableIndexes.length) {
    return freeTableIndexes.pop();
  }
  // Grow the table
  try {
    wasmTable.grow(1);
  } catch (err) {
    if (!(err instanceof RangeError)) {
      throw err;
    }
    throw 'Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.';
  }
  return wasmTable.length - 1;
}

function updateTableMap(offset, count) {
  for (var i = offset; i < offset + count; i++) {
    var item = getWasmTableEntry(i);
    // Ignore null values.
    if (item) {
      functionsInTableMap.set(item, i);
    }
  }
}

/**
 * Add a function to the table.
 * 'sig' parameter is required if the function being added is a JS function.
 * @param {string=} sig
 */
function addFunction(func, sig) {
  assert(typeof func != 'undefined');

  // Check if the function is already in the table, to ensure each function
  // gets a unique index. First, create the map if this is the first use.
  if (!functionsInTableMap) {
    functionsInTableMap = new WeakMap();
    updateTableMap(0, wasmTable.length);
  }
  if (functionsInTableMap.has(func)) {
    return functionsInTableMap.get(func);
  }

  // It's not in the table, add it now.

  var ret = getEmptyTableSlot();

  // Set the new value.
  try {
    // Attempting to call this with JS function will cause of table.set() to fail
    setWasmTableEntry(ret, func);
  } catch (err) {
    if (!(err instanceof TypeError)) {
      throw err;
    }
    assert(typeof sig != 'undefined', 'Missing signature argument to addFunction: ' + func);
    var wrapped = convertJsFunctionToWasm(func, sig);
    setWasmTableEntry(ret, wrapped);
  }

  functionsInTableMap.set(func, ret);

  return ret;
}

function removeFunction(index) {
  functionsInTableMap.delete(getWasmTableEntry(index));
  freeTableIndexes.push(index);
}

// end include: runtime_functions.js
// include: runtime_debug.js


function legacyModuleProp(prop, newName) {
  if (!Object.getOwnPropertyDescriptor(Module, prop)) {
    Object.defineProperty(Module, prop, {
      configurable: true,
      get: function() {
        abort('Module.' + prop + ' has been replaced with plain ' + newName + ' (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)');
      }
    });
  }
}

function ignoredModuleProp(prop) {
  if (Object.getOwnPropertyDescriptor(Module, prop)) {
    abort('`Module.' + prop + '` was supplied but `' + prop + '` not included in INCOMING_MODULE_JS_API');
  }
}

function unexportedMessage(sym, isFSSybol) {
  var msg = "'" + sym + "' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)";
  if (isFSSybol) {
    msg += '. Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you';
  }
  return msg;
}

function unexportedRuntimeSymbol(sym, isFSSybol) {
  if (!Object.getOwnPropertyDescriptor(Module, sym)) {
    Object.defineProperty(Module, sym, {
      configurable: true,
      get: function() {
        abort(unexportedMessage(sym, isFSSybol));
      }
    });
  }
}

function unexportedRuntimeFunction(sym, isFSSybol) {
  if (!Object.getOwnPropertyDescriptor(Module, sym)) {
    Module[sym] = () => abort(unexportedMessage(sym, isFSSybol));
  }
}

// end include: runtime_debug.js
var tempRet0 = 0;
var setTempRet0 = (value) => { tempRet0 = value; };
var getTempRet0 = () => tempRet0;



// === Preamble library stuff ===

// Documentation for the public APIs defined in this file must be updated in:
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at:
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html

var wasmBinary;
if (Module['wasmBinary']) wasmBinary = Module['wasmBinary'];legacyModuleProp('wasmBinary', 'wasmBinary');
var noExitRuntime = Module['noExitRuntime'] || false;legacyModuleProp('noExitRuntime', 'noExitRuntime');

if (typeof WebAssembly != 'object') {
  abort('no native wasm support detected');
}

// include: runtime_safe_heap.js


// In MINIMAL_RUNTIME, setValue() and getValue() are only available when building with safe heap enabled, for heap safety checking.
// In traditional runtime, setValue() and getValue() are always available (although their use is highly discouraged due to perf penalties)

/** @param {number} ptr
    @param {number} value
    @param {string} type
    @param {number|boolean=} noSafe */
function setValue(ptr, value, type = 'i8', noSafe) {
  if (type.charAt(type.length-1) === '*') type = 'i32';
    switch (type) {
      case 'i1': HEAP8[((ptr)>>0)] = value; break;
      case 'i8': HEAP8[((ptr)>>0)] = value; break;
      case 'i16': HEAP16[((ptr)>>1)] = value; break;
      case 'i32': HEAP32[((ptr)>>2)] = value; break;
      case 'i64': (tempI64 = [value>>>0,(tempDouble=value,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math.min((+(Math.floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[((ptr)>>2)] = tempI64[0],HEAP32[(((ptr)+(4))>>2)] = tempI64[1]); break;
      case 'float': HEAPF32[((ptr)>>2)] = value; break;
      case 'double': HEAPF64[((ptr)>>3)] = value; break;
      default: abort('invalid type for setValue: ' + type);
    }
}

/** @param {number} ptr
    @param {string} type
    @param {number|boolean=} noSafe */
function getValue(ptr, type = 'i8', noSafe) {
  if (type.charAt(type.length-1) === '*') type = 'i32';
    switch (type) {
      case 'i1': return HEAP8[((ptr)>>0)];
      case 'i8': return HEAP8[((ptr)>>0)];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP32[((ptr)>>2)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return Number(HEAPF64[((ptr)>>3)]);
      default: abort('invalid type for getValue: ' + type);
    }
  return null;
}

// end include: runtime_safe_heap.js
// Wasm globals

var wasmMemory;

//========================================
// Runtime essentials
//========================================

// whether we are quitting the application. no code should run after this.
// set in exit() and abort()
var ABORT = false;

// set by exit() and abort().  Passed to 'onExit' handler.
// NOTE: This is also used as the process return code code in shell environments
// but only when noExitRuntime is false.
var EXITSTATUS;

/** @type {function(*, string=)} */
function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed' + (text ? ': ' + text : ''));
  }
}

// Returns the C function with a specified identifier (for C++, you need to do manual name mangling)
function getCFunc(ident) {
  var func = Module['_' + ident]; // closure exported function
  assert(func, 'Cannot call unknown function ' + ident + ', make sure it is exported');
  return func;
}

// C calling interface.
/** @param {string|null=} returnType
    @param {Array=} argTypes
    @param {Arguments|Array=} args
    @param {Object=} opts */
function ccall(ident, returnType, argTypes, args, opts) {
  // For fast lookup of conversion functions
  var toC = {
    'string': function(str) {
      var ret = 0;
      if (str !== null && str !== undefined && str !== 0) { // null string
        // at most 4 bytes per UTF-8 code point, +1 for the trailing '\0'
        var len = (str.length << 2) + 1;
        ret = stackAlloc(len);
        stringToUTF8(str, ret, len);
      }
      return ret;
    },
    'array': function(arr) {
      var ret = stackAlloc(arr.length);
      writeArrayToMemory(arr, ret);
      return ret;
    }
  };

  function convertReturnValue(ret) {
    if (returnType === 'string') return UTF8ToString(ret);
    if (returnType === 'boolean') return Boolean(ret);
    return ret;
  }

  var func = getCFunc(ident);
  var cArgs = [];
  var stack = 0;
  assert(returnType !== 'array', 'Return type should not be "array".');
  if (args) {
    for (var i = 0; i < args.length; i++) {
      var converter = toC[argTypes[i]];
      if (converter) {
        if (stack === 0) stack = stackSave();
        cArgs[i] = converter(args[i]);
      } else {
        cArgs[i] = args[i];
      }
    }
  }
  var ret = func.apply(null, cArgs);
  function onDone(ret) {
    if (stack !== 0) stackRestore(stack);
    return convertReturnValue(ret);
  }

  ret = onDone(ret);
  return ret;
}

/** @param {string=} returnType
    @param {Array=} argTypes
    @param {Object=} opts */
function cwrap(ident, returnType, argTypes, opts) {
  return function() {
    return ccall(ident, returnType, argTypes, arguments, opts);
  }
}

// We used to include malloc/free by default in the past. Show a helpful error in
// builds with assertions.

// include: runtime_legacy.js


var ALLOC_NORMAL = 0; // Tries to use _malloc()
var ALLOC_STACK = 1; // Lives for the duration of the current function call

/**
 * allocate(): This function is no longer used by emscripten but is kept around to avoid
 *             breaking external users.
 *             You should normally not use allocate(), and instead allocate
 *             memory using _malloc()/stackAlloc(), initialize it with
 *             setValue(), and so forth.
 * @param {(Uint8Array|Array<number>)} slab: An array of data.
 * @param {number=} allocator : How to allocate memory, see ALLOC_*
 */
function allocate(slab, allocator) {
  var ret;
  assert(typeof allocator == 'number', 'allocate no longer takes a type argument')
  assert(typeof slab != 'number', 'allocate no longer takes a number as arg0')

  if (allocator == ALLOC_STACK) {
    ret = stackAlloc(slab.length);
  } else {
    ret = _malloc(slab.length);
  }

  if (!slab.subarray && !slab.slice) {
    slab = new Uint8Array(slab);
  }
  HEAPU8.set(slab, ret);
  return ret;
}

// end include: runtime_legacy.js
// include: runtime_strings.js


// runtime_strings.js: Strings related runtime functions that are part of both MINIMAL_RUNTIME and regular runtime.

// Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the given array that contains uint8 values, returns
// a copy of that string as a Javascript String object.

var UTF8Decoder = typeof TextDecoder != 'undefined' ? new TextDecoder('utf8') : undefined;

/**
 * @param {number} idx
 * @param {number=} maxBytesToRead
 * @return {string}
 */
function UTF8ArrayToString(heap, idx, maxBytesToRead) {
  var endIdx = idx + maxBytesToRead;
  var endPtr = idx;
  // TextDecoder needs to know the byte length in advance, it doesn't stop on null terminator by itself.
  // Also, use the length info to avoid running tiny strings through TextDecoder, since .subarray() allocates garbage.
  // (As a tiny code save trick, compare endPtr against endIdx using a negation, so that undefined means Infinity)
  while (heap[endPtr] && !(endPtr >= endIdx)) ++endPtr;

  if (endPtr - idx > 16 && heap.subarray && UTF8Decoder) {
    return UTF8Decoder.decode(heap.subarray(idx, endPtr));
  } else {
    var str = '';
    // If building with TextDecoder, we have already computed the string length above, so test loop end condition against that
    while (idx < endPtr) {
      // For UTF8 byte structure, see:
      // http://en.wikipedia.org/wiki/UTF-8#Description
      // https://www.ietf.org/rfc/rfc2279.txt
      // https://tools.ietf.org/html/rfc3629
      var u0 = heap[idx++];
      if (!(u0 & 0x80)) { str += String.fromCharCode(u0); continue; }
      var u1 = heap[idx++] & 63;
      if ((u0 & 0xE0) == 0xC0) { str += String.fromCharCode(((u0 & 31) << 6) | u1); continue; }
      var u2 = heap[idx++] & 63;
      if ((u0 & 0xF0) == 0xE0) {
        u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
      } else {
        if ((u0 & 0xF8) != 0xF0) warnOnce('Invalid UTF-8 leading byte 0x' + u0.toString(16) + ' encountered when deserializing a UTF-8 string in wasm memory to a JS string!');
        u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heap[idx++] & 63);
      }

      if (u0 < 0x10000) {
        str += String.fromCharCode(u0);
      } else {
        var ch = u0 - 0x10000;
        str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
      }
    }
  }
  return str;
}

// Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the emscripten HEAP, returns a
// copy of that string as a Javascript String object.
// maxBytesToRead: an optional length that specifies the maximum number of bytes to read. You can omit
//                 this parameter to scan the string until the first \0 byte. If maxBytesToRead is
//                 passed, and the string at [ptr, ptr+maxBytesToReadr[ contains a null byte in the
//                 middle, then the string will cut short at that byte index (i.e. maxBytesToRead will
//                 not produce a string of exact length [ptr, ptr+maxBytesToRead[)
//                 N.B. mixing frequent uses of UTF8ToString() with and without maxBytesToRead may
//                 throw JS JIT optimizations off, so it is worth to consider consistently using one
//                 style or the other.
/**
 * @param {number} ptr
 * @param {number=} maxBytesToRead
 * @return {string}
 */
function UTF8ToString(ptr, maxBytesToRead) {
  ;
  return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : '';
}

// Copies the given Javascript String object 'str' to the given byte array at address 'outIdx',
// encoded in UTF8 form and null-terminated. The copy will require at most str.length*4+1 bytes of space in the HEAP.
// Use the function lengthBytesUTF8 to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   heap: the array to copy to. Each index in this array is assumed to be one 8-byte element.
//   outIdx: The starting offset in the array to begin the copying.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array.
//                    This count should include the null terminator,
//                    i.e. if maxBytesToWrite=1, only the null terminator will be written and nothing else.
//                    maxBytesToWrite=0 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
  if (!(maxBytesToWrite > 0)) // Parameter maxBytesToWrite is not optional. Negative values, 0, null, undefined and false each don't write out any bytes.
    return 0;

  var startIdx = outIdx;
  var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description and https://www.ietf.org/rfc/rfc2279.txt and https://tools.ietf.org/html/rfc3629
    var u = str.charCodeAt(i); // possibly a lead surrogate
    if (u >= 0xD800 && u <= 0xDFFF) {
      var u1 = str.charCodeAt(++i);
      u = 0x10000 + ((u & 0x3FF) << 10) | (u1 & 0x3FF);
    }
    if (u <= 0x7F) {
      if (outIdx >= endIdx) break;
      heap[outIdx++] = u;
    } else if (u <= 0x7FF) {
      if (outIdx + 1 >= endIdx) break;
      heap[outIdx++] = 0xC0 | (u >> 6);
      heap[outIdx++] = 0x80 | (u & 63);
    } else if (u <= 0xFFFF) {
      if (outIdx + 2 >= endIdx) break;
      heap[outIdx++] = 0xE0 | (u >> 12);
      heap[outIdx++] = 0x80 | ((u >> 6) & 63);
      heap[outIdx++] = 0x80 | (u & 63);
    } else {
      if (outIdx + 3 >= endIdx) break;
      if (u > 0x10FFFF) warnOnce('Invalid Unicode code point 0x' + u.toString(16) + ' encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).');
      heap[outIdx++] = 0xF0 | (u >> 18);
      heap[outIdx++] = 0x80 | ((u >> 12) & 63);
      heap[outIdx++] = 0x80 | ((u >> 6) & 63);
      heap[outIdx++] = 0x80 | (u & 63);
    }
  }
  // Null-terminate the pointer to the buffer.
  heap[outIdx] = 0;
  return outIdx - startIdx;
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF8 form. The copy will require at most str.length*4+1 bytes of space in the HEAP.
// Use the function lengthBytesUTF8 to compute the exact number of bytes (excluding null terminator) that this function will write.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF8(str, outPtr, maxBytesToWrite) {
  assert(typeof maxBytesToWrite == 'number', 'stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
  return stringToUTF8Array(str, HEAPU8,outPtr, maxBytesToWrite);
}

// Returns the number of bytes the given Javascript string takes if encoded as a UTF8 byte array, EXCLUDING the null terminator byte.
function lengthBytesUTF8(str) {
  var len = 0;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var u = str.charCodeAt(i); // possibly a lead surrogate
    if (u >= 0xD800 && u <= 0xDFFF) u = 0x10000 + ((u & 0x3FF) << 10) | (str.charCodeAt(++i) & 0x3FF);
    if (u <= 0x7F) ++len;
    else if (u <= 0x7FF) len += 2;
    else if (u <= 0xFFFF) len += 3;
    else len += 4;
  }
  return len;
}

// end include: runtime_strings.js
// include: runtime_strings_extra.js


// runtime_strings_extra.js: Strings related runtime functions that are available only in regular runtime.

// Given a pointer 'ptr' to a null-terminated ASCII-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.

function AsciiToString(ptr) {
  var str = '';
  while (1) {
    var ch = HEAPU8[((ptr++)>>0)];
    if (!ch) return str;
    str += String.fromCharCode(ch);
  }
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in ASCII form. The copy will require at most str.length+1 bytes of space in the HEAP.

function stringToAscii(str, outPtr) {
  return writeAsciiToMemory(str, outPtr, false);
}

// Given a pointer 'ptr' to a null-terminated UTF16LE-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.

var UTF16Decoder = typeof TextDecoder != 'undefined' ? new TextDecoder('utf-16le') : undefined;

function UTF16ToString(ptr, maxBytesToRead) {
  assert(ptr % 2 == 0, 'Pointer passed to UTF16ToString must be aligned to two bytes!');
  var endPtr = ptr;
  // TextDecoder needs to know the byte length in advance, it doesn't stop on null terminator by itself.
  // Also, use the length info to avoid running tiny strings through TextDecoder, since .subarray() allocates garbage.
  var idx = endPtr >> 1;
  var maxIdx = idx + maxBytesToRead / 2;
  // If maxBytesToRead is not passed explicitly, it will be undefined, and this
  // will always evaluate to true. This saves on code size.
  while (!(idx >= maxIdx) && HEAPU16[idx]) ++idx;
  endPtr = idx << 1;

  if (endPtr - ptr > 32 && UTF16Decoder) {
    return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));
  } else {
    var str = '';

    // If maxBytesToRead is not passed explicitly, it will be undefined, and the for-loop's condition
    // will always evaluate to true. The loop is then terminated on the first null char.
    for (var i = 0; !(i >= maxBytesToRead / 2); ++i) {
      var codeUnit = HEAP16[(((ptr)+(i*2))>>1)];
      if (codeUnit == 0) break;
      // fromCharCode constructs a character from a UTF-16 code unit, so we can pass the UTF16 string right through.
      str += String.fromCharCode(codeUnit);
    }

    return str;
  }
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF16 form. The copy will require at most str.length*4+2 bytes of space in the HEAP.
// Use the function lengthBytesUTF16() to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   outPtr: Byte address in Emscripten HEAP where to write the string to.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null
//                    terminator, i.e. if maxBytesToWrite=2, only the null terminator will be written and nothing else.
//                    maxBytesToWrite<2 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF16(str, outPtr, maxBytesToWrite) {
  assert(outPtr % 2 == 0, 'Pointer passed to stringToUTF16 must be aligned to two bytes!');
  assert(typeof maxBytesToWrite == 'number', 'stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
  // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
  if (maxBytesToWrite === undefined) {
    maxBytesToWrite = 0x7FFFFFFF;
  }
  if (maxBytesToWrite < 2) return 0;
  maxBytesToWrite -= 2; // Null terminator.
  var startPtr = outPtr;
  var numCharsToWrite = (maxBytesToWrite < str.length*2) ? (maxBytesToWrite / 2) : str.length;
  for (var i = 0; i < numCharsToWrite; ++i) {
    // charCodeAt returns a UTF-16 encoded code unit, so it can be directly written to the HEAP.
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    HEAP16[((outPtr)>>1)] = codeUnit;
    outPtr += 2;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP16[((outPtr)>>1)] = 0;
  return outPtr - startPtr;
}

// Returns the number of bytes the given Javascript string takes if encoded as a UTF16 byte array, EXCLUDING the null terminator byte.

function lengthBytesUTF16(str) {
  return str.length*2;
}

function UTF32ToString(ptr, maxBytesToRead) {
  assert(ptr % 4 == 0, 'Pointer passed to UTF32ToString must be aligned to four bytes!');
  var i = 0;

  var str = '';
  // If maxBytesToRead is not passed explicitly, it will be undefined, and this
  // will always evaluate to true. This saves on code size.
  while (!(i >= maxBytesToRead / 4)) {
    var utf32 = HEAP32[(((ptr)+(i*4))>>2)];
    if (utf32 == 0) break;
    ++i;
    // Gotcha: fromCharCode constructs a character from a UTF-16 encoded code (pair), not from a Unicode code point! So encode the code point to UTF-16 for constructing.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    if (utf32 >= 0x10000) {
      var ch = utf32 - 0x10000;
      str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
    } else {
      str += String.fromCharCode(utf32);
    }
  }
  return str;
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF32 form. The copy will require at most str.length*4+4 bytes of space in the HEAP.
// Use the function lengthBytesUTF32() to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   outPtr: Byte address in Emscripten HEAP where to write the string to.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null
//                    terminator, i.e. if maxBytesToWrite=4, only the null terminator will be written and nothing else.
//                    maxBytesToWrite<4 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF32(str, outPtr, maxBytesToWrite) {
  assert(outPtr % 4 == 0, 'Pointer passed to stringToUTF32 must be aligned to four bytes!');
  assert(typeof maxBytesToWrite == 'number', 'stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
  // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
  if (maxBytesToWrite === undefined) {
    maxBytesToWrite = 0x7FFFFFFF;
  }
  if (maxBytesToWrite < 4) return 0;
  var startPtr = outPtr;
  var endPtr = startPtr + maxBytesToWrite - 4;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) {
      var trailSurrogate = str.charCodeAt(++i);
      codeUnit = 0x10000 + ((codeUnit & 0x3FF) << 10) | (trailSurrogate & 0x3FF);
    }
    HEAP32[((outPtr)>>2)] = codeUnit;
    outPtr += 4;
    if (outPtr + 4 > endPtr) break;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP32[((outPtr)>>2)] = 0;
  return outPtr - startPtr;
}

// Returns the number of bytes the given Javascript string takes if encoded as a UTF16 byte array, EXCLUDING the null terminator byte.

function lengthBytesUTF32(str) {
  var len = 0;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var codeUnit = str.charCodeAt(i);
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) ++i; // possibly a lead surrogate, so skip over the tail surrogate.
    len += 4;
  }

  return len;
}

// Allocate heap space for a JS string, and write it there.
// It is the responsibility of the caller to free() that memory.
function allocateUTF8(str) {
  var size = lengthBytesUTF8(str) + 1;
  var ret = _malloc(size);
  if (ret) stringToUTF8Array(str, HEAP8, ret, size);
  return ret;
}

// Allocate stack space for a JS string, and write it there.
function allocateUTF8OnStack(str) {
  var size = lengthBytesUTF8(str) + 1;
  var ret = stackAlloc(size);
  stringToUTF8Array(str, HEAP8, ret, size);
  return ret;
}

// Deprecated: This function should not be called because it is unsafe and does not provide
// a maximum length limit of how many bytes it is allowed to write. Prefer calling the
// function stringToUTF8Array() instead, which takes in a maximum length that can be used
// to be secure from out of bounds writes.
/** @deprecated
    @param {boolean=} dontAddNull */
function writeStringToMemory(string, buffer, dontAddNull) {
  warnOnce('writeStringToMemory is deprecated and should not be called! Use stringToUTF8() instead!');

  var /** @type {number} */ lastChar, /** @type {number} */ end;
  if (dontAddNull) {
    // stringToUTF8Array always appends null. If we don't want to do that, remember the
    // character that existed at the location where the null will be placed, and restore
    // that after the write (below).
    end = buffer + lengthBytesUTF8(string);
    lastChar = HEAP8[end];
  }
  stringToUTF8(string, buffer, Infinity);
  if (dontAddNull) HEAP8[end] = lastChar; // Restore the value under the null character.
}

function writeArrayToMemory(array, buffer) {
  assert(array.length >= 0, 'writeArrayToMemory array must have a length (should be an array or typed array)')
  HEAP8.set(array, buffer);
}

/** @param {boolean=} dontAddNull */
function writeAsciiToMemory(str, buffer, dontAddNull) {
  for (var i = 0; i < str.length; ++i) {
    assert(str.charCodeAt(i) === (str.charCodeAt(i) & 0xff));
    HEAP8[((buffer++)>>0)] = str.charCodeAt(i);
  }
  // Null-terminate the pointer to the HEAP.
  if (!dontAddNull) HEAP8[((buffer)>>0)] = 0;
}

// end include: runtime_strings_extra.js
// Memory management

var HEAP,
/** @type {!ArrayBuffer} */
  buffer,
/** @type {!Int8Array} */
  HEAP8,
/** @type {!Uint8Array} */
  HEAPU8,
/** @type {!Int16Array} */
  HEAP16,
/** @type {!Uint16Array} */
  HEAPU16,
/** @type {!Int32Array} */
  HEAP32,
/** @type {!Uint32Array} */
  HEAPU32,
/** @type {!Float32Array} */
  HEAPF32,
/** @type {!Float64Array} */
  HEAPF64;

function updateGlobalBufferAndViews(buf) {
  buffer = buf;
  Module['HEAP8'] = HEAP8 = new Int8Array(buf);
  Module['HEAP16'] = HEAP16 = new Int16Array(buf);
  Module['HEAP32'] = HEAP32 = new Int32Array(buf);
  Module['HEAPU8'] = HEAPU8 = new Uint8Array(buf);
  Module['HEAPU16'] = HEAPU16 = new Uint16Array(buf);
  Module['HEAPU32'] = HEAPU32 = new Uint32Array(buf);
  Module['HEAPF32'] = HEAPF32 = new Float32Array(buf);
  Module['HEAPF64'] = HEAPF64 = new Float64Array(buf);
}

var TOTAL_STACK = 5242880;
if (Module['TOTAL_STACK']) assert(TOTAL_STACK === Module['TOTAL_STACK'], 'the stack size can no longer be determined at runtime')

var INITIAL_MEMORY = Module['INITIAL_MEMORY'] || 536870912;legacyModuleProp('INITIAL_MEMORY', 'INITIAL_MEMORY');

assert(INITIAL_MEMORY >= TOTAL_STACK, 'INITIAL_MEMORY should be larger than TOTAL_STACK, was ' + INITIAL_MEMORY + '! (TOTAL_STACK=' + TOTAL_STACK + ')');

// check for full engine support (use string 'subarray' to avoid closure compiler confusion)
assert(typeof Int32Array != 'undefined' && typeof Float64Array !== 'undefined' && Int32Array.prototype.subarray != undefined && Int32Array.prototype.set != undefined,
       'JS engine does not provide full typed array support');

// If memory is defined in wasm, the user can't provide it.
assert(!Module['wasmMemory'], 'Use of `wasmMemory` detected.  Use -s IMPORTED_MEMORY to define wasmMemory externally');
assert(INITIAL_MEMORY == 536870912, 'Detected runtime INITIAL_MEMORY setting.  Use -s IMPORTED_MEMORY to define wasmMemory dynamically');

// include: runtime_init_table.js
// In regular non-RELOCATABLE mode the table is exported
// from the wasm module and this will be assigned once
// the exports are available.
var wasmTable;

// end include: runtime_init_table.js
// include: runtime_stack_check.js


// Initializes the stack cookie. Called at the startup of main and at the startup of each thread in pthreads mode.
function writeStackCookie() {
  var max = _emscripten_stack_get_end();
  assert((max & 3) == 0);
  // The stack grows downwards
  HEAP32[((max + 4)>>2)] = 0x2135467;
  HEAP32[((max + 8)>>2)] = 0x89BACDFE;
  // Also test the global address 0 for integrity.
  HEAP32[0] = 0x63736d65; /* 'emsc' */
}

function checkStackCookie() {
  if (ABORT) return;
  var max = _emscripten_stack_get_end();
  var cookie1 = HEAPU32[((max + 4)>>2)];
  var cookie2 = HEAPU32[((max + 8)>>2)];
  if (cookie1 != 0x2135467 || cookie2 != 0x89BACDFE) {
    abort('Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x2135467, but received 0x' + cookie2.toString(16) + ' 0x' + cookie1.toString(16));
  }
  // Also test the global address 0 for integrity.
  if (HEAP32[0] !== 0x63736d65 /* 'emsc' */) abort('Runtime error: The application has corrupted its heap memory area (address zero)!');
}

// end include: runtime_stack_check.js
// include: runtime_assertions.js


// Endianness check
(function() {
  var h16 = new Int16Array(1);
  var h8 = new Int8Array(h16.buffer);
  h16[0] = 0x6373;
  if (h8[0] !== 0x73 || h8[1] !== 0x63) throw 'Runtime error: expected the system to be little-endian! (Run with -s SUPPORT_BIG_ENDIAN=1 to bypass)';
})();

// end include: runtime_assertions.js
var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATMAIN__    = []; // functions called when main() is to be run
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the main() is called

var runtimeInitialized = false;
var runtimeExited = false;
var runtimeKeepaliveCounter = 0;

function keepRuntimeAlive() {
  return noExitRuntime || runtimeKeepaliveCounter > 0;
}

function preRun() {

  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }

  callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
  checkStackCookie();
  assert(!runtimeInitialized);
  runtimeInitialized = true;

  
if (!Module["noFSInit"] && !FS.init.initialized)
  FS.init();
FS.ignorePermissions = false;

TTY.init();
  callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
  checkStackCookie();
  
  callRuntimeCallbacks(__ATMAIN__);
}

function exitRuntime() {
  checkStackCookie();
  ___funcs_on_exit(); // Native atexit() functions
  callRuntimeCallbacks(__ATEXIT__);
  FS.quit();
TTY.shutdown();
  runtimeExited = true;
}

function postRun() {
  checkStackCookie();

  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }

  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}

function addOnPreMain(cb) {
  __ATMAIN__.unshift(cb);
}

function addOnExit(cb) {
  __ATEXIT__.unshift(cb);
}

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}

// include: runtime_math.js


// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc

assert(Math.imul, 'This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.fround, 'This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.clz32, 'This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.trunc, 'This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');

// end include: runtime_math.js
// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// Module.preRun (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled
var runDependencyTracking = {};

function getUniqueRunDependency(id) {
  var orig = id;
  while (1) {
    if (!runDependencyTracking[id]) return id;
    id = orig + Math.random();
  }
}

function addRunDependency(id) {
  runDependencies++;

  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }

  if (id) {
    assert(!runDependencyTracking[id]);
    runDependencyTracking[id] = 1;
    if (runDependencyWatcher === null && typeof setInterval != 'undefined') {
      // Check for missing dependencies every few seconds
      runDependencyWatcher = setInterval(function() {
        if (ABORT) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
          return;
        }
        var shown = false;
        for (var dep in runDependencyTracking) {
          if (!shown) {
            shown = true;
            err('still waiting on run dependencies:');
          }
          err('dependency: ' + dep);
        }
        if (shown) {
          err('(end of list)');
        }
      }, 10000);
    }
  } else {
    err('warning: run dependency added without ID');
  }
}

function removeRunDependency(id) {
  runDependencies--;

  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }

  if (id) {
    assert(runDependencyTracking[id]);
    delete runDependencyTracking[id];
  } else {
    err('warning: run dependency removed without ID');
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}

Module["preloadedImages"] = {}; // maps url to image data
Module["preloadedAudios"] = {}; // maps url to audio data

/** @param {string|number=} what */
function abort(what) {
  {
    if (Module['onAbort']) {
      Module['onAbort'](what);
    }
  }

  what = 'Aborted(' + what + ')';
  // TODO(sbc): Should we remove printing and leave it up to whoever
  // catches the exception?
  err(what);

  ABORT = true;
  EXITSTATUS = 1;

  // Use a wasm runtime error, because a JS error might be seen as a foreign
  // exception, which means we'd run destructors on it. We need the error to
  // simply make the program stop.

  // Suppress closure compiler warning here. Closure compiler's builtin extern
  // defintion for WebAssembly.RuntimeError claims it takes no arguments even
  // though it can.
  // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure gets fixed.

  /** @suppress {checkTypes} */
  var e = new WebAssembly.RuntimeError(what);

  // Throw the error whether or not MODULARIZE is set because abort is used
  // in code paths apart from instantiation where an exception is expected
  // to be thrown when abort is called.
  throw e;
}

// {{MEM_INITIALIZER}}

// include: memoryprofiler.js


// end include: memoryprofiler.js
// include: URIUtils.js


// Prefix of data URIs emitted by SINGLE_FILE and related options.
var dataURIPrefix = 'data:application/octet-stream;base64,';

// Indicates whether filename is a base64 data URI.
function isDataURI(filename) {
  // Prefix of data URIs emitted by SINGLE_FILE and related options.
  return filename.startsWith(dataURIPrefix);
}

// Indicates whether filename is delivered via file protocol (as opposed to http/https)
function isFileURI(filename) {
  return filename.startsWith('file://');
}

// end include: URIUtils.js
/** @param {boolean=} fixedasm */
function createExportWrapper(name, fixedasm) {
  return function() {
    var displayName = name;
    var asm = fixedasm;
    if (!fixedasm) {
      asm = Module['asm'];
    }
    assert(runtimeInitialized, 'native function `' + displayName + '` called before runtime initialization');
    assert(!runtimeExited, 'native function `' + displayName + '` called after runtime exit (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    if (!asm[name]) {
      assert(asm[name], 'exported native function `' + displayName + '` not found');
    }
    return asm[name].apply(null, arguments);
  };
}

var wasmBinaryFile;
  wasmBinaryFile = 'MetalNes.wasm';
  if (!isDataURI(wasmBinaryFile)) {
    wasmBinaryFile = locateFile(wasmBinaryFile);
  }

function getBinary(file) {
  try {
    if (file == wasmBinaryFile && wasmBinary) {
      return new Uint8Array(wasmBinary);
    }
    if (readBinary) {
      return readBinary(file);
    } else {
      throw "both async and sync fetching of the wasm failed";
    }
  }
  catch (err) {
    abort(err);
  }
}

function getBinaryPromise() {
  // If we don't have the binary yet, try to to load it asynchronously.
  // Fetch has some additional restrictions over XHR, like it can't be used on a file:// url.
  // See https://github.com/github/fetch/pull/92#issuecomment-140665932
  // Cordova or Electron apps are typically loaded from a file:// url.
  // So use fetch if it is available and the url is not a file, otherwise fall back to XHR.
  if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
    if (typeof fetch == 'function'
      && !isFileURI(wasmBinaryFile)
    ) {
      return fetch(wasmBinaryFile, { credentials: 'same-origin' }).then(function(response) {
        if (!response['ok']) {
          throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
        }
        return response['arrayBuffer']();
      }).catch(function () {
          return getBinary(wasmBinaryFile);
      });
    }
    else {
      if (readAsync) {
        // fetch is not available or url is file => try XHR (readAsync uses XHR internally)
        return new Promise(function(resolve, reject) {
          readAsync(wasmBinaryFile, function(response) { resolve(new Uint8Array(/** @type{!ArrayBuffer} */(response))) }, reject)
        });
      }
    }
  }

  // Otherwise, getBinary should be able to get it synchronously
  return Promise.resolve().then(function() { return getBinary(wasmBinaryFile); });
}

// Create the wasm instance.
// Receives the wasm imports, returns the exports.
function createWasm() {
  // prepare imports
  var info = {
    'env': asmLibraryArg,
    'wasi_snapshot_preview1': asmLibraryArg,
  };
  // Load the wasm module and create an instance of using native support in the JS engine.
  // handle a generated wasm instance, receiving its exports and
  // performing other necessary setup
  /** @param {WebAssembly.Module=} module*/
  function receiveInstance(instance, module) {
    var exports = instance.exports;

    Module['asm'] = exports;

    wasmMemory = Module['asm']['memory'];
    assert(wasmMemory, "memory not found in wasm exports");
    // This assertion doesn't hold when emscripten is run in --post-link
    // mode.
    // TODO(sbc): Read INITIAL_MEMORY out of the wasm file in post-link mode.
    //assert(wasmMemory.buffer.byteLength === 536870912);
    updateGlobalBufferAndViews(wasmMemory.buffer);

    wasmTable = Module['asm']['__indirect_function_table'];
    assert(wasmTable, "table not found in wasm exports");

    addOnInit(Module['asm']['__wasm_call_ctors']);

    removeRunDependency('wasm-instantiate');
  }
  // we can't run yet (except in a pthread, where we have a custom sync instantiator)
  addRunDependency('wasm-instantiate');

  // Prefer streaming instantiation if available.
  // Async compilation can be confusing when an error on the page overwrites Module
  // (for example, if the order of elements is wrong, and the one defining Module is
  // later), so we save Module and check it later.
  var trueModule = Module;
  function receiveInstantiationResult(result) {
    // 'result' is a ResultObject object which has both the module and instance.
    // receiveInstance() will swap in the exports (to Module.asm) so they can be called
    assert(Module === trueModule, 'the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?');
    trueModule = null;
    // TODO: Due to Closure regression https://github.com/google/closure-compiler/issues/3193, the above line no longer optimizes out down to the following line.
    // When the regression is fixed, can restore the above USE_PTHREADS-enabled path.
    receiveInstance(result['instance']);
  }

  function instantiateArrayBuffer(receiver) {
    return getBinaryPromise().then(function(binary) {
      return WebAssembly.instantiate(binary, info);
    }).then(function (instance) {
      return instance;
    }).then(receiver, function(reason) {
      err('failed to asynchronously prepare wasm: ' + reason);

      // Warn on some common problems.
      if (isFileURI(wasmBinaryFile)) {
        err('warning: Loading from a file URI (' + wasmBinaryFile + ') is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing');
      }
      abort(reason);
    });
  }

  function instantiateAsync() {
    if (!wasmBinary &&
        typeof WebAssembly.instantiateStreaming == 'function' &&
        !isDataURI(wasmBinaryFile) &&
        // Don't use streaming for file:// delivered objects in a webview, fetch them synchronously.
        !isFileURI(wasmBinaryFile) &&
        typeof fetch == 'function') {
      return fetch(wasmBinaryFile, { credentials: 'same-origin' }).then(function(response) {
        // Suppress closure warning here since the upstream definition for
        // instantiateStreaming only allows Promise<Repsponse> rather than
        // an actual Response.
        // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure is fixed.
        /** @suppress {checkTypes} */
        var result = WebAssembly.instantiateStreaming(response, info);

        return result.then(
          receiveInstantiationResult,
          function(reason) {
            // We expect the most common failure cause to be a bad MIME type for the binary,
            // in which case falling back to ArrayBuffer instantiation should work.
            err('wasm streaming compile failed: ' + reason);
            err('falling back to ArrayBuffer instantiation');
            return instantiateArrayBuffer(receiveInstantiationResult);
          });
      });
    } else {
      return instantiateArrayBuffer(receiveInstantiationResult);
    }
  }

  // User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
  // to manually instantiate the Wasm module themselves. This allows pages to run the instantiation parallel
  // to any other async startup actions they are performing.
  if (Module['instantiateWasm']) {
    try {
      var exports = Module['instantiateWasm'](info, receiveInstance);
      return exports;
    } catch(e) {
      err('Module.instantiateWasm callback failed with error: ' + e);
      return false;
    }
  }

  instantiateAsync();
  return {}; // no exports yet; we'll fill them in later
}

// Globals used by JS i64 conversions (see makeSetValue)
var tempDouble;
var tempI64;

// === Body ===

var ASM_CONSTS = {
  
};






  function listenOnce(object, event, func) {
      object.addEventListener(event, func, { 'once': true });
    }
  /** @param {Object=} elements */
  function autoResumeAudioContext(ctx, elements) {
      if (!elements) {
        elements = [document, document.getElementById('canvas')];
      }
      ['keydown', 'mousedown', 'touchstart'].forEach(function(event) {
        elements.forEach(function(element) {
          if (element) {
            listenOnce(element, event, function() {
              if (ctx.state === 'suspended') ctx.resume();
            });
          }
        });
      });
    }

  function callRuntimeCallbacks(callbacks) {
      while (callbacks.length > 0) {
        var callback = callbacks.shift();
        if (typeof callback == 'function') {
          callback(Module); // Pass the module as the first argument.
          continue;
        }
        var func = callback.func;
        if (typeof func == 'number') {
          if (callback.arg === undefined) {
            getWasmTableEntry(func)();
          } else {
            getWasmTableEntry(func)(callback.arg);
          }
        } else {
          func(callback.arg === undefined ? null : callback.arg);
        }
      }
    }

  function withStackSave(f) {
      var stack = stackSave();
      var ret = f();
      stackRestore(stack);
      return ret;
    }
  function demangle(func) {
      // If demangle has failed before, stop demangling any further function names
      // This avoids an infinite recursion with malloc()->abort()->stackTrace()->demangle()->malloc()->...
      demangle.recursionGuard = (demangle.recursionGuard|0)+1;
      if (demangle.recursionGuard > 1) return func;
      var __cxa_demangle_func = Module['___cxa_demangle'] || Module['__cxa_demangle'];
      assert(__cxa_demangle_func);
      return withStackSave(function() {
        try {
          var s = func;
          if (s.startsWith('__Z'))
            s = s.substr(1);
          var len = lengthBytesUTF8(s)+1;
          var buf = stackAlloc(len);
          stringToUTF8(s, buf, len);
          var status = stackAlloc(4);
          var ret = __cxa_demangle_func(buf, 0, 0, status);
          if (HEAP32[((status)>>2)] === 0 && ret) {
            return UTF8ToString(ret);
          }
          // otherwise, libcxxabi failed
        } catch(e) {
        } finally {
          _free(ret);
          if (demangle.recursionGuard < 2) --demangle.recursionGuard;
        }
        // failure when using libcxxabi, don't demangle
        return func;
      });
    }

  function demangleAll(text) {
      var regex =
        /\b_Z[\w\d_]+/g;
      return text.replace(regex,
        function(x) {
          var y = demangle(x);
          return x === y ? x : (y + ' [' + x + ']');
        });
    }

  function dynCallLegacy(sig, ptr, args) {
      assert(('dynCall_' + sig) in Module, 'bad function pointer type - no table for sig \'' + sig + '\'');
      if (args && args.length) {
        // j (64-bit integer) must be passed in as two numbers [low 32, high 32].
        assert(args.length === sig.substring(1).replace(/j/g, '--').length);
      } else {
        assert(sig.length == 1);
      }
      var f = Module["dynCall_" + sig];
      return args && args.length ? f.apply(null, [ptr].concat(args)) : f.call(null, ptr);
    }
  
  var wasmTableMirror = [];
  function getWasmTableEntry(funcPtr) {
      var func = wasmTableMirror[funcPtr];
      if (!func) {
        if (funcPtr >= wasmTableMirror.length) wasmTableMirror.length = funcPtr + 1;
        wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
      }
      assert(wasmTable.get(funcPtr) == func, "JavaScript-side Wasm function table mirror is out of date!");
      return func;
    }
  /** @param {Object=} args */
  function dynCall(sig, ptr, args) {
      // Without WASM_BIGINT support we cannot directly call function with i64 as
      // part of thier signature, so we rely the dynCall functions generated by
      // wasm-emscripten-finalize
      if (sig.includes('j')) {
        return dynCallLegacy(sig, ptr, args);
      }
      assert(getWasmTableEntry(ptr), 'missing table entry in dynCall: ' + ptr);
      return getWasmTableEntry(ptr).apply(null, args)
    }


  function handleException(e) {
      // Certain exception types we do not treat as errors since they are used for
      // internal control flow.
      // 1. ExitStatus, which is thrown by exit()
      // 2. "unwind", which is thrown by emscripten_unwind_to_js_event_loop() and others
      //    that wish to return to JS event loop.
      if (e instanceof ExitStatus || e == 'unwind') {
        return EXITSTATUS;
      }
      quit_(1, e);
    }

  function jsStackTrace() {
      var error = new Error();
      if (!error.stack) {
        // IE10+ special cases: It does have callstack info, but it is only populated if an Error object is thrown,
        // so try that as a special-case.
        try {
          throw new Error();
        } catch(e) {
          error = e;
        }
        if (!error.stack) {
          return '(no stack trace available)';
        }
      }
      return error.stack.toString();
    }

  function setWasmTableEntry(idx, func) {
      wasmTable.set(idx, func);
      wasmTableMirror[idx] = func;
    }

  function stackTrace() {
      var js = jsStackTrace();
      if (Module['extraStackTrace']) js += '\n' + Module['extraStackTrace']();
      return demangleAll(js);
    }

  function ___cxa_allocate_exception(size) {
      // Thrown object is prepended by exception metadata block
      return _malloc(size + 16) + 16;
    }

  /** @constructor */
  function ExceptionInfo(excPtr) {
      this.excPtr = excPtr;
      this.ptr = excPtr - 16;
  
      this.set_type = function(type) {
        HEAP32[(((this.ptr)+(4))>>2)] = type;
      };
  
      this.get_type = function() {
        return HEAP32[(((this.ptr)+(4))>>2)];
      };
  
      this.set_destructor = function(destructor) {
        HEAP32[(((this.ptr)+(8))>>2)] = destructor;
      };
  
      this.get_destructor = function() {
        return HEAP32[(((this.ptr)+(8))>>2)];
      };
  
      this.set_refcount = function(refcount) {
        HEAP32[((this.ptr)>>2)] = refcount;
      };
  
      this.set_caught = function (caught) {
        caught = caught ? 1 : 0;
        HEAP8[(((this.ptr)+(12))>>0)] = caught;
      };
  
      this.get_caught = function () {
        return HEAP8[(((this.ptr)+(12))>>0)] != 0;
      };
  
      this.set_rethrown = function (rethrown) {
        rethrown = rethrown ? 1 : 0;
        HEAP8[(((this.ptr)+(13))>>0)] = rethrown;
      };
  
      this.get_rethrown = function () {
        return HEAP8[(((this.ptr)+(13))>>0)] != 0;
      };
  
      // Initialize native structure fields. Should be called once after allocated.
      this.init = function(type, destructor) {
        this.set_type(type);
        this.set_destructor(destructor);
        this.set_refcount(0);
        this.set_caught(false);
        this.set_rethrown(false);
      }
  
      this.add_ref = function() {
        var value = HEAP32[((this.ptr)>>2)];
        HEAP32[((this.ptr)>>2)] = value + 1;
      };
  
      // Returns true if last reference released.
      this.release_ref = function() {
        var prev = HEAP32[((this.ptr)>>2)];
        HEAP32[((this.ptr)>>2)] = prev - 1;
        assert(prev > 0);
        return prev === 1;
      };
    }
  
  var exceptionLast = 0;
  
  var uncaughtExceptionCount = 0;
  function ___cxa_throw(ptr, type, destructor) {
      var info = new ExceptionInfo(ptr);
      // Initialize ExceptionInfo content after it was allocated in __cxa_allocate_exception.
      info.init(type, destructor);
      exceptionLast = ptr;
      uncaughtExceptionCount++;
      throw ptr + " - Exception catching is disabled, this exception cannot be caught. Compile with -s NO_DISABLE_EXCEPTION_CATCHING or -s EXCEPTION_CATCHING_ALLOWED=[..] to catch.";
    }

  function setErrNo(value) {
      HEAP32[((___errno_location())>>2)] = value;
      return value;
    }
  
  var PATH = {splitPath:function(filename) {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },normalizeArray:function(parts, allowAboveRoot) {
        // if the path tries to go above the root, `up` ends up > 0
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === '.') {
            parts.splice(i, 1);
          } else if (last === '..') {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        // if the path is allowed to go above the root, restore leading ..s
        if (allowAboveRoot) {
          for (; up; up--) {
            parts.unshift('..');
          }
        }
        return parts;
      },normalize:function(path) {
        var isAbsolute = path.charAt(0) === '/',
            trailingSlash = path.substr(-1) === '/';
        // Normalize the path
        path = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), !isAbsolute).join('/');
        if (!path && !isAbsolute) {
          path = '.';
        }
        if (path && trailingSlash) {
          path += '/';
        }
        return (isAbsolute ? '/' : '') + path;
      },dirname:function(path) {
        var result = PATH.splitPath(path),
            root = result[0],
            dir = result[1];
        if (!root && !dir) {
          // No dirname whatsoever
          return '.';
        }
        if (dir) {
          // It has a dirname, strip trailing slash
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      },basename:function(path) {
        // EMSCRIPTEN return '/'' for '/', not an empty string
        if (path === '/') return '/';
        path = PATH.normalize(path);
        path = path.replace(/\/$/, "");
        var lastSlash = path.lastIndexOf('/');
        if (lastSlash === -1) return path;
        return path.substr(lastSlash+1);
      },extname:function(path) {
        return PATH.splitPath(path)[3];
      },join:function() {
        var paths = Array.prototype.slice.call(arguments, 0);
        return PATH.normalize(paths.join('/'));
      },join2:function(l, r) {
        return PATH.normalize(l + '/' + r);
      }};
  
  function getRandomDevice() {
      if (typeof crypto == 'object' && typeof crypto['getRandomValues'] == 'function') {
        // for modern web browsers
        var randomBuffer = new Uint8Array(1);
        return function() { crypto.getRandomValues(randomBuffer); return randomBuffer[0]; };
      } else
      if (ENVIRONMENT_IS_NODE) {
        // for nodejs with or without crypto support included
        try {
          var crypto_module = require('crypto');
          // nodejs has crypto support
          return function() { return crypto_module['randomBytes'](1)[0]; };
        } catch (e) {
          // nodejs doesn't have crypto support
        }
      }
      // we couldn't find a proper implementation, as Math.random() is not suitable for /dev/random, see emscripten-core/emscripten/pull/7096
      return function() { abort("no cryptographic support found for randomDevice. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: function(array) { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };"); };
    }
  
  var PATH_FS = {resolve:function() {
        var resolvedPath = '',
          resolvedAbsolute = false;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = (i >= 0) ? arguments[i] : FS.cwd();
          // Skip empty and invalid entries
          if (typeof path != 'string') {
            throw new TypeError('Arguments to path.resolve must be strings');
          } else if (!path) {
            return ''; // an invalid portion invalidates the whole thing
          }
          resolvedPath = path + '/' + resolvedPath;
          resolvedAbsolute = path.charAt(0) === '/';
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        resolvedPath = PATH.normalizeArray(resolvedPath.split('/').filter(function(p) {
          return !!p;
        }), !resolvedAbsolute).join('/');
        return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
      },relative:function(from, to) {
        from = PATH_FS.resolve(from).substr(1);
        to = PATH_FS.resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== '') break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== '') break;
          }
          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split('/'));
        var toParts = trim(to.split('/'));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push('..');
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join('/');
      }};
  
  var TTY = {ttys:[],init:function () {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // currently, FS.init does not distinguish if process.stdin is a file or TTY
        //   // device, it always assumes it's a TTY device. because of this, we're forcing
        //   // process.stdin to UTF8 encoding to at least make stdin reading compatible
        //   // with text files until FS.init can be refactored.
        //   process['stdin']['setEncoding']('utf8');
        // }
      },shutdown:function() {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // inolen: any idea as to why node -e 'process.stdin.read()' wouldn't exit immediately (with process.stdin being a tty)?
        //   // isaacs: because now it's reading from the stream, you've expressed interest in it, so that read() kicks off a _read() which creates a ReadReq operation
        //   // inolen: I thought read() in that case was a synchronous operation that just grabbed some amount of buffered data if it exists?
        //   // isaacs: it is. but it also triggers a _read() call, which calls readStart() on the handle
        //   // isaacs: do process.stdin.pause() and i'd think it'd probably close the pending call
        //   process['stdin']['pause']();
        // }
      },register:function(dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops: ops };
        FS.registerDevice(dev, TTY.stream_ops);
      },stream_ops:{open:function(stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(43);
          }
          stream.tty = tty;
          stream.seekable = false;
        },close:function(stream) {
          // flush any pending line data
          stream.tty.ops.flush(stream.tty);
        },flush:function(stream) {
          stream.tty.ops.flush(stream.tty);
        },read:function(stream, buffer, offset, length, pos /* ignored */) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(60);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(6);
            }
            if (result === null || result === undefined) break;
            bytesRead++;
            buffer[offset+i] = result;
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }
          return bytesRead;
        },write:function(stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(60);
          }
          try {
            for (var i = 0; i < length; i++) {
              stream.tty.ops.put_char(stream.tty, buffer[offset+i]);
            }
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (length) {
            stream.node.timestamp = Date.now();
          }
          return i;
        }},default_tty_ops:{get_char:function(tty) {
          if (!tty.input.length) {
            var result = null;
            if (ENVIRONMENT_IS_NODE) {
              // we will read data by chunks of BUFSIZE
              var BUFSIZE = 256;
              var buf = Buffer.alloc(BUFSIZE);
              var bytesRead = 0;
  
              try {
                bytesRead = fs.readSync(process.stdin.fd, buf, 0, BUFSIZE, -1);
              } catch(e) {
                // Cross-platform differences: on Windows, reading EOF throws an exception, but on other OSes,
                // reading EOF returns 0. Uniformize behavior by treating the EOF exception to return 0.
                if (e.toString().includes('EOF')) bytesRead = 0;
                else throw e;
              }
  
              if (bytesRead > 0) {
                result = buf.slice(0, bytesRead).toString('utf-8');
              } else {
                result = null;
              }
            } else
            if (typeof window != 'undefined' &&
              typeof window.prompt == 'function') {
              // Browser.
              result = window.prompt('Input: ');  // returns null on cancel
              if (result !== null) {
                result += '\n';
              }
            } else if (typeof readline == 'function') {
              // Command line.
              result = readline();
              if (result !== null) {
                result += '\n';
              }
            }
            if (!result) {
              return null;
            }
            tty.input = intArrayFromString(result, true);
          }
          return tty.input.shift();
        },put_char:function(tty, val) {
          if (val === null || val === 10) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val); // val == 0 would cut text output off in the middle.
          }
        },flush:function(tty) {
          if (tty.output && tty.output.length > 0) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        }},default_tty1_ops:{put_char:function(tty, val) {
          if (val === null || val === 10) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val);
          }
        },flush:function(tty) {
          if (tty.output && tty.output.length > 0) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        }}};
  
  function zeroMemory(address, size) {
      HEAPU8.fill(0, address, address + size);
    }
  
  function alignMemory(size, alignment) {
      assert(alignment, "alignment argument is required");
      return Math.ceil(size / alignment) * alignment;
    }
  function mmapAlloc(size) {
      abort('internal error: mmapAlloc called but `emscripten_builtin_memalign` native symbol not exported');
    }
  var MEMFS = {ops_table:null,mount:function(mount) {
        return MEMFS.createNode(null, '/', 16384 | 511 /* 0777 */, 0);
      },createNode:function(parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          // no supported
          throw new FS.ErrnoError(63);
        }
        if (!MEMFS.ops_table) {
          MEMFS.ops_table = {
            dir: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                lookup: MEMFS.node_ops.lookup,
                mknod: MEMFS.node_ops.mknod,
                rename: MEMFS.node_ops.rename,
                unlink: MEMFS.node_ops.unlink,
                rmdir: MEMFS.node_ops.rmdir,
                readdir: MEMFS.node_ops.readdir,
                symlink: MEMFS.node_ops.symlink
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek
              }
            },
            file: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek,
                read: MEMFS.stream_ops.read,
                write: MEMFS.stream_ops.write,
                allocate: MEMFS.stream_ops.allocate,
                mmap: MEMFS.stream_ops.mmap,
                msync: MEMFS.stream_ops.msync
              }
            },
            link: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                readlink: MEMFS.node_ops.readlink
              },
              stream: {}
            },
            chrdev: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: FS.chrdev_stream_ops
            }
          };
        }
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node;
          node.stream_ops = MEMFS.ops_table.dir.stream;
          node.contents = {};
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node;
          node.stream_ops = MEMFS.ops_table.file.stream;
          node.usedBytes = 0; // The actual number of bytes used in the typed array, as opposed to contents.length which gives the whole capacity.
          // When the byte data of the file is populated, this will point to either a typed array, or a normal JS array. Typed arrays are preferred
          // for performance, and used by default. However, typed arrays are not resizable like normal JS arrays are, so there is a small disk size
          // penalty involved for appending file writes that continuously grow a file similar to std::vector capacity vs used -scheme.
          node.contents = null; 
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node;
          node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node;
          node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }
        node.timestamp = Date.now();
        // add the new node to the parent
        if (parent) {
          parent.contents[name] = node;
          parent.timestamp = node.timestamp;
        }
        return node;
      },getFileDataAsTypedArray:function(node) {
        if (!node.contents) return new Uint8Array(0);
        if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes); // Make sure to not return excess unused bytes.
        return new Uint8Array(node.contents);
      },expandFileStorage:function(node, newCapacity) {
        var prevCapacity = node.contents ? node.contents.length : 0;
        if (prevCapacity >= newCapacity) return; // No need to expand, the storage was already large enough.
        // Don't expand strictly to the given requested limit if it's only a very small increase, but instead geometrically grow capacity.
        // For small filesizes (<1MB), perform size*2 geometric increase, but for large sizes, do a much more conservative size*1.125 increase to
        // avoid overshooting the allocation cap by a very large margin.
        var CAPACITY_DOUBLING_MAX = 1024 * 1024;
        newCapacity = Math.max(newCapacity, (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2.0 : 1.125)) >>> 0);
        if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256); // At minimum allocate 256b for each file when expanding.
        var oldContents = node.contents;
        node.contents = new Uint8Array(newCapacity); // Allocate new storage.
        if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0); // Copy old data over to the new storage.
      },resizeFileStorage:function(node, newSize) {
        if (node.usedBytes == newSize) return;
        if (newSize == 0) {
          node.contents = null; // Fully decommit when requesting a resize to zero.
          node.usedBytes = 0;
        } else {
          var oldContents = node.contents;
          node.contents = new Uint8Array(newSize); // Allocate new storage.
          if (oldContents) {
            node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes))); // Copy old data over to the new storage.
          }
          node.usedBytes = newSize;
        }
      },node_ops:{getattr:function(node) {
          var attr = {};
          // device numbers reuse inode numbers.
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.usedBytes;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.timestamp);
          attr.mtime = new Date(node.timestamp);
          attr.ctime = new Date(node.timestamp);
          // NOTE: In our implementation, st_blocks = Math.ceil(st_size/st_blksize),
          //       but this is not required by the standard.
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        },setattr:function(node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }
          if (attr.size !== undefined) {
            MEMFS.resizeFileStorage(node, attr.size);
          }
        },lookup:function(parent, name) {
          throw FS.genericErrors[44];
        },mknod:function(parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },rename:function(old_node, new_dir, new_name) {
          // if we're overwriting a directory at new_name, make sure it's empty.
          if (FS.isDir(old_node.mode)) {
            var new_node;
            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e) {
            }
            if (new_node) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(55);
              }
            }
          }
          // do the internal rewiring
          delete old_node.parent.contents[old_node.name];
          old_node.parent.timestamp = Date.now()
          old_node.name = new_name;
          new_dir.contents[new_name] = old_node;
          new_dir.timestamp = old_node.parent.timestamp;
          old_node.parent = new_dir;
        },unlink:function(parent, name) {
          delete parent.contents[name];
          parent.timestamp = Date.now();
        },rmdir:function(parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(55);
          }
          delete parent.contents[name];
          parent.timestamp = Date.now();
        },readdir:function(node) {
          var entries = ['.', '..'];
          for (var key in node.contents) {
            if (!node.contents.hasOwnProperty(key)) {
              continue;
            }
            entries.push(key);
          }
          return entries;
        },symlink:function(parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 511 /* 0777 */ | 40960, 0);
          node.link = oldpath;
          return node;
        },readlink:function(node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(28);
          }
          return node.link;
        }},stream_ops:{read:function(stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= stream.node.usedBytes) return 0;
          var size = Math.min(stream.node.usedBytes - position, length);
          assert(size >= 0);
          if (size > 8 && contents.subarray) { // non-trivial, and typed array
            buffer.set(contents.subarray(position, position + size), offset);
          } else {
            for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
          }
          return size;
        },write:function(stream, buffer, offset, length, position, canOwn) {
          // The data buffer should be a typed array view
          assert(!(buffer instanceof ArrayBuffer));
  
          if (!length) return 0;
          var node = stream.node;
          node.timestamp = Date.now();
  
          if (buffer.subarray && (!node.contents || node.contents.subarray)) { // This write is from a typed array to a typed array?
            if (canOwn) {
              assert(position === 0, 'canOwn must imply no weird position inside the file');
              node.contents = buffer.subarray(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (node.usedBytes === 0 && position === 0) { // If this is a simple first write to an empty file, do a fast set since we don't need to care about old data.
              node.contents = buffer.slice(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (position + length <= node.usedBytes) { // Writing to an already allocated and used subrange of the file?
              node.contents.set(buffer.subarray(offset, offset + length), position);
              return length;
            }
          }
  
          // Appending to an existing file and we need to reallocate, or source data did not come as a typed array.
          MEMFS.expandFileStorage(node, position+length);
          if (node.contents.subarray && buffer.subarray) {
            // Use typed array write which is available.
            node.contents.set(buffer.subarray(offset, offset + length), position);
          } else {
            for (var i = 0; i < length; i++) {
             node.contents[position + i] = buffer[offset + i]; // Or fall back to manual write if not.
            }
          }
          node.usedBytes = Math.max(node.usedBytes, position + length);
          return length;
        },llseek:function(stream, offset, whence) {
          var position = offset;
          if (whence === 1) {
            position += stream.position;
          } else if (whence === 2) {
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.usedBytes;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(28);
          }
          return position;
        },allocate:function(stream, offset, length) {
          MEMFS.expandFileStorage(stream.node, offset + length);
          stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
        },mmap:function(stream, address, length, position, prot, flags) {
          if (address !== 0) {
            // We don't currently support location hints for the address of the mapping
            throw new FS.ErrnoError(28);
          }
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          // Only make a new copy when MAP_PRIVATE is specified.
          if (!(flags & 2) && contents.buffer === buffer) {
            // We can't emulate MAP_SHARED when the file is not backed by the buffer
            // we're mapping to (e.g. the HEAP buffer).
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            // Try to avoid unnecessary slices.
            if (position > 0 || position + length < contents.length) {
              if (contents.subarray) {
                contents = contents.subarray(position, position + length);
              } else {
                contents = Array.prototype.slice.call(contents, position, position + length);
              }
            }
            allocated = true;
            ptr = mmapAlloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(48);
            }
            HEAP8.set(contents, ptr);
          }
          return { ptr: ptr, allocated: allocated };
        },msync:function(stream, buffer, offset, length, mmapFlags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          if (mmapFlags & 2) {
            // MAP_PRIVATE calls need not to be synced back to underlying fs
            return 0;
          }
  
          var bytesWritten = MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
          // should we check if bytesWritten and length are the same?
          return 0;
        }}};
  
  /** @param {boolean=} noRunDep */
  function asyncLoad(url, onload, onerror, noRunDep) {
      var dep = !noRunDep ? getUniqueRunDependency('al ' + url) : '';
      readAsync(url, function(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).');
        onload(new Uint8Array(arrayBuffer));
        if (dep) removeRunDependency(dep);
      }, function(event) {
        if (onerror) {
          onerror();
        } else {
          throw 'Loading data file "' + url + '" failed.';
        }
      });
      if (dep) addRunDependency(dep);
    }
  
  var ERRNO_MESSAGES = {0:"Success",1:"Arg list too long",2:"Permission denied",3:"Address already in use",4:"Address not available",5:"Address family not supported by protocol family",6:"No more processes",7:"Socket already connected",8:"Bad file number",9:"Trying to read unreadable message",10:"Mount device busy",11:"Operation canceled",12:"No children",13:"Connection aborted",14:"Connection refused",15:"Connection reset by peer",16:"File locking deadlock error",17:"Destination address required",18:"Math arg out of domain of func",19:"Quota exceeded",20:"File exists",21:"Bad address",22:"File too large",23:"Host is unreachable",24:"Identifier removed",25:"Illegal byte sequence",26:"Connection already in progress",27:"Interrupted system call",28:"Invalid argument",29:"I/O error",30:"Socket is already connected",31:"Is a directory",32:"Too many symbolic links",33:"Too many open files",34:"Too many links",35:"Message too long",36:"Multihop attempted",37:"File or path name too long",38:"Network interface is not configured",39:"Connection reset by network",40:"Network is unreachable",41:"Too many open files in system",42:"No buffer space available",43:"No such device",44:"No such file or directory",45:"Exec format error",46:"No record locks available",47:"The link has been severed",48:"Not enough core",49:"No message of desired type",50:"Protocol not available",51:"No space left on device",52:"Function not implemented",53:"Socket is not connected",54:"Not a directory",55:"Directory not empty",56:"State not recoverable",57:"Socket operation on non-socket",59:"Not a typewriter",60:"No such device or address",61:"Value too large for defined data type",62:"Previous owner died",63:"Not super-user",64:"Broken pipe",65:"Protocol error",66:"Unknown protocol",67:"Protocol wrong type for socket",68:"Math result not representable",69:"Read only file system",70:"Illegal seek",71:"No such process",72:"Stale file handle",73:"Connection timed out",74:"Text file busy",75:"Cross-device link",100:"Device not a stream",101:"Bad font file fmt",102:"Invalid slot",103:"Invalid request code",104:"No anode",105:"Block device required",106:"Channel number out of range",107:"Level 3 halted",108:"Level 3 reset",109:"Link number out of range",110:"Protocol driver not attached",111:"No CSI structure available",112:"Level 2 halted",113:"Invalid exchange",114:"Invalid request descriptor",115:"Exchange full",116:"No data (for no delay io)",117:"Timer expired",118:"Out of streams resources",119:"Machine is not on the network",120:"Package not installed",121:"The object is remote",122:"Advertise error",123:"Srmount error",124:"Communication error on send",125:"Cross mount point (not really error)",126:"Given log. name not unique",127:"f.d. invalid for this operation",128:"Remote address changed",129:"Can   access a needed shared lib",130:"Accessing a corrupted shared lib",131:".lib section in a.out corrupted",132:"Attempting to link in too many libs",133:"Attempting to exec a shared library",135:"Streams pipe error",136:"Too many users",137:"Socket type not supported",138:"Not supported",139:"Protocol family not supported",140:"Can't send after socket shutdown",141:"Too many references",142:"Host is down",148:"No medium (in tape drive)",156:"Level 2 not synchronized"};
  
  var ERRNO_CODES = {};
  var FS = {root:null,mounts:[],devices:{},streams:[],nextInode:1,nameTable:null,currentPath:"/",initialized:false,ignorePermissions:true,ErrnoError:null,genericErrors:{},filesystems:null,syncFSRequests:0,lookupPath:(path, opts = {}) => {
        path = PATH_FS.resolve(FS.cwd(), path);
  
        if (!path) return { path: '', node: null };
  
        var defaults = {
          follow_mount: true,
          recurse_count: 0
        };
        for (var key in defaults) {
          if (opts[key] === undefined) {
            opts[key] = defaults[key];
          }
        }
  
        if (opts.recurse_count > 8) {  // max recursive lookup of 8
          throw new FS.ErrnoError(32);
        }
  
        // split the path
        var parts = PATH.normalizeArray(path.split('/').filter((p) => !!p), false);
  
        // start at the root
        var current = FS.root;
        var current_path = '/';
  
        for (var i = 0; i < parts.length; i++) {
          var islast = (i === parts.length-1);
          if (islast && opts.parent) {
            // stop resolving
            break;
          }
  
          current = FS.lookupNode(current, parts[i]);
          current_path = PATH.join2(current_path, parts[i]);
  
          // jump to the mount's root node if this is a mountpoint
          if (FS.isMountpoint(current)) {
            if (!islast || (islast && opts.follow_mount)) {
              current = current.mounted.root;
            }
          }
  
          // by default, lookupPath will not follow a symlink if it is the final path component.
          // setting opts.follow = true will override this behavior.
          if (!islast || opts.follow) {
            var count = 0;
            while (FS.isLink(current.mode)) {
              var link = FS.readlink(current_path);
              current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
  
              var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count });
              current = lookup.node;
  
              if (count++ > 40) {  // limit max consecutive symlinks to 40 (SYMLOOP_MAX).
                throw new FS.ErrnoError(32);
              }
            }
          }
        }
  
        return { path: current_path, node: current };
      },getPath:(node) => {
        var path;
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path) return mount;
            return mount[mount.length-1] !== '/' ? mount + '/' + path : mount + path;
          }
          path = path ? node.name + '/' + path : node.name;
          node = node.parent;
        }
      },hashName:(parentid, name) => {
        var hash = 0;
  
        for (var i = 0; i < name.length; i++) {
          hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
        }
        return ((parentid + hash) >>> 0) % FS.nameTable.length;
      },hashAddNode:(node) => {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },hashRemoveNode:(node) => {
        var hash = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next;
        } else {
          var current = FS.nameTable[hash];
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next;
              break;
            }
            current = current.name_next;
          }
        }
      },lookupNode:(parent, name) => {
        var errCode = FS.mayLookup(parent);
        if (errCode) {
          throw new FS.ErrnoError(errCode, parent);
        }
        var hash = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name;
          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        }
        // if we failed to find it in the cache, call into the VFS
        return FS.lookup(parent, name);
      },createNode:(parent, name, mode, rdev) => {
        assert(typeof parent == 'object')
        var node = new FS.FSNode(parent, name, mode, rdev);
  
        FS.hashAddNode(node);
  
        return node;
      },destroyNode:(node) => {
        FS.hashRemoveNode(node);
      },isRoot:(node) => {
        return node === node.parent;
      },isMountpoint:(node) => {
        return !!node.mounted;
      },isFile:(mode) => {
        return (mode & 61440) === 32768;
      },isDir:(mode) => {
        return (mode & 61440) === 16384;
      },isLink:(mode) => {
        return (mode & 61440) === 40960;
      },isChrdev:(mode) => {
        return (mode & 61440) === 8192;
      },isBlkdev:(mode) => {
        return (mode & 61440) === 24576;
      },isFIFO:(mode) => {
        return (mode & 61440) === 4096;
      },isSocket:(mode) => {
        return (mode & 49152) === 49152;
      },flagModes:{"r":0,"r+":2,"w":577,"w+":578,"a":1089,"a+":1090},modeStringToFlags:(str) => {
        var flags = FS.flagModes[str];
        if (typeof flags == 'undefined') {
          throw new Error('Unknown file open mode: ' + str);
        }
        return flags;
      },flagsToPermissionString:(flag) => {
        var perms = ['r', 'w', 'rw'][flag & 3];
        if ((flag & 512)) {
          perms += 'w';
        }
        return perms;
      },nodePermissions:(node, perms) => {
        if (FS.ignorePermissions) {
          return 0;
        }
        // return 0 if any user, group or owner bits are set.
        if (perms.includes('r') && !(node.mode & 292)) {
          return 2;
        } else if (perms.includes('w') && !(node.mode & 146)) {
          return 2;
        } else if (perms.includes('x') && !(node.mode & 73)) {
          return 2;
        }
        return 0;
      },mayLookup:(dir) => {
        var errCode = FS.nodePermissions(dir, 'x');
        if (errCode) return errCode;
        if (!dir.node_ops.lookup) return 2;
        return 0;
      },mayCreate:(dir, name) => {
        try {
          var node = FS.lookupNode(dir, name);
          return 20;
        } catch (e) {
        }
        return FS.nodePermissions(dir, 'wx');
      },mayDelete:(dir, name, isdir) => {
        var node;
        try {
          node = FS.lookupNode(dir, name);
        } catch (e) {
          return e.errno;
        }
        var errCode = FS.nodePermissions(dir, 'wx');
        if (errCode) {
          return errCode;
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return 54;
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return 10;
          }
        } else {
          if (FS.isDir(node.mode)) {
            return 31;
          }
        }
        return 0;
      },mayOpen:(node, flags) => {
        if (!node) {
          return 44;
        }
        if (FS.isLink(node.mode)) {
          return 32;
        } else if (FS.isDir(node.mode)) {
          if (FS.flagsToPermissionString(flags) !== 'r' || // opening for write
              (flags & 512)) { // TODO: check for O_SEARCH? (== search for dir only)
            return 31;
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
      },MAX_OPEN_FDS:4096,nextfd:(fd_start = 0, fd_end = FS.MAX_OPEN_FDS) => {
        for (var fd = fd_start; fd <= fd_end; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(33);
      },getStream:(fd) => FS.streams[fd],createStream:(stream, fd_start, fd_end) => {
        if (!FS.FSStream) {
          FS.FSStream = /** @constructor */ function(){};
          FS.FSStream.prototype = {
            object: {
              get: function() { return this.node; },
              set: function(val) { this.node = val; }
            },
            isRead: {
              get: function() { return (this.flags & 2097155) !== 1; }
            },
            isWrite: {
              get: function() { return (this.flags & 2097155) !== 0; }
            },
            isAppend: {
              get: function() { return (this.flags & 1024); }
            }
          };
        }
        // clone it, so we can return an instance of FSStream
        stream = Object.assign(new FS.FSStream(), stream);
        var fd = FS.nextfd(fd_start, fd_end);
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },closeStream:(fd) => {
        FS.streams[fd] = null;
      },chrdev_stream_ops:{open:(stream) => {
          var device = FS.getDevice(stream.node.rdev);
          // override node's stream ops with the device's
          stream.stream_ops = device.stream_ops;
          // forward the open call
          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream);
          }
        },llseek:() => {
          throw new FS.ErrnoError(70);
        }},major:(dev) => ((dev) >> 8),minor:(dev) => ((dev) & 0xff),makedev:(ma, mi) => ((ma) << 8 | (mi)),registerDevice:(dev, ops) => {
        FS.devices[dev] = { stream_ops: ops };
      },getDevice:(dev) => FS.devices[dev],getMounts:(mount) => {
        var mounts = [];
        var check = [mount];
  
        while (check.length) {
          var m = check.pop();
  
          mounts.push(m);
  
          check.push.apply(check, m.mounts);
        }
  
        return mounts;
      },syncfs:(populate, callback) => {
        if (typeof populate == 'function') {
          callback = populate;
          populate = false;
        }
  
        FS.syncFSRequests++;
  
        if (FS.syncFSRequests > 1) {
          err('warning: ' + FS.syncFSRequests + ' FS.syncfs operations in flight at once, probably just doing extra work');
        }
  
        var mounts = FS.getMounts(FS.root.mount);
        var completed = 0;
  
        function doCallback(errCode) {
          assert(FS.syncFSRequests > 0);
          FS.syncFSRequests--;
          return callback(errCode);
        }
  
        function done(errCode) {
          if (errCode) {
            if (!done.errored) {
              done.errored = true;
              return doCallback(errCode);
            }
            return;
          }
          if (++completed >= mounts.length) {
            doCallback(null);
          }
        };
  
        // sync all mounts
        mounts.forEach((mount) => {
          if (!mount.type.syncfs) {
            return done(null);
          }
          mount.type.syncfs(mount, populate, done);
        });
      },mount:(type, opts, mountpoint) => {
        if (typeof type == 'string') {
          // The filesystem was not included, and instead we have an error
          // message stored in the variable.
          throw type;
        }
        var root = mountpoint === '/';
        var pseudo = !mountpoint;
        var node;
  
        if (root && FS.root) {
          throw new FS.ErrnoError(10);
        } else if (!root && !pseudo) {
          var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
          mountpoint = lookup.path;  // use the absolute path
          node = lookup.node;
  
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10);
          }
  
          if (!FS.isDir(node.mode)) {
            throw new FS.ErrnoError(54);
          }
        }
  
        var mount = {
          type: type,
          opts: opts,
          mountpoint: mountpoint,
          mounts: []
        };
  
        // create a root node for the fs
        var mountRoot = type.mount(mount);
        mountRoot.mount = mount;
        mount.root = mountRoot;
  
        if (root) {
          FS.root = mountRoot;
        } else if (node) {
          // set as a mountpoint
          node.mounted = mount;
  
          // add the new mount to the current mount's children
          if (node.mount) {
            node.mount.mounts.push(mount);
          }
        }
  
        return mountRoot;
      },unmount:(mountpoint) => {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
        if (!FS.isMountpoint(lookup.node)) {
          throw new FS.ErrnoError(28);
        }
  
        // destroy the nodes for this mount, and all its child mounts
        var node = lookup.node;
        var mount = node.mounted;
        var mounts = FS.getMounts(mount);
  
        Object.keys(FS.nameTable).forEach((hash) => {
          var current = FS.nameTable[hash];
  
          while (current) {
            var next = current.name_next;
  
            if (mounts.includes(current.mount)) {
              FS.destroyNode(current);
            }
  
            current = next;
          }
        });
  
        // no longer a mountpoint
        node.mounted = null;
  
        // remove this mount from the child mounts
        var idx = node.mount.mounts.indexOf(mount);
        assert(idx !== -1);
        node.mount.mounts.splice(idx, 1);
      },lookup:(parent, name) => {
        return parent.node_ops.lookup(parent, name);
      },mknod:(path, mode, dev) => {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        if (!name || name === '.' || name === '..') {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.mayCreate(parent, name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.mknod(parent, name, mode, dev);
      },create:(path, mode) => {
        mode = mode !== undefined ? mode : 438 /* 0666 */;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },mkdir:(path, mode) => {
        mode = mode !== undefined ? mode : 511 /* 0777 */;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },mkdirTree:(path, mode) => {
        var dirs = path.split('/');
        var d = '';
        for (var i = 0; i < dirs.length; ++i) {
          if (!dirs[i]) continue;
          d += '/' + dirs[i];
          try {
            FS.mkdir(d, mode);
          } catch(e) {
            if (e.errno != 20) throw e;
          }
        }
      },mkdev:(path, mode, dev) => {
        if (typeof dev == 'undefined') {
          dev = mode;
          mode = 438 /* 0666 */;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },symlink:(oldpath, newpath) => {
        if (!PATH_FS.resolve(oldpath)) {
          throw new FS.ErrnoError(44);
        }
        var lookup = FS.lookupPath(newpath, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(44);
        }
        var newname = PATH.basename(newpath);
        var errCode = FS.mayCreate(parent, newname);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.symlink(parent, newname, oldpath);
      },rename:(old_path, new_path) => {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        // parents must exist
        var lookup, old_dir, new_dir;
  
        // let the errors from non existant directories percolate up
        lookup = FS.lookupPath(old_path, { parent: true });
        old_dir = lookup.node;
        lookup = FS.lookupPath(new_path, { parent: true });
        new_dir = lookup.node;
  
        if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
        // need to be part of the same mount
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(75);
        }
        // source must exist
        var old_node = FS.lookupNode(old_dir, old_name);
        // old path should not be an ancestor of the new path
        var relative = PATH_FS.relative(old_path, new_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(28);
        }
        // new path should not be an ancestor of the old path
        relative = PATH_FS.relative(new_path, old_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(55);
        }
        // see if the new path already exists
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {
          // not fatal
        }
        // early out if nothing needs to change
        if (old_node === new_node) {
          return;
        }
        // we'll need to delete the old entry
        var isdir = FS.isDir(old_node.mode);
        var errCode = FS.mayDelete(old_dir, old_name, isdir);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        // need delete permissions if we'll be overwriting.
        // need create permissions if new doesn't already exist.
        errCode = new_node ?
          FS.mayDelete(new_dir, new_name, isdir) :
          FS.mayCreate(new_dir, new_name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
          throw new FS.ErrnoError(10);
        }
        // if we are going to change the parent, check write permissions
        if (new_dir !== old_dir) {
          errCode = FS.nodePermissions(old_dir, 'w');
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        // remove the node from the lookup hash
        FS.hashRemoveNode(old_node);
        // do the underlying fs rename
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name);
        } catch (e) {
          throw e;
        } finally {
          // add the node back to the hash (in case node_ops.rename
          // changed its name)
          FS.hashAddNode(old_node);
        }
      },rmdir:(path) => {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, true);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
      },readdir:(path) => {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(54);
        }
        return node.node_ops.readdir(node);
      },unlink:(path) => {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(44);
        }
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, false);
        if (errCode) {
          // According to POSIX, we should map EISDIR to EPERM, but
          // we instead do what Linux does (and we must, as we use
          // the musl linux libc).
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
      },readlink:(path) => {
        var lookup = FS.lookupPath(path);
        var link = lookup.node;
        if (!link) {
          throw new FS.ErrnoError(44);
        }
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(28);
        }
        return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
      },stat:(path, dontFollow) => {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        var node = lookup.node;
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(63);
        }
        return node.node_ops.getattr(node);
      },lstat:(path) => {
        return FS.stat(path, true);
      },chmod:(path, mode, dontFollow) => {
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, {
          mode: (mode & 4095) | (node.mode & ~4095),
          timestamp: Date.now()
        });
      },lchmod:(path, mode) => {
        FS.chmod(path, mode, true);
      },fchmod:(fd, mode) => {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        FS.chmod(stream.node, mode);
      },chown:(path, uid, gid, dontFollow) => {
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, {
          timestamp: Date.now()
          // we ignore the uid / gid for now
        });
      },lchown:(path, uid, gid) => {
        FS.chown(path, uid, gid, true);
      },fchown:(fd, uid, gid) => {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        FS.chown(stream.node, uid, gid);
      },truncate:(path, len) => {
        if (len < 0) {
          throw new FS.ErrnoError(28);
        }
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: true });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.nodePermissions(node, 'w');
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        node.node_ops.setattr(node, {
          size: len,
          timestamp: Date.now()
        });
      },ftruncate:(fd, len) => {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(28);
        }
        FS.truncate(stream.node, len);
      },utime:(path, atime, mtime) => {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        node.node_ops.setattr(node, {
          timestamp: Math.max(atime, mtime)
        });
      },open:(path, flags, mode, fd_start, fd_end) => {
        if (path === "") {
          throw new FS.ErrnoError(44);
        }
        flags = typeof flags == 'string' ? FS.modeStringToFlags(flags) : flags;
        mode = typeof mode == 'undefined' ? 438 /* 0666 */ : mode;
        if ((flags & 64)) {
          mode = (mode & 4095) | 32768;
        } else {
          mode = 0;
        }
        var node;
        if (typeof path == 'object') {
          node = path;
        } else {
          path = PATH.normalize(path);
          try {
            var lookup = FS.lookupPath(path, {
              follow: !(flags & 131072)
            });
            node = lookup.node;
          } catch (e) {
            // ignore
          }
        }
        // perhaps we need to create the node
        var created = false;
        if ((flags & 64)) {
          if (node) {
            // if O_CREAT and O_EXCL are set, error out if the node already exists
            if ((flags & 128)) {
              throw new FS.ErrnoError(20);
            }
          } else {
            // node doesn't exist, try to create it
            node = FS.mknod(path, mode, 0);
            created = true;
          }
        }
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        // can't truncate a device
        if (FS.isChrdev(node.mode)) {
          flags &= ~512;
        }
        // if asked only for a directory, then this must be one
        if ((flags & 65536) && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(54);
        }
        // check permissions, if this is not a file we just created now (it is ok to
        // create and write to a file with read-only permissions; it is read-only
        // for later use)
        if (!created) {
          var errCode = FS.mayOpen(node, flags);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        // do truncation if necessary
        if ((flags & 512)) {
          FS.truncate(node, 0);
        }
        // we've already handled these, don't pass down to the underlying vfs
        flags &= ~(128 | 512 | 131072);
  
        // register the stream with the filesystem
        var stream = FS.createStream({
          node: node,
          path: FS.getPath(node),  // we want the absolute path to the node
          flags: flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          // used by the file family libc calls (fopen, fwrite, ferror, etc.)
          ungotten: [],
          error: false
        }, fd_start, fd_end);
        // call the new stream's open function
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
        if (Module['logReadFiles'] && !(flags & 1)) {
          if (!FS.readFiles) FS.readFiles = {};
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
          }
        }
        return stream;
      },close:(stream) => {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (stream.getdents) stream.getdents = null; // free readdir state
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream);
          }
        } catch (e) {
          throw e;
        } finally {
          FS.closeStream(stream.fd);
        }
        stream.fd = null;
      },isClosed:(stream) => {
        return stream.fd === null;
      },llseek:(stream, offset, whence) => {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(70);
        }
        if (whence != 0 && whence != 1 && whence != 2) {
          throw new FS.ErrnoError(28);
        }
        stream.position = stream.stream_ops.llseek(stream, offset, whence);
        stream.ungotten = [];
        return stream.position;
      },read:(stream, buffer, offset, length, position) => {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(28);
        }
        var seeking = typeof position != 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
        if (!seeking) stream.position += bytesRead;
        return bytesRead;
      },write:(stream, buffer, offset, length, position, canOwn) => {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(28);
        }
        if (stream.seekable && stream.flags & 1024) {
          // seek to the end before writing in append mode
          FS.llseek(stream, 0, 2);
        }
        var seeking = typeof position != 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
        if (!seeking) stream.position += bytesWritten;
        return bytesWritten;
      },allocate:(stream, offset, length) => {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (offset < 0 || length <= 0) {
          throw new FS.ErrnoError(28);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        if (!stream.stream_ops.allocate) {
          throw new FS.ErrnoError(138);
        }
        stream.stream_ops.allocate(stream, offset, length);
      },mmap:(stream, address, length, position, prot, flags) => {
        // User requests writing to file (prot & PROT_WRITE != 0).
        // Checking if we have permissions to write to the file unless
        // MAP_PRIVATE flag is set. According to POSIX spec it is possible
        // to write to file opened in read-only mode with MAP_PRIVATE flag,
        // as all modifications will be visible only in the memory of
        // the current process.
        if ((prot & 2) !== 0
            && (flags & 2) === 0
            && (stream.flags & 2097155) !== 2) {
          throw new FS.ErrnoError(2);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(2);
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(43);
        }
        return stream.stream_ops.mmap(stream, address, length, position, prot, flags);
      },msync:(stream, buffer, offset, length, mmapFlags) => {
        if (!stream || !stream.stream_ops.msync) {
          return 0;
        }
        return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
      },munmap:(stream) => 0,ioctl:(stream, cmd, arg) => {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(59);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      },readFile:(path, opts = {}) => {
        opts.flags = opts.flags || 0;
        opts.encoding = opts.encoding || 'binary';
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        var ret;
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === 'utf8') {
          ret = UTF8ArrayToString(buf, 0);
        } else if (opts.encoding === 'binary') {
          ret = buf;
        }
        FS.close(stream);
        return ret;
      },writeFile:(path, data, opts = {}) => {
        opts.flags = opts.flags || 577;
        var stream = FS.open(path, opts.flags, opts.mode);
        if (typeof data == 'string') {
          var buf = new Uint8Array(lengthBytesUTF8(data)+1);
          var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
          FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
        } else if (ArrayBuffer.isView(data)) {
          FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
        } else {
          throw new Error('Unsupported data type');
        }
        FS.close(stream);
      },cwd:() => FS.currentPath,chdir:(path) => {
        var lookup = FS.lookupPath(path, { follow: true });
        if (lookup.node === null) {
          throw new FS.ErrnoError(44);
        }
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(54);
        }
        var errCode = FS.nodePermissions(lookup.node, 'x');
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        FS.currentPath = lookup.path;
      },createDefaultDirectories:() => {
        FS.mkdir('/tmp');
        FS.mkdir('/home');
        FS.mkdir('/home/web_user');
      },createDefaultDevices:() => {
        // create /dev
        FS.mkdir('/dev');
        // setup /dev/null
        FS.registerDevice(FS.makedev(1, 3), {
          read: () => 0,
          write: (stream, buffer, offset, length, pos) => length,
        });
        FS.mkdev('/dev/null', FS.makedev(1, 3));
        // setup /dev/tty and /dev/tty1
        // stderr needs to print output using err() rather than out()
        // so we register a second tty just for it.
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev('/dev/tty', FS.makedev(5, 0));
        FS.mkdev('/dev/tty1', FS.makedev(6, 0));
        // setup /dev/[u]random
        var random_device = getRandomDevice();
        FS.createDevice('/dev', 'random', random_device);
        FS.createDevice('/dev', 'urandom', random_device);
        // we're not going to emulate the actual shm device,
        // just create the tmp dirs that reside in it commonly
        FS.mkdir('/dev/shm');
        FS.mkdir('/dev/shm/tmp');
      },createSpecialDirectories:() => {
        // create /proc/self/fd which allows /proc/self/fd/6 => readlink gives the
        // name of the stream for fd 6 (see test_unistd_ttyname)
        FS.mkdir('/proc');
        var proc_self = FS.mkdir('/proc/self');
        FS.mkdir('/proc/self/fd');
        FS.mount({
          mount: () => {
            var node = FS.createNode(proc_self, 'fd', 16384 | 511 /* 0777 */, 73);
            node.node_ops = {
              lookup: (parent, name) => {
                var fd = +name;
                var stream = FS.getStream(fd);
                if (!stream) throw new FS.ErrnoError(8);
                var ret = {
                  parent: null,
                  mount: { mountpoint: 'fake' },
                  node_ops: { readlink: () => stream.path },
                };
                ret.parent = ret; // make it look like a simple root node
                return ret;
              }
            };
            return node;
          }
        }, {}, '/proc/self/fd');
      },createStandardStreams:() => {
        // TODO deprecate the old functionality of a single
        // input / output callback and that utilizes FS.createDevice
        // and instead require a unique set of stream ops
  
        // by default, we symlink the standard streams to the
        // default tty devices. however, if the standard streams
        // have been overwritten we create a unique device for
        // them instead.
        if (Module['stdin']) {
          FS.createDevice('/dev', 'stdin', Module['stdin']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdin');
        }
        if (Module['stdout']) {
          FS.createDevice('/dev', 'stdout', null, Module['stdout']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdout');
        }
        if (Module['stderr']) {
          FS.createDevice('/dev', 'stderr', null, Module['stderr']);
        } else {
          FS.symlink('/dev/tty1', '/dev/stderr');
        }
  
        // open default streams for the stdin, stdout and stderr devices
        var stdin = FS.open('/dev/stdin', 0);
        var stdout = FS.open('/dev/stdout', 1);
        var stderr = FS.open('/dev/stderr', 1);
        assert(stdin.fd === 0, 'invalid handle for stdin (' + stdin.fd + ')');
        assert(stdout.fd === 1, 'invalid handle for stdout (' + stdout.fd + ')');
        assert(stderr.fd === 2, 'invalid handle for stderr (' + stderr.fd + ')');
      },ensureErrnoError:() => {
        if (FS.ErrnoError) return;
        FS.ErrnoError = /** @this{Object} */ function ErrnoError(errno, node) {
          this.node = node;
          this.setErrno = /** @this{Object} */ function(errno) {
            this.errno = errno;
            for (var key in ERRNO_CODES) {
              if (ERRNO_CODES[key] === errno) {
                this.code = key;
                break;
              }
            }
          };
          this.setErrno(errno);
          this.message = ERRNO_MESSAGES[errno];
  
          // Try to get a maximally helpful stack trace. On Node.js, getting Error.stack
          // now ensures it shows what we want.
          if (this.stack) {
            // Define the stack property for Node.js 4, which otherwise errors on the next line.
            Object.defineProperty(this, "stack", { value: (new Error).stack, writable: true });
            this.stack = demangleAll(this.stack);
          }
        };
        FS.ErrnoError.prototype = new Error();
        FS.ErrnoError.prototype.constructor = FS.ErrnoError;
        // Some errors may happen quite a bit, to avoid overhead we reuse them (and suffer a lack of stack info)
        [44].forEach((code) => {
          FS.genericErrors[code] = new FS.ErrnoError(code);
          FS.genericErrors[code].stack = '<generic error, no stack>';
        });
      },staticInit:() => {
        FS.ensureErrnoError();
  
        FS.nameTable = new Array(4096);
  
        FS.mount(MEMFS, {}, '/');
  
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
        FS.createSpecialDirectories();
  
        FS.filesystems = {
          'MEMFS': MEMFS,
        };
      },init:(input, output, error) => {
        assert(!FS.init.initialized, 'FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)');
        FS.init.initialized = true;
  
        FS.ensureErrnoError();
  
        // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
        Module['stdin'] = input || Module['stdin'];
        Module['stdout'] = output || Module['stdout'];
        Module['stderr'] = error || Module['stderr'];
  
        FS.createStandardStreams();
      },quit:() => {
        FS.init.initialized = false;
        // Call musl-internal function to close all stdio streams, so nothing is
        // left in internal buffers.
        ___stdio_exit();
        // close all of our streams
        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i];
          if (!stream) {
            continue;
          }
          FS.close(stream);
        }
      },getMode:(canRead, canWrite) => {
        var mode = 0;
        if (canRead) mode |= 292 | 73;
        if (canWrite) mode |= 146;
        return mode;
      },findObject:(path, dontResolveLastLink) => {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (ret.exists) {
          return ret.object;
        } else {
          return null;
        }
      },analyzePath:(path, dontResolveLastLink) => {
        // operate from within the context of the symlink's target
        try {
          var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          path = lookup.path;
        } catch (e) {
        }
        var ret = {
          isRoot: false, exists: false, error: 0, name: null, path: null, object: null,
          parentExists: false, parentPath: null, parentObject: null
        };
        try {
          var lookup = FS.lookupPath(path, { parent: true });
          ret.parentExists = true;
          ret.parentPath = lookup.path;
          ret.parentObject = lookup.node;
          ret.name = PATH.basename(path);
          lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          ret.exists = true;
          ret.path = lookup.path;
          ret.object = lookup.node;
          ret.name = lookup.node.name;
          ret.isRoot = lookup.path === '/';
        } catch (e) {
          ret.error = e.errno;
        };
        return ret;
      },createPath:(parent, path, canRead, canWrite) => {
        parent = typeof parent == 'string' ? parent : FS.getPath(parent);
        var parts = path.split('/').reverse();
        while (parts.length) {
          var part = parts.pop();
          if (!part) continue;
          var current = PATH.join2(parent, part);
          try {
            FS.mkdir(current);
          } catch (e) {
            // ignore EEXIST
          }
          parent = current;
        }
        return current;
      },createFile:(parent, name, properties, canRead, canWrite) => {
        var path = PATH.join2(typeof parent == 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.create(path, mode);
      },createDataFile:(parent, name, data, canRead, canWrite, canOwn) => {
        var path = name;
        if (parent) {
          parent = typeof parent == 'string' ? parent : FS.getPath(parent);
          path = name ? PATH.join2(parent, name) : parent;
        }
        var mode = FS.getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
          if (typeof data == 'string') {
            var arr = new Array(data.length);
            for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
            data = arr;
          }
          // make sure we can write to the file
          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 577);
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }
        return node;
      },createDevice:(parent, name, input, output) => {
        var path = PATH.join2(typeof parent == 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(!!input, !!output);
        if (!FS.createDevice.major) FS.createDevice.major = 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        // Create a fake device that a set of stream ops to emulate
        // the old behavior.
        FS.registerDevice(dev, {
          open: (stream) => {
            stream.seekable = false;
          },
          close: (stream) => {
            // flush any pending line data
            if (output && output.buffer && output.buffer.length) {
              output(10);
            }
          },
          read: (stream, buffer, offset, length, pos /* ignored */) => {
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
              if (result === undefined && bytesRead === 0) {
                throw new FS.ErrnoError(6);
              }
              if (result === null || result === undefined) break;
              bytesRead++;
              buffer[offset+i] = result;
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }
            return bytesRead;
          },
          write: (stream, buffer, offset, length, pos) => {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset+i]);
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
            }
            if (length) {
              stream.node.timestamp = Date.now();
            }
            return i;
          }
        });
        return FS.mkdev(path, mode, dev);
      },forceLoadFile:(obj) => {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
        if (typeof XMLHttpRequest != 'undefined') {
          throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        } else if (read_) {
          // Command-line.
          try {
            // WARNING: Can't read binary files in V8's d8 or tracemonkey's js, as
            //          read() will try to parse UTF8.
            obj.contents = intArrayFromString(read_(obj.url), true);
            obj.usedBytes = obj.contents.length;
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
        } else {
          throw new Error('Cannot load without read() or XMLHttpRequest.');
        }
      },createLazyFile:(parent, name, url, canRead, canWrite) => {
        // Lazy chunked Uint8Array (implements get and length from Uint8Array). Actual getting is abstracted away for eventual reuse.
        /** @constructor */
        function LazyUint8Array() {
          this.lengthKnown = false;
          this.chunks = []; // Loaded chunks. Index is the chunk number
        }
        LazyUint8Array.prototype.get = /** @this{Object} */ function LazyUint8Array_get(idx) {
          if (idx > this.length-1 || idx < 0) {
            return undefined;
          }
          var chunkOffset = idx % this.chunkSize;
          var chunkNum = (idx / this.chunkSize)|0;
          return this.getter(chunkNum)[chunkOffset];
        };
        LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
          this.getter = getter;
        };
        LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
          // Find length
          var xhr = new XMLHttpRequest();
          xhr.open('HEAD', url, false);
          xhr.send(null);
          if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
          var datalength = Number(xhr.getResponseHeader("Content-length"));
          var header;
          var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
          var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
  
          var chunkSize = 1024*1024; // Chunk size in bytes
  
          if (!hasByteServing) chunkSize = datalength;
  
          // Function to get a range from the remote URL.
          var doXHR = (from, to) => {
            if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
            if (to > datalength-1) throw new Error("only " + datalength + " bytes available! programmer error!");
  
            // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, false);
            if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
  
            // Some hints to the browser that we want binary data.
            xhr.responseType = 'arraybuffer';
            if (xhr.overrideMimeType) {
              xhr.overrideMimeType('text/plain; charset=x-user-defined');
            }
  
            xhr.send(null);
            if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
            if (xhr.response !== undefined) {
              return new Uint8Array(/** @type{Array<number>} */(xhr.response || []));
            } else {
              return intArrayFromString(xhr.responseText || '', true);
            }
          };
          var lazyArray = this;
          lazyArray.setDataGetter((chunkNum) => {
            var start = chunkNum * chunkSize;
            var end = (chunkNum+1) * chunkSize - 1; // including this byte
            end = Math.min(end, datalength-1); // if datalength-1 is selected, this is the last block
            if (typeof lazyArray.chunks[chunkNum] == 'undefined') {
              lazyArray.chunks[chunkNum] = doXHR(start, end);
            }
            if (typeof lazyArray.chunks[chunkNum] == 'undefined') throw new Error('doXHR failed!');
            return lazyArray.chunks[chunkNum];
          });
  
          if (usesGzip || !datalength) {
            // if the server uses gzip or doesn't supply the length, we have to download the whole file to get the (uncompressed) length
            chunkSize = datalength = 1; // this will force getter(0)/doXHR do download the whole file
            datalength = this.getter(0).length;
            chunkSize = datalength;
            out("LazyFiles on gzip forces download of the whole file when length is accessed");
          }
  
          this._length = datalength;
          this._chunkSize = chunkSize;
          this.lengthKnown = true;
        };
        if (typeof XMLHttpRequest != 'undefined') {
          if (!ENVIRONMENT_IS_WORKER) throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
          var lazyArray = new LazyUint8Array();
          Object.defineProperties(lazyArray, {
            length: {
              get: /** @this{Object} */ function() {
                if (!this.lengthKnown) {
                  this.cacheLength();
                }
                return this._length;
              }
            },
            chunkSize: {
              get: /** @this{Object} */ function() {
                if (!this.lengthKnown) {
                  this.cacheLength();
                }
                return this._chunkSize;
              }
            }
          });
  
          var properties = { isDevice: false, contents: lazyArray };
        } else {
          var properties = { isDevice: false, url: url };
        }
  
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        // This is a total hack, but I want to get this lazy file code out of the
        // core of MEMFS. If we want to keep this lazy file concept I feel it should
        // be its own thin LAZYFS proxying calls to MEMFS.
        if (properties.contents) {
          node.contents = properties.contents;
        } else if (properties.url) {
          node.contents = null;
          node.url = properties.url;
        }
        // Add a function that defers querying the file size until it is asked the first time.
        Object.defineProperties(node, {
          usedBytes: {
            get: /** @this {FSNode} */ function() { return this.contents.length; }
          }
        });
        // override each stream op with one that tries to force load the lazy file first
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach((key) => {
          var fn = node.stream_ops[key];
          stream_ops[key] = function forceLoadLazyFile() {
            FS.forceLoadFile(node);
            return fn.apply(null, arguments);
          };
        });
        // use a custom read function
        stream_ops.read = (stream, buffer, offset, length, position) => {
          FS.forceLoadFile(node);
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (contents.slice) { // normal array
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          } else {
            for (var i = 0; i < size; i++) { // LazyUint8Array from sync binary XHR
              buffer[offset + i] = contents.get(position + i);
            }
          }
          return size;
        };
        node.stream_ops = stream_ops;
        return node;
      },createPreloadedFile:(parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => {
        // TODO we should allow people to just pass in a complete filename instead
        // of parent and name being that we just join them anyways
        var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
        var dep = getUniqueRunDependency('cp ' + fullname); // might have several active requests for the same fullname
        function processData(byteArray) {
          function finish(byteArray) {
            if (preFinish) preFinish();
            if (!dontCreateFile) {
              FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
            }
            if (onload) onload();
            removeRunDependency(dep);
          }
          if (Browser.handledByPreloadPlugin(byteArray, fullname, finish, () => {
            if (onerror) onerror();
            removeRunDependency(dep);
          })) {
            return;
          }
          finish(byteArray);
        }
        addRunDependency(dep);
        if (typeof url == 'string') {
          asyncLoad(url, (byteArray) => processData(byteArray), onerror);
        } else {
          processData(url);
        }
      },indexedDB:() => {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      },DB_NAME:() => {
        return 'EM_FS_' + window.location.pathname;
      },DB_VERSION:20,DB_STORE_NAME:"FILE_DATA",saveFilesToDB:(paths, onload, onerror) => {
        onload = onload || (() => {});
        onerror = onerror || (() => {});
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = () => {
          out('creating db');
          var db = openRequest.result;
          db.createObjectStore(FS.DB_STORE_NAME);
        };
        openRequest.onsuccess = () => {
          var db = openRequest.result;
          var transaction = db.transaction([FS.DB_STORE_NAME], 'readwrite');
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach((path) => {
            var putRequest = files.put(FS.analyzePath(path).object.contents, path);
            putRequest.onsuccess = () => { ok++; if (ok + fail == total) finish() };
            putRequest.onerror = () => { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      },loadFilesFromDB:(paths, onload, onerror) => {
        onload = onload || (() => {});
        onerror = onerror || (() => {});
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = onerror; // no database to load from
        openRequest.onsuccess = () => {
          var db = openRequest.result;
          try {
            var transaction = db.transaction([FS.DB_STORE_NAME], 'readonly');
          } catch(e) {
            onerror(e);
            return;
          }
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach((path) => {
            var getRequest = files.get(path);
            getRequest.onsuccess = () => {
              if (FS.analyzePath(path).exists) {
                FS.unlink(path);
              }
              FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
              ok++;
              if (ok + fail == total) finish();
            };
            getRequest.onerror = () => { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      },absolutePath:() => {
        abort('FS.absolutePath has been removed; use PATH_FS.resolve instead');
      },createFolder:() => {
        abort('FS.createFolder has been removed; use FS.mkdir instead');
      },createLink:() => {
        abort('FS.createLink has been removed; use FS.symlink instead');
      },joinPath:() => {
        abort('FS.joinPath has been removed; use PATH.join instead');
      },mmapAlloc:() => {
        abort('FS.mmapAlloc has been replaced by the top level function mmapAlloc');
      },standardizePath:() => {
        abort('FS.standardizePath has been removed; use PATH.normalize instead');
      }};
  var SYSCALLS = {DEFAULT_POLLMASK:5,calculateAt:function(dirfd, path, allowEmpty) {
        if (path[0] === '/') {
          return path;
        }
        // relative path
        var dir;
        if (dirfd === -100) {
          dir = FS.cwd();
        } else {
          var dirstream = FS.getStream(dirfd);
          if (!dirstream) throw new FS.ErrnoError(8);
          dir = dirstream.path;
        }
        if (path.length == 0) {
          if (!allowEmpty) {
            throw new FS.ErrnoError(44);;
          }
          return dir;
        }
        return PATH.join2(dir, path);
      },doStat:function(func, path, buf) {
        try {
          var stat = func(path);
        } catch (e) {
          if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
            // an error occurred while trying to look up the path; we should just report ENOTDIR
            return -54;
          }
          throw e;
        }
        HEAP32[((buf)>>2)] = stat.dev;
        HEAP32[(((buf)+(4))>>2)] = 0;
        HEAP32[(((buf)+(8))>>2)] = stat.ino;
        HEAP32[(((buf)+(12))>>2)] = stat.mode;
        HEAP32[(((buf)+(16))>>2)] = stat.nlink;
        HEAP32[(((buf)+(20))>>2)] = stat.uid;
        HEAP32[(((buf)+(24))>>2)] = stat.gid;
        HEAP32[(((buf)+(28))>>2)] = stat.rdev;
        HEAP32[(((buf)+(32))>>2)] = 0;
        (tempI64 = [stat.size>>>0,(tempDouble=stat.size,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math.min((+(Math.floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[(((buf)+(40))>>2)] = tempI64[0],HEAP32[(((buf)+(44))>>2)] = tempI64[1]);
        HEAP32[(((buf)+(48))>>2)] = 4096;
        HEAP32[(((buf)+(52))>>2)] = stat.blocks;
        HEAP32[(((buf)+(56))>>2)] = (stat.atime.getTime() / 1000)|0;
        HEAP32[(((buf)+(60))>>2)] = 0;
        HEAP32[(((buf)+(64))>>2)] = (stat.mtime.getTime() / 1000)|0;
        HEAP32[(((buf)+(68))>>2)] = 0;
        HEAP32[(((buf)+(72))>>2)] = (stat.ctime.getTime() / 1000)|0;
        HEAP32[(((buf)+(76))>>2)] = 0;
        (tempI64 = [stat.ino>>>0,(tempDouble=stat.ino,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math.min((+(Math.floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[(((buf)+(80))>>2)] = tempI64[0],HEAP32[(((buf)+(84))>>2)] = tempI64[1]);
        return 0;
      },doMsync:function(addr, stream, len, flags, offset) {
        var buffer = HEAPU8.slice(addr, addr + len);
        FS.msync(stream, buffer, offset, len, flags);
      },doMkdir:function(path, mode) {
        // remove a trailing slash, if one - /a/b/ has basename of '', but
        // we want to create b in the context of this function
        path = PATH.normalize(path);
        if (path[path.length-1] === '/') path = path.substr(0, path.length-1);
        FS.mkdir(path, mode, 0);
        return 0;
      },doMknod:function(path, mode, dev) {
        // we don't want this in the JS API as it uses mknod to create all nodes.
        switch (mode & 61440) {
          case 32768:
          case 8192:
          case 24576:
          case 4096:
          case 49152:
            break;
          default: return -28;
        }
        FS.mknod(path, mode, dev);
        return 0;
      },doReadlink:function(path, buf, bufsize) {
        if (bufsize <= 0) return -28;
        var ret = FS.readlink(path);
  
        var len = Math.min(bufsize, lengthBytesUTF8(ret));
        var endChar = HEAP8[buf+len];
        stringToUTF8(ret, buf, bufsize+1);
        // readlink is one of the rare functions that write out a C string, but does never append a null to the output buffer(!)
        // stringToUTF8() always appends a null byte, so restore the character under the null byte after the write.
        HEAP8[buf+len] = endChar;
  
        return len;
      },doAccess:function(path, amode) {
        if (amode & ~7) {
          // need a valid mode
          return -28;
        }
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node) {
          return -44;
        }
        var perms = '';
        if (amode & 4) perms += 'r';
        if (amode & 2) perms += 'w';
        if (amode & 1) perms += 'x';
        if (perms /* otherwise, they've just passed F_OK */ && FS.nodePermissions(node, perms)) {
          return -2;
        }
        return 0;
      },doDup:function(path, flags, suggestFD) {
        var suggest = FS.getStream(suggestFD);
        if (suggest) FS.close(suggest);
        return FS.open(path, flags, 0, suggestFD, suggestFD).fd;
      },doReadv:function(stream, iov, iovcnt, offset) {
        var ret = 0;
        for (var i = 0; i < iovcnt; i++) {
          var ptr = HEAP32[(((iov)+(i*8))>>2)];
          var len = HEAP32[(((iov)+(i*8 + 4))>>2)];
          var curr = FS.read(stream, HEAP8,ptr, len, offset);
          if (curr < 0) return -1;
          ret += curr;
          if (curr < len) break; // nothing more to read
        }
        return ret;
      },doWritev:function(stream, iov, iovcnt, offset) {
        var ret = 0;
        for (var i = 0; i < iovcnt; i++) {
          var ptr = HEAP32[(((iov)+(i*8))>>2)];
          var len = HEAP32[(((iov)+(i*8 + 4))>>2)];
          var curr = FS.write(stream, HEAP8,ptr, len, offset);
          if (curr < 0) return -1;
          ret += curr;
        }
        return ret;
      },varargs:undefined,get:function() {
        assert(SYSCALLS.varargs != undefined);
        SYSCALLS.varargs += 4;
        var ret = HEAP32[(((SYSCALLS.varargs)-(4))>>2)];
        return ret;
      },getStr:function(ptr) {
        var ret = UTF8ToString(ptr);
        return ret;
      },getStreamFromFD:function(fd) {
        var stream = FS.getStream(fd);
        if (!stream) throw new FS.ErrnoError(8);
        return stream;
      },get64:function(low, high) {
        if (low >= 0) assert(high === 0);
        else assert(high === -1);
        return low;
      }};
  function ___syscall_fcntl64(fd, cmd, varargs) {
  SYSCALLS.varargs = varargs;
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      switch (cmd) {
        case 0: {
          var arg = SYSCALLS.get();
          if (arg < 0) {
            return -28;
          }
          var newStream;
          newStream = FS.open(stream.path, stream.flags, 0, arg);
          return newStream.fd;
        }
        case 1:
        case 2:
          return 0;  // FD_CLOEXEC makes no sense for a single process.
        case 3:
          return stream.flags;
        case 4: {
          var arg = SYSCALLS.get();
          stream.flags |= arg;
          return 0;
        }
        case 5:
        /* case 5: Currently in musl F_GETLK64 has same value as F_GETLK, so omitted to avoid duplicate case blocks. If that changes, uncomment this */ {
          
          var arg = SYSCALLS.get();
          var offset = 0;
          // We're always unlocked.
          HEAP16[(((arg)+(offset))>>1)] = 2;
          return 0;
        }
        case 6:
        case 7:
        /* case 6: Currently in musl F_SETLK64 has same value as F_SETLK, so omitted to avoid duplicate case blocks. If that changes, uncomment this */
        /* case 7: Currently in musl F_SETLKW64 has same value as F_SETLKW, so omitted to avoid duplicate case blocks. If that changes, uncomment this */
          
          
          return 0; // Pretend that the locking is successful.
        case 16:
        case 8:
          return -28; // These are for sockets. We don't have them fully implemented yet.
        case 9:
          // musl trusts getown return values, due to a bug where they must be, as they overlap with errors. just return -1 here, so fnctl() returns that, and we set errno ourselves.
          setErrNo(28);
          return -1;
        default: {
          return -28;
        }
      }
    } catch (e) {
    if (typeof FS == 'undefined' || !(e instanceof FS.ErrnoError)) throw e;
    return -e.errno;
  }
  }

  function ___syscall_ioctl(fd, op, varargs) {
  SYSCALLS.varargs = varargs;
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      switch (op) {
        case 21509:
        case 21505: {
          if (!stream.tty) return -59;
          return 0;
        }
        case 21510:
        case 21511:
        case 21512:
        case 21506:
        case 21507:
        case 21508: {
          if (!stream.tty) return -59;
          return 0; // no-op, not actually adjusting terminal settings
        }
        case 21519: {
          if (!stream.tty) return -59;
          var argp = SYSCALLS.get();
          HEAP32[((argp)>>2)] = 0;
          return 0;
        }
        case 21520: {
          if (!stream.tty) return -59;
          return -28; // not supported
        }
        case 21531: {
          var argp = SYSCALLS.get();
          return FS.ioctl(stream, op, argp);
        }
        case 21523: {
          // TODO: in theory we should write to the winsize struct that gets
          // passed in, but for now musl doesn't read anything on it
          if (!stream.tty) return -59;
          return 0;
        }
        case 21524: {
          // TODO: technically, this ioctl call should change the window size.
          // but, since emscripten doesn't have any concept of a terminal window
          // yet, we'll just silently throw it away as we do TIOCGWINSZ
          if (!stream.tty) return -59;
          return 0;
        }
        default: abort('bad ioctl syscall ' + op);
      }
    } catch (e) {
    if (typeof FS == 'undefined' || !(e instanceof FS.ErrnoError)) throw e;
    return -e.errno;
  }
  }

  function ___syscall_mkdir(path, mode) {
  try {
  
      path = SYSCALLS.getStr(path);
      return SYSCALLS.doMkdir(path, mode);
    } catch (e) {
    if (typeof FS == 'undefined' || !(e instanceof FS.ErrnoError)) throw e;
    return -e.errno;
  }
  }

  function ___syscall_open(path, flags, varargs) {
  SYSCALLS.varargs = varargs;
  try {
  
      var pathname = SYSCALLS.getStr(path);
      var mode = varargs ? SYSCALLS.get() : 0;
      var stream = FS.open(pathname, flags, mode);
      return stream.fd;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e instanceof FS.ErrnoError)) throw e;
    return -e.errno;
  }
  }

  function __gmtime_js(time, tmPtr) {
      var date = new Date(HEAP32[((time)>>2)]*1000);
      HEAP32[((tmPtr)>>2)] = date.getUTCSeconds();
      HEAP32[(((tmPtr)+(4))>>2)] = date.getUTCMinutes();
      HEAP32[(((tmPtr)+(8))>>2)] = date.getUTCHours();
      HEAP32[(((tmPtr)+(12))>>2)] = date.getUTCDate();
      HEAP32[(((tmPtr)+(16))>>2)] = date.getUTCMonth();
      HEAP32[(((tmPtr)+(20))>>2)] = date.getUTCFullYear()-1900;
      HEAP32[(((tmPtr)+(24))>>2)] = date.getUTCDay();
      var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
      var yday = ((date.getTime() - start) / (1000 * 60 * 60 * 24))|0;
      HEAP32[(((tmPtr)+(28))>>2)] = yday;
    }

  function _tzset_impl(timezone, daylight, tzname) {
      var currentYear = new Date().getFullYear();
      var winter = new Date(currentYear, 0, 1);
      var summer = new Date(currentYear, 6, 1);
      var winterOffset = winter.getTimezoneOffset();
      var summerOffset = summer.getTimezoneOffset();
  
      // Local standard timezone offset. Local standard time is not adjusted for daylight savings.
      // This code uses the fact that getTimezoneOffset returns a greater value during Standard Time versus Daylight Saving Time (DST).
      // Thus it determines the expected output during Standard Time, and it compares whether the output of the given date the same (Standard) or less (DST).
      var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
  
      // timezone is specified as seconds west of UTC ("The external variable
      // `timezone` shall be set to the difference, in seconds, between
      // Coordinated Universal Time (UTC) and local standard time."), the same
      // as returned by stdTimezoneOffset.
      // See http://pubs.opengroup.org/onlinepubs/009695399/functions/tzset.html
      HEAP32[((timezone)>>2)] = stdTimezoneOffset * 60;
  
      HEAP32[((daylight)>>2)] = Number(winterOffset != summerOffset);
  
      function extractZone(date) {
        var match = date.toTimeString().match(/\(([A-Za-z ]+)\)$/);
        return match ? match[1] : "GMT";
      };
      var winterName = extractZone(winter);
      var summerName = extractZone(summer);
      var winterNamePtr = allocateUTF8(winterName);
      var summerNamePtr = allocateUTF8(summerName);
      if (summerOffset < winterOffset) {
        // Northern hemisphere
        HEAP32[((tzname)>>2)] = winterNamePtr;
        HEAP32[(((tzname)+(4))>>2)] = summerNamePtr;
      } else {
        HEAP32[((tzname)>>2)] = summerNamePtr;
        HEAP32[(((tzname)+(4))>>2)] = winterNamePtr;
      }
    }
  function __tzset_js(timezone, daylight, tzname) {
      // TODO: Use (malleable) environment variables instead of system settings.
      if (__tzset_js.called) return;
      __tzset_js.called = true;
      _tzset_impl(timezone, daylight, tzname);
    }

  function _abort() {
      abort('native code called abort()');
    }

  var _emscripten_get_now;if (ENVIRONMENT_IS_NODE) {
    _emscripten_get_now = () => {
      var t = process['hrtime']();
      return t[0] * 1e3 + t[1] / 1e6;
    };
  } else _emscripten_get_now = () => performance.now();
  ;
  
  var _emscripten_get_now_is_monotonic = true;;
  function _clock_gettime(clk_id, tp) {
      // int clock_gettime(clockid_t clk_id, struct timespec *tp);
      var now;
      if (clk_id === 0) {
        now = Date.now();
      } else if ((clk_id === 1 || clk_id === 4) && _emscripten_get_now_is_monotonic) {
        now = _emscripten_get_now();
      } else {
        setErrNo(28);
        return -1;
      }
      HEAP32[((tp)>>2)] = (now/1000)|0; // seconds
      HEAP32[(((tp)+(4))>>2)] = ((now % 1000)*1000*1000)|0; // nanoseconds
      return 0;
    }


  function _emscripten_memcpy_big(dest, src, num) {
      HEAPU8.copyWithin(dest, src, src + num);
    }

  function _emscripten_get_heap_max() {
      return HEAPU8.length;
    }
  
  function abortOnCannotGrowMemory(requestedSize) {
      abort('Cannot enlarge memory arrays to size ' + requestedSize + ' bytes (OOM). Either (1) compile with  -s INITIAL_MEMORY=X  with X higher than the current value ' + HEAP8.length + ', (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ');
    }
  function _emscripten_resize_heap(requestedSize) {
      var oldSize = HEAPU8.length;
      requestedSize = requestedSize >>> 0;
      abortOnCannotGrowMemory(requestedSize);
    }

  var ENV = {};
  
  function getExecutableName() {
      return thisProgram || './this.program';
    }
  function getEnvStrings() {
      if (!getEnvStrings.strings) {
        // Default values.
        // Browser language detection #8751
        var lang = ((typeof navigator == 'object' && navigator.languages && navigator.languages[0]) || 'C').replace('-', '_') + '.UTF-8';
        var env = {
          'USER': 'web_user',
          'LOGNAME': 'web_user',
          'PATH': '/',
          'PWD': '/',
          'HOME': '/home/web_user',
          'LANG': lang,
          '_': getExecutableName()
        };
        // Apply the user-provided values, if any.
        for (var x in ENV) {
          // x is a key in ENV; if ENV[x] is undefined, that means it was
          // explicitly set to be so. We allow user code to do that to
          // force variables with default values to remain unset.
          if (ENV[x] === undefined) delete env[x];
          else env[x] = ENV[x];
        }
        var strings = [];
        for (var x in env) {
          strings.push(x + '=' + env[x]);
        }
        getEnvStrings.strings = strings;
      }
      return getEnvStrings.strings;
    }
  function _environ_get(__environ, environ_buf) {
      var bufSize = 0;
      getEnvStrings().forEach(function(string, i) {
        var ptr = environ_buf + bufSize;
        HEAP32[(((__environ)+(i * 4))>>2)] = ptr;
        writeAsciiToMemory(string, ptr);
        bufSize += string.length + 1;
      });
      return 0;
    }

  function _environ_sizes_get(penviron_count, penviron_buf_size) {
      var strings = getEnvStrings();
      HEAP32[((penviron_count)>>2)] = strings.length;
      var bufSize = 0;
      strings.forEach(function(string) {
        bufSize += string.length + 1;
      });
      HEAP32[((penviron_buf_size)>>2)] = bufSize;
      return 0;
    }

  function _exit(status) {
      // void _exit(int status);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/exit.html
      exit(status);
    }

  function _fd_close(fd) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      FS.close(stream);
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e instanceof FS.ErrnoError)) throw e;
    return e.errno;
  }
  }

  function _fd_fdstat_get(fd, pbuf) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      // All character devices are terminals (other things a Linux system would
      // assume is a character device, like the mouse, we have special APIs for).
      var type = stream.tty ? 2 :
                 FS.isDir(stream.mode) ? 3 :
                 FS.isLink(stream.mode) ? 7 :
                 4;
      HEAP8[((pbuf)>>0)] = type;
      // TODO HEAP16[(((pbuf)+(2))>>1)] = ?;
      // TODO (tempI64 = [?>>>0,(tempDouble=?,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math.min((+(Math.floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[(((pbuf)+(8))>>2)] = tempI64[0],HEAP32[(((pbuf)+(12))>>2)] = tempI64[1]);
      // TODO (tempI64 = [?>>>0,(tempDouble=?,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math.min((+(Math.floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[(((pbuf)+(16))>>2)] = tempI64[0],HEAP32[(((pbuf)+(20))>>2)] = tempI64[1]);
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e instanceof FS.ErrnoError)) throw e;
    return e.errno;
  }
  }

  function _fd_read(fd, iov, iovcnt, pnum) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = SYSCALLS.doReadv(stream, iov, iovcnt);
      HEAP32[((pnum)>>2)] = num;
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e instanceof FS.ErrnoError)) throw e;
    return e.errno;
  }
  }

  function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
  try {
  
      
      var stream = SYSCALLS.getStreamFromFD(fd);
      var HIGH_OFFSET = 0x100000000; // 2^32
      // use an unsigned operator on low and shift high by 32-bits
      var offset = offset_high * HIGH_OFFSET + (offset_low >>> 0);
  
      var DOUBLE_LIMIT = 0x20000000000000; // 2^53
      // we also check for equality since DOUBLE_LIMIT + 1 == DOUBLE_LIMIT
      if (offset <= -DOUBLE_LIMIT || offset >= DOUBLE_LIMIT) {
        return -61;
      }
  
      FS.llseek(stream, offset, whence);
      (tempI64 = [stream.position>>>0,(tempDouble=stream.position,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math.min((+(Math.floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[((newOffset)>>2)] = tempI64[0],HEAP32[(((newOffset)+(4))>>2)] = tempI64[1]);
      if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null; // reset readdir state
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e instanceof FS.ErrnoError)) throw e;
    return e.errno;
  }
  }

  function _fd_write(fd, iov, iovcnt, pnum) {
  try {
  
      ;
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = SYSCALLS.doWritev(stream, iov, iovcnt);
      HEAP32[((pnum)>>2)] = num;
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e instanceof FS.ErrnoError)) throw e;
    return e.errno;
  }
  }

  function _gettimeofday(ptr) {
      var now = Date.now();
      HEAP32[((ptr)>>2)] = (now/1000)|0; // seconds
      HEAP32[(((ptr)+(4))>>2)] = ((now % 1000)*1000)|0; // microseconds
      return 0;
    }

  function _setTempRet0(val) {
      setTempRet0(val);
    }

  function __isLeapYear(year) {
        return year%4 === 0 && (year%100 !== 0 || year%400 === 0);
    }
  
  function __arraySum(array, index) {
      var sum = 0;
      for (var i = 0; i <= index; sum += array[i++]) {
        // no-op
      }
      return sum;
    }
  
  var __MONTH_DAYS_LEAP = [31,29,31,30,31,30,31,31,30,31,30,31];
  
  var __MONTH_DAYS_REGULAR = [31,28,31,30,31,30,31,31,30,31,30,31];
  function __addDays(date, days) {
      var newDate = new Date(date.getTime());
      while (days > 0) {
        var leap = __isLeapYear(newDate.getFullYear());
        var currentMonth = newDate.getMonth();
        var daysInCurrentMonth = (leap ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR)[currentMonth];
  
        if (days > daysInCurrentMonth-newDate.getDate()) {
          // we spill over to next month
          days -= (daysInCurrentMonth-newDate.getDate()+1);
          newDate.setDate(1);
          if (currentMonth < 11) {
            newDate.setMonth(currentMonth+1)
          } else {
            newDate.setMonth(0);
            newDate.setFullYear(newDate.getFullYear()+1);
          }
        } else {
          // we stay in current month
          newDate.setDate(newDate.getDate()+days);
          return newDate;
        }
      }
  
      return newDate;
    }
  function _strftime(s, maxsize, format, tm) {
      // size_t strftime(char *restrict s, size_t maxsize, const char *restrict format, const struct tm *restrict timeptr);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/strftime.html
  
      var tm_zone = HEAP32[(((tm)+(40))>>2)];
  
      var date = {
        tm_sec: HEAP32[((tm)>>2)],
        tm_min: HEAP32[(((tm)+(4))>>2)],
        tm_hour: HEAP32[(((tm)+(8))>>2)],
        tm_mday: HEAP32[(((tm)+(12))>>2)],
        tm_mon: HEAP32[(((tm)+(16))>>2)],
        tm_year: HEAP32[(((tm)+(20))>>2)],
        tm_wday: HEAP32[(((tm)+(24))>>2)],
        tm_yday: HEAP32[(((tm)+(28))>>2)],
        tm_isdst: HEAP32[(((tm)+(32))>>2)],
        tm_gmtoff: HEAP32[(((tm)+(36))>>2)],
        tm_zone: tm_zone ? UTF8ToString(tm_zone) : ''
      };
  
      var pattern = UTF8ToString(format);
  
      // expand format
      var EXPANSION_RULES_1 = {
        '%c': '%a %b %d %H:%M:%S %Y',     // Replaced by the locale's appropriate date and time representation - e.g., Mon Aug  3 14:02:01 2013
        '%D': '%m/%d/%y',                 // Equivalent to %m / %d / %y
        '%F': '%Y-%m-%d',                 // Equivalent to %Y - %m - %d
        '%h': '%b',                       // Equivalent to %b
        '%r': '%I:%M:%S %p',              // Replaced by the time in a.m. and p.m. notation
        '%R': '%H:%M',                    // Replaced by the time in 24-hour notation
        '%T': '%H:%M:%S',                 // Replaced by the time
        '%x': '%m/%d/%y',                 // Replaced by the locale's appropriate date representation
        '%X': '%H:%M:%S',                 // Replaced by the locale's appropriate time representation
        // Modified Conversion Specifiers
        '%Ec': '%c',                      // Replaced by the locale's alternative appropriate date and time representation.
        '%EC': '%C',                      // Replaced by the name of the base year (period) in the locale's alternative representation.
        '%Ex': '%m/%d/%y',                // Replaced by the locale's alternative date representation.
        '%EX': '%H:%M:%S',                // Replaced by the locale's alternative time representation.
        '%Ey': '%y',                      // Replaced by the offset from %EC (year only) in the locale's alternative representation.
        '%EY': '%Y',                      // Replaced by the full alternative year representation.
        '%Od': '%d',                      // Replaced by the day of the month, using the locale's alternative numeric symbols, filled as needed with leading zeros if there is any alternative symbol for zero; otherwise, with leading <space> characters.
        '%Oe': '%e',                      // Replaced by the day of the month, using the locale's alternative numeric symbols, filled as needed with leading <space> characters.
        '%OH': '%H',                      // Replaced by the hour (24-hour clock) using the locale's alternative numeric symbols.
        '%OI': '%I',                      // Replaced by the hour (12-hour clock) using the locale's alternative numeric symbols.
        '%Om': '%m',                      // Replaced by the month using the locale's alternative numeric symbols.
        '%OM': '%M',                      // Replaced by the minutes using the locale's alternative numeric symbols.
        '%OS': '%S',                      // Replaced by the seconds using the locale's alternative numeric symbols.
        '%Ou': '%u',                      // Replaced by the weekday as a number in the locale's alternative representation (Monday=1).
        '%OU': '%U',                      // Replaced by the week number of the year (Sunday as the first day of the week, rules corresponding to %U ) using the locale's alternative numeric symbols.
        '%OV': '%V',                      // Replaced by the week number of the year (Monday as the first day of the week, rules corresponding to %V ) using the locale's alternative numeric symbols.
        '%Ow': '%w',                      // Replaced by the number of the weekday (Sunday=0) using the locale's alternative numeric symbols.
        '%OW': '%W',                      // Replaced by the week number of the year (Monday as the first day of the week) using the locale's alternative numeric symbols.
        '%Oy': '%y',                      // Replaced by the year (offset from %C ) using the locale's alternative numeric symbols.
      };
      for (var rule in EXPANSION_RULES_1) {
        pattern = pattern.replace(new RegExp(rule, 'g'), EXPANSION_RULES_1[rule]);
      }
  
      var WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
      function leadingSomething(value, digits, character) {
        var str = typeof value == 'number' ? value.toString() : (value || '');
        while (str.length < digits) {
          str = character[0]+str;
        }
        return str;
      }
  
      function leadingNulls(value, digits) {
        return leadingSomething(value, digits, '0');
      }
  
      function compareByDay(date1, date2) {
        function sgn(value) {
          return value < 0 ? -1 : (value > 0 ? 1 : 0);
        }
  
        var compare;
        if ((compare = sgn(date1.getFullYear()-date2.getFullYear())) === 0) {
          if ((compare = sgn(date1.getMonth()-date2.getMonth())) === 0) {
            compare = sgn(date1.getDate()-date2.getDate());
          }
        }
        return compare;
      }
  
      function getFirstWeekStartDate(janFourth) {
          switch (janFourth.getDay()) {
            case 0: // Sunday
              return new Date(janFourth.getFullYear()-1, 11, 29);
            case 1: // Monday
              return janFourth;
            case 2: // Tuesday
              return new Date(janFourth.getFullYear(), 0, 3);
            case 3: // Wednesday
              return new Date(janFourth.getFullYear(), 0, 2);
            case 4: // Thursday
              return new Date(janFourth.getFullYear(), 0, 1);
            case 5: // Friday
              return new Date(janFourth.getFullYear()-1, 11, 31);
            case 6: // Saturday
              return new Date(janFourth.getFullYear()-1, 11, 30);
          }
      }
  
      function getWeekBasedYear(date) {
          var thisDate = __addDays(new Date(date.tm_year+1900, 0, 1), date.tm_yday);
  
          var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4);
          var janFourthNextYear = new Date(thisDate.getFullYear()+1, 0, 4);
  
          var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
          var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
  
          if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
            // this date is after the start of the first week of this year
            if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
              return thisDate.getFullYear()+1;
            } else {
              return thisDate.getFullYear();
            }
          } else {
            return thisDate.getFullYear()-1;
          }
      }
  
      var EXPANSION_RULES_2 = {
        '%a': function(date) {
          return WEEKDAYS[date.tm_wday].substring(0,3);
        },
        '%A': function(date) {
          return WEEKDAYS[date.tm_wday];
        },
        '%b': function(date) {
          return MONTHS[date.tm_mon].substring(0,3);
        },
        '%B': function(date) {
          return MONTHS[date.tm_mon];
        },
        '%C': function(date) {
          var year = date.tm_year+1900;
          return leadingNulls((year/100)|0,2);
        },
        '%d': function(date) {
          return leadingNulls(date.tm_mday, 2);
        },
        '%e': function(date) {
          return leadingSomething(date.tm_mday, 2, ' ');
        },
        '%g': function(date) {
          // %g, %G, and %V give values according to the ISO 8601:2000 standard week-based year.
          // In this system, weeks begin on a Monday and week 1 of the year is the week that includes
          // January 4th, which is also the week that includes the first Thursday of the year, and
          // is also the first week that contains at least four days in the year.
          // If the first Monday of January is the 2nd, 3rd, or 4th, the preceding days are part of
          // the last week of the preceding year; thus, for Saturday 2nd January 1999,
          // %G is replaced by 1998 and %V is replaced by 53. If December 29th, 30th,
          // or 31st is a Monday, it and any following days are part of week 1 of the following year.
          // Thus, for Tuesday 30th December 1997, %G is replaced by 1998 and %V is replaced by 01.
  
          return getWeekBasedYear(date).toString().substring(2);
        },
        '%G': function(date) {
          return getWeekBasedYear(date);
        },
        '%H': function(date) {
          return leadingNulls(date.tm_hour, 2);
        },
        '%I': function(date) {
          var twelveHour = date.tm_hour;
          if (twelveHour == 0) twelveHour = 12;
          else if (twelveHour > 12) twelveHour -= 12;
          return leadingNulls(twelveHour, 2);
        },
        '%j': function(date) {
          // Day of the year (001-366)
          return leadingNulls(date.tm_mday+__arraySum(__isLeapYear(date.tm_year+1900) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, date.tm_mon-1), 3);
        },
        '%m': function(date) {
          return leadingNulls(date.tm_mon+1, 2);
        },
        '%M': function(date) {
          return leadingNulls(date.tm_min, 2);
        },
        '%n': function() {
          return '\n';
        },
        '%p': function(date) {
          if (date.tm_hour >= 0 && date.tm_hour < 12) {
            return 'AM';
          } else {
            return 'PM';
          }
        },
        '%S': function(date) {
          return leadingNulls(date.tm_sec, 2);
        },
        '%t': function() {
          return '\t';
        },
        '%u': function(date) {
          return date.tm_wday || 7;
        },
        '%U': function(date) {
          // Replaced by the week number of the year as a decimal number [00,53].
          // The first Sunday of January is the first day of week 1;
          // days in the new year before this are in week 0. [ tm_year, tm_wday, tm_yday]
          var janFirst = new Date(date.tm_year+1900, 0, 1);
          var firstSunday = janFirst.getDay() === 0 ? janFirst : __addDays(janFirst, 7-janFirst.getDay());
          var endDate = new Date(date.tm_year+1900, date.tm_mon, date.tm_mday);
  
          // is target date after the first Sunday?
          if (compareByDay(firstSunday, endDate) < 0) {
            // calculate difference in days between first Sunday and endDate
            var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth()-1)-31;
            var firstSundayUntilEndJanuary = 31-firstSunday.getDate();
            var days = firstSundayUntilEndJanuary+februaryFirstUntilEndMonth+endDate.getDate();
            return leadingNulls(Math.ceil(days/7), 2);
          }
  
          return compareByDay(firstSunday, janFirst) === 0 ? '01': '00';
        },
        '%V': function(date) {
          // Replaced by the week number of the year (Monday as the first day of the week)
          // as a decimal number [01,53]. If the week containing 1 January has four
          // or more days in the new year, then it is considered week 1.
          // Otherwise, it is the last week of the previous year, and the next week is week 1.
          // Both January 4th and the first Thursday of January are always in week 1. [ tm_year, tm_wday, tm_yday]
          var janFourthThisYear = new Date(date.tm_year+1900, 0, 4);
          var janFourthNextYear = new Date(date.tm_year+1901, 0, 4);
  
          var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
          var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
  
          var endDate = __addDays(new Date(date.tm_year+1900, 0, 1), date.tm_yday);
  
          if (compareByDay(endDate, firstWeekStartThisYear) < 0) {
            // if given date is before this years first week, then it belongs to the 53rd week of last year
            return '53';
          }
  
          if (compareByDay(firstWeekStartNextYear, endDate) <= 0) {
            // if given date is after next years first week, then it belongs to the 01th week of next year
            return '01';
          }
  
          // given date is in between CW 01..53 of this calendar year
          var daysDifference;
          if (firstWeekStartThisYear.getFullYear() < date.tm_year+1900) {
            // first CW of this year starts last year
            daysDifference = date.tm_yday+32-firstWeekStartThisYear.getDate()
          } else {
            // first CW of this year starts this year
            daysDifference = date.tm_yday+1-firstWeekStartThisYear.getDate();
          }
          return leadingNulls(Math.ceil(daysDifference/7), 2);
        },
        '%w': function(date) {
          return date.tm_wday;
        },
        '%W': function(date) {
          // Replaced by the week number of the year as a decimal number [00,53].
          // The first Monday of January is the first day of week 1;
          // days in the new year before this are in week 0. [ tm_year, tm_wday, tm_yday]
          var janFirst = new Date(date.tm_year, 0, 1);
          var firstMonday = janFirst.getDay() === 1 ? janFirst : __addDays(janFirst, janFirst.getDay() === 0 ? 1 : 7-janFirst.getDay()+1);
          var endDate = new Date(date.tm_year+1900, date.tm_mon, date.tm_mday);
  
          // is target date after the first Monday?
          if (compareByDay(firstMonday, endDate) < 0) {
            var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth()-1)-31;
            var firstMondayUntilEndJanuary = 31-firstMonday.getDate();
            var days = firstMondayUntilEndJanuary+februaryFirstUntilEndMonth+endDate.getDate();
            return leadingNulls(Math.ceil(days/7), 2);
          }
          return compareByDay(firstMonday, janFirst) === 0 ? '01': '00';
        },
        '%y': function(date) {
          // Replaced by the last two digits of the year as a decimal number [00,99]. [ tm_year]
          return (date.tm_year+1900).toString().substring(2);
        },
        '%Y': function(date) {
          // Replaced by the year as a decimal number (for example, 1997). [ tm_year]
          return date.tm_year+1900;
        },
        '%z': function(date) {
          // Replaced by the offset from UTC in the ISO 8601:2000 standard format ( +hhmm or -hhmm ).
          // For example, "-0430" means 4 hours 30 minutes behind UTC (west of Greenwich).
          var off = date.tm_gmtoff;
          var ahead = off >= 0;
          off = Math.abs(off) / 60;
          // convert from minutes into hhmm format (which means 60 minutes = 100 units)
          off = (off / 60)*100 + (off % 60);
          return (ahead ? '+' : '-') + String("0000" + off).slice(-4);
        },
        '%Z': function(date) {
          return date.tm_zone;
        },
        '%%': function() {
          return '%';
        }
      };
  
      // Replace %% with a pair of NULLs (which cannot occur in a C string), then
      // re-inject them after processing.
      pattern = pattern.replace(/%%/g, '\0\0')
      for (var rule in EXPANSION_RULES_2) {
        if (pattern.includes(rule)) {
          pattern = pattern.replace(new RegExp(rule, 'g'), EXPANSION_RULES_2[rule](date));
        }
      }
      pattern = pattern.replace(/\0\0/g, '%')
  
      var bytes = intArrayFromString(pattern, false);
      if (bytes.length > maxsize) {
        return 0;
      }
  
      writeArrayToMemory(bytes, s);
      return bytes.length-1;
    }

  function _strftime_l(s, maxsize, format, tm) {
      return _strftime(s, maxsize, format, tm); // no locale support yet
    }

  function _time(ptr) {
      ;
      var ret = (Date.now()/1000)|0;
      if (ptr) {
        HEAP32[((ptr)>>2)] = ret;
      }
      return ret;
    }


  var FSNode = /** @constructor */ function(parent, name, mode, rdev) {
    if (!parent) {
      parent = this;  // root node sets parent to itself
    }
    this.parent = parent;
    this.mount = parent.mount;
    this.mounted = null;
    this.id = FS.nextInode++;
    this.name = name;
    this.mode = mode;
    this.node_ops = {};
    this.stream_ops = {};
    this.rdev = rdev;
  };
  var readMode = 292/*292*/ | 73/*73*/;
  var writeMode = 146/*146*/;
  Object.defineProperties(FSNode.prototype, {
   read: {
    get: /** @this{FSNode} */function() {
     return (this.mode & readMode) === readMode;
    },
    set: /** @this{FSNode} */function(val) {
     val ? this.mode |= readMode : this.mode &= ~readMode;
    }
   },
   write: {
    get: /** @this{FSNode} */function() {
     return (this.mode & writeMode) === writeMode;
    },
    set: /** @this{FSNode} */function(val) {
     val ? this.mode |= writeMode : this.mode &= ~writeMode;
    }
   },
   isFolder: {
    get: /** @this{FSNode} */function() {
     return FS.isDir(this.mode);
    }
   },
   isDevice: {
    get: /** @this{FSNode} */function() {
     return FS.isChrdev(this.mode);
    }
   }
  });
  FS.FSNode = FSNode;
  FS.staticInit();Module["FS_createPath"] = FS.createPath;Module["FS_createDataFile"] = FS.createDataFile;Module["FS_createPreloadedFile"] = FS.createPreloadedFile;Module["FS_createLazyFile"] = FS.createLazyFile;Module["FS_createDevice"] = FS.createDevice;Module["FS_unlink"] = FS.unlink;;
ERRNO_CODES = {
      'EPERM': 63,
      'ENOENT': 44,
      'ESRCH': 71,
      'EINTR': 27,
      'EIO': 29,
      'ENXIO': 60,
      'E2BIG': 1,
      'ENOEXEC': 45,
      'EBADF': 8,
      'ECHILD': 12,
      'EAGAIN': 6,
      'EWOULDBLOCK': 6,
      'ENOMEM': 48,
      'EACCES': 2,
      'EFAULT': 21,
      'ENOTBLK': 105,
      'EBUSY': 10,
      'EEXIST': 20,
      'EXDEV': 75,
      'ENODEV': 43,
      'ENOTDIR': 54,
      'EISDIR': 31,
      'EINVAL': 28,
      'ENFILE': 41,
      'EMFILE': 33,
      'ENOTTY': 59,
      'ETXTBSY': 74,
      'EFBIG': 22,
      'ENOSPC': 51,
      'ESPIPE': 70,
      'EROFS': 69,
      'EMLINK': 34,
      'EPIPE': 64,
      'EDOM': 18,
      'ERANGE': 68,
      'ENOMSG': 49,
      'EIDRM': 24,
      'ECHRNG': 106,
      'EL2NSYNC': 156,
      'EL3HLT': 107,
      'EL3RST': 108,
      'ELNRNG': 109,
      'EUNATCH': 110,
      'ENOCSI': 111,
      'EL2HLT': 112,
      'EDEADLK': 16,
      'ENOLCK': 46,
      'EBADE': 113,
      'EBADR': 114,
      'EXFULL': 115,
      'ENOANO': 104,
      'EBADRQC': 103,
      'EBADSLT': 102,
      'EDEADLOCK': 16,
      'EBFONT': 101,
      'ENOSTR': 100,
      'ENODATA': 116,
      'ETIME': 117,
      'ENOSR': 118,
      'ENONET': 119,
      'ENOPKG': 120,
      'EREMOTE': 121,
      'ENOLINK': 47,
      'EADV': 122,
      'ESRMNT': 123,
      'ECOMM': 124,
      'EPROTO': 65,
      'EMULTIHOP': 36,
      'EDOTDOT': 125,
      'EBADMSG': 9,
      'ENOTUNIQ': 126,
      'EBADFD': 127,
      'EREMCHG': 128,
      'ELIBACC': 129,
      'ELIBBAD': 130,
      'ELIBSCN': 131,
      'ELIBMAX': 132,
      'ELIBEXEC': 133,
      'ENOSYS': 52,
      'ENOTEMPTY': 55,
      'ENAMETOOLONG': 37,
      'ELOOP': 32,
      'EOPNOTSUPP': 138,
      'EPFNOSUPPORT': 139,
      'ECONNRESET': 15,
      'ENOBUFS': 42,
      'EAFNOSUPPORT': 5,
      'EPROTOTYPE': 67,
      'ENOTSOCK': 57,
      'ENOPROTOOPT': 50,
      'ESHUTDOWN': 140,
      'ECONNREFUSED': 14,
      'EADDRINUSE': 3,
      'ECONNABORTED': 13,
      'ENETUNREACH': 40,
      'ENETDOWN': 38,
      'ETIMEDOUT': 73,
      'EHOSTDOWN': 142,
      'EHOSTUNREACH': 23,
      'EINPROGRESS': 26,
      'EALREADY': 7,
      'EDESTADDRREQ': 17,
      'EMSGSIZE': 35,
      'EPROTONOSUPPORT': 66,
      'ESOCKTNOSUPPORT': 137,
      'EADDRNOTAVAIL': 4,
      'ENETRESET': 39,
      'EISCONN': 30,
      'ENOTCONN': 53,
      'ETOOMANYREFS': 141,
      'EUSERS': 136,
      'EDQUOT': 19,
      'ESTALE': 72,
      'ENOTSUP': 138,
      'ENOMEDIUM': 148,
      'EILSEQ': 25,
      'EOVERFLOW': 61,
      'ECANCELED': 11,
      'ENOTRECOVERABLE': 56,
      'EOWNERDEAD': 62,
      'ESTRPIPE': 135,
    };;
var ASSERTIONS = true;



/** @type {function(string, boolean=, number=)} */
function intArrayFromString(stringy, dontAddNull, length) {
  var len = length > 0 ? length : lengthBytesUTF8(stringy)+1;
  var u8array = new Array(len);
  var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
  if (dontAddNull) u8array.length = numBytesWritten;
  return u8array;
}

function intArrayToString(array) {
  var ret = [];
  for (var i = 0; i < array.length; i++) {
    var chr = array[i];
    if (chr > 0xFF) {
      if (ASSERTIONS) {
        assert(false, 'Character code ' + chr + ' (' + String.fromCharCode(chr) + ')  at offset ' + i + ' not in 0x00-0xFF.');
      }
      chr &= 0xFF;
    }
    ret.push(String.fromCharCode(chr));
  }
  return ret.join('');
}


// Copied from https://github.com/strophe/strophejs/blob/e06d027/src/polyfills.js#L149

// This code was written by Tyler Akins and has been placed in the
// public domain.  It would be nice if you left this header intact.
// Base64 code from Tyler Akins -- http://rumkin.com

/**
 * Decodes a base64 string.
 * @param {string} input The string to decode.
 */
var decodeBase64 = typeof atob == 'function' ? atob : function (input) {
  var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  var output = '';
  var chr1, chr2, chr3;
  var enc1, enc2, enc3, enc4;
  var i = 0;
  // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
  do {
    enc1 = keyStr.indexOf(input.charAt(i++));
    enc2 = keyStr.indexOf(input.charAt(i++));
    enc3 = keyStr.indexOf(input.charAt(i++));
    enc4 = keyStr.indexOf(input.charAt(i++));

    chr1 = (enc1 << 2) | (enc2 >> 4);
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    chr3 = ((enc3 & 3) << 6) | enc4;

    output = output + String.fromCharCode(chr1);

    if (enc3 !== 64) {
      output = output + String.fromCharCode(chr2);
    }
    if (enc4 !== 64) {
      output = output + String.fromCharCode(chr3);
    }
  } while (i < input.length);
  return output;
};

// Converts a string of base64 into a byte array.
// Throws error on invalid input.
function intArrayFromBase64(s) {
  if (typeof ENVIRONMENT_IS_NODE == 'boolean' && ENVIRONMENT_IS_NODE) {
    var buf = Buffer.from(s, 'base64');
    return new Uint8Array(buf['buffer'], buf['byteOffset'], buf['byteLength']);
  }

  try {
    var decoded = decodeBase64(s);
    var bytes = new Uint8Array(decoded.length);
    for (var i = 0 ; i < decoded.length ; ++i) {
      bytes[i] = decoded.charCodeAt(i);
    }
    return bytes;
  } catch (_) {
    throw new Error('Converting base64 string to bytes failed.');
  }
}

// If filename is a base64 data URI, parses and returns data (Buffer on node,
// Uint8Array otherwise). If filename is not a base64 data URI, returns undefined.
function tryParseAsDataURI(filename) {
  if (!isDataURI(filename)) {
    return;
  }

  return intArrayFromBase64(filename.slice(dataURIPrefix.length));
}


function checkIncomingModuleAPI() {
  ignoredModuleProp('fetchSettings');
}
var asmLibraryArg = {
  "__cxa_allocate_exception": ___cxa_allocate_exception,
  "__cxa_throw": ___cxa_throw,
  "__syscall_fcntl64": ___syscall_fcntl64,
  "__syscall_ioctl": ___syscall_ioctl,
  "__syscall_mkdir": ___syscall_mkdir,
  "__syscall_open": ___syscall_open,
  "_gmtime_js": __gmtime_js,
  "_tzset_js": __tzset_js,
  "abort": _abort,
  "clock_gettime": _clock_gettime,
  "emscripten_get_now": _emscripten_get_now,
  "emscripten_memcpy_big": _emscripten_memcpy_big,
  "emscripten_resize_heap": _emscripten_resize_heap,
  "environ_get": _environ_get,
  "environ_sizes_get": _environ_sizes_get,
  "exit": _exit,
  "fd_close": _fd_close,
  "fd_fdstat_get": _fd_fdstat_get,
  "fd_read": _fd_read,
  "fd_seek": _fd_seek,
  "fd_write": _fd_write,
  "gettimeofday": _gettimeofday,
  "setTempRet0": _setTempRet0,
  "strftime": _strftime,
  "strftime_l": _strftime_l,
  "time": _time
};
var asm = createWasm();
/** @type {function(...*):?} */
var ___wasm_call_ctors = Module["___wasm_call_ctors"] = createExportWrapper("__wasm_call_ctors");

/** @type {function(...*):?} */
var _free = Module["_free"] = createExportWrapper("free");

/** @type {function(...*):?} */
var _malloc = Module["_malloc"] = createExportWrapper("malloc");

/** @type {function(...*):?} */
var _memcpy = Module["_memcpy"] = createExportWrapper("memcpy");

/** @type {function(...*):?} */
var ___errno_location = Module["___errno_location"] = createExportWrapper("__errno_location");

/** @type {function(...*):?} */
var _main = Module["_main"] = createExportWrapper("main");

/** @type {function(...*):?} */
var ___stdio_exit = Module["___stdio_exit"] = createExportWrapper("__stdio_exit");

/** @type {function(...*):?} */
var ___funcs_on_exit = Module["___funcs_on_exit"] = createExportWrapper("__funcs_on_exit");

/** @type {function(...*):?} */
var ___dl_seterr = Module["___dl_seterr"] = createExportWrapper("__dl_seterr");

/** @type {function(...*):?} */
var _emscripten_main_thread_process_queued_calls = Module["_emscripten_main_thread_process_queued_calls"] = createExportWrapper("emscripten_main_thread_process_queued_calls");

/** @type {function(...*):?} */
var _emscripten_stack_init = Module["_emscripten_stack_init"] = function() {
  return (_emscripten_stack_init = Module["_emscripten_stack_init"] = Module["asm"]["emscripten_stack_init"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _emscripten_stack_get_free = Module["_emscripten_stack_get_free"] = function() {
  return (_emscripten_stack_get_free = Module["_emscripten_stack_get_free"] = Module["asm"]["emscripten_stack_get_free"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _emscripten_stack_get_base = Module["_emscripten_stack_get_base"] = function() {
  return (_emscripten_stack_get_base = Module["_emscripten_stack_get_base"] = Module["asm"]["emscripten_stack_get_base"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _emscripten_stack_get_end = Module["_emscripten_stack_get_end"] = function() {
  return (_emscripten_stack_get_end = Module["_emscripten_stack_get_end"] = Module["asm"]["emscripten_stack_get_end"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var stackSave = Module["stackSave"] = createExportWrapper("stackSave");

/** @type {function(...*):?} */
var stackRestore = Module["stackRestore"] = createExportWrapper("stackRestore");

/** @type {function(...*):?} */
var stackAlloc = Module["stackAlloc"] = createExportWrapper("stackAlloc");

/** @type {function(...*):?} */
var ___cxa_demangle = Module["___cxa_demangle"] = createExportWrapper("__cxa_demangle");

/** @type {function(...*):?} */
var dynCall_ji = Module["dynCall_ji"] = createExportWrapper("dynCall_ji");

/** @type {function(...*):?} */
var dynCall_viijii = Module["dynCall_viijii"] = createExportWrapper("dynCall_viijii");

/** @type {function(...*):?} */
var dynCall_jiji = Module["dynCall_jiji"] = createExportWrapper("dynCall_jiji");

/** @type {function(...*):?} */
var dynCall_iiiiij = Module["dynCall_iiiiij"] = createExportWrapper("dynCall_iiiiij");

/** @type {function(...*):?} */
var dynCall_iiiiijj = Module["dynCall_iiiiijj"] = createExportWrapper("dynCall_iiiiijj");

/** @type {function(...*):?} */
var dynCall_iiiiiijj = Module["dynCall_iiiiiijj"] = createExportWrapper("dynCall_iiiiiijj");





// === Auto-generated postamble setup entry stuff ===

unexportedRuntimeFunction('intArrayFromString', false);
unexportedRuntimeFunction('intArrayToString', false);
unexportedRuntimeFunction('ccall', false);
unexportedRuntimeFunction('cwrap', false);
unexportedRuntimeFunction('setValue', false);
unexportedRuntimeFunction('getValue', false);
unexportedRuntimeFunction('allocate', false);
unexportedRuntimeFunction('UTF8ArrayToString', false);
unexportedRuntimeFunction('UTF8ToString', false);
unexportedRuntimeFunction('stringToUTF8Array', false);
unexportedRuntimeFunction('stringToUTF8', false);
unexportedRuntimeFunction('lengthBytesUTF8', false);
unexportedRuntimeFunction('stackTrace', false);
unexportedRuntimeFunction('addOnPreRun', false);
unexportedRuntimeFunction('addOnInit', false);
unexportedRuntimeFunction('addOnPreMain', false);
unexportedRuntimeFunction('addOnExit', false);
unexportedRuntimeFunction('addOnPostRun', false);
unexportedRuntimeFunction('writeStringToMemory', false);
unexportedRuntimeFunction('writeArrayToMemory', false);
unexportedRuntimeFunction('writeAsciiToMemory', false);
Module["addRunDependency"] = addRunDependency;
Module["removeRunDependency"] = removeRunDependency;
unexportedRuntimeFunction('FS_createFolder', false);
Module["FS_createPath"] = FS.createPath;
Module["FS_createDataFile"] = FS.createDataFile;
Module["FS_createPreloadedFile"] = FS.createPreloadedFile;
Module["FS_createLazyFile"] = FS.createLazyFile;
unexportedRuntimeFunction('FS_createLink', false);
Module["FS_createDevice"] = FS.createDevice;
Module["FS_unlink"] = FS.unlink;
unexportedRuntimeFunction('getLEB', false);
unexportedRuntimeFunction('getFunctionTables', false);
unexportedRuntimeFunction('alignFunctionTables', false);
unexportedRuntimeFunction('registerFunctions', false);
unexportedRuntimeFunction('addFunction', false);
unexportedRuntimeFunction('removeFunction', false);
unexportedRuntimeFunction('getFuncWrapper', false);
unexportedRuntimeFunction('prettyPrint', false);
unexportedRuntimeFunction('dynCall', false);
unexportedRuntimeFunction('getCompilerSetting', false);
unexportedRuntimeFunction('print', false);
unexportedRuntimeFunction('printErr', false);
unexportedRuntimeFunction('getTempRet0', false);
unexportedRuntimeFunction('setTempRet0', false);
unexportedRuntimeFunction('callMain', false);
unexportedRuntimeFunction('abort', false);
unexportedRuntimeFunction('keepRuntimeAlive', false);
unexportedRuntimeFunction('zeroMemory', false);
unexportedRuntimeFunction('stringToNewUTF8', false);
unexportedRuntimeFunction('abortOnCannotGrowMemory', false);
unexportedRuntimeFunction('emscripten_realloc_buffer', false);
unexportedRuntimeFunction('ENV', false);
unexportedRuntimeFunction('withStackSave', false);
unexportedRuntimeFunction('ERRNO_CODES', false);
unexportedRuntimeFunction('ERRNO_MESSAGES', false);
unexportedRuntimeFunction('setErrNo', false);
unexportedRuntimeFunction('inetPton4', false);
unexportedRuntimeFunction('inetNtop4', false);
unexportedRuntimeFunction('inetPton6', false);
unexportedRuntimeFunction('inetNtop6', false);
unexportedRuntimeFunction('readSockaddr', false);
unexportedRuntimeFunction('writeSockaddr', false);
unexportedRuntimeFunction('DNS', false);
unexportedRuntimeFunction('getHostByName', false);
unexportedRuntimeFunction('Protocols', false);
unexportedRuntimeFunction('Sockets', false);
unexportedRuntimeFunction('getRandomDevice', false);
unexportedRuntimeFunction('traverseStack', false);
unexportedRuntimeFunction('convertFrameToPC', false);
unexportedRuntimeFunction('UNWIND_CACHE', false);
unexportedRuntimeFunction('saveInUnwindCache', false);
unexportedRuntimeFunction('convertPCtoSourceLocation', false);
unexportedRuntimeFunction('readAsmConstArgsArray', false);
unexportedRuntimeFunction('readAsmConstArgs', false);
unexportedRuntimeFunction('mainThreadEM_ASM', false);
unexportedRuntimeFunction('jstoi_q', false);
unexportedRuntimeFunction('jstoi_s', false);
unexportedRuntimeFunction('getExecutableName', false);
unexportedRuntimeFunction('listenOnce', false);
unexportedRuntimeFunction('autoResumeAudioContext', false);
unexportedRuntimeFunction('dynCallLegacy', false);
unexportedRuntimeFunction('getDynCaller', false);
unexportedRuntimeFunction('dynCall', false);
unexportedRuntimeFunction('callRuntimeCallbacks', false);
unexportedRuntimeFunction('wasmTableMirror', false);
unexportedRuntimeFunction('setWasmTableEntry', false);
unexportedRuntimeFunction('getWasmTableEntry', false);
unexportedRuntimeFunction('handleException', false);
unexportedRuntimeFunction('runtimeKeepalivePush', false);
unexportedRuntimeFunction('runtimeKeepalivePop', false);
unexportedRuntimeFunction('callUserCallback', false);
unexportedRuntimeFunction('maybeExit', false);
unexportedRuntimeFunction('safeSetTimeout', false);
unexportedRuntimeFunction('asmjsMangle', false);
unexportedRuntimeFunction('asyncLoad', false);
unexportedRuntimeFunction('alignMemory', false);
unexportedRuntimeFunction('mmapAlloc', false);
unexportedRuntimeFunction('reallyNegative', false);
unexportedRuntimeFunction('unSign', false);
unexportedRuntimeFunction('reSign', false);
unexportedRuntimeFunction('formatString', false);
unexportedRuntimeFunction('PATH', false);
unexportedRuntimeFunction('PATH_FS', false);
unexportedRuntimeFunction('SYSCALLS', false);
unexportedRuntimeFunction('getSocketFromFD', false);
unexportedRuntimeFunction('getSocketAddress', false);
unexportedRuntimeFunction('JSEvents', false);
unexportedRuntimeFunction('registerKeyEventCallback', false);
unexportedRuntimeFunction('specialHTMLTargets', false);
unexportedRuntimeFunction('maybeCStringToJsString', false);
unexportedRuntimeFunction('findEventTarget', false);
unexportedRuntimeFunction('findCanvasEventTarget', false);
unexportedRuntimeFunction('getBoundingClientRect', false);
unexportedRuntimeFunction('fillMouseEventData', false);
unexportedRuntimeFunction('registerMouseEventCallback', false);
unexportedRuntimeFunction('registerWheelEventCallback', false);
unexportedRuntimeFunction('registerUiEventCallback', false);
unexportedRuntimeFunction('registerFocusEventCallback', false);
unexportedRuntimeFunction('fillDeviceOrientationEventData', false);
unexportedRuntimeFunction('registerDeviceOrientationEventCallback', false);
unexportedRuntimeFunction('fillDeviceMotionEventData', false);
unexportedRuntimeFunction('registerDeviceMotionEventCallback', false);
unexportedRuntimeFunction('screenOrientation', false);
unexportedRuntimeFunction('fillOrientationChangeEventData', false);
unexportedRuntimeFunction('registerOrientationChangeEventCallback', false);
unexportedRuntimeFunction('fillFullscreenChangeEventData', false);
unexportedRuntimeFunction('registerFullscreenChangeEventCallback', false);
unexportedRuntimeFunction('registerRestoreOldStyle', false);
unexportedRuntimeFunction('hideEverythingExceptGivenElement', false);
unexportedRuntimeFunction('restoreHiddenElements', false);
unexportedRuntimeFunction('setLetterbox', false);
unexportedRuntimeFunction('currentFullscreenStrategy', false);
unexportedRuntimeFunction('restoreOldWindowedStyle', false);
unexportedRuntimeFunction('softFullscreenResizeWebGLRenderTarget', false);
unexportedRuntimeFunction('doRequestFullscreen', false);
unexportedRuntimeFunction('fillPointerlockChangeEventData', false);
unexportedRuntimeFunction('registerPointerlockChangeEventCallback', false);
unexportedRuntimeFunction('registerPointerlockErrorEventCallback', false);
unexportedRuntimeFunction('requestPointerLock', false);
unexportedRuntimeFunction('fillVisibilityChangeEventData', false);
unexportedRuntimeFunction('registerVisibilityChangeEventCallback', false);
unexportedRuntimeFunction('registerTouchEventCallback', false);
unexportedRuntimeFunction('fillGamepadEventData', false);
unexportedRuntimeFunction('registerGamepadEventCallback', false);
unexportedRuntimeFunction('registerBeforeUnloadEventCallback', false);
unexportedRuntimeFunction('fillBatteryEventData', false);
unexportedRuntimeFunction('battery', false);
unexportedRuntimeFunction('registerBatteryEventCallback', false);
unexportedRuntimeFunction('setCanvasElementSize', false);
unexportedRuntimeFunction('getCanvasElementSize', false);
unexportedRuntimeFunction('demangle', false);
unexportedRuntimeFunction('demangleAll', false);
unexportedRuntimeFunction('jsStackTrace', false);
unexportedRuntimeFunction('stackTrace', false);
unexportedRuntimeFunction('getEnvStrings', false);
unexportedRuntimeFunction('checkWasiClock', false);
unexportedRuntimeFunction('writeI53ToI64', false);
unexportedRuntimeFunction('writeI53ToI64Clamped', false);
unexportedRuntimeFunction('writeI53ToI64Signaling', false);
unexportedRuntimeFunction('writeI53ToU64Clamped', false);
unexportedRuntimeFunction('writeI53ToU64Signaling', false);
unexportedRuntimeFunction('readI53FromI64', false);
unexportedRuntimeFunction('readI53FromU64', false);
unexportedRuntimeFunction('convertI32PairToI53', false);
unexportedRuntimeFunction('convertU32PairToI53', false);
unexportedRuntimeFunction('setImmediateWrapped', false);
unexportedRuntimeFunction('clearImmediateWrapped', false);
unexportedRuntimeFunction('polyfillSetImmediate', false);
unexportedRuntimeFunction('uncaughtExceptionCount', false);
unexportedRuntimeFunction('exceptionLast', false);
unexportedRuntimeFunction('exceptionCaught', false);
unexportedRuntimeFunction('ExceptionInfo', false);
unexportedRuntimeFunction('CatchInfo', false);
unexportedRuntimeFunction('exception_addRef', false);
unexportedRuntimeFunction('exception_decRef', false);
unexportedRuntimeFunction('Browser', false);
unexportedRuntimeFunction('funcWrappers', false);
unexportedRuntimeFunction('getFuncWrapper', false);
unexportedRuntimeFunction('setMainLoop', false);
unexportedRuntimeFunction('wget', false);
unexportedRuntimeFunction('FS', false);
unexportedRuntimeFunction('MEMFS', false);
unexportedRuntimeFunction('TTY', false);
unexportedRuntimeFunction('PIPEFS', false);
unexportedRuntimeFunction('SOCKFS', false);
unexportedRuntimeFunction('_setNetworkCallback', false);
unexportedRuntimeFunction('tempFixedLengthArray', false);
unexportedRuntimeFunction('miniTempWebGLFloatBuffers', false);
unexportedRuntimeFunction('heapObjectForWebGLType', false);
unexportedRuntimeFunction('heapAccessShiftForWebGLHeap', false);
unexportedRuntimeFunction('GL', false);
unexportedRuntimeFunction('emscriptenWebGLGet', false);
unexportedRuntimeFunction('computeUnpackAlignedImageSize', false);
unexportedRuntimeFunction('emscriptenWebGLGetTexPixelData', false);
unexportedRuntimeFunction('emscriptenWebGLGetUniform', false);
unexportedRuntimeFunction('webglGetUniformLocation', false);
unexportedRuntimeFunction('webglPrepareUniformLocationsBeforeFirstUse', false);
unexportedRuntimeFunction('webglGetLeftBracePos', false);
unexportedRuntimeFunction('emscriptenWebGLGetVertexAttrib', false);
unexportedRuntimeFunction('writeGLArray', false);
unexportedRuntimeFunction('AL', false);
unexportedRuntimeFunction('SDL_unicode', false);
unexportedRuntimeFunction('SDL_ttfContext', false);
unexportedRuntimeFunction('SDL_audio', false);
unexportedRuntimeFunction('SDL', false);
unexportedRuntimeFunction('SDL_gfx', false);
unexportedRuntimeFunction('GLUT', false);
unexportedRuntimeFunction('EGL', false);
unexportedRuntimeFunction('GLFW_Window', false);
unexportedRuntimeFunction('GLFW', false);
unexportedRuntimeFunction('GLEW', false);
unexportedRuntimeFunction('IDBStore', false);
unexportedRuntimeFunction('runAndAbortIfError', false);
unexportedRuntimeFunction('emscriptenWebGLGetIndexed', false);
unexportedRuntimeFunction('warnOnce', false);
unexportedRuntimeFunction('stackSave', false);
unexportedRuntimeFunction('stackRestore', false);
unexportedRuntimeFunction('stackAlloc', false);
unexportedRuntimeFunction('AsciiToString', false);
unexportedRuntimeFunction('stringToAscii', false);
unexportedRuntimeFunction('UTF16ToString', false);
unexportedRuntimeFunction('stringToUTF16', false);
unexportedRuntimeFunction('lengthBytesUTF16', false);
unexportedRuntimeFunction('UTF32ToString', false);
unexportedRuntimeFunction('stringToUTF32', false);
unexportedRuntimeFunction('lengthBytesUTF32', false);
unexportedRuntimeFunction('allocateUTF8', false);
unexportedRuntimeFunction('allocateUTF8OnStack', false);
Module["writeStackCookie"] = writeStackCookie;
Module["checkStackCookie"] = checkStackCookie;
unexportedRuntimeSymbol('ALLOC_NORMAL', false);
unexportedRuntimeSymbol('ALLOC_STACK', false);

var calledRun;

/**
 * @constructor
 * @this {ExitStatus}
 */
function ExitStatus(status) {
  this.name = "ExitStatus";
  this.message = "Program terminated with exit(" + status + ")";
  this.status = status;
}

var calledMain = false;

dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!calledRun) run();
  if (!calledRun) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
};

function callMain(args) {
  assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on Module["onRuntimeInitialized"])');
  assert(__ATPRERUN__.length == 0, 'cannot call main when preRun functions remain to be called');

  var entryFunction = Module['_main'];

  args = args || [];

  var argc = args.length+1;
  var argv = stackAlloc((argc + 1) * 4);
  HEAP32[argv >> 2] = allocateUTF8OnStack(thisProgram);
  for (var i = 1; i < argc; i++) {
    HEAP32[(argv >> 2) + i] = allocateUTF8OnStack(args[i - 1]);
  }
  HEAP32[(argv >> 2) + argc] = 0;

  try {

    var ret = entryFunction(argc, argv);

    // In PROXY_TO_PTHREAD builds, we should never exit the runtime below, as
    // execution is asynchronously handed off to a pthread.
    // if we're not running an evented main loop, it's time to exit
    exit(ret, /* implicit = */ true);
    return ret;
  }
  catch (e) {
    return handleException(e);
  } finally {
    calledMain = true;

  }
}

function stackCheckInit() {
  // This is normally called automatically during __wasm_call_ctors but need to
  // get these values before even running any of the ctors so we call it redundantly
  // here.
  // TODO(sbc): Move writeStackCookie to native to to avoid this.
  _emscripten_stack_init();
  writeStackCookie();
}

/** @type {function(Array=)} */
function run(args) {
  args = args || arguments_;

  if (runDependencies > 0) {
    return;
  }

  stackCheckInit();

  preRun();

  // a preRun added a dependency, run will be called later
  if (runDependencies > 0) {
    return;
  }

  function doRun() {
    // run may have just been called through dependencies being fulfilled just in this very frame,
    // or while the async setStatus time below was happening
    if (calledRun) return;
    calledRun = true;
    Module['calledRun'] = true;

    if (ABORT) return;

    initRuntime();

    preMain();

    if (Module['onRuntimeInitialized']) Module['onRuntimeInitialized']();

    if (shouldRunNow) callMain(args);

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(function() {
      setTimeout(function() {
        Module['setStatus']('');
      }, 1);
      doRun();
    }, 1);
  } else
  {
    doRun();
  }
  checkStackCookie();
}
Module['run'] = run;

/** @param {boolean|number=} implicit */
function exit(status, implicit) {
  EXITSTATUS = status;

  if (keepRuntimeAlive()) {
    // if exit() was called, we may warn the user if the runtime isn't actually being shut down
    if (!implicit) {
      var msg = 'program exited (with status: ' + status + '), but keepRuntimeAlive() is set (counter=' + runtimeKeepaliveCounter + ') due to an async operation, so halting execution but not exiting the runtime or preventing further async execution (you can use emscripten_force_exit, if you want to force a true shutdown)';
      err(msg);
    }
  } else {
    exitRuntime();
  }

  procExit(status);
}

function procExit(code) {
  EXITSTATUS = code;
  if (!keepRuntimeAlive()) {
    if (Module['onExit']) Module['onExit'](code);
    ABORT = true;
  }
  quit_(code, new ExitStatus(code));
}

if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}

// shouldRunNow refers to calling main(), not run().
var shouldRunNow = true;

if (Module['noInitialRun']) shouldRunNow = false;

run();





