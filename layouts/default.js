import Footer from 'components/frontend/Footer';
const DefaultLayout = (props) => (
  <>
    {props.children}
    ---------------------
    <Footer />
  </>
);

export default DefaultLayout;
