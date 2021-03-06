import * as THREE from "three";

export default function Tutorial3() {
  const canvasElement = document.getElementById("Tutorial3Canvas");
  let scene = new THREE.Scene();
  let renderer = new THREE.WebGLRenderer({ antialias: true });
  let camera;

  // Initialize Objects
  let squareMesh;
  let hexagonMesh;
  let triangleMesh;

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

    // Add Triange to Scence
    triangleMesh = triangle();
    triangleMesh.position.set(-3, 0.0, 3.0);
    scene.add(triangleMesh);

    // Add Square to Scence
    squareMesh = square();
    squareMesh.position.set(3, 0.0, 3.0);
    scene.add(squareMesh);

    // Add Custom Poly to Scence
    hexagonMesh = hexagon();
    hexagonMesh.position.set(0, 0.0, 3.0);
    scene.add(hexagonMesh);
  }
  // Initialize Scene - End

  // Render Scene - Start
  function renderScene() {
    renderer.render(scene, camera);
  }
  function animateScene() {
    triangleMesh.rotation.y += 0.1;
    squareMesh.rotation.x += 0.075;
    hexagonMesh.rotation.z += getSinus() / 10;
    hexagonMesh.position.z = getSinus() * 5;
    requestAnimationFrame(animateScene);
    renderScene();
  }
  // Render Scene - End

  // Calculate Sinus - Start 
  function getSinus(){
    if (degrees > 360){
      degrees = 0;
    }else{
      degrees += 1;
    }
    return Math.sin(degrees * Math.PI / 180);
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

// Triangle - Start
function triangle() {
  var triangleGeometry = new THREE.Geometry();
  triangleGeometry.vertices.push(new THREE.Vector3(0.0, 1.0, 0.0));
  triangleGeometry.vertices.push(new THREE.Vector3(-1.0, -1.0, 0.0));
  triangleGeometry.vertices.push(new THREE.Vector3(1.0, -1.0, 0.0));
  triangleGeometry.faces.push(new THREE.Face3(0, 1, 2));
  triangleGeometry.faces[0].vertexColors[0] = new THREE.Color(0xff0000);
  triangleGeometry.faces[0].vertexColors[1] = new THREE.Color(0x00ff00);
  triangleGeometry.faces[0].vertexColors[2] = new THREE.Color(0x0000ff);
  return new THREE.Mesh(triangleGeometry, vertexColorsMaterial());
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
  // Add Color to Faces
  polyGeometry.faces[0].vertexColors[0] = new THREE.Color(0xffffff);
  polyGeometry.faces[0].vertexColors[1] = new THREE.Color(0xff0000);
  polyGeometry.faces[0].vertexColors[2] = new THREE.Color(0xfb00f7);
  polyGeometry.faces[1].vertexColors[0] = new THREE.Color(0xffffff);
  polyGeometry.faces[1].vertexColors[1] = new THREE.Color(0xfb00f7);
  polyGeometry.faces[1].vertexColors[2] = new THREE.Color(0x0702fb);
  polyGeometry.faces[2].vertexColors[0] = new THREE.Color(0xffffff);
  polyGeometry.faces[2].vertexColors[1] = new THREE.Color(0x0702fb);
  polyGeometry.faces[2].vertexColors[2] = new THREE.Color(0x00fafb);
  polyGeometry.faces[3].vertexColors[0] = new THREE.Color(0xffffff);
  polyGeometry.faces[3].vertexColors[1] = new THREE.Color(0x00fafb);
  polyGeometry.faces[3].vertexColors[2] = new THREE.Color(0x07f004);
  polyGeometry.faces[4].vertexColors[0] = new THREE.Color(0xffffff);
  polyGeometry.faces[4].vertexColors[1] = new THREE.Color(0x07f004);
  polyGeometry.faces[4].vertexColors[2] = new THREE.Color(0xf8f800);
  polyGeometry.faces[5].vertexColors[0] = new THREE.Color(0xffffff);
  polyGeometry.faces[5].vertexColors[1] = new THREE.Color(0xf8f800);
  polyGeometry.faces[5].vertexColors[2] = new THREE.Color(0xff0000);
  return new THREE.Mesh(polyGeometry, vertexColorsMaterial());
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
  return new THREE.Mesh(squareGeometry, basicMaterial(0x8080ff));
}
// Square - End

// Materials - Start
function basicMaterial(newColor) {
  return new THREE.MeshBasicMaterial({
    color: newColor,
    side: THREE.DoubleSide,
  });
}

function vertexColorsMaterial() {
  return new THREE.MeshBasicMaterial({
    vertexColors: THREE.VertexColors,
    side: THREE.DoubleSide,
  });
}
// Materials - End
