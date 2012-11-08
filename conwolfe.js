
function init() {
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);

    var scene = new THREE.Scene();

    var light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(1, 1, 1).normalize();
    scene.add(light );

    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(-1, -1, -1).normalize();
    scene.add(light);

    var geometry = new THREE.CubeGeometry(1, 1, 1);
    var material = new THREE.MeshLambertMaterial({color: 0xff4422});

    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    var renderer = new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    var theta = 0;
    function animate() {
        requestAnimationFrame(animate);

        theta += 0.2 * Math.PI / 360;
        var radius = 10;
        camera.position.x = radius * Math.sin(theta);
        camera.position.y = radius * Math.sin(theta);
        camera.position.z = radius * Math.cos(theta);
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }
    animate();
}
init();
