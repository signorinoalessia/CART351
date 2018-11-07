//Reference: https://threejs.org/docs/#manual/en/introduction/Creating-a-scene

let scene3d = document.getElementById("scene");
let CANVAS_WIDTH = 800;
let CANVAS_HEIGHT = 600;

// 1.)Scene
scene = new THREE.Scene();

// 2.)Camera
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.x = 15;
camera.position.y = 15;
camera.position.z = 10;
camera.lookAt(scene.position);

// 3.)Renderer
renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x000, 1.0);
renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);
