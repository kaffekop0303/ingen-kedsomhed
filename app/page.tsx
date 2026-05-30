import { auth, currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'
import Navigation from '@/components/Navigation'

export default async function HomePage() {
  const { userId } = await auth()
  const user = userId ? await currentUser() : null

  const displayName = user?.firstName || user?.username || 'Eventyreren'

  return (
    <>
      <Navigation />
      <main className="min-h-[calc(100vh-56px)] flex flex-col items-center justify-center px-4 py-10 text-center">
        {/* Confetti emoji row */}
        <div className="text-3xl tracking-widest mb-6 animate-bounce2 select-none">
          🎈 🎉 🌈 🎊 ✨
        </div>

        {/* Hero card */}
        <div
          className="bg-white rounded-3xl p-8 md:p-12 max-w-lg w-full mb-8 relative"
          style={{
            boxShadow: '0 8px 0 #e0c0ff, 0 12px 30px rgba(155, 93, 229, 0.18)',
            border: '5px solid #9B5DE5',
          }}
        >
          {/* Party popper top decoration */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-4xl">🎉</div>

          <h1
            className="block text-4xl md:text-5xl font-extrabold leading-tight mb-2"
            style={{
              fontFamily: '"Baloo 2", cursive',
              background: 'linear-gradient(90deg, #FF6B6B, #FF9A3C, #FFB703, #1D9E75, #3A86FF, #9B5DE5, #F72585)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Ingen Kedsomhed!
          </h1>
          <p
            className="text-sm font-bold text-gray-500 mb-6"
            style={{ fontFamily: '"Nunito", sans-serif' }}
          >
            Find sjove aktiviteter til børn og unge — aldrig kedeligt!
          </p>

          {userId && user ? (
            /* Signed-in state */
            <div className="flex flex-col gap-3">
              <div
                className="text-base font-bold text-gray-700 mb-1"
                style={{ fontFamily: '"Nunito", sans-serif' }}
              >
                Hej, <span style={{ color: '#9B5DE5' }}>{displayName}</span>! 👋
              </div>
              <Link
                href="/guide"
                className="w-full inline-block text-white font-extrabold text-lg py-3 px-6 rounded-full transition-all hover:opacity-90 hover:scale-105 active:scale-95"
                style={{
                  fontFamily: '"Baloo 2", cursive',
                  background: 'linear-gradient(90deg, #FF6B6B, #FFB703, #1D9E75, #3A86FF, #9B5DE5)',
                  textShadow: '0 1px 3px rgba(0,0,0,0.2)',
                  animation: 'pulse2 2s ease-in-out infinite',
                }}
              >
                🗺️ Start aktivitetsguiden
              </Link>
              <Link
                href="/daglig-udfordring"
                className="w-full inline-block font-extrabold text-lg py-3 px-6 rounded-full transition-all hover:opacity-90 hover:scale-105 active:scale-95"
                style={{
                  fontFamily: '"Baloo 2", cursive',
                  background: '#FFB703',
                  color: '#fff',
                  textShadow: '0 1px 3px rgba(0,0,0,0.2)',
                }}
              >
                ⭐ Dagens udfordring
              </Link>
              <Link
                href="/soeg"
                className="w-full inline-block font-bold text-sm py-2 px-6 rounded-full transition-all hover:opacity-90"
                style={{
                  fontFamily: '"Nunito", sans-serif',
                  background: 'rgba(155, 93, 229, 0.1)',
                  color: '#9B5DE5',
                  border: '2px solid #9B5DE5',
                }}
              >
                🔍 Søg aktiviteter
              </Link>
            </div>
          ) : (
            /* Signed-out state */
            <div className="flex flex-col gap-3">
              <Link
                href="/sign-up"
                className="w-full inline-block text-white font-extrabold text-lg py-3 px-6 rounded-full transition-all hover:opacity-90 hover:scale-105 active:scale-95"
                style={{
                  fontFamily: '"Baloo 2", cursive',
                  background: 'linear-gradient(90deg, #FF6B6B, #FFB703, #1D9E75, #3A86FF, #9B5DE5)',
                  textShadow: '0 1px 3px rgba(0,0,0,0.2)',
                }}
              >
                🚀 Log ind / Opret bruger
              </Link>
              <Link
                href="/guide"
                className="w-full inline-block font-bold text-base py-3 px-6 rounded-full transition-all hover:opacity-90 hover:scale-105 active:scale-95"
                style={{
                  fontFamily: '"Baloo 2", cursive',
                  background: 'rgba(155, 93, 229, 0.1)',
                  color: '#9B5DE5',
                  border: '2px solid #9B5DE5',
                }}
              >
                🗺️ Fortsæt uden konto
              </Link>
            </div>
          )}
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full">
          {[
            { emoji: '🗺️', title: 'Aktivitetsguide', desc: '3 nemme trin til din perfekte aktivitet', color: '#9B5DE5', href: '/guide' },
            { emoji: '⭐', title: 'Daglig udfordring', desc: 'En ny sjov udfordring hver dag', color: '#FFB703', href: '/daglig-udfordring' },
            { emoji: '🔍', title: 'Søg aktiviteter', desc: '50+ aktiviteter til alle aldersgrupper', color: '#1D9E75', href: '/soeg' },
          ].map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="bg-white rounded-2xl p-5 text-center transition-all hover:scale-105 hover:shadow-lg active:scale-95"
              style={{
                boxShadow: '0 4px 0 rgba(0,0,0,0.08), 0 6px 20px rgba(0,0,0,0.06)',
                border: `3px solid ${feature.color}20`,
              }}
            >
              <div className="text-3xl mb-2">{feature.emoji}</div>
              <div
                className="font-extrabold text-sm mb-1"
                style={{ fontFamily: '"Baloo 2", cursive', color: feature.color }}
              >
                {feature.title}
              </div>
              <div
                className="text-xs text-gray-500 font-semibold"
                style={{ fontFamily: '"Nunito", sans-serif' }}
              >
                {feature.desc}
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom emoji decoration */}
        <div className="mt-10 text-2xl opacity-60 select-none">
          🎭 🎨 🏃 🎵 🧘 🍪 📖 🛹
        </div>
      </main>
    </>
  )
}
