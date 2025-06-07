import { AppearanceForm } from '@/features/settings/components/appearance-form'

import { ContentSection } from '../components/content-section'

export default function SettingsAppearance() {
   return (
      <ContentSection
         desc="Customize the appearance of the app. Automatically switch between day and night themes."
         title="Appearance"
      >
         <AppearanceForm />
      </ContentSection>
   )
}
