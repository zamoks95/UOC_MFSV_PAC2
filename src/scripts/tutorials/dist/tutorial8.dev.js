"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Tutorial8;

var THREE = _interopRequireWildcard(require("three"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Tutorial8() {
  var canvasElement = document.getElementById("Tutorial8Canvas");
  var scene = new THREE.Scene();
  var renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  var camera;
  var pointLight; // Sun Settings

  var sunMesh;
  var SunRotationY = 0.0;
  var SunSpeedY = 0.005;
  var SunPosition = {
    x: 0,
    y: 0,
    z: 0
  }; // Earth Settings

  var earthMesh;
  var EarthRotationY = 0.0;
  var EarthSpeedY = 0.05;
  var EarthDegrees = 0;
  var EarthPosition = {
    x: 8.0,
    y: 0.0,
    z: 4.0
  };
  var EarthRelativeCenter = SunPosition;
  var EarthRelativeRadius = 7; // Moon Settings

  var moonMesh;
  var MoonRotationY = 0.0;
  var MoonSpeedY = 0.09;
  var MoonDegrees = 0;
  var MoonRelativeCenter = EarthPosition;
  var MoonRelativeRadius = 2; // Camera Settings Objects

  var cameraPositionX = -0.1;
  var cameraPositionY = 6.5;
  var cameraPositionZ = 20.0;
  var cameraRotationX = -0.4; // Initialize Scene

  initializeScene(); // Animate Scene

  animateScene(); // Initialize Scene - Start

  function initializeScene() {
    renderer.setClearColor(0x000000, 1);
    var canvasWidth = canvasElement.offsetWidth; // Canvas Width

    var canvasHeight = canvasElement.offsetHeight; // Canvas Height

    renderer.setSize(canvasWidth, canvasHeight);
    canvasElement.appendChild(renderer.domElement);
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 1, 100);
    camera.position.set(cameraPositionX, cameraPositionY, cameraPositionZ);
    camera.lookAt(scene.position);
    scene.add(camera); // Add Point Light to Scene

    pointLight = new THREE.PointLight(0xffffff, 10, 50);
    pointLight.position.set(0.0, 0.0, 1.0);
    pointLight.castShadow = true;
    scene.add(pointLight); // Add Sun to Scene

    var sunGeometry = new THREE.IcosahedronGeometry(2, 2);
    sunMesh = new THREE.Mesh(sunGeometry, sunMaterial());
    sunMesh.position.set(0.0, 0.0, 4.0);
    scene.add(sunMesh); // Add Earth to Scene

    var earthGeometry = new THREE.IcosahedronGeometry(1, 2);
    earthMesh = new THREE.Mesh(earthGeometry, earthMaterial());
    earthMesh.position.set(8, 0.0, 4.0);
    earthMesh.castShadow = true;
    scene.add(earthMesh); // Add Moon to Scene

    var moonGeometry = new THREE.IcosahedronGeometry(0.5, 2);
    moonMesh = new THREE.Mesh(moonGeometry, moonMaterial());
    moonMesh.position.set(8 - 2, 0.0, 4.0);
    moonMesh.castShadow = true;
    scene.add(moonMesh);
  } // Initialize Scene - End
  // Render Scene - Start


  function renderScene() {
    renderer.render(scene, camera);
  }

  function animateScene() {
    // Increment Objects Rotations
    SunRotationY += SunSpeedY;
    EarthRotationY += EarthSpeedY;
    MoonRotationY += MoonSpeedY; // Animate Sun

    sunMesh.rotation.set(0.0, SunRotationY, 0.0);
    earthMesh.rotation.set(0.0, EarthRotationY, 0.0);
    moonMesh.rotation.set(0.0, MoonRotationY, 0.0); // Animate Camera

    camera.position.set(cameraPositionX, cameraPositionY, cameraPositionZ);
    camera.rotation.set(cameraRotationX, 0.0, 0.0); // Animate Moon

    MoonDegrees = updateDegree(MoonDegrees, 0.09);
    MoonRelativeCenter = earthMesh.position;
    var newPositionMoon = getPosition(MoonDegrees, MoonRelativeCenter, MoonRelativeRadius);
    moonMesh.position.set(newPositionMoon[0], 0.0, newPositionMoon[1]); // Animate Earth

    EarthDegrees = updateDegree(EarthDegrees, 0.0075);
    EarthRelativeCenter = sunMesh.position;
    var newPositionEarth = getPosition(EarthDegrees, EarthRelativeCenter, EarthRelativeRadius);
    earthMesh.position.set(newPositionEarth[0], 0.0, newPositionEarth[1]); // Render Scene

    requestAnimationFrame(animateScene);
    renderScene();
  } // Render Scene - End


  document.addEventListener("keydown", onDocumentKeyDown, false);

  function onDocumentKeyDown(event) {
    // Get the key code of the pressed key
    var keyCode = event.which; // Key w

    if (keyCode == 87) {
      cameraPositionY += 0.1; // Key s
    } else if (keyCode == 83) {
      cameraPositionY -= 0.1; // Key a
    } else if (keyCode == 65) {
      cameraPositionX -= 0.1; // Key d
    } else if (keyCode == 68) {
      cameraPositionX += 0.1;
    } // Key +
    else if (keyCode == 109) {
        cameraPositionZ += 0.1; // Key -
      } else if (keyCode == 107) {
        cameraPositionZ -= 0.1;
      } // Key R
      else if (keyCode == 82) {
          cameraRotationX -= 0.1; // Key F
        } else if (keyCode == 70) {
          cameraRotationX += 0.1;
        }
  } // Window Resize Handler - Start


  window.addEventListener("resize", onWindowResize, false);

  function onWindowResize() {
    camera.aspect = canvasElement.offsetWidth / canvasElement.offsetHeight;
    camera.updateProjectionMatrix(); // Update Camera

    renderer.setSize(canvasElement.offsetWidth, canvasElement.offsetHeight);
    animateScene(); // Rerender Scene
  } // Window Resize Handler - End

} // Update Degree - Start


function updateDegree(degree, incremental) {
  var newDegree = degree;

  if (newDegree > 360) {
    newDegree = 0;
  } else {
    newDegree += incremental;
  }

  return newDegree;
} // Update Degree - End
// Get Position Of Object - Start


function getPosition(degree, realtiveCenterPosition, relativeRadius) {
  var x = realtiveCenterPosition.x + relativeRadius * Math.sin(degree);
  var z = realtiveCenterPosition.z + relativeRadius * Math.cos(degree);
  return [x, z];
} // Get Position Of Object - End
// sunMaterial - Start


function sunMaterial() {
  var textureLoader = new THREE.TextureLoader();
  var sunColor = textureLoader.load("/src/images/sun/Lava004_2K_Color.jpg");
  var sunAmbient = textureLoader.load("/src/images/sun/Lava004_2K_emi.jpg");
  var sunDisplacement = textureLoader.load("/src/images/sun/Lava004_2K_Displacement.jpg");
  var sunNormal = textureLoader.load("/src/images/sun/Lava004_2K_Normal.jpg");
  var sunRoughness = textureLoader.load("/src/images/sun/Lava004_2K_Roughness.jpg");
  var material;
  material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    map: sunColor,
    normalMap: sunNormal,
    displacementMap: sunDisplacement,
    displacementScale: 0,
    aoMap: sunAmbient,
    aoMapIntensity: 50,
    reflectivity: 2,
    specularMap: sunColor,
    bumpMap: sunRoughness,
    emissive: 0xffffff,
    emissiveMap: sunColor,
    emissiveIntensity: 1.2
  });
  return material;
} // sunMaterial - End
// earthMaterial - Start


function earthMaterial() {
  var textureLoader = new THREE.TextureLoader();
  var sunColor = textureLoader.load("/src/images/earth/PaintedMetal007_2K_Color.jpg");
  var sunAmbient = textureLoader.load("/src/images/earth/PaintedMetal007_2K_AmbientOcclusion.jpg");
  var sunDisplacement = textureLoader.load("/src/images/earth/PaintedMetal007_2K_Displacement.jpg");
  var sunNormal = textureLoader.load("/src/images/earth/PaintedMetal007_2K_Normal.jpg");
  var sunRoughness = textureLoader.load("/src/images/earth/PaintedMetal007_2K_Roughness.jpg");
  var material;
  material = new THREE.MeshPhongMaterial({
    map: sunColor,
    normalMap: sunNormal,
    displacementMap: sunDisplacement,
    displacementScale: 0,
    aoMap: sunAmbient,
    aoMapIntensity: 50,
    reflectivity: 2,
    specularMap: sunColor,
    bumpMap: sunRoughness
  });
  return material;
} // earthMaterial - End
// moonMaterial - Start


function moonMaterial() {
  var textureLoader = new THREE.TextureLoader();
  var sunColor = textureLoader.load("/src/images/moon/Concrete019_2K_Color.jpg");
  var sunDisplacement = textureLoader.load("/src/images/moon/Concrete019_2K_Displacement.jpg");
  var sunNormal = textureLoader.load("/src/images/moon/Concrete019_2K_Normal.jpg");
  var sunRoughness = textureLoader.load("/src/images/moon/Concrete019_2K_Roughness.jpg");
  var material;
  material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    map: sunColor,
    normalMap: sunNormal,
    displacementMap: sunDisplacement,
    displacementScale: 0,
    reflectivity: 2,
    specularMap: sunColor,
    bumpMap: sunRoughness
  });
  return material;
} // moonMaterial - End