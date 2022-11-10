import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ethers } from 'ethers'
import { AccountContext } from '../context.js'
import { ownerAddress } from '../contract-config.js'
import Image from 'next/image.js'
import { useRouter } from 'next/router.js'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [account, setAccount] = useState()
  const [authorized, setAuthorized] = useState(false);


  useEffect(() => {
    checkWalletConnection();
    const hideContent = () => setAuthorized(false);
    router.events.on('routerChangeStart', hideContent);
    router.events.on('routerChangeComplete', checkWalletConnection);
    return () => {
      router.events.off('routerChangeStart', hideContent);
      router.events.off('routerChangeComplete', checkWalletConnection)
    }

  }, [])


  async function checkWalletConnection() {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' })
    const publicPaths = ['/login', '/account/register'];
    const path = router.asPath.split('?')[0];
    if (accounts.length == 0 && path !== '/connect-wallet') {
      setAuthorized(false);
      router.push({
        pathname: '/connect-wallet',
        query: { returnUrl: router.asPath }
      })
      // connectWallet();
    }
    else {
      setAuthorized(true);
    }

  }


  return (
    <div>

      <div >
        {authorized &&
          <AccountContext.Provider value={account}>
            <Component {...pageProps} />
          </AccountContext.Provider>
        }
      </div>
    </div>
  )
}


export default MyApp