# Brain Atlas Lab

GitHub repository: [**`hussain-ahmad-brain-atlas-lab`**](https://github.com/hussainahmad8587/hussain-ahmad-brain-atlas-lab).

A personal neuroanatomy learning and visualization project by Hussain Ahmad, created alongside PhD research. Brain Atlas Lab is a standalone 3D learning viewer, independent of the ADNI repositories and containing no participant data.

## Run locally

Use Node.js 18 or newer and npm:

```sh
npm install
npm run dev
```

For a production build:

```sh
npm run build
npm run preview
```

## Learning guide

1. Choose **Whole brain**, **Hippocampus**, **Midbrain**, **Pons**, **Medulla oblongata**, **Cerebellum**, **Hypothalamus**, either cerebral hemisphere, one of the four cerebral lobes, **Prefrontal cortex**, **Ventricles**, or **Pituitary gland** from the Atlas Index. A list selection focuses the camera on its mapped mesh parts. You can also click the 3D model to identify a mapped region.
2. Drag the model to rotate it. Use the mouse wheel or a touch pinch to zoom.
3. Move **Dissection** to fade the surrounding brain and reveal deeper anatomy. The selected hippocampi stay highlighted.
4. Read the selected structure’s location and role in the notes panel. Use **Reset** to return to the whole brain and the starting view.
5. **Zoom** arms click-to-zoom. **Annotate** marks a selection for the current session. **Snapshot** saves the model canvas as a PNG, and the corner control enters full screen.

## How the viewer works

- **Mesh loading:** BodyParts3D OBJ files are served from `public/models/bodyparts3d/` and parsed with Three.js `OBJLoader`. The geometry is displayed by React Three Fiber, with OrbitControls handling mouse and touch rotation and zoom. The 57 brain components, two hippocampus meshes, and pituitary mesh share the source atlas coordinate space; named brainstem, cerebellum, hypothalamus, hemisphere, lobe, prefrontal, and ventricular selections use verified components already included in the brain compound. Overlapping anatomical groupings refer to the same loaded mesh elements. The viewer centers and rotates the group for the Three.js scene.
- **Picking:** Each loaded OBJ element is tagged with its source ID and mapped anatomy ID. React Three Fiber raycasts pointer clicks against the rendered meshes; the hit element maps to its verified concept and selects that anatomy record.
- **Dissection:** The range control changes opacity on surrounding meshes. Selecting a deep structure keeps its mapped components opaque and highlighted while surrounding brain components fade.
- **Information panel:** Anatomy names, source IDs, and original learning notes live in `src/data/anatomy.ts`. The selected ID looks up that record and updates the information panel.
- **Loading errors:** The scene shows a loading state while OBJ files arrive. If a source file is missing or cannot be parsed, the viewer displays a retry message and identifies the expected asset folder.

## Anatomy data and attribution

The meshes come from the [BodyParts3D 4.0 archive](https://dbarchive.biosciencedbc.jp/data/bodyparts3d/LATEST/README_e.html), PART-OF OBJ set at 99% polygon reduction. DBCLS currently licenses the database under **Creative Commons Attribution 4.0 International (CC BY 4.0)**. Required attribution:

> BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0 International.

The downloaded OBJ meshes are adapted only for grouping, centering, display materials, and viewer interaction. See [docs/anatomy-assets.md](docs/anatomy-assets.md) for the source IDs and measured coordinate check. Structure descriptions in this app are original summaries.

## Project notes

- Feature inventory and remaining parity work: [docs/feature-parity.md](docs/feature-parity.md)
- Mesh source and license record: [docs/anatomy-assets.md](docs/anatomy-assets.md)

## Publish the app and docs from one repository

This repository keeps the interactive app at its root and the Mintlify documentation site in [`mintlify/`](mintlify/).

1. **Mintlify:** the docs site is connected to this repository's `main` branch and the `/mintlify` folder.
2. **3D viewer:** `.github/workflows/deploy-pages.yml` builds the app and deploys `dist` to GitHub Pages whenever `main` changes. The Vite base path and mesh URLs are configured for the repository's Pages URL.
3. **Open the atlas:** [launch the interactive Brain Atlas Lab](https://hussainahmad8587.github.io/hussain-ahmad-brain-atlas-lab/). The Mintlify home page embeds this viewer and also links to it directly.

The Mintlify site includes the interactive viewer, a short learning guide, and the mesh attribution record. The longer development checklist and technical asset verification remain in [`docs/`](docs/).
