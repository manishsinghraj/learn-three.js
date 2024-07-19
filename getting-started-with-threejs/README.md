# Getting Started with Three.js

A Three.js scene requires three main components:

- A renderer
- A camera
- A scene object

The camera needs four parameters: FOV (Field of View), aspect ratio, near clipping plane, and far clipping plane.

```JS
// Importing the Three.js library
import * as THREE from "three";

// Creating a WebGL renderer with antialiasing for smoother edges
const renderer = new THREE.WebGLRenderer({ antialias: true });

// Setting the width and height of the renderer to match the window dimensions
const w = window.innerWidth;
const h = window.innerHeight;

// Setting the size of the renderer
renderer.setSize(w, h); // Setting the width and height of the renderer

// Appending the renderer's DOM element (the canvas) to the document body
document.body.appendChild(renderer.domElement); // Adding the canvas to the HTML document

// Defining camera parameters
const fov = 75; // Field of View (in degrees), common range is 45 to 75 degrees
const aspect = w / h; // Aspect ratio (width divided by height), typically the same as the window's aspect ratio
const near = 0.1; // Near clipping plane, should be > 0, typical range is 0.1 to 1
const far = 1000; // Far clipping plane, should be > near value, typical range is 100 to 2000

// Creating a camera with the defined parameters
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

// Positioning the camera
camera.position.z = 2; // Moving the camera back so we can view the scene, positive z moves the camera back

// Creating a scene object which will hold all the 3D objects
const scene = new THREE.Scene();

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

// Rendering the scene from the perspective of the camera
renderer.render(scene, camera);
```

### Range Explanations:

1. **Field of View (fov)**:
   - **Range**: Typically 45 to 75 degrees.
   - **Purpose**: Determines how wide the camera’s view angle is.

2. **Aspect Ratio (aspect)**:
   - **Range**: Depends on the dimensions of the viewport (width / height).
   - **Purpose**: Ensures that objects are not distorted by adjusting the camera's view to match the viewport's aspect ratio.

3. **Near Clipping Plane (near)**:
   - **Range**: Should be greater than 0, typically 0.1 to 1.
   - **Purpose**: The closest distance at which objects are rendered. Objects closer than this distance are not visible.

4. **Far Clipping Plane (far)**:
   - **Range**: Should be greater than the near value, typically 100 to 2000.
   - **Purpose**: The farthest distance at which objects are rendered. Objects further than this distance are not visible.

5. **Camera Position (camera.position.z)**:
   - **Range**: Depends on the scene, but positive values move the camera backward, providing a view of the scene.
   - **Purpose**: Positions the camera to ensure the objects in the scene are visible.

6. **Icosahedron Geometry Parameters**:
   - **Radius (1.0)**:
     - **Range**: Positive values.
     - **Purpose**: Determines the size of the icosahedron.
   - **Detail Level (2)**:
     - **Range**: Integer values, typically 0 to 5.
     - **Purpose**: Determines the level of detail of the icosahedron. Higher values increase the number of faces.

---

# Advanced Three.js Example with Lighting and Animation

```javascript
// Importing the Three.js library
import * as THREE from "three";

// Creating a WebGL renderer with antialiasing for smoother edges
const renderer = new THREE.WebGLRenderer({ antialias: true });

// Setting the width and height of the renderer to match the window dimensions
const w = window.innerWidth;
const h = window.innerHeight;

// Setting the size of the renderer
renderer.setSize(w, h); // Setting the width and height of the renderer

// Appending the renderer's DOM element (the canvas) to the document body
document.body.appendChild(renderer.domElement); // Adding the canvas to the HTML document

// Defining camera parameters
const fov = 75; // Field of View (in degrees), common range is 45 to 75 degrees
const aspect = w / h; // Aspect ratio (width divided by height), typically the same as the window's aspect ratio
const near = 0.1; // Near clipping plane, should be > 0, typical range is 0.1 to 1
const far = 1000; // Far clipping plane, should be > near value, typical range is 100 to 2000

// Creating a camera with the defined parameters
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

// Positioning the camera
camera.position.z = 2; // Moving the camera back so we can view the scene, positive z moves the camera back

// Creating a scene object which will hold all the 3D objects
const scene = new THREE.Scene();

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
```

### Explanation:

1. **Renderer Setup**:
    - Initializes the WebGL renderer with antialiasing for smoother visuals.
    - Sets the renderer size to match the browser window dimensions.
    - Appends the renderer's canvas to the HTML document.
2. **Camera Setup**:
    - Defines the camera parameters: Field of View, Aspect Ratio, Near and Far Clipping Planes.
    - Creates a `THREE.PerspectiveCamera` with these parameters.
    - Positions the camera to ensure it can view the scene.
3. **Scene Setup**:
    - Creates a new `THREE.Scene` object which will contain all the 3D objects.
4. **Geometry and Material**:
    - Creates an icosahedron geometry and a standard material with flat shading.
    - Combines them into a mesh and adds it to the scene.
5. **Wireframe**:
    - Creates a wireframe material and combines it with the same geometry into a wireframe mesh.
    - Adds the wireframe mesh as a child to the main mesh to keep them in sync during animation.
6. **Lighting**:
    - Adds a hemisphere light to the scene to illuminate the objects.
7. **Animation**:
    - Defines an `animate` function that rotates the mesh slightly around the x and y axes.
    - Uses `requestAnimationFrame` to continuously call the `animate` function for smooth animation.
    - Renders the scene from the perspective of the camera in each frame.

This setup provides a rotating icosahedron with both solid and wireframe views, properly illuminated by a hemisphere light.