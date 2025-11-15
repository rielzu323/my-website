// Setup Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Create animated 3D objects
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
    color: 0xffd700,
    wireframe: false,
    metalness: 0.7,
    roughness: 0.2
});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Add particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 5000;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 100;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    color: 0xffffff,
    transparent: true,
    opacity: 0.8
});
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Add lights
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(20, 20, 20);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Position camera
camera.position.z = 30;

// Mouse movement effect
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Scroll animation
let scrollY = 0;
window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate torus
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    // Rotate particles
    particlesMesh.rotation.y += 0.001;

    // Mouse interaction
    torus.rotation.y = mouseX * 0.5;
    torus.rotation.x = mouseY * 0.5;

    // Scroll effect
    camera.position.y = scrollY * 0.002;

    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Smooth scroll for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Button click effect
const ctaButton = document.querySelector('.cta-button');
if(ctaButton) {
    ctaButton.addEventListener('click', () => {
        document.querySelector('#skills').scrollIntoView({ behavior: 'smooth' });
    });
}