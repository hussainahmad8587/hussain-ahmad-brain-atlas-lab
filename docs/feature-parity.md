# BrainFacts 3D Brain parity checklist

Reference inspected at [BrainFacts 3D Brain](https://www.brainfacts.org/3d-brain#intro=true) on 27 November 2026. The viewer loaded after scrolling to its interactive section. The list below is based on control labels, observed state changes, and the reference’s own intro walkthrough. Any unverified behavior is marked explicitly.

## Reference controls and observed behavior

| Feature | Observed reference behavior | How to verify in Brain Atlas Lab | App status |
| --- | --- | --- | --- |
| Intro and default | `#intro=true` opens a guided introduction. The first prompts explain click/touch rotation and picking. **Skip Intro** sets `intro=false` and focuses **The Brain**. | Load the app; the whole-brain model and notes appear by default. | [x] Whole-brain default; intro walkthrough remains |
| Structure selector | Searchable dropdown. The list includes grouped brain anatomy and cranial nerves. Selecting Hippocampus updates the URL focus, moves the camera, highlights both hippocampi, and loads its notes. | Search for Hippocampus or a named region; verify the list, camera focus, highlight, and notes update together. | [x] 16 structures: whole brain, hippocampus, brainstem, cerebellum, hypothalamus, hemispheres, four lobes, prefrontal cortex, ventricles, and pituitary; other catalog regions remain |
| Model picking | Clicking the model selects the hit structure. A direct click on the pons changed selection to Pons and updated its description. | Click the whole brain or a mapped source element; verify the selected structure name and notes change. Increase dissection above 35 to pick additional deep regions through the faded brain. | [x] Whole brain and six mapped named regions |
| Rotate | Intro prompt explicitly says touch or click and drag/move the brain. | Drag with a mouse; drag with one finger on a touch device. | [x] OrbitControls; touch device check remains |
| Zoom | The magnifier toggles a zoom mode (`zoom=true`; icon changes to minus). Clicking the model in that mode zooms toward the hit point and selects it. | Press Zoom, then click a model region; use the wheel/pinch independently. | [x] Click-to-zoom and wheel/pinch |
| Annotate | Activating the pencil visibly enters “Annotate Mode”, adds a red border around the viewer, and exposes an exit “x”. | Toggle Annotate; confirm mode indicator and border, then click a model part. | [x] Mode and session pin; in-model mark style differs |
| Snapshot | Camera control is labeled “Take a Snapshot”. Clicking it highlighted the control, but no saved file or new view was observable. | Press Snapshot; verify the browser downloads a PNG of the current canvas. | [x] PNG snapshot added; exact reference output unverified |
| Reset | Reset returned selector to **The Brain**, turned zoom off, returned isolation to 0, and restored the broad brain view. | Change selection, zoom, and dissection; press Reset and verify those states return. | [x] Implemented |
| Full screen | A four-arrow control is visible and labeled “Full Screen” in the accessibility tree. It was not activated. | Press Full screen and exit with the same control or Escape. | [x] CSS full-window layout toggles on and off; browser native fullscreen is attempted first; reference result unverified |
| Structure Isolation | A bottom slider is initially disabled at 0. After choosing a structure it becomes enabled. At a higher value (60 observed), the selected structure remains opaque while surrounding meshes fade. | Select Hippocampus; move Dissection from 0 to 60 and 100; verify nearby mesh transparency. | [x] Implemented as dissection transparency |
| Notes panel | Selecting a structure updates its title, original page description, and a “Learn more” link. Long notes scroll within the panel. | Pick a structure; verify title and notes update and remain readable on a narrow viewport. | [x] Original notes and responsive panel |

## Reference anatomy catalog observed

The structure selector exposed these entries during inspection:

- **The Brain:** The Brain; Right Cerebral Hemisphere; Left Cerebral Hemisphere; Frontal Lobe; Orbitofrontal Cortex; Premotor Cortex; Middle Frontal Gyrus; Inferior Frontal Gyrus; Prefrontal Cortex; Motor Cortex; Broca’s Area; Occipital Lobe; Primary Visual Cortex; Parietal Lobe; Inferior Parietal Lobule; Superior Parietal Lobule; Precuneus; Somatosensory Cortex; Temporal Lobe; Primary Auditory Cortex; Wernicke’s Area; Cingulate Cortex.
- **Meningeal Layers**
- **Brain Stem:** Midbrain; Pons; Medulla Oblongata.
- **Limbic System:** Entorhinal Cortex; Amygdala; Hippocampus; Subiculum; Dentate Gyrus; Hypothalamus.
- **Other structures:** Thalamus; Ventricles; Pituitary Gland; Cerebellum; Corpus Callosum; Olfactory Bulb.
- **Basal Ganglia:** Caudate Nucleus; Globus Pallidus; Nucleus Accumbens; Putamen; Substantia Nigra; Subthalamic Nucleus.
- **Cranial Nerves:** Cranial Nerve I Olfactory; II Optic; III Oculomotor; IV Trochlear; V Trigeminal; VI Abducens; VII Facial; VIII Vestibulocochlear; IX Glossopharyngeal; X Vagus; XI Accessory; XII Hypoglossal.

## Full-project completion checklist

- [x] Inspect controls by operating them; document observed versus unverified behavior.
- [x] Record source, license, required attribution, structure mapping, and coordinate check for the verified component meshes.
- [x] Initialize Vite + React + TypeScript + Three.js + React Three Fiber.
- [x] Milestone: whole brain and hippocampus, rotate, zoom, model/list selection, highlight, notes, dissection, reset.
- [x] Loading and missing-mesh recovery states.
- [x] Map and add available brainstem, cerebellum, hypothalamus, hemispheres, lobes, prefrontal cortex, ventricles, and pituitary with official BodyParts3D element IDs.
- [x] Record the current catalog gaps and note exact reference names that have no PART-OF concept row in the checked release.
- [x] Implement and browser-check app annotation pin, reset, zoom, dissection, and full-window layout/exit.
- [ ] Verify that Snapshot saves a PNG in a browser download location; clicking Snapshot was observed, but the embedded browser did not expose a downloaded file.
- [x] Verify keyboard search/list selection and desktop mouse rotate/zoom.
- [ ] Verify touch input on a physical touch device and narrow-screen layout on a phone; implementation uses touch-capable OrbitControls and responsive CSS but this session has no mobile viewport/touch device.
- [ ] Map and add remaining reference catalog entries where compatible mesh components exist, then browser-verify each exposed entry.

## Behaviors that remain unverified

- The effect of drawing or placing a mark after entering reference Annotate Mode.
- Whether the reference snapshot is downloaded, copied, or opened in another surface; the click itself did not expose an outcome.
- The reference Full Screen control’s resulting layout and exit behavior.
- Physical touch behavior, narrow-screen layout, and keyboard operation of the reference selector.
- Whether the embedded test browser completed the PNG file download. The button was clicked, but no file appeared in the expected Downloads path during this check.
- Exact anatomical coverage for all remaining catalog labels. See [anatomy-assets.md](anatomy-assets.md) for the checked source mapping and known gaps.
