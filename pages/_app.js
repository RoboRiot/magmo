import '../styles/global.css'
import Layout from '../components/Layout'
import "bootstrap/dist/css/bootstrap.min.css"
import { AuthUserProvider } from '../context/AuthUserContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthUserProvider>
  )
}

export default MyApp