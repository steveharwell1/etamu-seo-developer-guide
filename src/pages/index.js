import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <main>
        <section className="container margin-vert--xl">
          <div className="row">
            <div className="col col--4">
              <h3>🚀 Getting Started</h3>
              <p>
                New to the project? Start with our <Link to="/docs/intro">Introduction</Link> to understand the core concepts and get up and running in minutes.
              </p>
            </div>
            <div className="col col--4">
              <h3>📖 Guides</h3>
              <p>
                Check out our <Link to="/docs/category/guides">Guides</Link> for step-by-step instructions on common tasks, best practices, and advanced workflows.
              </p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
