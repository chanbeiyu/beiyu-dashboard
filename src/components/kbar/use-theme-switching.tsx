import { useRegisterActions } from 'kbar'

import { useUITheme } from '@/contexts/ui-theme-context'

const useThemeSwitching = () => {
   const { theme, setTheme } = useUITheme()

   const toggleTheme = () => {
      setTheme(theme === 'light' ? 'dark' : 'light')
   }

   const themeAction = [
      {
         id: 'toggleTheme',
         name: 'Toggle Theme',
         shortcut: ['t', 't'],
         section: 'Theme',
         perform: toggleTheme,
      },
      {
         id: 'setLightTheme',
         name: 'Set Light Theme',
         section: 'Theme',
         perform: () => setTheme('light'),
      },
      {
         id: 'setDarkTheme',
         name: 'Set Dark Theme',
         section: 'Theme',
         perform: () => setTheme('dark'),
      },
   ]

   useRegisterActions(themeAction, [theme])
}

export default useThemeSwitching
