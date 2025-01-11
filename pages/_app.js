
import '../style/globals.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import 'aos/dist/aos.css'
export default function App({ Component, pageProps }) {
  return (
  <>
  <Navbar />
    <Component {...pageProps} />
    <Footer />

  </>
  )
}