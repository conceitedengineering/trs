(() => {
  "use strict";

  const SVG_NS = "http://www.w3.org/2000/svg";
  const TAU = Math.PI * 2;
  const APP_VERSION = 1;
  const RENDER_DEBOUNCE_MS = 24;

  const PRESETS = [
    {
      id: "five-arms-orbit",
      name: "Five-Arms Orbit",
      description: "Orbiting spiral arms with dense stamped loops.",
      statePatch: {
        family: "spiralArms",
        seed: 431927,
        strokeWidth: 1.05,
        opacity: 0.82,
        blendMode: "screen",
        samples: 520,
        globalScale: 0.9,
        rotationDeg: -10,
        jitterAmp: 0.6,
        jitterFreq: 4.2,
        spiralArms: {
          variant: "orbitStamp",
          armCount: 5,
          armLength: 365,
          armCurl: 1.25,
          armSpread: 0.55,
          stampSize: 48,
          stampSpacing: 12,
          stampRotation: -18,
          modDepth: 0.84,
          modFreq: 3.8
        }
      }
    },
    {
      id: "wave-ribbon-spiral",
      name: "Wave Ribbon Spiral",
      description: "Oscillating ribbon arms inspired by additive wave motion.",
      statePatch: {
        family: "spiralArms",
        seed: 774201,
        samples: 640,
        strokeWidth: 0.96,
        opacity: 0.86,
        globalScale: 0.84,
        rotationDeg: 18,
        spiralArms: {
          variant: "waveRibbon",
          armCount: 6,
          armLength: 410,
          armCurl: 1.75,
          armSpread: 0.62,
          stampSize: 38,
          stampSpacing: 11,
          stampRotation: -8,
          modDepth: 1.35,
          modFreq: 4.6
        }
      }
    },
    {
      id: "rose-orbit-spiral",
      name: "Rose Orbit Spiral",
      description: "Rhodonea-style orbital petals blended with arm spirals.",
      statePatch: {
        family: "spiralArms",
        seed: 283140,
        samples: 700,
        strokeWidth: 0.86,
        opacity: 0.9,
        globalScale: 0.8,
        rotationDeg: -12,
        spiralArms: {
          variant: "roseOrbit",
          armCount: 5,
          armLength: 430,
          armCurl: 1.35,
          armSpread: 0.48,
          stampSize: 52,
          stampSpacing: 10,
          stampRotation: 16,
          modDepth: 1.15,
          modFreq: 5.2
        }
      }
    },
    {
      id: "noise-drift-spiral",
      name: "Noise Drift Spiral",
      description: "Noise-modulated spiral trajectories with drifting arm contours.",
      statePatch: {
        family: "spiralArms",
        seed: 639572,
        samples: 620,
        strokeWidth: 0.9,
        opacity: 0.83,
        globalScale: 0.87,
        jitterAmp: 0.35,
        jitterFreq: 6.1,
        spiralArms: {
          variant: "noiseDrift",
          armCount: 7,
          armLength: 390,
          armCurl: 1.48,
          armSpread: 0.88,
          stampSize: 30,
          stampSpacing: 9,
          stampRotation: 22,
          modDepth: 1.45,
          modFreq: 3.2
        }
      }
    },
    {
      id: "dense-ring-coil",
      name: "Dense Ring Coil",
      description: "Circular wreath with compressed overlapping loops.",
      statePatch: {
        family: "ring",
        seed: 672190,
        samples: 540,
        strokeWidth: 0.95,
        opacity: 0.9,
        globalScale: 0.92,
        ring: {
          radius: 290,
          bandWidth: 58,
          loopCount: 126,
          phaseOffset: 0.33,
          petalRoundness: 0.24
        }
      }
    },
    {
      id: "six-cone-petals",
      name: "Six Cone Petals",
      description: "Dense petal cone structure similar to classic plotted stars.",
      statePatch: {
        family: "flowerCone",
        seed: 117203,
        samples: 640,
        strokeWidth: 0.9,
        opacity: 0.92,
        globalScale: 0.78,
        flowerCone: {
          petalCount: 6,
          innerRadius: 26,
          outerRadius: 392,
          twist: 0.56,
          taper: 1.6
        }
      }
    },
    {
      id: "tri-lobe",
      name: "Tri-Lobe",
      description: "Clean three-lobed rotational pattern with airy spacing.",
      statePatch: {
        family: "flowerCone",
        seed: 941553,
        samples: 420,
        strokeWidth: 1.15,
        opacity: 0.84,
        globalScale: 0.68,
        flowerCone: {
          petalCount: 3,
          innerRadius: 12,
          outerRadius: 350,
          twist: -0.18,
          taper: 1.1
        }
      }
    },
    {
      id: "double-halo",
      name: "Double Halo",
      description: "Inner and outer weave ring with central breathing space.",
      statePatch: {
        family: "ring",
        seed: 322410,
        samples: 620,
        strokeWidth: 0.9,
        opacity: 0.88,
        globalScale: 0.86,
        ring: {
          radius: 258,
          bandWidth: 84,
          loopCount: 92,
          phaseOffset: 0.08,
          petalRoundness: 0.62
        }
      }
    },
    {
      id: "rosette-weave",
      name: "Rosette Weave",
      description: "Tighter radial weave with high crossing density.",
      statePatch: {
        family: "ring",
        seed: 502191,
        samples: 760,
        strokeWidth: 0.78,
        opacity: 0.93,
        jitterAmp: 0.2,
        ring: {
          radius: 214,
          bandWidth: 126,
          loopCount: 144,
          phaseOffset: 0.47,
          petalRoundness: 0.74
        }
      }
    },
    {
      id: "inner-web",
      name: "Inner Web",
      description: "More central complexity and restrained outer ring.",
      statePatch: {
        family: "flowerCone",
        seed: 152882,
        samples: 520,
        strokeWidth: 0.88,
        opacity: 0.89,
        globalScale: 0.74,
        flowerCone: {
          petalCount: 8,
          innerRadius: 54,
          outerRadius: 310,
          twist: 0.22,
          taper: 2.1
        }
      }
    },
    {
      id: "minimal-loop",
      name: "Minimal Loop",
      description: "Lower complexity ring for quick compositional exploration.",
      statePatch: {
        family: "ring",
        seed: 240081,
        samples: 220,
        strokeWidth: 1.3,
        opacity: 0.72,
        jitterAmp: 0,
        globalScale: 0.98,
        ring: {
          radius: 230,
          bandWidth: 42,
          loopCount: 44,
          phaseOffset: 0.19,
          petalRoundness: 0.1
        }
      }
    }
  ];

  const PRIMARY_CONTROL_MAP = {
    ring: {
      sizePath: "ring.radius",
      sizeLabel: "Main Radius",
      sizeMin: 20,
      sizeMax: 500,
      sizeStep: 1,
      countPath: "ring.loopCount",
      countLabel: "Loop Count",
      countMin: 4,
      countMax: 220,
      countStep: 1
    },
    spiralArms: {
      sizePath: "spiralArms.armLength",
      sizeLabel: "Arm Length",
      sizeMin: 20,
      sizeMax: 600,
      sizeStep: 1,
      countPath: "spiralArms.armCount",
      countLabel: "Arm Count",
      countMin: 2,
      countMax: 12,
      countStep: 1
    },
    flowerCone: {
      sizePath: "flowerCone.outerRadius",
      sizeLabel: "Outer Radius",
      sizeMin: 30,
      sizeMax: 620,
      sizeStep: 1,
      countPath: "flowerCone.petalCount",
      countLabel: "Petal Count",
      countMin: 2,
      countMax: 16,
      countStep: 1
    }
  };

  const els = {
    previewSvg: document.getElementById("previewSvg"),
    artRoot: document.getElementById("artRoot"),
    paperRect: document.getElementById("paperRect"),
    presetSelect: document.getElementById("presetSelect"),
    randomizeBtn: document.getElementById("randomizeBtn"),
    resetBtn: document.getElementById("resetBtn"),
    applyPresetBtn: document.getElementById("applyPresetBtn"),
    exportBtn: document.getElementById("exportBtn"),
    copySvgBtn: document.getElementById("copySvgBtn"),
    saveJsonBtn: document.getElementById("saveJsonBtn"),
    loadJsonBtn: document.getElementById("loadJsonBtn"),
    loadJsonInput: document.getElementById("loadJsonInput"),
    statusLine: document.getElementById("statusLine"),
    primarySizeLabel: document.getElementById("primarySizeLabel"),
    motifCountLabel: document.getElementById("motifCountLabel"),
    primarySizeControl: document.getElementById("primarySizeControl"),
    motifCountControl: document.getElementById("motifCountControl")
  };

  const boundInputs = Array.from(document.querySelectorAll("[data-bind]"));
  const valueOutputs = Array.from(document.querySelectorAll("[data-value-for]"));
  const familyGroups = Array.from(document.querySelectorAll("[data-family-group]"));

  const state = loadInitialState();

  let renderTimer = null;
  let hashTimer = null;

  init();

  function init() {
    populatePresetSelect();
    bindControlEvents();
    updatePrimaryControlMeta();
    updateFamilyVisibility();
    syncControlsFromState();
    renderNow();
    setStatus("Ready.");
    window.addEventListener("resize", requestRender);
  }

  function createDefaultState() {
    return {
      version: APP_VERSION,
      family: "ring",
      seed: 123456,
      sizePreset: 1080,
      strokeColor: "#f5e7d7",
      strokeWidth: 1,
      opacity: 0.88,
      blendMode: "screen",
      centerX: 0,
      centerY: 0,
      globalScale: 0.9,
      rotationDeg: 0,
      samples: 420,
      smoothing: 0.32,
      jitterAmp: 0.5,
      jitterFreq: 3.2,
      ring: {
        radius: 260,
        bandWidth: 60,
        loopCount: 96,
        phaseOffset: 0.14,
        petalRoundness: 0.35
      },
      spiralArms: {
        variant: "orbitStamp",
        armCount: 5,
        armLength: 340,
        armCurl: 1.22,
        armSpread: 0.45,
        stampSize: 44,
        stampSpacing: 12,
        stampRotation: 0,
        modDepth: 0.8,
        modFreq: 3.5
      },
      flowerCone: {
        petalCount: 6,
        innerRadius: 30,
        outerRadius: 370,
        twist: 0.4,
        taper: 1.5
      },
      ui: {
        paperPreview: true,
        backgroundColor: "#221b18",
        primarySize: 260,
        motifCount: 96
      }
    };
  }

  function updateState(partial) {
    const merged = mergeDeep(cloneState(state), partial || {});
    const normalized = normalizeState(merged);
    replaceState(normalized);
    syncPrimaryUiFromFamily(state);
    updatePrimaryControlMeta();
    updateFamilyVisibility();
    syncControlsFromState();
    requestRender();
  }

  function generateGeometry(currentState, options = {}) {
    const safeState = normalizeState(currentState);
    const rng = mulberry32(safeState.seed);
    const rawPolylines = selectGenerator(safeState, rng);

    const processed = rawPolylines
      .map((line, index) => postProcessPolyline(line, safeState, index))
      .filter((line) => line.points.length > 1);

    const precision = options.precision == null ? 2 : options.precision;
    const paths = [];

    for (const polyline of processed) {
      const commands = polylineToPathCommands(polyline.points, polyline.closed !== false);
      const d = pathCommandsToD(commands, precision);
      if (isValidPathData(d)) {
        paths.push({
          d,
          stroke: safeState.strokeColor,
          strokeWidth: safeState.strokeWidth,
          opacity: safeState.opacity
        });
      }
    }

    return {
      size: safeState.sizePreset,
      blendMode: safeState.blendMode,
      transform: {
        x: safeState.sizePreset * (0.5 + safeState.centerX),
        y: safeState.sizePreset * (0.5 + safeState.centerY),
        scale: safeState.globalScale,
        rotateDeg: safeState.rotationDeg
      },
      paths
    };
  }

  function renderSVG(scene, svgRoot) {
    if (!svgRoot) {
      return;
    }

    const size = scene.size;
    svgRoot.setAttribute("viewBox", `0 0 ${size} ${size}`);

    const artRoot = els.artRoot;
    artRoot.textContent = "";

    artRoot.setAttribute(
      "transform",
      [
        `translate(${roundTo(scene.transform.x, 4)} ${roundTo(scene.transform.y, 4)})`,
        `scale(${roundTo(scene.transform.scale, 6)})`,
        `rotate(${roundTo(scene.transform.rotateDeg, 4)})`
      ].join(" ")
    );

    artRoot.style.mixBlendMode = scene.blendMode;

    for (const pathData of scene.paths) {
      const path = document.createElementNS(SVG_NS, "path");
      path.setAttribute("d", pathData.d);
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", pathData.stroke);
      path.setAttribute("stroke-width", String(pathData.strokeWidth));
      path.setAttribute("stroke-opacity", String(pathData.opacity));
      path.setAttribute("stroke-linecap", "round");
      path.setAttribute("stroke-linejoin", "round");
      artRoot.appendChild(path);
    }
  }

  function exportSVG(currentState) {
    const safeState = normalizeState(currentState);
    const scene = generateGeometry(safeState, { precision: 4 });
    const validationError = validateScene(scene);

    if (validationError) {
      throw new Error(validationError);
    }

    const svgText = buildSvgText(scene);
    const filename = `spiro-lab-${timestampSlug()}.svg`;
    downloadFile(svgText, filename, "image/svg+xml");
  }

  function serializeState(currentState) {
    return JSON.stringify(normalizeState(currentState), null, 2);
  }

  function deserializeState(jsonText) {
    const parsed = JSON.parse(jsonText);
    const candidate = parsed && typeof parsed === "object" && parsed.state ? parsed.state : parsed;
    return normalizeState(candidate);
  }

  function bindControlEvents() {
    for (const input of boundInputs) {
      input.addEventListener("input", handleBoundInput);
      if (input.tagName === "SELECT" || input.type === "checkbox") {
        input.addEventListener("change", handleBoundInput);
      }
    }

    els.randomizeBtn.addEventListener("click", handleRandomize);
    els.resetBtn.addEventListener("click", handleReset);
    els.applyPresetBtn.addEventListener("click", handleApplyPreset);
    els.exportBtn.addEventListener("click", handleExport);
    els.copySvgBtn.addEventListener("click", handleCopySVG);
    els.saveJsonBtn.addEventListener("click", handleSaveJSON);
    els.loadJsonBtn.addEventListener("click", () => els.loadJsonInput.click());
    els.loadJsonInput.addEventListener("change", handleLoadJSON);
    els.presetSelect.addEventListener("change", handleApplyPreset);
  }

  function handleBoundInput(event) {
    const input = event.currentTarget;
    const bindPath = input.dataset.bind;
    const parsedValue = parseInputValue(input);

    if (bindPath === "ui.primarySize") {
      const map = PRIMARY_CONTROL_MAP[state.family];
      setByPath(state, map.sizePath, parsedValue);
      setByPath(state, "ui.primarySize", parsedValue);
    } else if (bindPath === "ui.motifCount") {
      const map = PRIMARY_CONTROL_MAP[state.family];
      setByPath(state, map.countPath, parsedValue);
      setByPath(state, "ui.motifCount", parsedValue);
    } else {
      setByPath(state, bindPath, parsedValue);
    }

    replaceState(normalizeState(state));

    if (bindPath === "family") {
      syncPrimaryUiFromFamily(state);
      updatePrimaryControlMeta();
      updateFamilyVisibility();
    } else {
      const map = PRIMARY_CONTROL_MAP[state.family];
      if (bindPath === map.sizePath || bindPath === map.countPath) {
        syncPrimaryUiFromFamily(state);
      }
    }

    syncControlsFromState();
    requestRender();
  }

  function handleRandomize() {
    const randomSeed = Math.floor(Math.random() * 99999999) + 1;
    const rng = mulberry32(randomSeed);
    const families = ["ring", "spiralArms", "flowerCone"];
    const chosenFamily = families[Math.floor(rng() * families.length)];

    const patch = {
      seed: randomSeed,
      family: chosenFamily,
      strokeWidth: randomRange(rng, 0.5, 2),
      opacity: randomRange(rng, 0.5, 0.98),
      blendMode: ["normal", "screen", "overlay"][Math.floor(rng() * 3)],
      samples: Math.floor(randomRange(rng, 200, 840)),
      globalScale: randomRange(rng, 0.55, 1.2),
      rotationDeg: randomRange(rng, -50, 50),
      jitterAmp: randomRange(rng, 0, 2.8),
      jitterFreq: randomRange(rng, 0.8, 12)
    };

    if (chosenFamily === "ring") {
      patch.ring = {
        radius: randomRange(rng, 130, 360),
        bandWidth: randomRange(rng, 20, 140),
        loopCount: Math.floor(randomRange(rng, 28, 180)),
        phaseOffset: randomRange(rng, 0, 1),
        petalRoundness: randomRange(rng, 0, 1)
      };
    } else if (chosenFamily === "spiralArms") {
      const spiralVariants = ["orbitStamp", "waveRibbon", "roseOrbit", "noiseDrift"];
      patch.spiralArms = {
        variant: spiralVariants[Math.floor(rng() * spiralVariants.length)],
        armCount: Math.floor(randomRange(rng, 3, 9)),
        armLength: randomRange(rng, 180, 500),
        armCurl: randomRange(rng, 0.2, 2.3),
        armSpread: randomRange(rng, 0, 1.6),
        stampSize: randomRange(rng, 14, 100),
        stampSpacing: randomRange(rng, 4, 30),
        stampRotation: randomRange(rng, -120, 120),
        modDepth: randomRange(rng, 0.2, 2.1),
        modFreq: randomRange(rng, 0.8, 8.5)
      };
    } else {
      patch.flowerCone = {
        petalCount: Math.floor(randomRange(rng, 3, 11)),
        innerRadius: randomRange(rng, 6, 120),
        outerRadius: randomRange(rng, 180, 470),
        twist: randomRange(rng, -1.2, 1.2),
        taper: randomRange(rng, 0.4, 2.6)
      };
    }

    updateState(patch);
    setStatus(`Randomized: ${chosenFamily}.`);
  }

  function handleReset() {
    replaceState(createDefaultState());
    syncPrimaryUiFromFamily(state);
    updatePrimaryControlMeta();
    updateFamilyVisibility();
    syncControlsFromState();
    requestRender();
    setStatus("Reset to defaults.");
  }

  function handleApplyPreset() {
    const presetId = els.presetSelect.value;
    const preset = PRESETS.find((item) => item.id === presetId);

    if (!preset) {
      setStatus("Preset not found.");
      return;
    }

    updateState(preset.statePatch);
    setStatus(`Preset applied: ${preset.name}.`);
  }

  function handleExport() {
    try {
      exportSVG(state);
      setStatus("SVG exported.");
    } catch (error) {
      setStatus(`Export failed: ${error.message}`);
      window.alert(`Export failed: ${error.message}`);
    }
  }

  async function handleCopySVG() {
    try {
      const safeState = normalizeState(state);
      const scene = generateGeometry(safeState, { precision: 4 });
      const validationError = validateScene(scene);
      if (validationError) {
        throw new Error(validationError);
      }
      const svgText = buildSvgText(scene);
      await copyTextToClipboard(svgText);
      setStatus("SVG copied to clipboard (shape only).");
    } catch (error) {
      setStatus(`Copy failed: ${error.message}`);
      window.alert(`Copy failed: ${error.message}`);
    }
  }

  function handleSaveJSON() {
    try {
      const jsonText = serializeState(state);
      const filename = `spiro-lab-params-${timestampSlug()}.spiro.json`;
      downloadFile(jsonText, filename, "application/json");
      setStatus("Parameters saved as JSON.");
    } catch (error) {
      setStatus(`Save failed: ${error.message}`);
    }
  }

  async function handleLoadJSON(event) {
    const file = event.target.files && event.target.files[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    try {
      const text = await file.text();
      const nextState = deserializeState(text);
      replaceState(nextState);
      syncPrimaryUiFromFamily(state);
      updatePrimaryControlMeta();
      updateFamilyVisibility();
      syncControlsFromState();
      requestRender();
      setStatus(`Loaded params from ${file.name}.`);
    } catch (error) {
      setStatus("Invalid JSON file. Current state unchanged.");
      window.alert("Unable to load params: invalid JSON or shape.");
    }
  }

  function requestRender() {
    if (renderTimer) {
      clearTimeout(renderTimer);
    }
    renderTimer = setTimeout(() => {
      renderTimer = null;
      renderNow();
    }, RENDER_DEBOUNCE_MS);
  }

  function renderNow() {
    const scene = generateGeometry(state, { precision: 2 });
    renderSVG(scene, els.previewSvg);
    updatePaperPreview(state.ui, scene.size);
    setStatus(`${scene.paths.length} path${scene.paths.length === 1 ? "" : "s"} rendered.`);
    queueHashSync();
  }

  function updatePaperPreview(uiState, size) {
    const safeSize = Number(size) > 0 ? Number(size) : 1080;
    const paperEnabled = !!uiState.paperPreview;
    const backgroundColor = normalizeHexColor(uiState.backgroundColor, "#221b18");
    els.paperRect.setAttribute("width", String(safeSize));
    els.paperRect.setAttribute("height", String(safeSize));

    if (paperEnabled) {
      els.paperRect.setAttribute("fill", backgroundColor);
    } else {
      els.paperRect.setAttribute("fill", "#ffffff");
    }
  }

  function queueHashSync() {
    if (hashTimer) {
      clearTimeout(hashTimer);
    }
    hashTimer = setTimeout(() => {
      hashTimer = null;
      syncHashFromState();
    }, 150);
  }

  function syncHashFromState() {
    try {
      const compact = {
        version: APP_VERSION,
        family: state.family,
        seed: state.seed,
        sizePreset: state.sizePreset,
        strokeColor: state.strokeColor,
        strokeWidth: state.strokeWidth,
        opacity: state.opacity,
        blendMode: state.blendMode,
        centerX: state.centerX,
        centerY: state.centerY,
        globalScale: state.globalScale,
        rotationDeg: state.rotationDeg,
        samples: state.samples,
        smoothing: state.smoothing,
        jitterAmp: state.jitterAmp,
        jitterFreq: state.jitterFreq,
        ring: state.ring,
        spiralArms: state.spiralArms,
        flowerCone: state.flowerCone,
        ui: {
          paperPreview: !!state.ui.paperPreview,
          backgroundColor: state.ui.backgroundColor
        }
      };

      const encoded = encodeURIComponent(JSON.stringify(compact));
      if (encoded.length <= 1800) {
        history.replaceState(null, "", `#${encoded}`);
      }
    } catch (_error) {
      // Hash sync failures should never block rendering.
    }
  }

  function loadInitialState() {
    const fromHash = parseStateFromHash();
    const base = createDefaultState();
    const merged = fromHash ? mergeDeep(base, fromHash) : base;
    const normalized = normalizeState(merged);
    syncPrimaryUiFromFamily(normalized);
    return normalized;
  }

  function parseStateFromHash() {
    const hash = window.location.hash;
    if (!hash || hash.length <= 1) {
      return null;
    }

    try {
      const decoded = decodeURIComponent(hash.slice(1));
      const parsed = JSON.parse(decoded);
      if (!parsed || typeof parsed !== "object") {
        return null;
      }
      return parsed;
    } catch (_error) {
      return null;
    }
  }

  function populatePresetSelect() {
    els.presetSelect.textContent = "";

    for (const preset of PRESETS) {
      const option = document.createElement("option");
      option.value = preset.id;
      option.textContent = preset.name;
      option.title = preset.description;
      els.presetSelect.appendChild(option);
    }

    els.presetSelect.value = PRESETS[0].id;
  }

  function updateFamilyVisibility() {
    for (const group of familyGroups) {
      group.hidden = group.dataset.familyGroup !== state.family;
    }
  }

  function updatePrimaryControlMeta() {
    const map = PRIMARY_CONTROL_MAP[state.family];
    els.primarySizeLabel.firstChild.textContent = `${map.sizeLabel} `;
    els.motifCountLabel.firstChild.textContent = `${map.countLabel} `;

    els.primarySizeControl.min = String(map.sizeMin);
    els.primarySizeControl.max = String(map.sizeMax);
    els.primarySizeControl.step = String(map.sizeStep);

    els.motifCountControl.min = String(map.countMin);
    els.motifCountControl.max = String(map.countMax);
    els.motifCountControl.step = String(map.countStep);
  }

  function syncPrimaryUiFromFamily(targetState) {
    const map = PRIMARY_CONTROL_MAP[targetState.family];
    targetState.ui.primarySize = getByPath(targetState, map.sizePath);
    targetState.ui.motifCount = getByPath(targetState, map.countPath);
  }

  function syncControlsFromState() {
    for (const input of boundInputs) {
      const path = input.dataset.bind;
      const type = input.dataset.type;
      const value = getByPath(state, path);

      if (type === "boolean") {
        input.checked = !!value;
      } else if (value != null) {
        input.value = String(value);
      }
    }

    for (const output of valueOutputs) {
      const path = output.dataset.valueFor;
      const value = getByPath(state, path);
      output.textContent = formatValue(value);
    }
  }

  function selectGenerator(safeState, rng) {
    if (safeState.family === "ring") {
      return generateRingLattice(safeState, rng);
    }
    if (safeState.family === "spiralArms") {
      return generateSpiralArms(safeState, rng);
    }
    return generateFlowerCone(safeState, rng);
  }

  function generateRingLattice(safeState, rng) {
    const { ring, samples } = safeState;
    const loops = clampInt(ring.loopCount, 4, 220);
    const stampSamples = clampInt(Math.floor(samples * 0.22), 30, 220);
    const paths = [];
    const centerOrbit = [];

    for (let i = 0; i < loops; i += 1) {
      const u = i / loops;
      const theta = TAU * u;
      const orbitalRadius = ring.radius + ring.bandWidth * 0.22 * Math.sin(theta * 3 + ring.phaseOffset * TAU);
      const cx = orbitalRadius * Math.cos(theta);
      const cy = orbitalRadius * Math.sin(theta);
      centerOrbit.push({ x: cx, y: cy });

      const stampBase = ring.bandWidth * (0.38 + 0.42 * (0.5 + 0.5 * Math.sin(theta * 2 + ring.phaseOffset * TAU)));
      const rx = Math.max(2, stampBase);
      const ry = Math.max(2, stampBase * (0.82 + 0.35 * ring.petalRoundness));
      const rotation = theta + ring.phaseOffset * TAU * 0.7;
      const harmonic = 1 + ring.petalRoundness * 4;

      const points = sampleClosedPath(stampSamples, (t) => {
        const angle = TAU * t;
        const radialMod = 1 + 0.18 * ring.petalRoundness * Math.cos(angle * harmonic + theta);
        const lx = rx * Math.cos(angle) * radialMod;
        const ly = ry * Math.sin(angle) * radialMod;
        const p = rotatePoint(lx, ly, rotation);
        return {
          x: p.x + cx,
          y: p.y + cy
        };
      });

      paths.push({ points, closed: true });
    }

    if (centerOrbit.length > 2) {
      paths.push({ points: centerOrbit, closed: true });
    }

    const weaveR = Math.max(10, ring.radius - ring.bandWidth * 0.42);
    const weavePts = sampleClosedPath(clampInt(Math.floor(samples * 0.26), 60, 420), (t) => {
      const angle = TAU * t;
      const rosette = 1 + 0.12 * Math.sin(angle * Math.max(3, Math.floor(loops / 8)) + ring.phaseOffset * TAU);
      return {
        x: weaveR * rosette * Math.cos(angle),
        y: weaveR * rosette * Math.sin(angle)
      };
    });
    paths.push({ points: weavePts, closed: true });

    if (rng() > 0.35) {
      const innerR = Math.max(8, ring.radius - ring.bandWidth * 0.85);
      const innerPts = sampleClosedPath(clampInt(Math.floor(samples * 0.2), 40, 300), (t) => {
        const angle = TAU * t;
        return {
          x: innerR * Math.cos(angle),
          y: innerR * Math.sin(angle)
        };
      });
      paths.push({ points: innerPts, closed: true });
    }

    return paths;
  }

  function generateSpiralArms(safeState, rng) {
    const variant = safeState.spiralArms.variant;
    if (variant === "waveRibbon") {
      return generateSpiralWaveRibbon(safeState);
    }
    if (variant === "roseOrbit") {
      return generateSpiralRoseOrbit(safeState);
    }
    if (variant === "noiseDrift") {
      return generateSpiralNoiseDrift(safeState);
    }
    return generateSpiralOrbitStamp(safeState, rng);
  }

  function generateSpiralOrbitStamp(safeState, rng) {
    const { spiralArms, samples } = safeState;
    const armCount = clampInt(spiralArms.armCount, 2, 12);
    const armLength = spiralArms.armLength;
    const spacing = Math.max(2, spiralArms.stampSpacing);
    const stampsPerArm = clampInt(Math.floor(armLength / spacing), 8, 220);
    const stampSamples = clampInt(Math.floor(samples * 0.18), 28, 180);
    const modulationDepth = spiralArms.modDepth;
    const modulationFreq = spiralArms.modFreq;
    const paths = [];

    for (let armIndex = 0; armIndex < armCount; armIndex += 1) {
      const baseAngle = (TAU * armIndex) / armCount;
      const spine = [];

      for (let j = 0; j < stampsPerArm; j += 1) {
        const u = j / Math.max(1, stampsPerArm - 1);
        const wave = Math.sin(modulationFreq * TAU * u + armIndex * 0.6);
        const radialDist = armLength * u;
        const theta =
          baseAngle +
          spiralArms.armCurl * TAU * u +
          spiralArms.armSpread * u * u +
          0.22 * modulationDepth * wave;

        const cx = radialDist * Math.cos(theta);
        const cy = radialDist * Math.sin(theta);
        spine.push({ x: cx, y: cy });

        const stampRadius = Math.max(1.5, spiralArms.stampSize * (1 - 0.45 * u) + 2);
        const stampRot = theta + toRadians(spiralArms.stampRotation) + u * 0.4;

        const points = sampleClosedPath(stampSamples, (t) => {
          const angle = TAU * t;
          const harmonic =
            1 +
            0.2 * Math.sin(3 * angle + stampRot) +
            0.08 * Math.sin(7 * angle + stampRot) +
            0.14 * modulationDepth * Math.sin(modulationFreq * angle + stampRot);
          const lx = stampRadius * Math.cos(angle) * harmonic;
          const ly = stampRadius * Math.sin(angle) * (0.88 + 0.2 * Math.cos(2 * angle + stampRot));
          const p = rotatePoint(lx, ly, stampRot);
          return {
            x: p.x + cx,
            y: p.y + cy
          };
        });

        paths.push({ points, closed: true });
      }

      paths.push({ points: spine, closed: false });
    }

    const corePts = sampleClosedPath(clampInt(Math.floor(samples * 0.14), 30, 220), (t) => {
      const angle = TAU * t;
      const r =
        spiralArms.stampSize *
        0.65 *
        (1 + 0.3 * Math.sin(angle * armCount) + 0.22 * modulationDepth * Math.sin(angle * modulationFreq));
      return {
        x: r * Math.cos(angle),
        y: r * Math.sin(angle)
      };
    });
    paths.push({ points: corePts, closed: true });

    if (rng() > 0.5) {
      const rimPts = sampleClosedPath(clampInt(Math.floor(samples * 0.16), 44, 240), (t) => {
        const angle = TAU * t;
        const wave = 1 + 0.08 * modulationDepth * Math.sin(modulationFreq * angle);
        const r = armLength * 0.95 * wave;
        return {
          x: r * Math.cos(angle),
          y: r * Math.sin(angle)
        };
      });
      paths.push({ points: rimPts, closed: true });
    }

    return paths;
  }

  function generateSpiralWaveRibbon(safeState) {
    const { spiralArms, samples } = safeState;
    const armCount = clampInt(spiralArms.armCount, 2, 12);
    const modulationDepth = spiralArms.modDepth;
    const modulationFreq = spiralArms.modFreq;
    const sampleCount = clampInt(Math.floor(samples * 0.66), 120, 980);
    const ribbonCount = clampInt(2 + Math.round(modulationDepth * 3), 2, 9);
    const paths = [];

    for (let armIndex = 0; armIndex < armCount; armIndex += 1) {
      const base = (TAU * armIndex) / armCount;

      for (let ribbonIndex = 0; ribbonIndex < ribbonCount; ribbonIndex += 1) {
        const ribbonPhase = (TAU * ribbonIndex) / ribbonCount;
        const points = [];
        for (let i = 0; i < sampleCount; i += 1) {
          const u = i / Math.max(1, sampleCount - 1);
          const baseR = spiralArms.armLength * u;
          const localWave =
            Math.sin(modulationFreq * TAU * u + ribbonPhase) +
            0.5 * Math.sin((modulationFreq * 0.5 + 1.1) * TAU * u + base);
          const radialOffset = spiralArms.stampSize * (0.45 + 0.35 * (1 - u)) * modulationDepth * localWave;
          const theta =
            base +
            spiralArms.armCurl * TAU * u +
            spiralArms.armSpread * u * u +
            0.2 * modulationDepth * Math.sin(modulationFreq * TAU * u + ribbonPhase);
          const radius = baseR + radialOffset;
          points.push({
            x: radius * Math.cos(theta),
            y: radius * Math.sin(theta)
          });
        }
        paths.push({ points, closed: false });
      }
    }

    return paths;
  }

  function generateSpiralRoseOrbit(safeState) {
    const { spiralArms, samples } = safeState;
    const armCount = clampInt(spiralArms.armCount, 2, 12);
    const modulationDepth = spiralArms.modDepth;
    const modulationFreq = spiralArms.modFreq;
    const roseSamples = clampInt(Math.floor(samples * 0.2), 40, 260);
    const orbitCount = clampInt(Math.floor(spiralArms.armLength / Math.max(3, spiralArms.stampSpacing * 1.8)), 6, 80);
    const paths = [];

    for (let armIndex = 0; armIndex < armCount; armIndex += 1) {
      const base = (TAU * armIndex) / armCount;

      for (let i = 0; i < orbitCount; i += 1) {
        const u = i / Math.max(1, orbitCount - 1);
        const radialDist = spiralArms.armLength * u;
        const theta = base + spiralArms.armCurl * TAU * u + spiralArms.armSpread * u * u;
        const cx = radialDist * Math.cos(theta);
        const cy = radialDist * Math.sin(theta);
        const petalK = Math.max(2, Math.round(modulationFreq));
        const localSize = Math.max(3, spiralArms.stampSize * (0.9 - u * 0.4));

        const points = sampleClosedPath(roseSamples, (t) => {
          const angle = TAU * t;
          const rose = Math.cos(petalK * angle + u * TAU * modulationDepth);
          const radius = localSize * (0.45 + 0.55 * Math.abs(rose)) * (1 + 0.15 * modulationDepth * Math.sin(angle * 2));
          const rotated = rotatePoint(radius * Math.cos(angle), radius * Math.sin(angle), theta + toRadians(spiralArms.stampRotation));
          return {
            x: cx + rotated.x,
            y: cy + rotated.y
          };
        });
        paths.push({ points, closed: true });
      }
    }

    return paths;
  }

  function generateSpiralNoiseDrift(safeState) {
    const { spiralArms, samples, seed } = safeState;
    const armCount = clampInt(spiralArms.armCount, 2, 12);
    const modulationDepth = spiralArms.modDepth;
    const modulationFreq = spiralArms.modFreq;
    const sampleCount = clampInt(Math.floor(samples * 0.7), 140, 1100);
    const paths = [];

    for (let armIndex = 0; armIndex < armCount; armIndex += 1) {
      const base = (TAU * armIndex) / armCount;
      const points = [];

      for (let i = 0; i < sampleCount; i += 1) {
        const u = i / Math.max(1, sampleCount - 1);
        const baseTheta = base + spiralArms.armCurl * TAU * u + spiralArms.armSpread * u * u;
        const noiseAngle = hashNoise(seed + armIndex * 103, armIndex, i, 0.4 + modulationFreq * 0.2);
        const noiseRadius = hashNoise(seed + 701, armIndex, i, 0.8 + modulationFreq * 0.27);
        const theta = baseTheta + noiseAngle * 0.6 * modulationDepth;
        const radius = spiralArms.armLength * u + spiralArms.stampSize * 0.45 * modulationDepth * noiseRadius;
        points.push({
          x: radius * Math.cos(theta),
          y: radius * Math.sin(theta)
        });
      }

      paths.push({ points, closed: false });
    }

    const orbitPts = sampleClosedPath(clampInt(Math.floor(samples * 0.17), 50, 300), (t) => {
      const angle = TAU * t;
      const noise = hashNoise(seed + 1984, 999, Math.floor(t * 1000), modulationFreq);
      const radius = spiralArms.armLength * 0.75 * (1 + modulationDepth * 0.18 * noise);
      return {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle)
      };
    });
    paths.push({ points: orbitPts, closed: true });

    return paths;
  }

  function generateFlowerCone(safeState, _rng) {
    const { flowerCone, samples } = safeState;
    const petals = clampInt(flowerCone.petalCount, 2, 16);
    const bandCount = clampInt(Math.floor(samples * 0.13), 18, 160);
    const pathSamples = clampInt(Math.floor(samples * 0.2), 38, 280);
    const paths = [];

    for (let petalIndex = 0; petalIndex < petals; petalIndex += 1) {
      const base = (TAU * petalIndex) / petals;

      for (let i = 0; i < bandCount; i += 1) {
        const u = i / Math.max(1, bandCount - 1);
        const reach = lerp(flowerCone.innerRadius, flowerCone.outerRadius, u);
        const width = Math.max(
          2,
          (flowerCone.outerRadius - flowerCone.innerRadius) * (0.22 * Math.pow(1 - u, flowerCone.taper) + 0.02)
        );
        const twist = flowerCone.twist * TAU * u;
        const rotation = base + twist;

        const points = sampleClosedPath(pathSamples, (t) => {
          const angle = TAU * t;
          const localX =
            reach * 0.52 * (1 - Math.cos(angle)) +
            width * 0.13 * Math.sin(2 * angle + twist);
          const localY = width * 0.96 * Math.sin(angle) * (0.6 + 0.28 * (1 - u));
          const p = rotatePoint(localX, localY, rotation);
          return { x: p.x, y: p.y };
        });

        paths.push({ points, closed: true });
      }
    }

    const centerSamples = clampInt(Math.floor(samples * 0.18), 34, 220);
    const centerPts = sampleClosedPath(centerSamples, (t) => {
      const angle = TAU * t;
      const r =
        Math.max(4, flowerCone.innerRadius * 0.68) +
        flowerCone.innerRadius * 0.26 * Math.sin(angle * petals + flowerCone.twist * TAU * 0.5);
      return {
        x: r * Math.cos(angle),
        y: r * Math.sin(angle)
      };
    });
    paths.push({ points: centerPts, closed: true });

    return paths;
  }

  function postProcessPolyline(polyline, safeState, lineIndex) {
    let points = polyline.points;
    if (!Array.isArray(points) || points.length < 2) {
      return { points: [], closed: !!polyline.closed };
    }

    points = points.map((p) => ({ x: p.x, y: p.y }));

    if (safeState.smoothing > 0) {
      const smoothIterations = clampInt(Math.round(safeState.smoothing * 3), 0, 4);
      for (let i = 0; i < smoothIterations; i += 1) {
        points = smoothPoints(points, polyline.closed !== false, 0.45 + safeState.smoothing * 0.35);
      }
    }

    if (safeState.jitterAmp > 0) {
      points = applyJitter(points, safeState, lineIndex);
    }

    points = points.filter((p) => Number.isFinite(p.x) && Number.isFinite(p.y));
    return {
      points,
      closed: polyline.closed !== false
    };
  }

  function applyJitter(points, safeState, lineIndex) {
    const out = [];
    const amp = safeState.jitterAmp;
    const freq = safeState.jitterFreq;

    for (let i = 0; i < points.length; i += 1) {
      const p = points[i];
      const nx = hashNoise(safeState.seed, lineIndex, i, freq);
      const ny = hashNoise(safeState.seed + 97, lineIndex, i, freq * 1.13);
      out.push({
        x: p.x + nx * amp,
        y: p.y + ny * amp
      });
    }

    return out;
  }

  function smoothPoints(points, closed, strength) {
    if (points.length <= 2) {
      return points;
    }

    const result = [];
    const lastIndex = points.length - 1;

    for (let i = 0; i < points.length; i += 1) {
      const prevIndex = i === 0 ? (closed ? lastIndex : 0) : i - 1;
      const nextIndex = i === lastIndex ? (closed ? 0 : lastIndex) : i + 1;
      const prev = points[prevIndex];
      const cur = points[i];
      const next = points[nextIndex];
      const mix = clamp(strength, 0, 1);

      result.push({
        x: cur.x * (1 - mix) + ((prev.x + next.x) * 0.5) * mix,
        y: cur.y * (1 - mix) + ((prev.y + next.y) * 0.5) * mix
      });
    }

    return result;
  }

  function sampleClosedPath(count, callback) {
    const points = [];
    const n = Math.max(8, Math.floor(count));

    for (let i = 0; i < n; i += 1) {
      const t = i / n;
      const p = callback(t);
      points.push({ x: p.x, y: p.y });
    }

    return points;
  }

  function polylineToPathCommands(points, closed) {
    if (!points || points.length < 2) {
      return [];
    }

    const commands = [{ cmd: "M", x: points[0].x, y: points[0].y }];

    for (let i = 1; i < points.length; i += 1) {
      commands.push({ cmd: "L", x: points[i].x, y: points[i].y });
    }

    if (closed) {
      commands.push({ cmd: "Z" });
    }

    return commands;
  }

  function pathCommandsToD(commands, precision) {
    const parts = [];
    const p = clampInt(precision, 0, 8);

    for (const command of commands) {
      if (command.cmd === "Z") {
        parts.push("Z");
      } else if (command.cmd === "M" || command.cmd === "L") {
        const x = formatNumber(command.x, p);
        const y = formatNumber(command.y, p);
        parts.push(`${command.cmd}${x} ${y}`);
      }
    }

    return parts.join(" ");
  }

  function validateScene(scene) {
    if (!scene || !Array.isArray(scene.paths) || scene.paths.length === 0) {
      return "No geometry generated. Adjust controls and try again.";
    }

    for (const path of scene.paths) {
      if (!isValidPathData(path.d)) {
        return "Path data contains invalid numeric values.";
      }
    }

    return null;
  }

  function buildSvgText(scene) {
    const lines = [];
    lines.push(`<?xml version="1.0" encoding="UTF-8"?>`);
    lines.push(
      `<svg xmlns="${SVG_NS}" width="${scene.size}" height="${scene.size}" viewBox="0 0 ${scene.size} ${scene.size}" fill="none">`
    );
    lines.push(
      `  <g transform="translate(${formatNumber(scene.transform.x, 4)} ${formatNumber(scene.transform.y, 4)}) scale(${formatNumber(scene.transform.scale, 6)}) rotate(${formatNumber(scene.transform.rotateDeg, 4)})" style="mix-blend-mode:${scene.blendMode}">`
    );

    for (const path of scene.paths) {
      lines.push(
        `    <path d="${path.d}" stroke="${escapeXml(path.stroke)}" stroke-width="${formatNumber(path.strokeWidth, 4)}" stroke-opacity="${formatNumber(path.opacity, 4)}" stroke-linecap="round" stroke-linejoin="round" fill="none" />`
      );
    }

    lines.push("  </g>");
    lines.push("</svg>");
    return lines.join("\n");
  }

  function replaceState(nextState) {
    for (const key of Object.keys(state)) {
      delete state[key];
    }
    Object.assign(state, nextState);
  }

  function normalizeState(rawState) {
    const base = createDefaultState();
    const merged = mergeDeep(base, rawState || {});

    merged.version = APP_VERSION;
    merged.family = ["ring", "spiralArms", "flowerCone"].includes(merged.family)
      ? merged.family
      : "ring";

    merged.seed = clampInt(merged.seed, 1, 99999999);
    merged.sizePreset = merged.sizePreset === 2048 ? 2048 : 1080;

    merged.strokeColor = normalizeHexColor(merged.strokeColor, base.strokeColor);
    merged.strokeWidth = clamp(merged.strokeWidth, 0.1, 4);
    merged.opacity = clamp(merged.opacity, 0.05, 1);
    merged.blendMode = ["normal", "screen", "multiply", "overlay", "soft-light"].includes(merged.blendMode)
      ? merged.blendMode
      : "normal";

    merged.centerX = clamp(merged.centerX, -0.5, 0.5);
    merged.centerY = clamp(merged.centerY, -0.5, 0.5);
    merged.globalScale = clamp(merged.globalScale, 0.2, 2);
    merged.rotationDeg = clamp(merged.rotationDeg, -180, 180);

    merged.samples = clampInt(merged.samples, 60, 1400);
    merged.smoothing = clamp(merged.smoothing, 0, 1);
    merged.jitterAmp = clamp(merged.jitterAmp, 0, 16);
    merged.jitterFreq = clamp(merged.jitterFreq, 0.2, 20);

    merged.ring.radius = clamp(merged.ring.radius, 20, 500);
    merged.ring.bandWidth = clamp(merged.ring.bandWidth, 1, 220);
    merged.ring.loopCount = clampInt(merged.ring.loopCount, 4, 220);
    merged.ring.phaseOffset = clamp(merged.ring.phaseOffset, 0, 1);
    merged.ring.petalRoundness = clamp(merged.ring.petalRoundness, 0, 1);

    merged.spiralArms.variant = ["orbitStamp", "waveRibbon", "roseOrbit", "noiseDrift"].includes(
      merged.spiralArms.variant
    )
      ? merged.spiralArms.variant
      : "orbitStamp";
    merged.spiralArms.armCount = clampInt(merged.spiralArms.armCount, 2, 12);
    merged.spiralArms.armLength = clamp(merged.spiralArms.armLength, 20, 600);
    merged.spiralArms.armCurl = clamp(merged.spiralArms.armCurl, 0, 3);
    merged.spiralArms.armSpread = clamp(merged.spiralArms.armSpread, 0, 2);
    merged.spiralArms.stampSize = clamp(merged.spiralArms.stampSize, 1, 220);
    merged.spiralArms.stampSpacing = clamp(merged.spiralArms.stampSpacing, 2, 80);
    merged.spiralArms.stampRotation = clamp(merged.spiralArms.stampRotation, -180, 180);
    merged.spiralArms.modDepth = clamp(merged.spiralArms.modDepth, 0, 2.5);
    merged.spiralArms.modFreq = clamp(merged.spiralArms.modFreq, 0.2, 12);

    merged.flowerCone.petalCount = clampInt(merged.flowerCone.petalCount, 2, 16);
    merged.flowerCone.innerRadius = clamp(merged.flowerCone.innerRadius, 1, 300);
    merged.flowerCone.outerRadius = clamp(merged.flowerCone.outerRadius, 30, 620);
    merged.flowerCone.twist = clamp(merged.flowerCone.twist, -2, 2);
    merged.flowerCone.taper = clamp(merged.flowerCone.taper, 0.2, 3);

    if (merged.flowerCone.innerRadius > merged.flowerCone.outerRadius - 4) {
      merged.flowerCone.innerRadius = Math.max(1, merged.flowerCone.outerRadius - 4);
    }

    merged.ui.paperPreview = !!merged.ui.paperPreview;
    merged.ui.backgroundColor = normalizeHexColor(merged.ui.backgroundColor, "#221b18");

    syncPrimaryUiFromFamily(merged);
    return merged;
  }

  function mergeDeep(target, source) {
    if (!source || typeof source !== "object") {
      return target;
    }

    const output = Array.isArray(target) ? target.slice() : { ...target };

    for (const key of Object.keys(source)) {
      const sourceValue = source[key];
      const targetValue = output[key];

      if (
        sourceValue &&
        typeof sourceValue === "object" &&
        !Array.isArray(sourceValue) &&
        targetValue &&
        typeof targetValue === "object" &&
        !Array.isArray(targetValue)
      ) {
        output[key] = mergeDeep(targetValue, sourceValue);
      } else {
        output[key] = sourceValue;
      }
    }

    return output;
  }

  function cloneState(currentState) {
    return JSON.parse(JSON.stringify(currentState));
  }

  function parseInputValue(input) {
    const type = input.dataset.type;
    if (type === "boolean") {
      return !!input.checked;
    }

    if (type === "int") {
      return parseInt(input.value, 10);
    }

    if (type === "float") {
      return parseFloat(input.value);
    }

    if (type === "string") {
      return input.value;
    }

    return input.value;
  }

  function getByPath(object, path) {
    const parts = path.split(".");
    let ref = object;
    for (const part of parts) {
      if (!ref || typeof ref !== "object") {
        return undefined;
      }
      ref = ref[part];
    }
    return ref;
  }

  function setByPath(object, path, value) {
    const parts = path.split(".");
    let ref = object;

    for (let i = 0; i < parts.length - 1; i += 1) {
      const key = parts[i];
      if (!ref[key] || typeof ref[key] !== "object") {
        ref[key] = {};
      }
      ref = ref[key];
    }

    ref[parts[parts.length - 1]] = value;
  }

  function setStatus(text) {
    els.statusLine.textContent = text;
  }

  function clamp(value, min, max) {
    const n = Number(value);
    if (!Number.isFinite(n)) {
      return min;
    }
    return Math.min(max, Math.max(min, n));
  }

  function clampInt(value, min, max) {
    return Math.round(clamp(value, min, max));
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function toRadians(deg) {
    return (deg * Math.PI) / 180;
  }

  function rotatePoint(x, y, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return {
      x: x * c - y * s,
      y: x * s + y * c
    };
  }

  function formatValue(value) {
    if (typeof value === "number") {
      if (Math.abs(value) >= 1000) {
        return Math.round(value).toString();
      }
      if (Math.abs(value % 1) < 0.0001) {
        return Math.round(value).toString();
      }
      if (Math.abs(value) < 1) {
        return value.toFixed(3);
      }
      return value.toFixed(2);
    }
    return String(value ?? "");
  }

  function formatNumber(value, precision) {
    const fixed = Number(value).toFixed(precision);
    return fixed.replace(/\.?0+$/, "");
  }

  function roundTo(value, precision) {
    const m = Math.pow(10, precision);
    return Math.round(value * m) / m;
  }

  function isValidPathData(d) {
    return typeof d === "string" && d.length > 4 && !/NaN|Infinity/.test(d);
  }

  function randomRange(rng, min, max) {
    return min + (max - min) * rng();
  }

  function normalizeHexColor(value, fallback) {
    if (typeof value !== "string") {
      return fallback;
    }

    const match = value.trim().match(/^#([0-9a-fA-F]{6})$/);
    return match ? `#${match[1].toLowerCase()}` : fallback;
  }

  function escapeXml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  function hashNoise(seed, lineIndex, pointIndex, freq) {
    const n = Math.sin((seed * 0.00031 + lineIndex * 12.9898 + pointIndex * 78.233) * freq) * 43758.5453;
    return (n - Math.floor(n)) * 2 - 1;
  }

  function mulberry32(seed) {
    let t = seed >>> 0;
    return function next() {
      t += 0x6d2b79f5;
      let x = Math.imul(t ^ (t >>> 15), t | 1);
      x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
      return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
    };
  }

  function timestampSlug() {
    const date = new Date();
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const mm = String(date.getMinutes()).padStart(2, "0");
    const ss = String(date.getSeconds()).padStart(2, "0");
    return `${y}${m}${d}-${hh}${mm}${ss}`;
  }

  function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }

  async function copyTextToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(textArea);
    if (!ok) {
      throw new Error("Clipboard write unavailable in this browser context.");
    }
  }

  window.spiroTool = {
    createDefaultState,
    updateState,
    generateGeometry,
    renderSVG,
    exportSVG,
    buildSvgText,
    serializeState,
    deserializeState
  };
})();
