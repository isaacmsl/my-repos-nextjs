import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home(props) {

  const { simpleRepos } = props

  return (
    <div className={styles.container}>
      <Head>
        <title>Isaac | Repositories </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Hi, I'm <a href="https://github.com/isaacmsl" target="__blank">Isaac!</a>
        </h1>

        <p className={styles.description}>
          Those are my repositories
        </p>

        <div className={styles.grid}>
          {
            simpleRepos.map(simpleRepo => (
              <a key={ simpleRepo.id} href={ simpleRepo.url } className={ styles.card }>
                <h3>{ simpleRepo.name } &rarr;</h3>
                <p>{ simpleRepo.description }</p>
                <p>★ {simpleRepo.stars}</p>
                <RepoLanguage language={ simpleRepo.language } />
              </a>
            ))
          }
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps() {

  const res = await fetch('https://api.github.com/users/isaacmsl/repos')
  const repos = await res.json()

  const reposOrderedByStars = repos.sort(sortByStars)

  const simpleRepos = reposOrderedByStars.map(repo => {
    return {
      id: repo.id,
      name: repo.name,
      description: repo.description || 'No description :(',
      url: repo.html_url,
      stars: repo.stargazers_count,
      language: repo.language,
    }
  })

  return {
    props: {
      simpleRepos
    },
  }
}

function sortByStars(repoA, repoB) {
  const repoAStars = repoA.stargazers_count
  const repoBStars = repoB.stargazers_count

  return (repoAStars === repoBStars) ? 0
    : ((repoAStars > repoBStars) ? -1 : 1)
}

const RepoLanguage = ({ language }) => {

  if (language) {
    return (
      <p 
        style={{
          display: 'flex',
          alignItems: 'center', 
        }}>
        <LanguageIcon language={language} />
        <span
          style={{
            marginLeft: '10px',
          }}>
          { language }
        </span>
      </p>
    )
  }
  return null
}

const LanguageIcon = ({ language }) => {
  const languageLowerCase = language.toLowerCase()
  return (
    <img
      src={`https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/${languageLowerCase}/${languageLowerCase}.png`} 
      alt='Image of language'
      width='20px'
    ></img> 
  )
}