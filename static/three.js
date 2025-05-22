// Three.js grid animation

let scene, camera, renderer;
let scrollProgress = 0;
let gridHelper;

// Initialize the scene
function init() {
    scene = new THREE.Scene();
    
    // Set background color
    scene.background = new THREE.Color(0x0a0a0a);
    
    // Add fog to make distant grid parts fade into background
    const fogColor = new THREE.Color(0x0a0a0a);
    scene.fog = new THREE.FogExp2(fogColor, 0.15);

    // Setup camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    camera.position.y = 2;
    camera.lookAt(0, 0, 0);
    
    // Setup renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Add scene elements
    addGridFloor();
    addLights();
    addVignetteOverlay();

    // Add event listeners
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('scroll', onScroll);

    animate();
}

function addGridFloor() {
    const gridSize = 100;
    const gridDivisions = 100;
    gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0xcccccc, 0xcccccc);
    gridHelper.position.y = -4; // Position the grid below
    scene.add(gridHelper);
}

function addLights() {
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
}

function addVignetteOverlay() {
    const vignette = document.createElement('div');
    vignette.id = 'vignette-overlay';
    document.getElementById('canvas-container').appendChild(vignette);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onScroll() {
    // Calculate how far down the page we've scrolled (0 to 1)
    const scrollableHeight = document.body.scrollHeight - window.innerHeight;
    scrollProgress = Math.min(window.scrollY / scrollableHeight, 1);
}

function animate() {
    requestAnimationFrame(animate);
    
    // Update camera based on scroll position
    updateCameraForScroll();
    
    // Render the scene
    renderer.render(scene, camera);
}

function updateCameraForScroll() {
    // Starting positions
    const startY = 2;
    const startZ = 5;
    
    // Final positions (top-down view)
    const endY = 15;
    const endZ = 0.1;
    
    // Interpolate between start and end positions based on scroll
    const y = startY + scrollProgress * (endY - startY);
    const z = startZ + scrollProgress * (endZ - startZ);
    
    // Update camera position
    camera.position.y = y;
    camera.position.z = z;
    
    // Adjust look target based on scroll (gradually looking more downward)
    const lookY = -4 + scrollProgress * 4; // Start looking at grid, end looking below
    camera.lookAt(0, lookY, 0);
    
    // Make fog thinner as we scroll to see more of the grid
    scene.fog.density = 0.15 - (scrollProgress * 0.1);
    
    // Optional: Move grid up slightly to keep it in view
    gridHelper.position.y = -4 + (scrollProgress * 2);
}

init();