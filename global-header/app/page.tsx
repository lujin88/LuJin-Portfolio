import { SiteHeader } from '../components/site-header'

export default function Page() {
  return (
    <>
      <SiteHeader activeHref="/client-advisor" />
      <main className="min-h-screen bg-header-scrim" />
    </>
  )
}
