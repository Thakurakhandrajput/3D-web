(function () {
  const canvas = document.getElementById('ribbon');
  if (!canvas || typeof THREE === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 9);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Lighting — violet fill + citron rim, standing in for a studio 3-point setup
  scene.add(new THREE.AmbientLight(0x2a2830, 1.4));
  const violetLight = new THREE.PointLight(0x5b4fe9, 55, 30);
  violetLight.position.set(-6, 3, 4);
  scene.add(violetLight);
  const citronLight = new THREE.PointLight(0xd7ff3f, 40, 30);
  citronLight.position.set(6, -2, 5);
  scene.add(citronLight);

  // Signature mesh: a twisted torus-knot standing in for draped fabric —
  // gets swapped for a real scanned garment once the client supplies one.
  const geometry = new THREE.TorusKnotGeometry(2.1, 0.55, 220, 24, 2, 3);
  const material = new THREE.MeshStandardMaterial({
    color: 0xefeae1,
    metalness: 0.65,
    roughness: 0.32,
    flatShading: false,
  });
  const ribbon = new THREE.Mesh(geometry, material);
  scene.add(ribbon);

  let targetRotX = 0.3;
  let targetRotY = 0;
  let dragging = false;
  let lastX = 0;
  let lastY = 0;

  function onDown(x, y) { dragging = true; lastX = x; lastY = y; }
  function onMove(x, y) {
    if (!dragging) return;
    targetRotY += (x - lastX) * 0.005;
    targetRotX += (y - lastY) * 0.005;
    lastX = x; lastY = y;
  }
  function onUp() { dragging = false; }

  canvas.addEventListener('mousedown', (e) => onDown(e.clientX, e.clientY));
  window.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY));
  window.addEventListener('mouseup', onUp);
  canvas.addEventListener('touchstart', (e) => { const t = e.touches[0]; onDown(t.clientX, t.clientY); }, { passive: true });
  canvas.addEventListener('touchmove', (e) => { const t = e.touches[0]; onMove(t.clientX, t.clientY); }, { passive: true });
  window.addEventListener('touchend', onUp);

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  let autoSpin = 0;
  function animate() {
    requestAnimationFrame(animate);
    autoSpin += 0.0022;
    ribbon.rotation.x += (targetRotX - ribbon.rotation.x) * 0.06;
    ribbon.rotation.y = autoSpin + targetRotY;
    renderer.render(scene, camera);
  }
  animate();
})();
