'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

const navLinks = [
  { href: '/', label: 'Hjem', emoji: '🏠' },
  { href: '/guide', label: 'Guide', emoji: '🗺️' },
  { href: '/daglig-udfordring', label: 'Dagens udfordring', emoji: '⭐' },
  { href: '/soeg', label: 'Søg', emoji: '🔍' },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav
      style={{ backgroundColor: '#9B5DE5' }}
      className="sticky top-0 z-50 shadow-md"
    >
      <div className="max-w-5xl mx-auto px-3 h-14 flex items-center gap-3">
        {/* Logo */}
        <Link
          href="/"
          className="font-baloo text-white font-extrabold text-lg whitespace-nowrap hover:opacity-90 transition-opacity flex-shrink-0"
          style={{ fontFamily: '"Baloo 2", cursive' }}
        >
          🎉 Ingen Kedsomhed
        </Link>

        {/* Nav Links */}
        <div className="hidden sm:flex items-center gap-1 flex-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-white/25 text-white'
                    : 'text-white/80 hover:text-white hover:bg-white/15'
                }`}
                style={{ fontFamily: '"Nunito", sans-serif' }}
              >
                {link.emoji} {link.label}
              </Link>
            )
          })}
        </div>

        {/* Mobile Nav */}
        <div className="flex sm:hidden items-center gap-0.5 flex-1 overflow-x-auto scrollbar-hide">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-bold px-2 py-1 rounded-full transition-all whitespace-nowrap flex-shrink-0 ${
                  isActive
                    ? 'bg-white/25 text-white'
                    : 'text-white/80 hover:text-white hover:bg-white/15'
                }`}
                style={{ fontFamily: '"Nunito", sans-serif' }}
              >
                {link.emoji}
                <span className="ml-1 hidden xs:inline">{link.label}</span>
              </Link>
            )
          })}
        </div>

        {/* Auth */}
        <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
          <SignedIn>
            <Link
              href="/profil"
              className="text-xs font-bold text-white/80 hover:text-white hover:bg-white/15 px-2 py-1 rounded-full transition-all hidden sm:block"
              style={{ fontFamily: '"Nunito", sans-serif' }}
            >
              👤 Profil
            </Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'w-8 h-8',
                },
              }}
            />
          </SignedIn>
          <SignedOut>
            <Link
              href="/sign-in"
              className="text-xs font-bold bg-white/20 text-white px-3 py-1.5 rounded-full hover:bg-white/30 transition-all border border-white/30"
              style={{ fontFamily: '"Nunito", sans-serif' }}
            >
              Log ind
            </Link>
          </SignedOut>
        </div>
      </div>
    </nav>
  )
}
