'use client'
import { ThreeMomentsETFCaseStudyWebsite } from './components/ThreeMomentsETFCaseStudyWebsite'
import { SiteClosing } from '../components/site-closing'
import '../components/site-closing-case.css'
import './closing.css'

export default function EtfSavingsPlanPage() {
  return <>
    <div className="etf-case"><ThreeMomentsETFCaseStudyWebsite /></div>
    {/* Outside .etf-case so the case's :where() styles never reach the shared closing. */}
    <SiteClosing className="site-closing-case site-closing-case--light etf-closing" />
  </>
}
