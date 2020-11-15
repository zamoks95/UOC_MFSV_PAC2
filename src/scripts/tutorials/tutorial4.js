import * as THREE from "three";

export default function Tutorial4() {
  const canvasElement = document.getElementById("Tutorial4Canvas");
  let scene = new THREE.Scene();
  let renderer = new THREE.WebGLRenderer({ antialias: true });
  let camera;

  // Initialize Objects
  let boxMesh;
  let pyramidMesh;
  let icosahedronMesh;

  // Initialize Sin
  let degrees = 0;

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

    // Add Box to Scence
    boxMesh = box();
    boxMesh.position.set(2.5, 0.0, 4.0);
    scene.add(boxMesh);

    // Add Pyramid to Scence
    pyramidMesh = pyramid();
    pyramidMesh.position.set(-2.5, 0.0, 4.0);
    scene.add(pyramidMesh);

    // Add Icosahedron to Scence
    icosahedronMesh = icosahedron();
    icosahedronMesh.position.set(0, 0.0, 4.0);
    scene.add(icosahedronMesh);
  }
  // Initialize Scene - End

  // Render Scene - Start
  function renderScene() {
    renderer.render(scene, camera);
  }
  function animateScene() {
    icosahedronMesh.rotateOnAxis(
      new THREE.Vector3(1, 1, getSinus()).normalize(),
      getSinus() / 10
    );

    pyramidMesh.rotation.y += 0.1;
    boxMesh.rotateOnAxis(new THREE.Vector3(1, 1, 1).normalize(), 0.075);
    requestAnimationFrame(animateScene);
    renderScene();
  }
  // Render Scene - End

  // Calculate Sinus - Start
  function getSinus() {
    if (degrees > 360) {
      degrees = 0;
    } else {
      degrees += 1;
    }
    return Math.sin((degrees * Math.PI) / 180);
  }
  // Calculate Sinus - End

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

// Box - Start
function box() {
  var boxGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
  var boxMaterials = [
    new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    new THREE.MeshBasicMaterial({ color: 0x0000ff }),
    new THREE.MeshBasicMaterial({ color: 0xffff00 }),
    new THREE.MeshBasicMaterial({ color: 0x00ffff }),
    new THREE.MeshBasicMaterial({ color: 0xffffff }),
  ];
  var boxMaterial = new THREE.MeshFaceMaterial(boxMaterials);
  return new THREE.Mesh(boxGeometry, boxMaterial);
}
// Box - End

// Pyramid - Start
function pyramid() {
  var pyramidGeometry = new THREE.CylinderGeometry(0, 1.5, 1.5, 4, false);
  for (let i = 0; i < pyramidGeometry.faces.length; i++) {
    pyramidGeometry.faces[i].vertexColors[0] = new THREE.Color(0xff0000);
    pyramidGeometry.faces[i].vertexColors[1] = new THREE.Color(0x00ff00);
    pyramidGeometry.faces[i].vertexColors[2] = new THREE.Color(0x0000ff);
  }
  var pyramidMaterial = new THREE.MeshBasicMaterial({
    vertexColors: THREE.VertexColors,
    side: THREE.DoubleSide,
  });
  return new THREE.Mesh(pyramidGeometry, pyramidMaterial);
}
// Pyramid - End

// Icosahedron - Start
function icosahedron() {
  var icosahedronGeometry = new THREE.IcosahedronGeometry(1, 1);
  for (let i = 0; i < icosahedronGeometry.faces.length; i++) {
    icosahedronGeometry.faces[i].vertexColors[0] = new THREE.Color(
      randomColor()
    );
    icosahedronGeometry.faces[i].vertexColors[1] = new THREE.Color(
      randomColor()
    );
    icosahedronGeometry.faces[i].vertexColors[2] = new THREE.Color(
      randomColor()
    );
  }
  var icosahedronMaterial = new THREE.MeshBasicMaterial({
    vertexColors: THREE.VertexColors,
    side: THREE.DoubleSide,
  });
  return new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
}
// Icosahedron - End
// Generate Random Color - Start
function randomColor() {
  let finalNumber = "";
  while (finalNumber.length < 8) {
    finalNumber += Math.floor(Math.random() * 10).toString();
  }
  finalNumber = "#" + parseInt(finalNumber).toString(16);
  while (finalNumber.length > 7) {
    finalNumber = finalNumber.slice(0, -1);
  }
  while (finalNumber.length < 7) {
    finalNumber += "F";
  }
  return finalNumber;
}
// Generate Random Color - End
