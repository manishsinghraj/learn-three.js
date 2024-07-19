// Importing the Three.js library
import * as THREE from "three";


// RENDERER
// Creating a WebGL renderer with antialiasing for smoother edges
const renderer = new THREE.WebGLRenderer({ antialias: true });

// Setting the width and height of the renderer to match the window dimensions
const w = window.innerWidth;
const h = window.innerHeight;

// Setting the size of the renderer
renderer.setSize(w, h); // Setting the width and height of the renderer

// Appending the renderer's DOM element (the canvas) to the document body
document.body.appendChild(renderer.domElement); // Adding the canvas to the HTML document



//CAMERA
// Defining camera parameters
const fov = 75; // Field of View (in degrees), common range is 45 to 75 degrees
const aspect = w / h; // Aspect ratio (width divided by height), typically the same as the window's aspect ratio
const near = 0.1; // Near clipping plane, should be > 0, typical range is 0.1 to 1
const far = 1000; // Far clipping plane, should be > near value, typical range is 100 to 2000

// Creating a camera with the defined parameters
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

// Positioning the camera
camera.position.z = 2; // Moving the camera back so we can view the scene, positive z moves the camera back




//SCENE
// Creating a scene object which will hold all the 3D objects
const scene = new THREE.Scene();




//OBJECT
/*
//FOR BASIC
// Creating a geometry (an icosahedron in this case)
const geo = new THREE.IcosahedronGeometry(1.0, 2); // Geometry of the 3D object, 1.0 is the radius, 2 is the detail level
// Creating a material for the geometry
const mat = new THREE.MeshBasicMaterial({
    color: 0xccff // Color of the material in hexadecimal format
});
// Creating a mesh by combining the geometry and material
const mesh = new THREE.Mesh(geo, mat);
// Adding the mesh to the scene
scene.add(mesh);
*/


// Creating a geometry (an icosahedron in this case)
const geo = new THREE.IcosahedronGeometry(1.0, 2); // Geometry of the 3D object, 1.0 is the radius, 2 is the detail level
// Creating a material for the geometry
const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff, // Color of the material in hexadecimal format
    flatShading: true // Enable flat shading
});
// Creating a mesh by combining the geometry and material
const mesh = new THREE.Mesh(geo, mat);
// Adding the mesh to the scene
scene.add(mesh); // After this, it won't display until you add lighting




// Creating a wireframe material for the geometry
const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff, // Color of the wireframe in hexadecimal format
    wireframe: true // Enable wireframe mode
});
// Creating a wireframe mesh by combining the geometry and wireframe material
const wireMesh = new THREE.Mesh(geo, wireMat);
// Adding the wireframe mesh as a child to the main mesh
mesh.add(wireMesh); // Ensures the wireframe stays in sync with the main mesh during animation





// Creating a hemisphere light
const hemiLight = new THREE.HemisphereLight(0xffff, 0x0000); // Light from sky (0xffff) and ground (0x0000)
scene.add(hemiLight); // Adding the light to the scene




// Function to animate the scene
function animate() {
    requestAnimationFrame(animate); // Requesting the next frame

    // Rotating the mesh for animation
    mesh.rotation.x += 0.01; // Rotate the mesh slightly around the x-axis
    mesh.rotation.y += 0.01; // Rotate the mesh slightly around the y-axis

    renderer.render(scene, camera); // Rendering the scene from the perspective of the camera
}



// Starting the animation loop
animate(); // Calling the animate function to start the animation
