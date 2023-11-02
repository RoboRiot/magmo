import "bootstrap/dist/css/bootstrap.min.css"
import '../styles/global.css'
import Layout from '../components/Layout'
import { AuthUserProvider } from '../context/AuthUserContext';
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css'; // Include CSS for the annotation layer of PDF
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


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