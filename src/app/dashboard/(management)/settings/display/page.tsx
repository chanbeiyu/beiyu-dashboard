import { fetchSettingDisplay } from '@/features/settings'
import { DisplayForm } from '@/features/settings/components/display-form'

import { ContentSection } from '../components/content-section'

const fetchValues = async () => {
   return fetchSettingDisplay()
}

export default function SettingsDisplay() {
   const display = fetchValues()
   return (
      <ContentSection
         desc="Turn items on or off to control what's displayed in the app."
         title="Display"
      >
         <DisplayForm display={display} />
      </ContentSection>
   )
}
