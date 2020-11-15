import * as THREE from "three";

export default function Tutorial1() {
  const canvasElement = document.getElementById("Tutorial1Canvas");
  let scene = new THREE.Scene();
  let renderer = new THREE.WebGLRenderer({ antialias: true });
  let camera;

  initializeScene();
  renderScene();

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

    // Add Triange to Scence
    var triangleMesh = triangle();
    triangleMesh.position.set(-3, 0.0, 3.0);
    scene.add(triangleMesh);

    // Add Square to Scence
    var squareMesh = square();
    squareMesh.position.set(3, 0.0, 3.0);
    scene.add(squareMesh);

    // Add Custom Poly to Scence
    var hexagonMesh = hexagon();
    hexagonMesh.position.set(0, 0.0, 3.0);
    scene.add(hexagonMesh);
  }
  // Initialize Scene - End

  // Render Scene - Start
  function renderScene() {
    renderer.render(scene, camera);
  }
  // Render Scene - End

  // Window Resize Handler - Start
  window.addEventListener("resize", onWindowResize, false);
  function onWindowResize() {
    camera.aspect = canvasElement.offsetWidth / canvasElement.offsetHeight;
    camera.updateProjectionMatrix(); // Update Camera
    renderer.setSize(canvasElement.offsetWidth, canvasElement.offsetHeight);
    renderScene(); // Rerender Scene
  }
  // Window Resize Handler - End
}

// Triangle - Start
function triangle() {
  var triangleGeometry = new THREE.Geometry();
  triangleGeometry.vertices.push(new THREE.Vector3(0.0, 1.0, 0.0));
  triangleGeometry.vertices.push(new THREE.Vector3(-1.0, -1.0, 0.0));
  triangleGeometry.vertices.push(new THREE.Vector3(1.0, -1.0, 0.0));
  triangleGeometry.faces.push(new THREE.Face3(0, 1, 2));
  return new THREE.Mesh(triangleGeometry, basicMaterial());
}
// Triangle - End

// Hexagon - Start
function hexagon() {
  var polyGeometry = new THREE.Geometry();
  // Create Vertices
  polyGeometry.vertices.push(new THREE.Vector3(0.0, 0.0, 0.0));
  polyGeometry.vertices.push(new THREE.Vector3(0.0, 1.0, 0.0));
  polyGeometry.vertices.push(new THREE.Vector3(-1, 0.5, 0.0));
  polyGeometry.vertices.push(new THREE.Vector3(-1, -0.5, 0.0));
  polyGeometry.vertices.push(new THREE.Vector3(0.0, -1.0, 0.0));
  polyGeometry.vertices.push(new THREE.Vector3(1, -0.5, 0.0));
  polyGeometry.vertices.push(new THREE.Vector3(1, 0.5, 0.0));
  // Join Faces
  polyGeometry.faces.push(new THREE.Face3(0, 1, 2));
  polyGeometry.faces.push(new THREE.Face3(0, 2, 3));
  polyGeometry.faces.push(new THREE.Face3(0, 3, 4));
  polyGeometry.faces.push(new THREE.Face3(0, 4, 5));
  polyGeometry.faces.push(new THREE.Face3(0, 5, 6));
  polyGeometry.faces.push(new THREE.Face3(0, 6, 1));
  return new THREE.Mesh(polyGeometry, basicMaterial());
}
// Hexagon - End

// Square - Start
function square() {
  var squareGeometry = new THREE.Geometry();
  squareGeometry.vertices.push(new THREE.Vector3(-1.0, 1.0, 0.0));
  squareGeometry.vertices.push(new THREE.Vector3(1.0, 1.0, 0.0));
  squareGeometry.vertices.push(new THREE.Vector3(1.0, -1.0, 0.0));
  squareGeometry.vertices.push(new THREE.Vector3(-1.0, -1.0, 0.0));
  squareGeometry.faces.push(new THREE.Face3(0, 1, 2));
  squareGeometry.faces.push(new THREE.Face3(0, 2, 3));
  return new THREE.Mesh(squareGeometry, basicMaterial());
}
// Square - End

// Basic Material - Start
function basicMaterial() {
  return new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
}
// Basic Material - End
