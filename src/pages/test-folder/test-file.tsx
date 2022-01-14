import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { FunctionComponent } from 'react'

const TestComponent: FunctionComponent = () => {
  return (
    <div>
      Hi test!
    </div>
  )
}

export default TestComponent

export const getStaticProps: GetStaticProps = async ({ locale })  => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home'])),
      test1: 'TestData'
      // Will be passed to the page component as props
    },
  };
}