import { AmbientVideo } from "@/components/AmbientVideo";
import { AboutScene } from "@/components/AboutScene";
import { HeroScene, ServiceScene } from "@/components/MotionScenes";
import { Icon } from "@/components/Icons";
import { Interactions } from "@/components/Interactions";
import { siteConfig } from "@/lib/config";
import {
  directions,
  advantages,
  steps,
  aboutParagraphs,
  competencies,
} from "@/lib/content";
import { typography as t } from "@/lib/typography";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Перейти к содержимому
      </a>
      <header className="header">
        <div className="header-inner">
          <a
            href="#main"
            className="brand"
            aria-label="ALTUM Consulting — главная"
          >
            <img
              src={siteConfig.logo}
              width="202"
              height="53"
              alt="ALTUM Consulting"
            />
          </a>
          <nav className="desktop-nav" aria-label="Основная навигация">
            <a href="#services">Направления</a>
            <a href="#about">О компании</a>
            <a href="#process">Как работаем</a>
            <a href="#ispring">iSpring</a>
            <a href="#contact">Контакты</a>
          </nav>
          <button className="button header-cta primary" data-contact="project">
            Обсудить проект <Icon name="arrow" />
          </button>
        </div>
      </header>
      <main id="main">
        <section className="hero-wrap" aria-labelledby="hero-title">
          <div className="hero container">
            <div className="hero-copy">
              <div className="eyebrow">
                <i /> ALTUM CONSULTING / С 2018 ГОДА
              </div>
              <h1 id="hero-title">
                Образовательные
                <br />
                и цифровые решения
                <br />
                <em>для бизнеса</em>
              </h1>
              <p>
                {t(
                  "Разрабатываем электронные курсы, корпоративные программы обучения и бизнес-игры. Создаём сайты, digital-продукты и решения на основе искусственного интеллекта.",
                )}
              </p>
              <div className="hero-actions">
                <button data-contact="project" className="button primary">
                  Обсудить проект <Icon name="arrow" />
                </button>
                <a href="#services" className="hero-secondary">
                  <span className="circle-arrow">
                    <Icon name="arrow" />
                  </span>
                  Наши направления
                </a>
              </div>
            </div>
            <HeroScene />
            <div className="hero-bottom">
              <span>ЛЮДИ · ЗНАНИЯ · ЦИФРОВЫЕ ВОЗМОЖНОСТИ</span>
              <a href="#services">
                Наши направления <Icon name="down" />
              </a>
            </div>
          </div>
        </section>

        <div className="competencies" aria-label="Компетенции ALTUM">
          <div className="competencies-track">
            <span>{competencies}</span>
            <span aria-hidden="true">{competencies}</span>
          </div>
        </div>

        <section
          id="services"
          className="services section container"
          aria-labelledby="services-title"
        >
          <div className="section-intro" data-reveal>
            <div>
              <span className="eyebrow">НАШИ НАПРАВЛЕНИЯ</span>
              <h2 id="services-title">
                {t("Экспертиза в обучении, маркетинге и цифровой разработке")}
              </h2>
            </div>
            <p>
              {t(
                "От индивидуальных образовательных программ до интерактивных курсов и цифровых продуктов — под задачи компаний разного масштаба.",
              )}
            </p>
          </div>
          <div className="service-grid">
            {directions.map((d, i) => (
              <article
                key={d.id}
                id={d.id}
                className={`service-card card-${d.id}`}
                data-reveal
              >
                <div className="card-top">
                  <span>0{i + 1}</span>
                  <Icon
                    name={
                      d.id === "courses"
                        ? "course"
                        : d.id === "training"
                          ? "chess"
                          : "digital"
                    }
                  />
                </div>
                <h3>{t(d.title)}</h3>
                <p className="card-subtitle">{t(d.subtitle)}</p>
                <p className="card-description">{t(d.paragraphs[0])}</p>
                <ServiceScene name={d.id} />
                <details className="service-details">
                  <summary>
                    Подробнее<span aria-hidden="true">+</span>
                  </summary>
                  <div>
                    {d.paragraphs.slice(1).map((p) => (
                      <p key={p}>{t(p)}</p>
                    ))}
                  </div>
                </details>
                <ul>
                  {d.services.map((s) => (
                    <li key={s}>{t(s)}</li>
                  ))}
                </ul>
                <button
                  className="card-action"
                  data-contact="project"
                  data-direction={d.id}
                >
                  Обсудить проект{" "}
                  <span className="round-arrow">
                    <Icon name="arrow" />
                  </span>
                </button>
              </article>
            ))}
          </div>
        </section>

        <section
          id="why"
          className="why dark-section section"
          aria-labelledby="why-title"
        >
          <img
            className="why-landscape"
            src="/art/summit.webp"
            srcSet="/art/summit-small.webp 960w, /art/summit.webp 1680w"
            sizes="100vw"
            width="1672"
            height="941"
            loading="lazy"
            alt=""
          />
          <div className="why-shade" />
          <div className="container why-content">
            <span className="eyebrow">ПОЧЕМУ ALTUM</span>
            <h2 id="why-title" data-reveal>
              {t("Экспертиза, которая объединяет содержание и технологии")}
            </h2>
            <div className="advantages">
              {advantages.map(([icon, title, text]) => (
                <article key={title} data-reveal>
                  <span className="advantage-icon">
                    <Icon name={icon} />
                  </span>
                  <h3>{t(title)}</h3>
                  <p>{t(text)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="process"
          className="process section container"
          aria-labelledby="process-title"
        >
          <span className="eyebrow">КАК МЫ РАБОТАЕМ</span>
          <div className="process-heading">
            <h2 id="process-title" data-reveal>
              {t("От постановки задачи до реализации")}
            </h2>
          </div>
          <ol className="steps">
            {steps.map(([title, text], i) => (
              <li key={title} data-reveal>
                <div className="step-top">
                  <span className="step-number">0{i + 1}</span>
                  <Icon name={["study", "team", "create", "mail"][i]} />
                </div>
                <h3>{t(title)}</h3>
                <p>{t(text)}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="about" className="about" aria-labelledby="about-title">
          <div className="about-cream" />
          <div className="container about-grid">
            <div className="about-copy" data-reveal>
              <span className="eyebrow">О КОМПАНИИ</span>
              <h2 id="about-title">{t("ALTUM Consulting")}</h2>
              <p className="about-lead">
                {t("Агентство образовательных и цифровых решений для бизнеса")}
              </p>
              {aboutParagraphs.map((p) => (
                <p key={p}>{t(p)}</p>
              ))}
            </div>
            <AboutScene />
          </div>
        </section>

        <section
          id="ispring"
          className="partner container"
          aria-labelledby="ispring-title"
          data-reveal
        >
          <div className="partner-mark">
            <span className="eyebrow">ТЕХНОЛОГИЧЕСКИЙ ПАРТНЁР</span>
            <span className="ispring-name">
              <span className="ispring-burst" aria-hidden="true">
                ✳
              </span>
              iSpring
            </span>
            <div className="partner-tags">
              <span>iSpring Suite</span>
              <span>iSpring LMS</span>
            </div>
          </div>
          <div className="partner-copy">
            <h2 id="ispring-title">
              {t("iSpring — инструменты для электронного обучения")}
            </h2>
            <p>{t("ALTUM Consulting — партнёр iSpring в Казахстане.")}</p>
            <p>
              {t(
                "Предлагаем программные продукты для разработки электронных курсов, организации дистанционного обучения и управления подготовкой сотрудников.",
              )}
            </p>
          </div>
          <a
            className="button outline"
            href={siteConfig.ispringUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            На сайт ALTUM iSpring <Icon name="arrow" />
          </a>
        </section>

        <section
          id="contact"
          className="contact dark-section"
          aria-labelledby="contact-title"
        >
          <div className="summit-art" aria-hidden="true">
            <AmbientVideo name="summit" />
          </div>
          <div className="contact-shade" />
          <div className="container contact-inner">
            <h2 id="contact-title" data-reveal>
              Достигайте вершин
              <br />
              <em>с нами</em>
            </h2>
            <p>
              {t(
                "Нужен электронный курс, программа корпоративного обучения, бизнес-игра или цифровой продукт?",
              )}
            </p>
            <p>
              {t(
                "Расскажите о своём проекте — обсудим задачу, подходящий формат и возможности реализации.",
              )}
            </p>
            <div className="contact-actions">
              <button className="button light-button" data-contact="project">
                Обсудить проект <Icon name="arrow" />
              </button>
            </div>
            {(siteConfig.email || siteConfig.phone || siteConfig.address) && (
              <address>
                {siteConfig.email && (
                  <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                )}
                {siteConfig.phone && (
                  <a href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}>
                    {siteConfig.phone}
                  </a>
                )}
                {siteConfig.address && <span>{siteConfig.address}</span>}
              </address>
            )}
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container">
          <a className="brand" href="#main" aria-label="Наверх">
            <img
              src={siteConfig.logo}
              width="176"
              height="46"
              alt="ALTUM Consulting"
              loading="lazy"
            />
          </a>
          <p>© {new Date().getFullYear()} ALTUM Consulting</p>
          <span>Люди · Знания · Технологии</span>
          {siteConfig.whatsapp && (
            <a
              href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          )}
          <a href="#main">
            Наверх <Icon name="arrow" />
          </a>
        </div>
      </footer>
      <Interactions />
    </>
  );
}
