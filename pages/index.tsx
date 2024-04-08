import styles from '../styles/Home.module.css'
import { getHeroUnit, getHomepage } from "../lib/kontentClient";
import { GetStaticProps, NextPage } from 'next';
import { HeroUnit } from '../models/content-types/hero_unit';
import { Page } from '../models';
import { RichTextElement } from '../components/RichTextElement';

const Home: NextPage<IndexProps> = ({ heroUnit, homepage }) => {
  return (
    <main >
      <div className={styles.hero}>
        <h1 className="append-dot">{heroUnit.elements.title.value}</h1>
        <div className={styles.summary} dangerouslySetInnerHTML={{ __html: heroUnit.elements.marketingMessage.value }}>
        </div>
      </div>
      <div className={styles.bodycontent}>
        <RichTextElement element={homepage.elements.body} />
      </div>
    </main>
  )
}

export default Home

interface IndexProps {
  heroUnit: HeroUnit;
  homepage: Page;
}

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
  const heroUnit = await getHeroUnit();
  const homepage = await getHomepage();

  return {
    props: { heroUnit, homepage },
  };
}