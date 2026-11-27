# Anatomy assets and coordinate verification

## Selected source

- **Dataset:** BodyParts3D 4.0, Database Center for Life Science (DBCLS), Japan.
- **Release files:** official PART-OF tree mesh archive `partof_BP3D_4.0_obj_99.zip` and its `partof_element_parts.txt` compound-part map.
- **Format:** Wavefront OBJ, one file per source element ID; 99% polygon-reduced release.
- **Official source page:** [BodyParts3D archive README](https://dbarchive.biosciencedbc.jp/data/bodyparts3d/LATEST/README_e.html).
- **License:** CC BY 4.0 International. The current DBCLS archive README was updated on 27 February 2025 and explicitly permits acquisition, redistribution, and derivative works with attribution.
- **Required attribution:** “BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0 International”.
- **Attribution in this project:** README and this file. The original model geometry remains credited to DBCLS; our changes are grouping, axis conversion for display, materials, and viewer interactions.
- **Model caveat:** the source describes segments of a whole-body model for an adult human male. It is a teaching model, not a population-representative reference or clinical tool.

## First milestone mesh mapping

BodyParts3D records the brain as compound concept **FMA50801**. Its PART-OF constituent map resolves to 59 source OBJ elements. Brain Atlas Lab loads 57 of those for the overview brain and keeps the hippocampi separate so the deep structure can be selected and highlighted without drawing the same surfaces twice.

| App structure | Source concept | OBJ files |
| --- | --- | --- |
| Whole brain overview | FMA50801, `brain` | 57 component files from the brain compound, excluding the hippocampi |
| Hippocampus, bilateral | FMA72713 right hippocampus; FMA72714 left hippocampus | `FJ1807.obj` right; `FJ1759.obj` left |
| Midbrain | FMA61993 | `FJ1738`, `FJ1762`, `FJ1770`, `FJ1779`, `FJ1810`, `FJ1817`, `FJ1826` |
| Pons | FMA67943 | `FJ1775`, `FJ1822` |
| Medulla oblongata | FMA62004 | `FJ1769`, `FJ1831` |
| Cerebellum | FMA67944 | `FJ1781`, `FJ1830` |
| Hypothalamus | FMA62008 | `FJ1760`, `FJ1780`, `FJ1808`, `FJ1828` |
| Right cerebral hemisphere | FMA67292 | `FJ1733`, `FJ1740`, `FJ1745`, `FJ1747`, `FJ1749`, `FJ1751`, `FJ1784`, `FJ1786`, `FJ1788`, `FJ1790`, `FJ1792`, `FJ1798`, `FJ1801`, `FJ1806`, `FJ1814`, `FJ1834`, `FJ1836`, `FJ1842` |
| Left cerebral hemisphere | FMA61819 | `FJ1732`, `FJ1739`, `FJ1744`, `FJ1746`, `FJ1748`, `FJ1750`, `FJ1758`, `FJ1759`, `FJ1767`, `FJ1783`, `FJ1785`, `FJ1787`, `FJ1789`, `FJ1791`, `FJ1797`, `FJ1800`, `FJ1833`, `FJ1835`, `FJ1841` |
| Frontal lobe, bilateral | FMA72969 right; FMA72970 left | `FJ1745`, `FJ1788`, `FJ1801`, `FJ1834`; `FJ1744`, `FJ1787`, `FJ1800`, `FJ1833` |
| Temporal lobe, bilateral | FMA72971 right; FMA72972 left | `FJ1747`, `FJ1784`, `FJ1786`, `FJ1790`; `FJ1746`, `FJ1783`, `FJ1785`, `FJ1789` |
| Parietal lobe, bilateral | FMA72973 right; FMA72974 left | `FJ1733`, `FJ1798`, `FJ1836`, `FJ1842`; `FJ1732`, `FJ1797`, `FJ1835`, `FJ1841` |
| Occipital lobe, bilateral | FMA72975 right; FMA72976 left | `FJ1792`, `FJ1791` |
| Prefrontal cortex, bilateral | FMA242625 right; FMA242627 left | `FJ1745`, `FJ1788`, `FJ1834`; `FJ1744`, `FJ1787`, `FJ1833` |
| Ventricles of brain | FMA242787 | `FJ1730`, `FJ1731`, `FJ1738`, `FJ1767`, `FJ1814` |
| Pituitary gland | FMA13889 | `FJ1796` |

The source concept-to-element mappings were checked against DBCLS's official `partof_parts_list_e.txt` and `partof_element_parts.txt`. These deep-region, hemisphere, and lobe OBJ files are components of the same FMA50801 brain compound and are already within the measured whole-brain envelope. Several source elements belong to more than one concept; the app records those overlapping memberships, renders each element once, and highlights the selected concept's mapped element set.

The app keeps the 57 source IDs in `src/data/anatomy.ts`. The measurements below are also recorded in `public/models/bodyparts3d/mesh-verification.json`.

## Shared coordinate check

The official archive defines these anatomy concepts as parts of one 3D whole-body model. I also measured the OBJ vertex bounds directly. The hippocampus envelope falls inside the brain-component envelope when the two hippocampal meshes are excluded from that envelope:

| Mesh set | Minimum (x, y, z) | Maximum (x, y, z) |
| --- | --- | --- |
| Brain components, 57 OBJ files | `[-69.9404, -169.677, 1464.5]` | `[68.8934, 10.3293, 1630.46]` |
| Left and right hippocampus | `[-37.9061, -102.368, 1529.25]` | `[36.6013, -59.4461, 1551.24]` |
| Pituitary gland, one OBJ | `[-6.7911, -110.563, 1522.57]` | `[5.51969, -101.105, 1535.54]` |

The hippocampi and pituitary each occupy the same documented source frame and lie within the brain’s bounds. No per-mesh registration or guessed offset is applied. The viewer applies one shared translation and axis rotation to the complete set. The pituitary mesh is an individual element of the same BodyParts3D adult-human model; its shared coordinates are also confirmed by the measured bounds in `public/models/bodyparts3d/mesh-verification.json`.

## Catalog coverage and gaps

The current app exposes whole brain, bilateral hippocampus, midbrain, pons, medulla oblongata, cerebellum, hypothalamus, both cerebral hemispheres, bilateral frontal, temporal, parietal, and occipital lobes, prefrontal cortex, the ventricular system, and pituitary gland. Each named mesh is grounded in an official BodyParts3D concept-to-element mapping. No procedural shape or approximate proxy is presented as named anatomy.

The remaining reference gaps are meningeal layers; specialized cortical regions such as orbitofrontal, premotor, motor, Broca's, Wernicke's, primary visual and auditory, cingulate, named gyri and lobules, and precuneus; entorhinal cortex, amygdala, subiculum, and dentate gyrus; corpus callosum; thalamus and basal-ganglia nuclei; olfactory bulb; and cranial nerves I–XII. Exact-name searches in the official PART-OF concepts found no rows for corpus callosum, amygdala/amygdaloid body, thalamus, substantia nigra, caudate nucleus, putamen, globus pallidus, nucleus accumbens, subiculum, dentate gyrus, Broca's area, Wernicke's area, primary visual cortex, primary auditory cortex, motor cortex, cingulate cortex, meninges, optic nerve, trigeminal nerve, or olfactory bulb. These are exact-label misses in this release, not a claim that the concepts have no possible synonym or mesh elsewhere. No approximate surface is assigned one of these unsupported names. See the official [PART-OF concept list](https://dbarchive.biosciencedbc.jp/data/bodyparts3d/LATEST/partof_parts_list_e.txt) and [concept-to-element mesh map](https://dbarchive.biosciencedbc.jp/data/bodyparts3d/LATEST/partof_element_parts.txt) for the reviewed source records.
