import Image from 'next/image';

export default function Loading() {
    return(
<div className="mx-auto" id="load">
<h3 className="text-center display-3 mx-auto m-5">
  <b>Loading </b> <Image
      className="me-3"
      src="/loading.gif"
      alt="Sunrise"
      width="40"
      height="40"
    />
</h3>
</div>
)
 }