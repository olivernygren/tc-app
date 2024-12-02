import localFont from 'next/font/local';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import TCHead from '@/components/head/TCHead';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  weight: '100 900',
});

export async function getStaticProps(context: any) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
  };
}

export default function Home() {
  const { t } = useTranslation('common');

  return (
    <>
      <TCHead title="TC | Home" />
      <div id="_next" className={geistSans.className}>
        <h1>Hello, world!</h1>
        <p>{t('test')}</p>
      </div>
    </>
  );
}
