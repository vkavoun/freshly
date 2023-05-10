import { Head } from '$fresh/runtime.ts';
import Counter from '../islands/Counter.tsx';
import Camera from '../islands/Camera.tsx';

export default function Home() {
  return (
    <>
      <Head>
        <title>freshly</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <Camera id="camera" />
      </div>
    </>
  );
}
