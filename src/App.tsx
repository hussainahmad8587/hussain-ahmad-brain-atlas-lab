import { Component, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties, ErrorInfo, ReactNode } from 'react'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import BrainCanvas from './components/BrainCanvas'
import { anatomy, defaultStructureId, getStructure } from './data/anatomy'
import './App.css'

type BoundaryProps = { children: ReactNode; onRetry: () => void }
type BoundaryState = { error: Error | null }

class ModelBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): BoundaryState {
    return { error }
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // The fallback below gives the user a direct recovery path for missing meshes.
  }

  render() {
    if (this.state.error) {
      return (
        <div className="model-failure" role="alert">
          <span className="eyebrow">ATLAS ASSET ISSUE</span>
          <h2>The brain model did not finish loading.</h2>
          <p>Check that the BodyParts3D OBJ files are present in <code>public/models/bodyparts3d</code>, then retry.</p>
          <button className="button button-soft" onClick={this.props.onRetry}>Retry loading</button>
        </div>
      )
    }
    return this.props.children
  }
}

function Icon({ name }: { name: 'annotate' | 'zoom' | 'snapshot' | 'reset' | 'fullscreen' }) {
  const paths = {
    annotate: <><path d="m4 16.5 9.8-9.8 3.5 3.5-9.8 9.8L4 21z" /><path d="m12.8 7.7 3.5 3.5M4 21l4.5-1.2" /></>,
    zoom: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5M8 10.5h5" /></>,
    snapshot: <><rect x="3" y="6" width="18" height="14" rx="2" /><circle cx="12" cy="13" r="4" /><path d="m7 6 1.4-2h7.2L17 6" /></>,
    reset: <><path d="M20 11a8 8 0 0 0-14-5L4 8" /><path d="M4 4v4h4M4 13a8 8 0 0 0 14 5l2-2" /></>,
    fullscreen: <><path d="M8 4H4v4M16 4h4v4M4 16v4h4M20 16v4h-4" /><path d="m4 4 6 6m10-6-6 6M4 20l6-6m10 6-6-6" /></>,
  }
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}

function App() {
  const [selectedId, setSelectedId] = useState(defaultStructureId)
  const [focusSequence, setFocusSequence] = useState(0)
  const [dissection, setDissection] = useState(0)
  const [search, setSearch] = useState('')
  const [annotateMode, setAnnotateMode] = useState(false)
  const [zoomMode, setZoomMode] = useState(false)
  const [annotationSaved, setAnnotationSaved] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [modelReady, setModelReady] = useState(false)
  const [snapshotStatus, setSnapshotStatus] = useState('')
  const [retryKey, setRetryKey] = useState(0)
  const [captureSnapshot, setCaptureSnapshot] = useState<(() => void) | null>(null)
  const controlsRef = useRef<OrbitControlsImpl>(null)
  const viewerRef = useRef<HTMLElement>(null)
  const current = getStructure(selectedId)

  const groups = useMemo(() => {
    const filtered = anatomy.filter((item) => `${item.name} ${item.category} ${item.latinName}`.toLowerCase().includes(search.toLowerCase()))
    return Array.from(new Set(filtered.map((item) => item.category))).map((category) => ({
      category,
      items: filtered.filter((item) => item.category === category),
    }))
  }, [search])

  const onSnapshotReady = useCallback((capture: () => void) => setCaptureSnapshot(() => capture), [])

  useEffect(() => {
    if (!snapshotStatus) return
    const timeout = window.setTimeout(() => setSnapshotStatus(''), 4500)
    return () => window.clearTimeout(timeout)
  }, [snapshotStatus])

  useEffect(() => {
    const syncFullscreen = () => setFullscreen(Boolean(document.fullscreenElement))
    const exitFallbackFullscreen = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !document.fullscreenElement) setFullscreen(false)
    }
    document.addEventListener('fullscreenchange', syncFullscreen)
    document.addEventListener('keydown', exitFallbackFullscreen)
    return () => {
      document.removeEventListener('fullscreenchange', syncFullscreen)
      document.removeEventListener('keydown', exitFallbackFullscreen)
    }
  }, [])

  const resetView = () => {
    setSelectedId(defaultStructureId)
    setFocusSequence(0)
    setDissection(0)
    setZoomMode(false)
    setAnnotateMode(false)
    setAnnotationSaved(false)
    controlsRef.current?.reset()
  }

  const toggleFullscreen = async () => {
    if (fullscreen) {
      if (document.fullscreenElement) {
        await document.exitFullscreen?.()
      } else {
        setFullscreen(false)
      }
    } else if (viewerRef.current) {
      try {
        await viewerRef.current.requestFullscreen?.()
        setFullscreen(true)
      } catch {
        // Keep a CSS full-window mode available in embedded browsers that deny Fullscreen API access.
        setFullscreen(true)
      }
    }
  }

  const pickStructure = (id: string) => {
    setSelectedId(id)
    if (annotateMode) setAnnotationSaved(true)
  }

  const selectFromList = (id: string) => {
    pickStructure(id)
    setFocusSequence((sequence) => sequence + 1)
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Brain Atlas Lab home">
          <span className="brand-mark"><i /><i /><i /></span>
          <span className="brand-word">brain atlas <b>lab</b></span>
        </a>
        <div className="topbar-meta">
          <span className="live-dot" />
          <span>Independent learning atlas</span>
          <span className="meta-divider" />
          <span>3D / ANATOMY</span>
        </div>
      </header>

      <section className="intro-row" id="top">
        <div>
          <p className="eyebrow">INTERACTIVE NEUROANATOMY · FIELDWORK 02</p>
          <h1>See the brain <span>in layers.</span></h1>
          <p className="intro-copy">Turn the model, pick a region, and follow the structures that shape memory and movement.</p>
        </div>
        <div className="orientation-chip"><span className="orientation-axis">A</span><span>Rotate to explore</span><span className="chip-separator">·</span><span>Scroll to zoom</span></div>
      </section>

      <section className="atlas-layout" aria-label="Interactive brain atlas">
        <aside className="anatomy-panel panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">ATLAS INDEX</p>
              <h2>Structures <span className="count-pill">{anatomy.length.toString().padStart(2, '0')}</span></h2>
            </div>
            <span className="index-glyph" aria-hidden="true">≡</span>
          </div>
          <label className="search-box">
            <span aria-hidden="true">⌕</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} type="search" placeholder="Find an anatomy…" aria-label="Search anatomy structures" />
            <kbd>/</kbd>
          </label>
          <nav className="structure-list" aria-label="Anatomy structure list">
            {groups.map(({ category, items }) => (
              <section className="structure-group" key={category} aria-label={category}>
                <h3>{category}</h3>
                {items.map((item, index) => (
                  <button
                    className={`structure-item ${selectedId === item.id ? 'selected' : ''}`}
                    type="button"
                    key={item.id}
                    onClick={() => selectFromList(item.id)}
                    aria-current={selectedId === item.id ? 'true' : undefined}
                  >
                    <span className="structure-index">{String(index + 1).padStart(2, '0')}</span>
                    <span className="structure-name">{item.name}<small>{item.latinName}</small></span>
                    <span className="structure-arrow" aria-hidden="true">↗</span>
                  </button>
                ))}
              </section>
            ))}
            {groups.length === 0 && <p className="empty-search">No matching structure in the atlas.</p>}
          </nav>
          <div className="panel-foot"><span className="foot-spark">✳</span><span>More atlas regions are on the roadmap.</span></div>
        </aside>

        <section
          className={`viewer-panel panel ${fullscreen ? 'fullscreen-viewer' : ''}`}
          style={fullscreen ? { position: 'fixed', inset: 10, zIndex: 1000, height: 'calc(100vh - 20px)' } : undefined}
          ref={viewerRef}
          aria-label="3D brain model viewer"
        >
          <div className="viewer-toolbar">
            <div className="viewer-title">
              <span className="viewer-status"><i /> {modelReady ? 'MODEL READY' : 'LOADING MESHES'}</span>
              <span className="viewer-breadcrumb">/ {current.name}</span>
            </div>
            <div className="toolbar-actions" aria-label="Viewer controls">
              <button type="button" className={`tool-button ${annotateMode ? 'active' : ''}`} aria-pressed={annotateMode} onClick={() => { setAnnotateMode((value) => !value); setAnnotationSaved(false) }} title="Toggle annotate mode">
                <Icon name="annotate" /><span>Annotate</span>
              </button>
              <button type="button" className={`tool-button ${zoomMode ? 'active' : ''}`} aria-pressed={zoomMode} onClick={() => setZoomMode((value) => !value)} title="Arm click-to-zoom">
                <Icon name="zoom" /><span>Zoom</span>
              </button>
              <button type="button" className="tool-button" disabled={!captureSnapshot} onClick={() => { setSnapshotStatus('Creating PNG…'); captureSnapshot?.() }} title="Save a PNG snapshot">
                <Icon name="snapshot" /><span>Snapshot</span>
              </button>
              <button type="button" className="tool-button" onClick={resetView} title="Reset selection, zoom, and dissection">
                <Icon name="reset" /><span>Reset</span>
              </button>
              <button type="button" className="tool-button icon-only" aria-label={fullscreen ? 'Exit full screen' : 'Enter full screen'} onClick={toggleFullscreen} title={fullscreen ? 'Exit full screen' : 'Full screen'}>
                <Icon name="fullscreen" />
              </button>
            </div>
          </div>

          <div className={`model-stage ${annotateMode ? 'annotate-stage' : ''}`}>
            <div className="stage-corner stage-corner-tl" aria-hidden="true" />
            <div className="stage-corner stage-corner-br" aria-hidden="true" />
            <div className="stage-coordinate" aria-hidden="true"><span>R</span><span>·</span><span>L</span></div>
            {!modelReady && <div className="loading-overlay"><span className="loading-orbit" /><p>Loading licensed atlas meshes</p><small>BodyParts3D · OBJ</small></div>}
            <ModelBoundary key={retryKey} onRetry={() => { setModelReady(false); setRetryKey((key) => key + 1) }}>
              <BrainCanvas
                key={retryKey}
                selectedId={selectedId}
                focusRequest={focusSequence > 0 ? { structureId: selectedId, sequence: focusSequence } : null}
                dissection={dissection}
                zoomMode={zoomMode}
                annotateMode={annotateMode}
                controlsRef={controlsRef}
                onPick={pickStructure}
                onZoomModeChange={setZoomMode}
                onSnapshotReady={onSnapshotReady}
                onSnapshotStatus={setSnapshotStatus}
                onReady={() => setModelReady(true)}
              />
            </ModelBoundary>
            <div className="stage-caption"><span>BODY PARTS 3D / 4.0</span><span>SHARED COORDINATE SPACE</span></div>
            {zoomMode && <div className="mode-toast" role="status"><span>+</span> Click a region to zoom in</div>}
            {annotateMode && <div className="mode-toast annotate-toast" role="status"><span>✎</span> Annotation mode · click a region to pin it</div>}
            {snapshotStatus && <div className="mode-toast snapshot-toast" role="status">{snapshotStatus}</div>}
          </div>

          <div className="dissection-bar">
            <div className="dissection-copy"><span className="eyebrow">LAYER CONTROL</span><label htmlFor="dissection">Dissection</label></div>
            <input id="dissection" type="range" min="0" max="100" value={dissection} style={{ '--range-progress': `${dissection}%` } as CSSProperties} onChange={(event) => setDissection(Number(event.target.value))} aria-label="Dissection transparency" />
            <span className="range-value">{String(dissection).padStart(2, '0')}<small>%</small></span>
          </div>

          <div className="viewer-hint"><span className="hint-star">✳</span><span><b>Explore the model</b> Drag to rotate · Scroll or pinch to zoom · Click a region to identify it</span><span className="hint-device">MOUSE / TOUCH</span></div>
        </section>

        <aside className="details-panel panel" aria-live="polite">
          <div className="details-topline"><p className="eyebrow">STRUCTURE NOTES</p><span className="note-number">{String(anatomy.indexOf(current) + 1).padStart(2, '0')} / {String(anatomy.length).padStart(2, '0')}</span></div>
          <div className="detail-heading">
            <span className="detail-swatch" />
            <div><h2>{current.name}</h2><p>{current.latinName}</p></div>
          </div>
          <p className="detail-summary">{current.summary}</p>
          <div className="detail-rule"><span /> ANATOMY FIELDNOTE</div>
          <p className="detail-description">{current.description}</p>
          <div className="fact-block"><span className="eyebrow">LOCATION</span><p>{current.location}</p></div>
          <div className="fact-block"><span className="eyebrow">ROLE IN THE NETWORK</span><p>{current.function}</p></div>
          {annotationSaved && <div className="saved-note"><span>✳</span> Pinned for this session</div>}
          <div className="detail-spacer" />
          <div className="detail-foot"><span>ATLAS NOTE</span><span>01</span></div>
        </aside>
      </section>

      <footer className="site-footer"><span>Brain Atlas Lab <b>·</b> an independent learning project</span><span>ANATOMY DATA: BODY PARTS 3D / CC BY 4.0</span></footer>
    </main>
  )
}

export default App
