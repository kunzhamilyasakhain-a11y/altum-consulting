import { AmbientVideo } from "./AmbientVideo";

/** Концептуальная сгенерированная фотография и собственные демонстрационные экраны. */
export function AboutScene() {
  return (
    <div className="about-art about-connected" aria-hidden="true">
      <span className="about-year">2018</span>
      <div className="about-screen screen-learning screen-photo">
        <AmbientVideo name="about-team" className="collaboration-video" />
        <span className="photo-edge-light" />
      </div>
      <div className="about-orbit" />
      <AmbientVideo name="about-triangle" className="about-sculpture" />
      <div className="about-screen screen-insight">
        <div className="about-screen-bar">
          <i />
          <i />
          <i />
          <span>СВЯЗЫВАЕМ ИДЕИ / ДЕМО</span>
        </div>
        <div className="insight-plot">
          <div className="insight-bars">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <svg viewBox="0 0 200 80" fill="none">
            <path
              className="about-insight-line"
              d="M4 68 29 51 54 61 79 31 105 42 130 18 154 29 183 6 196 11"
              stroke="#d95834"
              strokeWidth="2"
              pathLength="1"
            />
          </svg>
        </div>
      </div>
      <div className="about-screen screen-digital">
        <div className="about-screen-bar">
          <i />
          <i />
          <i />
          <span>DIGITAL / ДЕМО</span>
        </div>
        <div className="about-web-preview">
          <div>
            <small>IDEAS INTO IMPACT</small>
            <strong>
              Возможности
              <br />в движении
            </strong>
            <i />
          </div>
          <span className="about-web-shape" />
        </div>
        <div className="about-web-tiles">
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="about-values">
        <span>Знания</span>
        <span>Люди</span>
        <span>Технологии</span>
        <span>Развитие</span>
      </div>
      <span className="about-art-note">ALTUM / ЗНАНИЯ · ЛЮДИ · ТЕХНОЛОГИИ</span>
    </div>
  );
}
