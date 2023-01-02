import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Error() {
  const router = useRouter()

  return (
    <div className="bg-primary min-h-screen flex items-center justify-center w-full h-full bg-gray-900">
      <Head>
        <title>Something went wrong</title>
      </Head>
      <div
        className="bg-secondary rounded-lg p-8 text-center text-white max-w-[600px]">
        <h1 className="text-5xl font-bold text-primary">Oops!</h1>
        <p className="text-2xl font-semibold text-secondary">Something went wrong</p>
        <Image src={"/error.svg"} width={200} height={300}/>
        <p className="text-xl font-light text-tertiary">We are sorry, but something went wrong on our end. Please try again later.</p>
        <Link href="/">
          <a className="btn btn-primary mt-8 block px-2 py-4 bg-blue-500 transition-opacity hover:opacity-80">Go Back</a>
        </Link>
      </div>
    </div>
  )
}
