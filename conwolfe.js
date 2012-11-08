
function init() {
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);

    var scene = new THREE.Scene();

    var light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(-1, -1, -1).normalize();
    scene.add(light);

    var geometry = new THREE.CubeGeometry(1, 1, 1);

    var grid = {};
    var previous_states = {};
    var step_count = 0;
    var next = function() {
        // initialize randomly
        return Math.random() > 0.5;
    };

    function step() {
        theta += 0.05;
        var new_grid = {};
        var size = 5;
        var keys_list = [];
        for (var x = -size; x <= size; x++) {
            for (var y = -size; y <= size; y++) {
                if (next(x, y)) {
                    var key = [x,y].toString();
                    new_grid[key] = 1;
                    keys_list.push(key);
                }
            }
        }
        keys_list.sort();
        if (previous_states[keys_list]) {
            return;
        }
        previous_states[keys_list] = 1;
        grid = new_grid;
        create_meshes();
        step_count++;
    }
    step();
    // now use the real next function
    next = function(x, y) {
        var value = 0;
        for (var u = x - 1; u <= x + 1; u++) {
            for (var v = y - 1; v <= y + 1; v++) {
                if (grid[[u,v]]) {
                    value++;
                }
            }
        }
        if (grid[[x,y]]) {
            value--;
            return 2 <= value && value <= 3;
        } else {
            return value === 3;
        }
    };
    setInterval(step, 200);

    function create_meshes() {
        var color_loop = 10;
        // random hue
        var r = 0.5 * (1 + Math.sin((step_count / color_loop + 0/3) * Math.PI*2));
        var g = 0.5 * (1 + Math.sin((step_count / color_loop + 1/3) * Math.PI*2));
        var b = 0.5 * (1 + Math.sin((step_count / color_loop + 2/3) * Math.PI*2));
        var color =
            Math.round(0xff * r) * 0x010000 |
            Math.round(0xff * g) * 0x000100 |
            Math.round(0xff * b) * 0x000001 |
            0;

        var materials = [
            new THREE.MeshLambertMaterial({color: color}),
            new THREE.MeshLambertMaterial({color: ~color, wireframe: true}),
        ];
        for (var coords in grid) {
            var x = parseInt(coords.split(",")[0]);
            var y = parseInt(coords.split(",")[1]);
            for (var i = 0; i < materials.length; i++) {
                var mesh = new THREE.Mesh(geometry, materials[i]);
                mesh.position.x = x;
                mesh.position.y = step_count;
                mesh.position.z = y;
                scene.add(mesh);
            }
        }
    }
    var renderer = new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    var theta = Math.PI / 3;
    function animate() {
        requestAnimationFrame(animate);

        var focol_point = new THREE.Vector3().copy(scene.position).addSelf(new THREE.Vector3(0, step_count - 5, 0));
        var radius = 10;
        camera.position.x = focol_point.x + radius * Math.sin(theta);
        camera.position.y = focol_point.y + radius * Math.sin(theta);
        camera.position.z = focol_point.z + radius * Math.cos(theta);
        camera.lookAt(focol_point);

        renderer.render(scene, camera);
    }
    animate();
}
init();
