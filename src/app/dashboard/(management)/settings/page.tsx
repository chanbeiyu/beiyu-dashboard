import { Suspense } from 'react'

import { fetchSettingProfile, ProfileForm } from '@/features/settings'

import { ContentSection } from './components/content-section'
import { SettingsSkeleton } from './settings-skeleton'

const fetchValues = async () => {
   return fetchSettingProfile()
}

export default function Page() {
   const profile = fetchValues()
   return (
      <ContentSection
         desc="This is how others will see you on the site."
         title="Profile"
      >
         <Suspense fallback={<SettingsSkeleton />}>
            <ProfileForm profile={profile} />
         </Suspense>
      </ContentSection>
   )
}
