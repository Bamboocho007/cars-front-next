import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { QuickSearchForm } from '../HomeModule/components/QuickSearchForm/QuickSearchForm';

export default function Home() {
  return (
    <>    
      <div className={'main'}>
        <QuickSearchForm />
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