import * as THREE from "three";

export default function Tutorial7() {
  const canvasElement = document.getElementById("Tutorial7Canvas");
  let scene = new THREE.Scene();
  let renderer = new THREE.WebGLRenderer({ antialias: true });
  let camera;

  // Initialize Objects

  var xRotation = 0.0;
  var yRotation = 0.0;
  var xSpeed = 0.0;
  var ySpeed = 0.0;
  var zTranslation = 4.0;

  // Initialize Objects
  var boxMesh;
  var lightIsOn = true;
  let directionalLight;
  var blendingIsOn = true;

  // Initialize Scene
  initializeScene();

  // Animate Scene
  animateScene();

  // Initialize Scene - Start
  function initializeScene() {
    renderer.setClearColor(0x000000, 1);
    let canvasWidth = canvasElement.offsetWidth; // Canvas Width
    let canvasHeight = canvasElement.offsetHeight; // Canvas Height
    renderer.setSize(canvasWidth, canvasHeight);

    canvasElement.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      45,
      canvasWidth / canvasHeight,
      1,
      100
    );
    camera.position.set(0, 0, 10);
    camera.lookAt(scene.position);
    scene.add(camera);

    var boxGeometry = new THREE.BoxGeometry(2.0, 2.0, 2.0);
    boxMesh = new THREE.Mesh(boxGeometry, boxMaterial(lightIsOn));
    boxMesh.position.set(0.0, 0.0, 4.0);
    scene.add(boxMesh);
    // Create Box - End

    directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(0.0, 0.0, 1.0);
    scene.add(directionalLight);
  }
  // Initialize Scene - End

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
  }
  // Render Scene - End

  document.addEventListener("keydown", onDocumentKeyDown, false);
  function onDocumentKeyDown(event) {
    // Get the key code of the pressed key
    var keyCode = event.which;
    // 'L' - Toggle light
    if (keyCode == 76) {
      if (lightIsOn) {
        lightIsOn = false;
      } else {
        lightIsOn = true;
      }
      boxMesh.material = boxMaterial(lightIsOn);
      boxMesh.material.needsUpdate = true;
    }
    // Cursor B
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
    }
    // Cursor w
    else if (keyCode == 87) {
      xSpeed -= 0.01;

      // Cursor s
    } else if (keyCode == 83) {
      xSpeed += 0.01;

      // Cursor a
    } else if (keyCode == 65) {
      ySpeed -= 0.01;

      // Cursor d
    } else if (keyCode == 68) {
      ySpeed += 0.01;
    }

    // Cursor +
    else if (keyCode == 109) {
      zTranslation -= 0.2;

      // Cursor -
    } else if (keyCode == 107) {
      zTranslation += 0.2;
    }
  }
  // Window Resize Handler - Start
  window.addEventListener("resize", onWindowResize, false);
  function onWindowResize() {
    camera.aspect = canvasElement.offsetWidth / canvasElement.offsetHeight;
    camera.updateProjectionMatrix(); // Update Camera
    renderer.setSize(canvasElement.offsetWidth, canvasElement.offsetHeight);
    animateScene(); // Rerender Scene
  }
  // Window Resize Handler - End
}

// diceFaceMaterial - Start
function boxMaterial(lightIsOn) {
  let textureLoader = new THREE.TextureLoader();

  const boxColor = textureLoader.load(
    "/src/images/brick/Bricks052_2K_Color.jpg"
  );
  const boxAmbient = textureLoader.load(
    "/src/images/brick/Bricks052_2K_AmbientOcclusion.jpg"
  );
  const boxDisplacement = textureLoader.load(
    "/src/images/brick/Bricks052_2K_Displacement.jpg"
  );
  const boxNormal = textureLoader.load(
    "/src/images/brick/Bricks052_2K_Normal.jpg"
  );
  const boxRoughness = textureLoader.load(
    "/src/images/brick/Bricks052_2K_Roughness.jpg"
  );
  let material;
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
      bumpMap: boxRoughness,
    });
  } else {
    let textureLoader = new THREE.TextureLoader();
    material = new THREE.MeshBasicMaterial({
      map: textureLoader.load("/src/images/brick/Bricks052_2K_Color.jpg"),
    });
  }

  return material;
}
// diceFaceMaterial - End
