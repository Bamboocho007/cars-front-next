import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home() {
  return (
    <>    
      <div className={'main'}>
        Index page
      </div>
    </>
  )
}


export const getStaticProps: GetStaticProps = async ({ locale })  => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home'])),
      test1: 'TestData'
      // Will be passed to the page component as props
    },
  };
}