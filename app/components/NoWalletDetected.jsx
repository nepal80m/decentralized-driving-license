import Link from "next/link";

export default function NoWalletDetected() {
  return (
    <div>

      <div >
        No Ethereum wallet was detected.
      </div>

      <Link href="http://metamask.io">
        <button>
          Install MetaMask
        </button>
      </Link>
    </div>
  )
}



