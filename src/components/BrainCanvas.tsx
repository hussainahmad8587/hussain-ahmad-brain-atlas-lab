import { Suspense, useEffect, useMemo } from 'react'
import type { RefObject } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import type { ThreeEvent } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { anatomy, brainCenter } from '../data/anatomy'

type Props = {
  selectedId: string
  focusRequest: { structureId: string; sequence: number } | null
  dissection: number
  zoomMode: boolean
  annotateMode: boolean
  controlsRef: RefObject<OrbitControlsImpl>
  onPick: (id: string) => void
  onZoomModeChange: (active: boolean) => void
  onSnapshotReady: (capture: () => void) => void
  onSnapshotStatus: (message: string) => void
  onReady: () => void
}

function CaptureSource({ onSnapshotReady, onSnapshotStatus }: Pick<Props, 'onSnapshotReady' | 'onSnapshotStatus'>) {
  const { gl } = useThree()

  useEffect(() => {
    onSnapshotReady(() => {
      gl.domElement.toBlob((blob) => {
        if (!blob) {
          onSnapshotStatus('Could not create the PNG from this canvas.')
          return
        }
        const url = URL.createObjectURL(blob)
        const anchor = document.createElement('a')
        anchor.href = url
        anchor.download = 'brain-atlas-view.png'
        anchor.style.display = 'none'
        document.body.append(anchor)
        anchor.click()
        anchor.remove()
        window.setTimeout(() => URL.revokeObjectURL(url), 1500)
        onSnapshotStatus('PNG created · browser download requested')
      }, 'image/png')
    })
  }, [gl, onSnapshotReady, onSnapshotStatus])

  return null
}

function SourcePart({
  object,
  sourceId,
  structureId,
  structureIds,
  opacity,
  highlighted,
  pickable,
  onPick,
}: {
  object: THREE.Group
  sourceId: string
  structureId: string
  structureIds: string[]
  opacity: number
  highlighted: boolean
  pickable: boolean
  onPick: (id: string, point: THREE.Vector3) => void
}) {
  const instance = useMemo(() => object.clone(true), [object])
  const color = highlighted ? '#ec886f' : structureIds.includes('hippocampus') ? '#e2a778' : '#c9b8a1'

  useEffect(() => {
    instance.traverse((node) => {
      if (!(node instanceof THREE.Mesh)) return
      node.geometry.computeVertexNormals()
      node.userData.sourceId = sourceId
      node.userData.structureId = structureId
      node.raycast = pickable ? THREE.Mesh.prototype.raycast : () => {}
      node.material = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.68,
        metalness: 0,
        transparent: opacity < 0.995,
        opacity,
        depthWrite: opacity > 0.8,
        side: THREE.DoubleSide,
      })
    })
  }, [color, instance, opacity, pickable, sourceId, structureId, structureIds])

  return (
    <primitive
      object={instance}
      onClick={(event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation()
        onPick(structureId, event.point)
      }}
      onPointerOver={() => { document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { document.body.style.cursor = '' }}
    />
  )
}

function BrainObjects({
  selectedId,
  focusRequest,
  dissection,
  zoomMode,
  controlsRef,
  onReady,
  onPick,
  onZoomModeChange,
}: Pick<Props, 'selectedId' | 'focusRequest' | 'dissection' | 'zoomMode' | 'controlsRef' | 'onReady' | 'onPick' | 'onZoomModeChange'>) {
  const { camera } = useThree()
  const brain = anatomy[0]
  const parts = useMemo(() => {
    const memberships = new Map<string, string[]>()
    anatomy.slice(1).forEach((structure) => structure.sourceIds.forEach((sourceId) => {
      memberships.set(sourceId, [...(memberships.get(sourceId) ?? []), structure.id])
    }))
    return [...new Set(anatomy.flatMap((structure) => structure.sourceIds))].map((sourceId) => ({
      sourceId,
      structureId: memberships.get(sourceId)?.[0] ?? brain.id,
      structureIds: memberships.get(sourceId) ?? [],
    }))
  }, [brain])
  const urls = useMemo(() => parts.map(({ sourceId }) => `/models/bodyparts3d/${sourceId}.obj`), [parts])
  const objects = useLoader(OBJLoader, urls)
  useEffect(() => onReady(), [objects, onReady])

  useEffect(() => {
    if (!focusRequest) return
    const controls = controlsRef.current
    if (!controls) return
    const bounds = new THREE.Box3()
    parts.forEach((part, index) => {
      if (focusRequest.structureId !== brain.id && !part.structureIds.includes(focusRequest.structureId)) return
      objects[index].updateMatrixWorld(true)
      bounds.expandByObject(objects[index])
    })
    if (bounds.isEmpty()) return

    const focus = bounds.getCenter(new THREE.Vector3())
      .sub(new THREE.Vector3(...brainCenter))
      .multiplyScalar(0.012)
      .applyEuler(new THREE.Euler(-Math.PI / 2, 0, 0))
    const direction = camera.position.clone().sub(controls.target).normalize()
    if (direction.lengthSq() === 0) direction.set(0, 0, 1)
    const distance = THREE.MathUtils.clamp(bounds.getSize(new THREE.Vector3()).length() * 0.012 * 1.7, 1.4, 6)
    camera.position.copy(focus).addScaledVector(direction, distance)
    controls.target.copy(focus)
    controls.update()
  }, [brain.id, camera, controlsRef, focusRequest?.sequence, focusRequest?.structureId, objects, parts])
  const brainOpacity = selectedId === brain.id
    ? 1 - dissection * 0.0075
    : 0.22 - dissection * 0.0017

  const pick = (id: string, point: THREE.Vector3) => {
    onPick(id)
    if (!zoomMode) return
    const controls = controlsRef.current
    if (controls) {
      const direction = camera.position.clone().sub(point).normalize()
      camera.position.copy(point).addScaledVector(direction, 2.05)
      controls.target.copy(point)
      controls.update()
    }
    onZoomModeChange(false)
  }

  return (
    <group rotation={[-Math.PI / 2, 0, 0]} scale={0.012}>
      <group position={[-brainCenter[0], -brainCenter[1], -brainCenter[2]]}>
        {objects.map((object, index) => {
          const part = parts[index]
          const isSelectedPart = part.structureIds.includes(selectedId)
          const isSpecializedPart = part.structureIds.length > 0
          return (
            <SourcePart
              key={part.sourceId}
              object={object}
              sourceId={part.sourceId}
              structureId={part.structureId}
              structureIds={part.structureIds}
              opacity={isSelectedPart ? 0.9 : brainOpacity}
              highlighted={isSelectedPart}
              pickable={isSelectedPart || (selectedId === brain.id && dissection === 0) || (isSpecializedPart && dissection > 35)}
              onPick={pick}
            />
          )
        })}
      </group>
    </group>
  )
}

function Scene(props: Props) {
  return (
    <>
      <ambientLight intensity={1.6} />
      <directionalLight position={[3, 5, 4]} intensity={2.3} />
      <directionalLight position={[-4, -2, -3]} intensity={1.2} color="#e5aa86" />
      <Suspense fallback={<Html center><div className="canvas-message">Loading atlas meshes…</div></Html>}>
        <BrainObjects
          selectedId={props.selectedId}
          focusRequest={props.focusRequest}
          dissection={props.dissection}
          zoomMode={props.zoomMode}
          controlsRef={props.controlsRef}
          onReady={props.onReady}
          onPick={props.onPick}
          onZoomModeChange={props.onZoomModeChange}
        />
      </Suspense>
      <CaptureSource onSnapshotReady={props.onSnapshotReady} onSnapshotStatus={props.onSnapshotStatus} />
      <OrbitControls
        ref={props.controlsRef}
        makeDefault
        enableDamping
        dampingFactor={0.08}
        enablePan={false}
        minDistance={1.25}
        maxDistance={8}
        target={[0, 0, 0]}
      />
    </>
  )
}

export default function BrainCanvas(props: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0.15, 3.8], fov: 38 }}
      gl={{ antialias: true, preserveDrawingBuffer: true, alpha: true }}
      dpr={[1, 1.75]}
      className={props.annotateMode ? 'atlas-canvas annotate-active' : 'atlas-canvas'}
    >
      <Scene {...props} />
    </Canvas>
  )
}
