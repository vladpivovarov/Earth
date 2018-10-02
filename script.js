window.onload = () => {
  Player.init();
}

Player = {
  init: function() {
    let container = document.getElementsByClassName("webgl")[0];
    this.scene = new THREE.Scene();

    let aspect = container.offsetWidth / container.offsetHeight;
    console.log(container.offsetWidth + ", " + container.offsetHeight);
    this.camera = new THREE.PerspectiveCamera(30.0, aspect, 1, 1000);
    this.camera.position.z = 50;
    this.scene.add(this.camera);

    let = pointLight = new THREE.PointLight(0xffffff, 2, 50);
    pointLight.position.set(15,15,15);
    this.scene.add(pointLight);

    let light = new THREE.AmbientLight(0x090909);
    this.scene.add(light);

    // let axisHelper = new THREE.AxisHelper(500);
    // this.scene.add(axisHelper);

    this.renderer = new THREE.WebGLRenderer();
    container.appendChild(this.renderer.domElement);
    this.renderer.setSize(container.offsetWidth, container.offsetHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    let textureLoader = new THREE.TextureLoader();
    textureLoader.load("./images/earth.jpg", function(texture) {
      let geometry = new THREE.SphereGeometry(5, 50, 50);
      let material = new THREE.MeshPhongMaterial({map: texture});
      Player.mesh = new THREE.Mesh(geometry, material);
      Player.scene.add(Player.mesh);
    });


    this.controls = new THREE.TrackballControls(this.camera, this.container);
    this.controls.zoomSpeed = 0.1;

    this.animate();
  },
  animate: function() {
    requestAnimationFrame(this.animate.bind(this));
    Player.mesh.rotation.y += 0.001;
    Player.mesh.position.z += 0.01;
    Player.mesh.position.x -= 0.005;
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
