export type AnatomyStructure = {
  id: string
  name: string
  category: string
  latinName: string
  summary: string
  description: string
  location: string
  function: string
  sourceIds: string[]
}

/** Anatomy facts and source mappings live apart from viewer presentation code. */
export const anatomy: AnatomyStructure[] = [
  {
    id: 'whole-brain',
    name: 'Whole brain',
    category: 'Overview',
    latinName: 'Encephalon',
    summary: 'The brain brings together sensory information, internal states, and actions.',
    description:
      'The brain is a connected organ made from many regions. Its large cerebral hemispheres sit above the cerebellum and brainstem, while deeper structures help coordinate movement, memory, emotion, and basic body functions.',
    location: 'Inside the skull, continuing into the spinal cord through the brainstem.',
    function:
      'Networks across the brain support perception, learning, movement, language, and regulation of vital functions.',
    sourceIds: [
      'FJ1730', 'FJ1731', 'FJ1732', 'FJ1733', 'FJ1738', 'FJ1739', 'FJ1740', 'FJ1743',
      'FJ1744', 'FJ1745', 'FJ1746', 'FJ1747', 'FJ1748', 'FJ1749', 'FJ1750', 'FJ1751',
      'FJ1758', 'FJ1760', 'FJ1762', 'FJ1767', 'FJ1769', 'FJ1770', 'FJ1775', 'FJ1779',
      'FJ1780', 'FJ1781', 'FJ1783', 'FJ1784', 'FJ1785', 'FJ1786', 'FJ1787', 'FJ1788',
      'FJ1789', 'FJ1790', 'FJ1791', 'FJ1792', 'FJ1795', 'FJ1797', 'FJ1798', 'FJ1800',
      'FJ1801', 'FJ1806', 'FJ1808', 'FJ1810', 'FJ1814', 'FJ1817', 'FJ1822', 'FJ1826',
      'FJ1828', 'FJ1830', 'FJ1831', 'FJ1833', 'FJ1834', 'FJ1835', 'FJ1836', 'FJ1841',
      'FJ1842',
    ],
  },
  {
    id: 'hippocampus',
    name: 'Hippocampus',
    category: 'Deep structures',
    latinName: 'Hippocampus',
    summary: 'A paired medial temporal structure that helps form and organize memories.',
    description:
      'The hippocampus sits within each medial temporal lobe. It helps turn recent experience into lasting memories and contributes to building a mental map of places. It works with nearby cortical areas and with distributed networks across the brain.',
    location: 'One in each medial temporal lobe, tucked beneath the outer cortex.',
    function:
      'Supports new episodic memory formation and spatial navigation; it is one part of a larger memory network.',
    sourceIds: ['FJ1759', 'FJ1807'],
  },
  {
    id: 'midbrain',
    name: 'Midbrain',
    category: 'Brainstem',
    latinName: 'Mesencephalon',
    summary: 'A compact brainstem region involved in movement, orienting, and sensory pathways.',
    description: 'The midbrain lies between the forebrain and pons. Its pathways carry information between these regions, while nuclei help coordinate eye movements, orienting, and aspects of movement control.',
    location: 'Upper brainstem, below the diencephalon and above the pons.',
    function: 'Contributes to eye movement, alerting, orienting, and motor circuits.',
    sourceIds: ['FJ1738', 'FJ1762', 'FJ1770', 'FJ1779', 'FJ1810', 'FJ1817', 'FJ1826'],
  },
  {
    id: 'pons',
    name: 'Pons',
    category: 'Brainstem',
    latinName: 'Pons',
    summary: 'A brainstem bridge linking the cerebrum, cerebellum, and lower brainstem.',
    description: 'The pons is a broad part of the brainstem. Its pathways connect cerebral and cerebellar systems, and its nuclei contribute to sleep, breathing, facial sensation, and movement.',
    location: 'Between the midbrain and medulla, in front of the cerebellum.',
    function: 'Relays signals between brain regions and participates in sleep and breathing regulation.',
    sourceIds: ['FJ1775', 'FJ1822'],
  },
  {
    id: 'medulla-oblongata',
    name: 'Medulla oblongata',
    category: 'Brainstem',
    latinName: 'Medulla oblongata',
    summary: 'The lowest brainstem region supports essential automatic functions.',
    description: 'The medulla contains pathways between the brain and spinal cord and networks that help regulate breathing, heart activity, swallowing, and other automatic functions.',
    location: 'Below the pons, where the brainstem continues into the spinal cord.',
    function: 'Helps regulate vital autonomic and protective reflex functions.',
    sourceIds: ['FJ1769', 'FJ1831'],
  },
  {
    id: 'cerebellum',
    name: 'Cerebellum',
    category: 'Coordination',
    latinName: 'Cerebellum',
    summary: 'The cerebellum helps refine movement and learn coordinated actions.',
    description: 'The cerebellum compares intended and ongoing movement, helping adjust timing, accuracy, and balance. It also contributes to learning practiced sequences and other cognitive tasks.',
    location: 'Behind the pons and medulla, beneath the back of the cerebral hemispheres.',
    function: 'Supports movement coordination, balance, and adaptive motor learning.',
    sourceIds: ['FJ1781', 'FJ1830'],
  },
  {
    id: 'hypothalamus',
    name: 'Hypothalamus',
    category: 'Deep structures',
    latinName: 'Hypothalamus',
    summary: 'A small deep region coordinates brain signals with body regulation.',
    description: 'The hypothalamus links nervous and endocrine regulation. Its networks help maintain internal balance by coordinating responses related to temperature, hunger, thirst, sleep, and hormones.',
    location: 'At the base of the diencephalon, below the thalamic region.',
    function: 'Coordinates autonomic and hormonal responses that support homeostasis.',
    sourceIds: ['FJ1760', 'FJ1780', 'FJ1808', 'FJ1828'],
  },
  {
    id: 'right-cerebral-hemisphere',
    name: 'Right cerebral hemisphere',
    category: 'Cerebral hemispheres',
    latinName: 'Hemispherium cerebri dextrum',
    summary: 'The right cerebral hemisphere supports perception and action through distributed networks.',
    description: 'The right cerebral hemisphere is one half of the cerebrum. Its cortical and subcortical regions work with the left hemisphere through connecting pathways; neither hemisphere works in isolation.',
    location: 'The right half of the cerebrum, above the brainstem and cerebellum.',
    function: 'Contributes to sensory, motor, spatial, and cognitive networks that are distributed across both hemispheres.',
    sourceIds: ['FJ1733', 'FJ1740', 'FJ1745', 'FJ1747', 'FJ1749', 'FJ1751', 'FJ1784', 'FJ1786', 'FJ1788', 'FJ1790', 'FJ1792', 'FJ1798', 'FJ1801', 'FJ1806', 'FJ1814', 'FJ1834', 'FJ1836', 'FJ1842'],
  },
  {
    id: 'left-cerebral-hemisphere',
    name: 'Left cerebral hemisphere',
    category: 'Cerebral hemispheres',
    latinName: 'Hemispherium cerebri sinistrum',
    summary: 'The left cerebral hemisphere is the other major half of the cerebrum.',
    description: 'The left cerebral hemisphere contains cortical and subcortical regions connected with the right hemisphere. Language and other abilities depend on networks whose organization varies between people and spans multiple brain regions.',
    location: 'The left half of the cerebrum, above the brainstem and cerebellum.',
    function: 'Participates in perception, movement, language, memory, and other networks shared across the brain.',
    sourceIds: ['FJ1732', 'FJ1739', 'FJ1744', 'FJ1746', 'FJ1748', 'FJ1750', 'FJ1758', 'FJ1759', 'FJ1767', 'FJ1783', 'FJ1785', 'FJ1787', 'FJ1789', 'FJ1791', 'FJ1797', 'FJ1800', 'FJ1833', 'FJ1835', 'FJ1841'],
  },
  {
    id: 'frontal-lobe',
    name: 'Frontal lobe',
    category: 'Cerebral lobes',
    latinName: 'Lobus frontalis',
    summary: 'The frontal lobes contribute to planning, voluntary movement, and flexible behavior.',
    description: 'The frontal lobes include regions involved in selecting and organizing actions, controlling voluntary movement, and supporting aspects of attention, decision-making, and social behavior.',
    location: 'The front portions of both cerebral hemispheres, behind the forehead.',
    function: 'Supports action planning, motor control, executive processes, and other distributed functions.',
    sourceIds: ['FJ1745', 'FJ1788', 'FJ1801', 'FJ1834', 'FJ1744', 'FJ1787', 'FJ1800', 'FJ1833'],
  },
  {
    id: 'temporal-lobe',
    name: 'Temporal lobe',
    category: 'Cerebral lobes',
    latinName: 'Lobus temporalis',
    summary: 'The temporal lobes take part in hearing, recognition, and memory networks.',
    description: 'The temporal lobes contain auditory and association regions. Medial temporal structures, including the hippocampus, contribute to memory, while other temporal networks help process sound and recognize meaningful information.',
    location: 'The lower side regions of both cerebral hemispheres, near the temples.',
    function: 'Supports auditory processing, recognition, language-related processes, and memory networks.',
    sourceIds: ['FJ1747', 'FJ1784', 'FJ1786', 'FJ1790', 'FJ1746', 'FJ1783', 'FJ1785', 'FJ1789'],
  },
  {
    id: 'parietal-lobe',
    name: 'Parietal lobe',
    category: 'Cerebral lobes',
    latinName: 'Lobus parietalis',
    summary: 'The parietal lobes integrate body sensation with spatial information.',
    description: 'The parietal lobes combine signals from touch and other senses with information about the body and surrounding space. Their networks help guide attention and goal-directed movement.',
    location: 'Behind the frontal lobes and above the temporal lobes in both hemispheres.',
    function: 'Supports somatosensory integration, spatial attention, and sensorimotor guidance.',
    sourceIds: ['FJ1733', 'FJ1798', 'FJ1836', 'FJ1842', 'FJ1732', 'FJ1797', 'FJ1835', 'FJ1841'],
  },
  {
    id: 'occipital-lobe',
    name: 'Occipital lobe',
    category: 'Cerebral lobes',
    latinName: 'Lobus occipitalis',
    summary: 'The occipital lobes contain major cortical networks for vision.',
    description: 'The occipital lobes sit at the back of the cerebral hemispheres. Visual signals are processed through connected stages that extract features and combine them with information from other brain networks.',
    location: 'The back portions of both cerebral hemispheres.',
    function: 'Supports visual processing through multiple interconnected cortical areas.',
    sourceIds: ['FJ1792', 'FJ1791'],
  },
  {
    id: 'prefrontal-cortex',
    name: 'Prefrontal cortex',
    category: 'Cerebral lobes',
    latinName: 'Cortex praefrontalis',
    summary: 'Prefrontal regions help organize goals, choices, and context-sensitive actions.',
    description: 'Prefrontal cortical regions participate in working with goals, weighing options, maintaining relevant information, and adapting behavior. These abilities emerge from interactions with other cortical and subcortical networks.',
    location: 'At the front of both cerebral hemispheres, within the frontal lobes.',
    function: 'Supports executive processes such as planning, working memory, and flexible control.',
    sourceIds: ['FJ1745', 'FJ1788', 'FJ1834', 'FJ1744', 'FJ1787', 'FJ1833'],
  },
  {
    id: 'ventricles',
    name: 'Ventricles',
    category: 'Other structures',
    latinName: 'Systema ventriculare cerebri',
    summary: 'The brain ventricles form a connected internal fluid-filled space.',
    description: 'The ventricular system is a set of connected spaces inside the brain that contains cerebrospinal fluid. The fluid circulates through the ventricular spaces and around the brain and spinal cord.',
    location: 'Within the cerebral hemispheres and central regions of the brain.',
    function: 'Contains cerebrospinal fluid, which circulates through spaces around the central nervous system.',
    sourceIds: ['FJ1730', 'FJ1731', 'FJ1738', 'FJ1767', 'FJ1814'],
  },
  {
    id: 'pituitary-gland',
    name: 'Pituitary gland',
    category: 'Other structures',
    latinName: 'Hypophysis',
    summary: 'The pituitary helps coordinate hormone signaling across the body.',
    description: 'The pituitary is an endocrine gland connected to the hypothalamus. Hormones released from its lobes help regulate other glands and processes such as growth, reproduction, and water balance.',
    location: 'At the base of the brain, attached to the hypothalamus.',
    function: 'Releases hormones that help coordinate endocrine activity with hypothalamic signals.',
    sourceIds: ['FJ1796'],
  },
]

export const defaultStructureId = 'whole-brain'
export const brainCenter = [-0.5235, -79.67385, 1547.48] as const

export function getStructure(id: string) {
  return anatomy.find((structure) => structure.id === id) ?? anatomy[0]
}
