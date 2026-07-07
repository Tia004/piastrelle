import '../globals.css'

export async function generateStaticParams() {
  return [{ lang: 'it' }, { lang: 'en' }, { lang: 'es' }]
}

export async function generateMetadata({ params }) {
  const { lang } = await params

  const titles = {
    it: 'Lumina Ceramiche | La Gravità della Materia',
    en: 'Lumina Ceramiche | The Gravity of Matter',
    es: 'Lumina Ceramiche | La Gravedad de la Materia',
  }

  const descriptions = {
    it: 'Non ci limitiamo a rivestire superfici. Creiamo la dimensione su cui il vostro spazio si fonda. Superfici architettoniche in pietra sinterizzata.',
    en: "We don't just cover surfaces. We craft the dimension your space rests upon. Architectural sintered stone surfaces.",
    es: 'No nos limitamos a cubrir superficies. Creamos la dimensión sobre la que descansa tu espacio. Superficies arquitectónicas de piedra sinterizada.',
  }

  return {
    title: titles[lang] || titles.it,
    description: descriptions[lang] || descriptions.it,
    openGraph: {
      title: titles[lang] || titles.it,
      description: descriptions[lang] || descriptions.it,
      type: 'website',
      locale: lang,
    },
  }
}

export default async function RootLayout({ children, params }) {
  const { lang } = await params

  return (
    <html lang={lang}>
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=block" />
      </head>
      <body>
        {children}
        {/* Film grain overlay */}
        <div className="grain-overlay" aria-hidden="true" />
      </body>
    </html>
  )
}
