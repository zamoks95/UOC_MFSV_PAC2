"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Tutorial7;

var THREE = _interopRequireWildcard(require("three"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Tutorial7() {
  var canvasElement = document.getElementById("Tutorial7Canvas");
  var scene = new THREE.Scene();
  var renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  var camera; // Initialize Objects

  var xRotation = 0.0;
  var yRotation = 0.0;
  var xSpeed = 0.0;
  var ySpeed = 0.0;
  var zTranslation = 4.0; // Initialize Objects

  var boxMesh;
  var lightIsOn = true;
  var directionalLight;
  var blendingIsOn = true; // Initialize Scene

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
    camera.position.set(0, 0, 10);
    camera.lookAt(scene.position);
    scene.add(camera);
    var boxGeometry = new THREE.BoxGeometry(2.0, 2.0, 2.0);
    boxMesh = new THREE.Mesh(boxGeometry, boxMaterial(lightIsOn));
    boxMesh.position.set(0.0, 0.0, 4.0);
    scene.add(boxMesh); // Create Box - End

    directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(0.0, 0.0, 1.0);
    scene.add(directionalLight);
  } // Initialize Scene - End
  // Render Scene - Start


  function renderScene() {
    renderer.render(scene, camera);
  }

  function animateScene() {
    //directionalLight.position.set(camera.position);
    xRotation += xSpeed;
    yRotation += ySpeed;
    boxMesh.rotation.set(xRotation, yRotation, 0.0);
    boxMesh.position.z = zTranslation;
    requestAnimationFrame(animateScene);
    renderScene();
  } // Render Scene - End


  document.addEventListener("keydown", onDocumentKeyDown, false);

  function onDocumentKeyDown(event) {
    // Get the key code of the pressed key
    var keyCode = event.which; // 'L' - Toggle light

    if (keyCode == 76) {
      if (lightIsOn) {
        lightIsOn = false;
      } else {
        lightIsOn = true;
      }

      boxMesh.material = boxMaterial(lightIsOn);
      boxMesh.material.needsUpdate = true;
    } // Cursor B


    if (keyCode == 66) {
      if (blendingIsOn) {
        boxMesh.material.depthWrite = true;
        boxMesh.material.opacity = 1.0;
        boxMesh.material.combine = THREE.MultiplyOperation;
        blendingIsOn = false;
      } else {
        boxMesh.material.depthWrite = false;
        boxMesh.material.transparent = true;
        boxMesh.material.opacity = 0.2;
        boxMesh.material.combine = THREE.MixOperation;
        blendingIsOn = true;
      }

      boxMesh.material.needsUpdate = true;
    } // Cursor w
    else if (keyCode == 87) {
        xSpeed -= 0.01; // Cursor s
      } else if (keyCode == 83) {
        xSpeed += 0.01; // Cursor a
      } else if (keyCode == 65) {
        ySpeed -= 0.01; // Cursor d
      } else if (keyCode == 68) {
        ySpeed += 0.01;
      } // Cursor +
      else if (keyCode == 109) {
          zTranslation -= 0.2; // Cursor -
        } else if (keyCode == 107) {
          zTranslation += 0.2;
        }
  } // Window Resize Handler - Start


  window.addEventListener("resize", onWindowResize, false);

  function onWindowResize() {
    camera.aspect = canvasElement.offsetWidth / canvasElement.offsetHeight;
    camera.updateProjectionMatrix(); // Update Camera

    renderer.setSize(canvasElement.offsetWidth, canvasElement.offsetHeight);
    animateScene(); // Rerender Scene
  } // Window Resize Handler - End

} // diceFaceMaterial - Start


function boxMaterial(lightIsOn) {
  var textureLoader = new THREE.TextureLoader();
  var boxColor = textureLoader.load("/src/images/brick/Bricks052_2K_Color.jpg");
  var boxAmbient = textureLoader.load("/src/images/brick/Bricks052_2K_AmbientOcclusion.jpg");
  var boxDisplacement = textureLoader.load("/src/images/brick/Bricks052_2K_Displacement.jpg");
  var boxNormal = textureLoader.load("/src/images/brick/Bricks052_2K_Normal.jpg");
  var boxRoughness = textureLoader.load("/src/images/brick/Bricks052_2K_Roughness.jpg");
  var material;

  if (lightIsOn) {
    material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: boxColor,
      normalMap: boxNormal,
      displacementMap: boxDisplacement,
      displacementScale: 0,
      aoMap: boxAmbient,
      aoMapIntensity: lightIsOn ? 0 : 10,
      reflectivity: 0,
      specularMap: boxColor,
      bumpMap: boxRoughness
    });
  } else {
    var _textureLoader = new THREE.TextureLoader();

    material = new THREE.MeshBasicMaterial({
      map: _textureLoader.load("/src/images/brick/Bricks052_2K_Color.jpg")
    });
  }

  return material;
} // diceFaceMaterial - End