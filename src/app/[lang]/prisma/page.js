import PrismaHero from '@/components/PrismaHero'

export default async function PrismaPage({ params }) {
  const { lang } = await params

  return (
    <main style={{ padding: '1rem', backgroundColor: '#0A0A09', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="w-full max-w-7xl">
        <PrismaHero />
      </div>
    </main>
  )
}

export async function generateStaticParams() {
  return [{ lang: 'it' }, { lang: 'en' }, { lang: 'es' }]
}
