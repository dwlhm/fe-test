import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='h-screen w-screen flex items-center justify-center flex-col gap-2'>
      <h2 className='text-4xl'>Not Found</h2>
      <p className='text-red-600'>Could not find requested resource</p>
      <Link href="/" className='italic undeline hover:bg-black transition hover:text-white text-black rounded text-sm py-2 px-4 mt-5'>Return Home</Link>
    </div>
  )
}