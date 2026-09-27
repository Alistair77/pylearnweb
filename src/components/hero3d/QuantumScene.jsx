import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, Line, useGLTF } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// Emissive accents: brighter than --accent so they glow under bloom (blue in light, violet in dark)
const ACCENT_LIGHT = '#2f7bd0';
const ACCENT_DARK = '#9b6cff';
// BASE_URL keeps the model path working under the GitHub Pages sub-path
const SHIELD_URL = `${import.meta.env.BASE_URL}models/shield.glb`;

// Track the site theme (html[data-theme]) so the scene's glow and strands suit light or dark
function useIsDark() {
  const read = () => document.documentElement.dataset.theme === 'dark';
  const [isDark, setIsDark] = useState(read);
  useEffect(() => {
    const obs = new MutationObserver(() => setIsDark(read()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);
  return isDark;
}

/* ----------------------------------------------------------------------------
   Shield — the user-supplied .glb, given a clean glass material + red Q emblem
---------------------------------------------------------------------------- */
function ShieldModel({ isDark }) {
  const ACCENT = isDark ? ACCENT_DARK : ACCENT_LIGHT;
  const { scene } = useGLTF(SHIELD_URL);
  const group = useRef();

  const model = useMemo(() => {
    const s = scene.clone(true);
    const glass = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#ffffff'),
      metalness: 0,
      roughness: 0.07,
      transmission: 1,
      thickness: 0.9,
      ior: 1.45,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      transparent: true,
      attenuationColor: new THREE.Color('#e9edf2'),
      attenuationDistance: 3,
      envMapIntensity: 1.5,
      specularIntensity: 1,
    });
    s.traverse((o) => {
      if (o.isMesh) {
        o.material = glass;
        o.castShadow = false;
        o.frustumCulled = false;
      }
    });
    // the model's face-normal is +X, so rotate it to face the camera (+Z)
    s.rotation.y = -Math.PI / 2;
    const wrap = new THREE.Group();
    wrap.add(s);
    wrap.updateWorldMatrix(true, true);
    // normalize: center + scale to a target height
    const box = new THREE.Box3().setFromObject(wrap);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const scl = 3.0 / (size.y || 1);
    wrap.scale.setScalar(scl);
    wrap.position.set(-center.x * scl, -center.y * scl, -center.z * scl);
    return wrap;
  }, [scene]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const idleY = 0.15 + Math.sin(t * 0.45) * 0.05;
    const targetRotY = state.pointer.x * 0.35 + Math.sin(t * 0.3) * 0.05;
    const targetRotX = -state.pointer.y * 0.2;
    const k = Math.min(1, delta * 3);
    group.current.rotation.y += (targetRotY - group.current.rotation.y) * k;
    group.current.rotation.x += (targetRotX - group.current.rotation.x) * k;
    group.current.position.y += (idleY - group.current.position.y) * k;
  });

  return (
    <group ref={group} position={[0, 0.15, 0]}>
      <primitive object={model} />
      {/* single clean emblem ring on the shield face */}
      <mesh position={[0, 0.1, 0.42]}>
        <torusGeometry args={[0.42, 0.055, 24, 96]} />
        <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={1.35} roughness={0.35} metalness={0.2} toneMapped={false} transparent />
      </mesh>
    </group>
  );
}
useGLTF.preload(SHIELD_URL);

/* ----------------------------------------------------------------------------
   Concentric orb rings + faint glass shell behind the shield
---------------------------------------------------------------------------- */
function Orb({ isDark }) {
  return (
    <group position={[0, 0.15, -0.7]}>
      <mesh>
        <sphereGeometry args={[2.55, 64, 64]} />
        <meshPhysicalMaterial
          transmission={0.92}
          thickness={0.25}
          roughness={0.18}
          ior={1.18}
          transparent
          opacity={isDark ? 0.06 : 0.26}
          color={'#ffffff'}
          clearcoat={1}
          clearcoatRoughness={0.2}
          side={THREE.BackSide}
        />
      </mesh>
      {[2.55, 2.2].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[r, 0.012, 8, 120]} />
          <meshBasicMaterial color={'#aab0b8'} transparent opacity={0.7 - i * 0.2} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

/* ----------------------------------------------------------------------------
   Tiered glass podium
---------------------------------------------------------------------------- */
function GlassMat(props) {
  return (
    <meshPhysicalMaterial
      transmission={0.9}
      thickness={0.6}
      roughness={0.12}
      ior={1.32}
      transparent
      opacity={0.55}
      color={'#ffffff'}
      clearcoat={1}
      clearcoatRoughness={0.1}
      {...props}
    />
  );
}

function Podium() {
  return (
    <group position={[0, -1.95, 0]}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.45, 1.6, 0.2, 72]} />
        <GlassMat opacity={0.4} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[1.12, 1.24, 0.18, 72]} />
        <GlassMat opacity={0.5} />
      </mesh>
      <mesh position={[0, 0.38, 0]}>
        <cylinderGeometry args={[0.82, 0.94, 0.16, 72]} />
        <GlassMat opacity={0.6} />
      </mesh>
    </group>
  );
}

/* ----------------------------------------------------------------------------
   Flow strands — connected curved streams with nodes riding along them.
   Left  = dark threats funnelling IN and behind the shield.
   Right = clean red light fanning OUT from behind the shield.
---------------------------------------------------------------------------- */
function StreamField({ side, isDark }) {
  const isRed = side === 'right';
  const ACCENT = isDark ? ACCENT_DARK : ACCENT_LIGHT;
  const N = 14; // strands
  const DOTS = 9; // nodes per strand
  const speed = isRed ? 0.11 : 0.085;

  const curves = useMemo(() => {
    const rand = (n) => {
      const x = Math.sin(n * 127.1 + (isRed ? 311.7 : 74.7)) * 43758.5453;
      return x - Math.floor(x);
    };
    const arr = [];
    for (let i = 0; i < N; i++) {
      const f = i / (N - 1);
      const spread = (f - 0.5) * 2; // -1..1
      const jz = rand(i) - 0.5;
      let pts;
      if (!isRed) {
        pts = [
          new THREE.Vector3(-7.4, spread * 2.5 + 0.2, jz * 2.4),
          new THREE.Vector3(-4.2, spread * 1.7 + 0.15 + Math.sin(f * 6) * 0.4, jz * 1.7),
          new THREE.Vector3(-2.0, spread * 0.85 + 0.15, -0.6),
          new THREE.Vector3(-0.5, spread * 0.3 + 0.15, -1.15),
        ];
      } else {
        pts = [
          new THREE.Vector3(0.5, spread * 0.26 + 0.15, -1.15),
          new THREE.Vector3(2.3, spread * 0.7 + 0.15, -0.35),
          new THREE.Vector3(4.7, spread * 1.7 + 0.2, jz * 1.7),
          new THREE.Vector3(7.6, spread * 2.6 + 0.2, jz * 2.4),
        ];
      }
      arr.push(new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.5));
    }
    return arr;
  }, [isRed]);

  const linePoints = useMemo(() => curves.map((c) => c.getPoints(50)), [curves]);

  const dotsRef = useRef();
  const dotCount = N * DOTS;
  const dotPos = useMemo(() => new Float32Array(dotCount * 3), [dotCount]);
  const phases = useMemo(() => {
    const a = new Float32Array(dotCount);
    for (let i = 0; i < dotCount; i++) a[i] = Math.random();
    return a;
  }, [dotCount]);

  useFrame((state) => {
    if (!dotsRef.current) return;
    const t = state.clock.elapsedTime;
    const arr = dotsRef.current.geometry.attributes.position.array;
    const tmp = new THREE.Vector3();
    let k = 0;
    for (let i = 0; i < N; i++) {
      const c = curves[i];
      for (let j = 0; j < DOTS; j++) {
        const tt = (phases[k] + t * speed * (0.7 + phases[k] * 0.6)) % 1;
        c.getPoint(tt, tmp);
        arr[k * 3] = tmp.x;
        arr[k * 3 + 1] = tmp.y;
        arr[k * 3 + 2] = tmp.z;
        k++;
      }
    }
    dotsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group>
      {linePoints.map((pts, i) => (
        <Line
          key={i}
          points={pts}
          color={isRed ? ACCENT : (isDark ? '#6f6890' : '#12263a')}
          lineWidth={isRed ? 1.1 : 1}
          transparent
          opacity={isRed ? 0.45 : 0.3}
        />
      ))}
      <points ref={dotsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dotPos, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={isRed ? 0.085 : 0.12}
          sizeAttenuation
          color={isRed ? ACCENT : (isDark ? '#a49ec4' : '#12263a')}
          transparent
          opacity={isRed ? 1 : 0.92}
          depthWrite={false}
          blending={isRed ? THREE.AdditiveBlending : THREE.NormalBlending}
          toneMapped={!isRed}
        />
      </points>
    </group>
  );
}

/* ----------------------------------------------------------------------------
   Soft radial glow sprite (orb light / red halo)
---------------------------------------------------------------------------- */
function RadialGlow({ position = [0, 0, 0], scale = 1, color = '#ffffff', opacity = 0.5 }) {
  const tex = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = c.height = 256;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.42, 'rgba(255,255,255,0.32)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(c);
  }, []);
  return (
    <mesh position={position} scale={scale}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={tex} color={color} transparent opacity={opacity} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
    </mesh>
  );
}

/* ----------------------------------------------------------------------------
   Scene + Canvas
---------------------------------------------------------------------------- */
function SceneContents() {
  const isDark = useIsDark();
  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 6, 5]} intensity={1.3} />
      <directionalLight position={[-5, 2, 3]} intensity={0.5} color={'#e6eefa'} />
      <pointLight position={[0, 0.4, -2.2]} intensity={4} distance={12} color={'#ffffff'} />

      <RadialGlow position={[0, 0.15, -1.1]} scale={7} color={'#ffffff'} opacity={isDark ? 0.05 : 0.4} />

      <Environment resolution={256} frames={1}>
        <Lightformer intensity={2.2} position={[0, 3, 4]} scale={[10, 10, 1]} />
        <Lightformer intensity={1.1} position={[-5, 1, 2]} scale={[4, 10, 1]} color={'#ffffff'} />
        <Lightformer intensity={1.4} position={[5, 1, 2]} scale={[4, 10, 1]} color={'#dde8f7'} />
        <Lightformer intensity={0.8} position={[0, -3, 2]} scale={[10, 4, 1]} color={'#eef1f4'} />
      </Environment>

      <StreamField side="left" isDark={isDark} />
      <Orb isDark={isDark} />
      <Podium />
      <ShieldModel isDark={isDark} />
      <StreamField side="right" isDark={isDark} />

      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={1.0} intensity={0.95} mipmapBlur radius={0.75} />
      </EffectComposer>
    </>
  );
}

export default function QuantumScene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 9], fov: 40 }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <SceneContents />
      </Suspense>
    </Canvas>
  );
}
