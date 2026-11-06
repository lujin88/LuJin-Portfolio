/*
 * How I Work playback host.
 *
 * Compatible with the no-input Rive contract (ReviewAutoplay):
 * - One player per character, stacked on the 1842×854 artboard.
 * - The SVG viewBox crop (720 130 1060 654) stays on the stage; every
 *   player canvas is the full artboard and is cropped with the same CSS.
 * - The original <image> stays mounted. Players are only an overlay.
 * - First time the stage is 45% visible, the host creates the players
 *   and they play once. Scrolling away does not pause, stop, or destroy
 *   them. Each player is removed when it ends, which reveals the original.
 * - prefers-reduced-motion: reduce — the host returns before creating a
 *   canvas, fetching a file, or constructing Rive.
 * - The host never reads or writes Rive inputs. A .riv must autoplay the
 *   ReviewAutoplay state machine and fire a Rive event named
 *   playback-complete on its last frame. That event is the only end signal.
 *
 * A .riv character is one full-artboard file (Rabbit, Bear, or Fox). The host
 * loads them paused, then calls play() on the same turn so the three
 * timelines stay together. prefers-reduced-motion, including a change during
 * playback, removes every canvas before another frame is requested.
 * Not wired into the live index. The apply patch is separate.
 */
(function () {
  var ARTBOARD = { width: 1842, height: 854 };
  var VIEWBOX = { x: 720, y: 130, width: 1060, height: 654 };
  var STATE_MACHINE = 'ReviewAutoplay';
  var END_EVENT = 'playback-complete';
  var VISIBLE_RATIO = 0.45;

  function report(state) {
    var names = [];
    state.live.forEach(function (id) { names.push(id); });
    state.stage.dataset.hiwState = state.phase;
    state.stage.dataset.hiwPlayers = String(names.length);
    state.stage.dataset.hiwNames = names.join(',');
    state.stage.dataset.hiwError = state.error || '';
    state.stage.dataset.hiwElapsed = String(Math.round(state.elapsed));
    state.stage.dataset.hiwFrames = String(state.frames || 0);
    if (typeof state.onStatus === 'function') {
      state.onStatus({
        phase: state.phase,
        players: names.length,
        names: names,
        elapsed: state.elapsed,
        visible: visibleRatio(state.stage),
        error: state.error || ''
      });
    }
  }

  function visibleRatio(el) {
    var rect = el.getBoundingClientRect();
    var height = rect.height || 1;
    var viewH = window.innerHeight || 1;
    var top = Math.max(rect.top, 0);
    var bottom = Math.min(rect.bottom, viewH);
    return Math.max(0, bottom - top) / height;
  }

  function loadImage(url) {
    return new Promise(function (resolve, reject) {
      var img = new Image();
      img.decoding = 'async';
      img.onload = function () { resolve(img); };
      img.onerror = function () { reject(new Error('image failed: ' + url)); };
      img.src = url;
    });
  }

  function bboxOf(img) {
    var canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    var ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, 0, 0);
    var data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    var minX = canvas.width;
    var minY = canvas.height;
    var maxX = 0;
    var maxY = 0;
    var found = false;
    var step = 2;
    for (var y = 0; y < canvas.height; y += step) {
      for (var x = 0; x < canvas.width; x += step) {
        if (data[(y * canvas.width + x) * 4 + 3] < 16) continue;
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
        found = true;
      }
    }
    if (!found) return { x: 0, y: 0, w: 1, h: 1 };
    return { x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 };
  }

  function centroid(img) {
    var box = img._bbox || bboxOf(img);
    return { x: box.x + box.w / 2, y: box.y + box.h / 2 };
  }

  function pivotToward(box, point) {
    var x = Math.max(box.x, Math.min(point.x, box.x + box.w));
    var y = Math.max(box.y, Math.min(point.y, box.y + box.h));
    return [(x - box.x) / box.w, (y - box.y) / box.h];
  }

  function unionBox(boxes) {
    var x0 = Infinity;
    var y0 = Infinity;
    var x1 = -Infinity;
    var y1 = -Infinity;
    boxes.forEach(function (box) {
      x0 = Math.min(x0, box.x);
      y0 = Math.min(y0, box.y);
      x1 = Math.max(x1, box.x + box.w);
      y1 = Math.max(y1, box.y + box.h);
    });
    return { x: x0, y: y0, w: Math.max(1, x1 - x0), h: Math.max(1, y1 - y0) };
  }

  function composite(images) {
    var canvas = document.createElement('canvas');
    canvas.width = ARTBOARD.width;
    canvas.height = ARTBOARD.height;
    var ctx = canvas.getContext('2d');
    images.forEach(function (img) { ctx.drawImage(img, 0, 0); });
    return canvas;
  }

  function coverRest(ctx, scratch, partImg, behind) {
    var sctx = scratch.getContext('2d');
    sctx.setTransform(1, 0, 0, 1, 0, 0);
    sctx.globalCompositeOperation = 'source-over';
    sctx.clearRect(0, 0, ARTBOARD.width, ARTBOARD.height);
    sctx.drawImage(partImg, 0, 0);
    sctx.globalCompositeOperation = 'source-in';
    sctx.drawImage(behind, 0, 0);
    sctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(scratch, 0, 0);
  }

  function drawPart(ctx, img, pivot, radians) {
    var box = img._bbox;
    var px = box.x + box.w * pivot[0];
    var py = box.y + box.h * pivot[1];
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(radians);
    ctx.translate(-px, -py);
    ctx.drawImage(img, 0, 0);
    ctx.restore();
  }

  function makeCanvas(id) {
    var canvas = document.createElement('canvas');
    canvas.width = ARTBOARD.width;
    canvas.height = ARTBOARD.height;
    canvas.dataset.hiwCharacter = id;
    canvas.setAttribute('aria-hidden', 'true');
    return canvas;
  }

  function finish(state, id, canvas, runtime) {
    if (!canvas || canvas._hiwDone) return;
    canvas._hiwDone = true;
    if (runtime && typeof runtime.cleanup === 'function') {
      // playback-complete fires inside Rive's own draw; cleaning up there
      // deletes the state machine that draw is still using. Wait a tick.
      setTimeout(function () {
        try { runtime.cleanup(); } catch (err) { /* already gone */ }
      }, 0);
    }
    canvas.remove();
    state.live.delete(id);
    state.elapsed = state.elapsed || 0;
    if (state.live.size === 0 && !state.holdPhase && state.phase !== 'reduced') {
      state.phase = state.error && state.loaded === 0 ? 'error' : 'ended';
    }
    report(state);
  }

  function stopForReduce(state) {
    state.reduced = true;
    state.holdPhase = true;
    Array.from(state.live).forEach(function (id) {
      var canvas = state.canvases[id];
      finish(state, id, canvas, canvas && canvas._hiwRuntime);
    });
    state.holdPhase = false;
    state.phase = 'reduced';
    report(state);
  }

  function mountRive(canvas, spec, state) {
    var api = window.rive;
    if (!api || typeof api.Rive !== 'function') {
      return Promise.reject(new Error('Rive runtime missing'));
    }
    return new Promise(function (resolve) {
      var options = {
        src: spec.src,
        canvas: canvas,
        autoplay: false,
        stateMachines: STATE_MACHINE,
        onLoad: function () {
          if (canvas._hiwDone || state.reduced) {
            try { inst.cleanup(); } catch (err) { /* reduce won the race */ }
            resolve(null);
            return;
          }
          if (typeof inst.resizeDrawingSurfaceToCanvas === 'function') {
            inst.resizeDrawingSurfaceToCanvas();
          }
          state.loaded = (state.loaded || 0) + 1;
          resolve(inst);
        },
        onLoadError: function (err) {
          state.error = (err && err.message) || String(err || 'rive load failed');
          finish(state, spec.id, canvas, inst);
          resolve(null);
        }
      };
      if (spec.artboard) options.artboard = spec.artboard;
      if (api.Layout && api.Fit && api.Alignment) {
        options.layout = new api.Layout({
          fit: api.Fit.Contain,
          alignment: api.Alignment.Center
        });
      }
      var inst;
      try {
        inst = new api.Rive(options);
      } catch (err) {
        state.error = err.message;
        finish(state, spec.id, canvas, null);
        resolve(null);
        return;
      }
      if (canvas._hiwDone) return;
      canvas._hiwRuntime = inst;
      inst.on(api.EventType.RiveEvent, function (event) {
        var data = event && event.data;
        var name = (data && data.name) || (event && event.name) || '';
        state.stage.dataset.hiwLastEvent = name;
        if (name === END_EVENT) finish(state, spec.id, canvas, inst);
      });
    });
  }

  function mountEmpty(canvas, spec, state) {
    var started = performance.now();
    var duration = spec.duration || 2200;
    function tick(now) {
      if (canvas._hiwDone) return;
      state.elapsed = Math.max(state.elapsed, now - started);
      state.frames = (state.frames || 0) + 1;
      state.phase = 'playing';
      report(state);
      if (now - started >= duration) {
        finish(state, spec.id, canvas, null);
        return;
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function mountPng(canvas, spec, state, cache) {
    state.stage.dataset.hiwPng = '1';
    var ctx = canvas.getContext('2d');
    var scratch = document.createElement('canvas');
    scratch.width = ARTBOARD.width;
    scratch.height = ARTBOARD.height;
    var started = performance.now();
    var duration = spec.duration || 2800;
    var prepared = spec.parts.map(function (part) {
      return {
        img: cache.images[part.url],
        behind: cache.behind[part.url],
        pivot: part._pivot,
        deg: part.deg,
        cycles: part.cycles || 1
      };
    });

    function frame(now) {
      if (canvas._hiwDone) return;
      var t = state.freeze != null ? state.freeze : Math.min(1, (now - started) / duration);
      state.elapsed = Math.max(state.elapsed, now - started);
      state.frames = (state.frames || 0) + 1;
      state.phase = 'playing';
      ctx.clearRect(0, 0, ARTBOARD.width, ARTBOARD.height);
      prepared.forEach(function (part) {
        coverRest(ctx, scratch, part.img, part.behind);
      });
      prepared.forEach(function (part) {
        var wave = Math.sin(t * Math.PI * part.cycles);
        drawPart(ctx, part.img, part.pivot, wave * part.deg * Math.PI / 180);
      });
      report(state);
      if (state.freeze != null) {
        state.phase = 'frozen';
        report(state);
        return;
      }
      if (t >= 1) {
        finish(state, spec.id, canvas, null);
        return;
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function preparePng(specs, layerBase) {
    var baseNames = [];
    var seenBase = {};
    var partUrls = [];
    specs.forEach(function (spec) {
      (spec.base || []).forEach(function (name) {
        if (seenBase[name]) return;
        seenBase[name] = true;
        baseNames.push(name);
      });
      (spec.parts || []).forEach(function (part) { partUrls.push(part.url); });
    });
    var list = baseNames.map(function (name) { return layerBase + name; }).concat(partUrls);
    return Promise.all(list.map(loadImage)).then(function (images) {
      var byUrl = {};
      list.forEach(function (url, i) {
        images[i]._bbox = bboxOf(images[i]);
        byUrl[url] = images[i];
      });
      var ordered = list.map(function (url) { return byUrl[url]; });
      var behind = {};
      partUrls.forEach(function (url) {
        behind[url] = composite(ordered.filter(function (img) { return img !== byUrl[url]; }));
      });
      specs.forEach(function (spec) {
        (spec.parts || []).forEach(function (part) {
          if (part.shared) return;
          var img = byUrl[part.url];
          if (part.anchor) {
            part._pivot = pivotToward(img._bbox, centroid(byUrl[part.anchor]));
          } else {
            part._pivot = part.pivot || [0.5, 0.92];
          }
        });
        var shared = (spec.parts || []).filter(function (part) { return part.shared; });
        if (!shared.length) return;
        var box = unionBox(shared.map(function (part) { return byUrl[part.url]._bbox; }));
        var point = partPivot(box, shared[0].pivot || [0.5, 1]);
        shared.forEach(function (part) {
          part._pivot = pivotOfBox(byUrl[part.url]._bbox, point);
        });
      });
      return { images: byUrl, behind: behind };
    });
  }

  function partPivot(box, frac) {
    return {
      x: box.x + box.w * frac[0],
      y: box.y + box.h * frac[1]
    };
  }

  function pivotOfBox(local, point) {
    return [
      (point.x - local.x) / local.w,
      (point.y - local.y) / local.h
    ];
  }

  function ensurePlane(stage) {
    var plane = stage.querySelector('.hiw-plane');
    if (plane) return plane;
    var plays = document.createElement('div');
    plays.className = 'hiw-plays';
    plays.setAttribute('aria-hidden', 'true');
    plane = document.createElement('div');
    plane.className = 'hiw-plane';
    plays.appendChild(plane);
    stage.appendChild(plays);
    return plane;
  }

  function mount(stage, options) {
    options = options || {};
    if (!stage || stage.dataset.hiwMounted === '1') return;
    stage.dataset.hiwMounted = '1';
    var state = {
      stage: stage,
      phase: 'waiting',
      live: new Set(),
      canvases: {},
      elapsed: 0,
      loaded: 0,
      error: '',
      reduced: false,
      holdPhase: false,
      freeze: options.freeze,
      onStatus: options.onStatus
    };
    report(state);

    var reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    function onReduceChange() {
      if (reduceQuery.matches) stopForReduce(state);
    }
    if (typeof reduceQuery.addEventListener === 'function') {
      reduceQuery.addEventListener('change', onReduceChange);
    } else if (typeof reduceQuery.addListener === 'function') {
      reduceQuery.addListener(onReduceChange);
    }
    var reduce = reduceQuery.matches;
    state.reduced = reduce;
    var scheduled = false;
    function onMove() {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(function () {
        scheduled = false;
        report(state);
      });
    }
    window.addEventListener('scroll', onMove, { passive: true });
    window.addEventListener('resize', onMove);

    if (reduce) {
      state.phase = 'reduced';
      report(state);
      return;
    }

    var started = false;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (started || state.reduced || entry.intersectionRatio < VISIBLE_RATIO) return;
        started = true;
        observer.disconnect();
        begin(stage, options, state);
      });
    }, { threshold: [VISIBLE_RATIO] });
    observer.observe(stage);
  }

  function begin(stage, options, state) {
    if (state.reduced) {
      state.phase = 'reduced';
      report(state);
      return;
    }
    var characters = options.characters || [];
    var plane = ensurePlane(stage);
    var pngSpecs = [];
    var riveSpecs = [];
    state.phase = 'playing';
    characters.forEach(function (spec) {
      var canvas = makeCanvas(spec.id);
      plane.appendChild(canvas);
      state.live.add(spec.id);
      state.canvases[spec.id] = canvas;
      spec._canvas = canvas;
      if (spec.src) riveSpecs.push(spec);
      else if (spec.parts && spec.parts.length) pngSpecs.push(spec);
    });
    report(state);

    characters.forEach(function (spec) {
      if (state.freeze != null && !(spec.parts && spec.parts.length)) {
        spec._canvas.remove();
        state.live.delete(spec.id);
        return;
      }
      if (!spec.src && (!spec.parts || !spec.parts.length)) {
        mountEmpty(spec._canvas, spec, state);
      }
    });

    if (riveSpecs.length) {
      var api = window.rive;
      if (!api || typeof api.Rive !== 'function') {
        state.error = 'Rive runtime missing';
        state.phase = 'error';
        riveSpecs.forEach(function (spec) {
          finish(state, spec.id, spec._canvas, null);
        });
        state.phase = 'error';
        report(state);
      } else {
        if (options.wasmUrl && api.RuntimeLoader && typeof api.RuntimeLoader.setWasmUrl === 'function') {
          api.RuntimeLoader.setWasmUrl(options.wasmUrl);
        }
        Promise.all(riveSpecs.map(function (spec) {
          return mountRive(spec._canvas, spec, state).catch(function (err) {
            state.error = err.message;
            finish(state, spec.id, spec._canvas, spec._canvas._hiwRuntime);
            return null;
          });
        })).then(function (instances) {
          if (state.reduced) return;
          var ready = instances.filter(Boolean);
          if (!ready.length) {
            state.phase = 'error';
            if (!state.error) state.error = 'rive load failed';
            report(state);
            return;
          }
          ready.forEach(function (inst) { inst.play(); });
        });
      }
    }

    if (!pngSpecs.length) return;
    preparePng(pngSpecs, options.layerBase || '').then(function (cache) {
      pngSpecs.forEach(function (spec) {
        if (spec._canvas._hiwDone) return;
        mountPng(spec._canvas, spec, state, cache);
      });
    }).catch(function (err) {
      state.error = err.message;
      state.phase = 'error';
      pngSpecs.forEach(function (spec) {
        finish(state, spec.id, spec._canvas, null);
      });
      state.phase = 'error';
      report(state);
    });
  }

  window.HIWPlayback = {
    ARTBOARD: ARTBOARD,
    VIEWBOX: VIEWBOX,
    STATE_MACHINE: STATE_MACHINE,
    END_EVENT: END_EVENT,
    mount: mount
  };
})();
