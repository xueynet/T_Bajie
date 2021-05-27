(function () {
	var container;

	var camera, scene, renderer;

	init();
	animate();

	function init() {

		container = document.getElementById('banner3d1');

		camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 1, 10);
		camera.position.z = 1.5;

		scene = new THREE.Scene();

		// geometry

		var triangles = 100;

		var geometry = new THREE.BufferGeometry();

		var positions = [];
		var colors = [];

		for (var i = 0; i < triangles; i++) {

			positions.push(Math.random() - 0.5);
			positions.push(Math.random() - 0.5);
			positions.push(Math.random() - 0.5);

			colors.push(Math.random() * 255);
			colors.push(Math.random() * 255);
			colors.push(Math.random() * 255);
			colors.push(Math.random() * 255);

		}

		var positionAttribute = new THREE.Float32BufferAttribute(positions, 3);
		var colorAttribute = new THREE.Uint8BufferAttribute(colors, 4);

		colorAttribute.normalized = true; // this will map the buffer values to 0.0f - +1.0f in the shader

		geometry.addAttribute('position', positionAttribute);
		geometry.addAttribute('color', colorAttribute);

		// material

		var material = new THREE.RawShaderMaterial({

			uniforms: {
				time: { value: 1.0 }
			},
			vertexShader: document.getElementById('vertexShader').textContent,
			fragmentShader: document.getElementById('fragmentShader').textContent,
			side: THREE.DoubleSide,
			transparent: true

		});

		var mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);

		renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(container.clientWidth, container.clientHeight);
		container.appendChild(renderer.domElement);

		window.addEventListener('resize', onWindowResize, false);

	}

	function onWindowResize() {
		container = document.getElementById('rightlogo3d');
		camera.aspect = container.clientWidth / container.clientHeight;
		camera.updateProjectionMatrix();

		renderer.setSize(container.clientWidth, container.clientHeight);

	}

	//

	function animate() {

		requestAnimationFrame(animate);

		render();

	}

	function render() {

		var time = performance.now();

		var object = scene.children[0];

		object.rotation.y = time * 0.0005;
		object.material.uniforms.time.value = time * 0.005;

		renderer.render(scene, camera);

	}
}());


