import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from './dictionaries'
import Navbar from '../../components/Navbar'
import HeroSection from '../../components/HeroSection'
import BentoGrid from '../../components/BentoGrid'
import JournalSection from '../../components/JournalSection'
import Footer from '../../components/Footer'

export default async function Page({ params }) {
  const { lang } = await params

  if (!hasLocale(lang)) {
    notFound()
  }

  const dict = await getDictionary(lang)

  return (
    <>
      <Navbar dict={dict} lang={lang} />
      <main>
        <HeroSection dict={dict} />
        <BentoGrid dict={dict} />
        <JournalSection dict={dict} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  )
}
