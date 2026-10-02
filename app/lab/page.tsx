import { redirect } from 'next/navigation'

/** Lab hub removed — send /lab (and /lab.html via next.config) to the first experiment. */
export default function LabPage() {
  redirect('/lab/action-center')
}
