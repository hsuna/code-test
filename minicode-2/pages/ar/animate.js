import getSkeletonUtils from '../../jsm/utils/SkeletonUtils.js';

import getGLTFLoader from '../../jsm/loaders/GLTFLoader'
import { OrbitControls } from '../../jsm/controls/OrbitControls'


export default function (canvas, THREE) {
    let GLTFLoader = getGLTFLoader(THREE);
    let { SkeletonUtils } = getSkeletonUtils(THREE);
    let window = THREE.global;


    //////////////////////////////
    // Global objects
    //////////////////////////////
    var worldScene = null; // THREE.Scene where it all will be rendered
    var renderer = null;
    var camera = null;
    var clock = null;
    var mixers = []; // All the THREE.AnimationMixer objects for all the animations in the scene
    //////////////////////////////


    //////////////////////////////
    // Information about our 3D models and units
    //////////////////////////////

    // The names of the 3D models to load. One-per file.
    // A model may have multiple SkinnedMesh objects as well as several rigs (armatures). Units will define which
    // meshes, armatures and animations to use. We will load the whole scene for each object and clone it for each unit.
    // Models are from https://www.mixamo.com/
    var MODELS = [
        // { name: "Soldier" },
        { name: "Parrot" },
        // { name: "RiflePunch" },
    ];

    // Here we define instances of the models that we want to place in the scene, their position, scale and the animations
    // that must be played.
    var UNITS = [
        {
            modelName: "Parrot",
            meshName: "mesh_0",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: Math.PI, z: 0 },
            scale: 0.02,
            animationName: "parrot_A_"
        },
    ];

    //////////////////////////////
    // The main setup happens here
    //////////////////////////////
    var numLoadedModels = 0;
    initScene();
    initRenderer();
    loadModels();
    animate();
    //////////////////////////////


    //////////////////////////////
    // Function implementations
    //////////////////////////////
    /**
     * Function that starts loading process for the next model in the queue. The loading process is
     * asynchronous: it happens "in the background". Therefore we don't load all the models at once. We load one,
     * wait until it is done, then load the next one. When all models are loaded, we call loadUnits().
     */
    function loadModels() {

        for (var i = 0; i < MODELS.length; ++i) {

            var m = MODELS[i];

            loadGltfModel(m, function () {

                ++numLoadedModels;

                if (numLoadedModels === MODELS.length) {

                    console.log("All models loaded, time to instantiate units...");
                    instantiateUnits();

                }

            });

        }

    }

    /**
     * Look at UNITS configuration, clone necessary 3D model scenes, place the armatures and meshes in the scene and
     * launch necessary animations
     */
    function instantiateUnits() {

        var numSuccess = 0;

        for (var i = 0; i < UNITS.length; ++i) {

            var u = UNITS[i];
            var model = getModelByName(u.modelName);

            if (model) {

                var clonedScene = SkeletonUtils.clone(model.scene);

                if (clonedScene) {

                    // THREE.Scene is cloned properly, let's find one mesh and launch animation for it
                    var clonedMesh = clonedScene.getObjectByName(u.meshName);

                    if (clonedMesh) {

                        var mixer = startAnimation(clonedMesh, model.animations, u.animationName);

                        // Save the animation mixer in the list, will need it in the animation loop
                        mixers.push(mixer);
                        numSuccess++;

                    }

                    // Different models can have different configurations of armatures and meshes. Therefore,
                    // We can't set position, scale or rotation to individual mesh objects. Instead we set
                    // it to the whole cloned scene and then add the whole scene to the game world
                    // Note: this may have weird effects if you have lights or other items in the GLTF file's scene!
                    worldScene.add(clonedScene);

                    if (u.position) {

                        clonedScene.position.set(u.position.x, u.position.y, u.position.z);

                    }

                    if (u.scale) {

                        clonedScene.scale.set(u.scale, u.scale, u.scale);

                    }

                    if (u.rotation) {

                        clonedScene.rotation.x = u.rotation.x;
                        clonedScene.rotation.y = u.rotation.y;
                        clonedScene.rotation.z = u.rotation.z;

                    }

                }

            } else {

                console.error("Can not find model", u.modelName);

            }

        }

        console.log(`Successfully instantiated ${numSuccess} units`);

    }

    /**
     * Start animation for a specific mesh object. Find the animation by name in the 3D model's animation array
     * @param skinnedMesh {THREE.SkinnedMesh} The mesh to animate
     * @param animations {Array} Array containing all the animations for this model
     * @param animationName {string} Name of the animation to launch
     * @return {THREE.AnimationMixer} Mixer to be used in the render loop
     */
    function startAnimation(skinnedMesh, animations, animationName) {

        var mixer = new THREE.AnimationMixer(skinnedMesh);
        var clip = THREE.AnimationClip.findByName(animations, animationName);

        if (clip) {

            var action = mixer.clipAction(clip);
            action.play();

        }

        return mixer;

    }

    /**
     * Find a model object by name
     * @param name
     * @returns {object|null}
     */
    function getModelByName(name) {

        for (var i = 0; i < MODELS.length; ++i) {

            if (MODELS[i].name === name) {

                return MODELS[i];

            }

        }

        return null;

    }

    /**
     * Load a 3D model from a GLTF file. Use the GLTFLoader.
     * @param model {object} Model config, one item from the MODELS array. It will be updated inside the function!
     * @param onLoaded {function} A callback function that will be called when the model is loaded
     */
    function loadGltfModel(model, onLoaded) {

        var loader = new GLTFLoader();
        var modelName = "models/gltf/" + model.name + ".glb";

        loader.load("https://threejs.org/examples/" + modelName, function (gltf) {

            var scene = gltf.scene;

            model.animations = gltf.animations;
            model.scene = scene;

            // Enable Shadows

            gltf.scene.traverse(function (object) {

                if (object.isMesh) {

                    object.castShadow = true;

                }

            });

            console.log("Done loading model", model.name);

            onLoaded();

        });

    }

    /**
     * Render loop. Renders the next frame of all animations
     */
    function animate() {

        canvas.requestAnimationFrame(animate);

        // Get the time elapsed since the last frame

        var mixerUpdateDelta = clock.getDelta();

        // Update all the animation frames

        for (var i = 0; i < mixers.length; ++i) {

            mixers[i].update(mixerUpdateDelta);

        }

        renderer.render(worldScene, camera);

    }

    //////////////////////////////
    // General Three.JS stuff
    //////////////////////////////
    // This part is not anyhow related to the cloning of models, it's just setting up the scene.

    /**
     * Initialize ThreeJS scene renderer
     */
    function initRenderer() {

        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.gammaOutput = true;
        renderer.gammaFactor = 2.2;
        // renderer.shadowMap.enabled = true;
        // renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    }

    /**
     * Initialize ThreeJS THREE.Scene
     */
    function initScene() {

        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.set(3, 6, - 10);
        camera.lookAt(0, 0, 0);

        clock = new THREE.Clock();

        worldScene = new THREE.Scene();
        // worldScene.background = new THREE.Color(0xa0a0a0);
        // worldScene.fog = new THREE.Fog(0xa0a0a0, 10, 22);

        //var hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
        //hemiLight.position.set(0, 20, 0);
        //worldScene.add(hemiLight);

        var dirLight = new THREE.DirectionalLight(0xffffff);
        dirLight.position.set(- 3, 10, - 10);
        dirLight.castShadow = true;
        dirLight.shadow.camera.top = 10;
        dirLight.shadow.camera.bottom = - 10;
        dirLight.shadow.camera.left = - 10;
        dirLight.shadow.camera.right = 10;
        dirLight.shadow.camera.near = 0.1;
        dirLight.shadow.camera.far = 40;
        worldScene.add(dirLight);

        // ground
        // var groundMesh = new THREE.Mesh(
        //     new THREE.PlaneBufferGeometry(40, 40),
        //     new THREE.MeshPhongMaterial({
        //         color: 0x999999,
        //         depthWrite: false
        //     })
        // );

        // groundMesh.rotation.x = - Math.PI / 2;
        // groundMesh.receiveShadow = true;
        // worldScene.add(groundMesh);
        window.addEventListener('resize', onWindowResize, false);

    }

    /**
     * A callback that will be called whenever the browser window is resized.
     */
    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

    }

    return {
        camera
    }
}