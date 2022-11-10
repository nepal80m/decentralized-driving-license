'use client';

import Link from "next/link";
import { useEffect } from "react";
export default function HomePage() {

  // useEffect(() => {
  //   fetchUserDetail()
  // })


  return (
    <>

      <div>

        <ul>
          <li>
            <Link href='/license'>License</Link>
          </li>
          <li>
            <Link href='/requests'>Requests</Link>
          </li>
          <li>
            <Link href='/admin'>Admins</Link>
          </li>
        </ul>
      </div>

      Welcome to the decentralized license system.


    </>


  )
}



