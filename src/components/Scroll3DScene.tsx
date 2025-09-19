import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Scroll3DSceneProps {
  className?: string;
}

export const Scroll3DScene: React.FC<Scroll3DSceneProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const meshesRef = useRef<THREE.Mesh[]>([]);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x1a1a2e, 10, 50);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 30);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xff6b9d, 1, 20);
    pointLight.position.set(-5, 3, 10);
    scene.add(pointLight);

    // Create 3D objects for depth layers
    const meshes: THREE.Mesh[] = [];

    // Background layer - larger shapes
    for (let i = 0; i < 8; i++) {
      const geometry = new THREE.IcosahedronGeometry(1.5, 1);
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(0.8 + i * 0.05, 0.6, 0.6),
        transparent: true,
        opacity: 0.3,
        metalness: 0.1,
        roughness: 0.4,
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15,
        -5 - i * 3
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      scene.add(mesh);
      meshes.push(mesh);
    }

    // Midground layer - medium shapes
    for (let i = 0; i < 6; i++) {
      const geometry = new THREE.OctahedronGeometry(1, 2);
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(0.55 + i * 0.08, 0.7, 0.7),
        transparent: true,
        opacity: 0.5,
        metalness: 0.3,
        roughness: 0.3,
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        -2 - i * 2
      );
      
      scene.add(mesh);
      meshes.push(mesh);
    }

    // Foreground layer - smaller shapes
    for (let i = 0; i < 4; i++) {
      const geometry = new THREE.TetrahedronGeometry(0.8, 0);
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(0.15 + i * 0.1, 0.8, 0.8),
        transparent: true,
        opacity: 0.7,
        metalness: 0.5,
        roughness: 0.2,
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8,
        2 + i * 1.5
      );
      
      scene.add(mesh);
      meshes.push(mesh);
    }

    meshesRef.current = meshes;

    // Animation parameters
    const animationParams = {
      cameraZ: 30,
      cameraY: 0,
      cameraRotation: 0,
      fogNear: 10,
      fogFar: 50,
    };

    // Scroll-driven animation timeline
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: () => {
          if (cameraRef.current && sceneRef.current) {
            cameraRef.current.position.z = animationParams.cameraZ;
            cameraRef.current.position.y = animationParams.cameraY;
            cameraRef.current.rotation.z = animationParams.cameraRotation;
            
            if (sceneRef.current.fog) {
              (sceneRef.current.fog as THREE.Fog).near = animationParams.fogNear;
              (sceneRef.current.fog as THREE.Fog).far = animationParams.fogFar;
            }
          }
        },
      },
    });

    // Camera zoom animation
    timeline
      .to(animationParams, {
        cameraZ: 5,
        cameraY: -2,
        fogNear: 2,
        fogFar: 20,
        duration: 2,
        ease: 'power2.inOut',
      })
      .to(animationParams, {
        cameraZ: -10,
        cameraY: 3,
        cameraRotation: 0.1,
        fogNear: 5,
        fogFar: 30,
        duration: 2,
        ease: 'power2.inOut',
      })
      .to(animationParams, {
        cameraZ: 40,
        cameraY: -5,
        cameraRotation: -0.05,
        fogNear: 15,
        fogFar: 60,
        duration: 2,
        ease: 'power2.out',
      });

    // Render loop
    const animate = () => {
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        // Rotate meshes slowly
        meshesRef.current.forEach((mesh, index) => {
          mesh.rotation.x += 0.001 + index * 0.0002;
          mesh.rotation.y += 0.002 + index * 0.0001;
        });

        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      rafIdRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      
      // Dispose of Three.js objects
      meshesRef.current.forEach((mesh) => {
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => mat.dispose());
          } else {
            mesh.material.dispose();
          }
        }
        sceneRef.current?.remove(mesh);
      });
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className="invisible absolute top-0 w-full" style={{ height: '500vh' }} />
      <canvas ref={canvasRef} className="fixed inset-0 z-0" />
    </>
  );
};