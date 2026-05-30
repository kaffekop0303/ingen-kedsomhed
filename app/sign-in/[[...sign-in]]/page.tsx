import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-10"
      style={{
        background: 'repeating-linear-gradient(135deg,#FFE5E5 0,#FFE5E5 40px,#FFEFD5 40px,#FFEFD5 80px,#FFFBD5 80px,#FFFBD5 120px,#E5FFE5 120px,#E5FFE5 160px,#E5F5FF 160px,#E5F5FF 200px,#EEE5FF 200px,#EEE5FF 240px,#FFE5F5 240px,#FFE5F5 280px)',
      }}
    >
      <div className="mb-6 text-center">
        <div className="text-5xl mb-2">🎉</div>
        <h1
          className="text-2xl font-extrabold"
          style={{
            fontFamily: '"Baloo 2", cursive',
            color: '#9B5DE5',
          }}
        >
          Velkommen tilbage!
        </h1>
        <p
          className="text-sm text-gray-500 font-semibold mt-1"
          style={{ fontFamily: '"Nunito", sans-serif' }}
        >
          Log ind og fortsæt eventyret
        </p>
      </div>
      <SignIn />
    </div>
  )
}
