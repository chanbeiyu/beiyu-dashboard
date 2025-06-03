import { ThemeThumbnail } from '@/components/theme/theme-thumbnail';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {
  DEFAULT_FONT_MONO,
  DEFAULT_FONT_SANS,
  DEFAULT_FONT_SERIF
} from '@/config/theme';
import { useUISettings } from '@/context/ui-settings-context';
import { cn } from '@/lib/utils';
import type { ThemeStyleProps } from '@/types/theme';
import {
  getAppliedThemeFont,
  monoFonts,
  sansSerifFonts,
  serifFonts
} from '@/utils/theme-fonts';

import { presets } from '@/utils/theme-presets';
import { Copy, RotateCcw } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useCallback, useEffect } from 'react';
import HoldToSaveTheme from './hold-to-save-theme';
import ShadowControl from './shadow-control';
import SliderWithInput from './slider-with-input';
import ThemeColorPanel from './theme-color-panel';
import ThemeFontSelect from './theme-font-select';
import ThemePresetSelect from './theme-preset-select';
import ThemeVariablesDialog from './theme-variables-dialog';

type Mode = 'light' | 'dark';

const ThemeControlPanel = () => {
  // Hooks
  const { setTheme } = useTheme();
  const { settings, updateSettings, applyThemePreset, resetToDefault } =
    useUISettings();

  const handleModeChange = (value: string) => {
    if (value) {
      const newMode = value as Mode;
      // Ensure both themes exist before switching
      const updatedSettings = {
        ...settings,
        mode: newMode,
        theme: {
          ...settings.theme,
          styles: {
            light: settings.theme.styles?.light || {},
            dark: settings.theme.styles?.dark || {}
          }
        }
      };
      // Update settings first
      updateSettings(updatedSettings);
      // Then update next-themes
      setTheme(newMode);
    }
  };

  // Helper function to ensure both themes are updated together
  const updateBothThemes = (updates: Partial<ThemeStyleProps>) => {
    const currentLight = settings.theme.styles?.light || {};
    const currentDark = settings.theme.styles?.dark || {};
    const updatedSettings = {
      ...settings,
      theme: {
        ...settings.theme,
        styles: {
          light: { ...currentLight, ...updates },
          dark: { ...currentDark, ...updates }
        }
      }
    };
    // Update settings and persist to storage
    updateSettings(updatedSettings);
  };

  // Update font change handlers to use the new helper
  const handleFontChange = (
    fontType: 'font-sans' | 'font-serif' | 'font-mono',
    value: string
  ) => {
    updateBothThemes({ [fontType]: value });
  };
  // Update radius change handler to use the new helper
  const handleRadiusChange = (value: number) => {
    updateBothThemes({ radius: `${value}rem` });
  };

  const handleStyleChange = useCallback(
    (key: keyof ThemeStyleProps, value: string) => {
      if (!settings.mode) return;
      updateSettings({
        theme: {
          ...settings.theme,
          styles: {
            ...settings.theme.styles,
            [settings.mode as Mode]: {
              ...settings.theme.styles?.[settings.mode as Mode],
              [key]: value
            }
          }
        }
      });
    },
    [settings.theme, settings.mode, updateSettings]
  );

  const handleLetterSpacingChange = (value: number) => {
    updateBothThemes({ 'letter-spacing': `${value}em` });
  };
  const handleSpacingChange = (value: number) => {
    updateBothThemes({ spacing: `${value}rem` });
  };

  useEffect(() => {
    // Ensure theme styles exist when component mounts
    if (!settings.theme.styles?.light || !settings.theme.styles?.dark) {
      const updatedSettings = {
        ...settings,
        theme: {
          ...settings.theme,
          styles: {
            light: settings.theme.styles?.light || {},
            dark: settings.theme.styles?.dark || {}
          }
        }
      };
      updateSettings(updatedSettings);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (settings.mode) {
      setTheme(settings.mode);
    }
  }, [settings.mode, setTheme]);
  const currentStyles = settings.theme.styles?.[settings.mode as Mode] || {};

  return (
    <ScrollArea className='h-[calc(100vh-6.3125rem)]'>
      <div className='flex flex-col gap-6 p-6'>
        <div className='flex gap-3'>
          <ThemeVariablesDialog
            lightTheme={settings.theme.styles?.light}
            darkTheme={settings.theme.styles?.dark}
            trigger={
              <Button variant='outline' className='flex-1 cursor-pointer gap-2'>
                <Copy className='h-4 w-4' />
                Copy
              </Button>
            }
            activeTheme={settings.theme.preset ?? ''}
          />
          <Button
            variant='outline'
            className='flex-1 cursor-pointer gap-2'
            onClick={resetToDefault}
          >
            <RotateCcw className='h-4 w-4' />
            Reset
          </Button>
        </div>

        {/* Mode Selection */}
        <div className='flex flex-col gap-4'>
          <h3 className='text-lg font-medium'>Mode</h3>
          <div className='flex justify-between'>
            <ThemeThumbnail
              mode='light'
              onClick={() => handleModeChange('light')}
              className={cn(
                'hover:cursor-pointer',
                settings.mode === 'light' && 'border-primary/60'
              )}
            />
            <ThemeThumbnail
              mode='dark'
              onClick={() => handleModeChange('dark')}
              className={cn(
                'hover:cursor-pointer',
                settings.mode === 'dark' && 'border-primary/60'
              )}
            />
          </div>
        </div>

        {/* Themes Selection */}
        <ThemePresetSelect
          presets={presets}
          currentPreset={settings.theme.preset || null}
          onPresetChange={applyThemePreset}
        />

        <Tabs defaultValue='colors' className='h-full w-full'>
          <TabsList className='mb-3 grid w-full grid-cols-3'>
            <TabsTrigger value='colors' className='cursor-pointer'>
              Colors
            </TabsTrigger>
            <TabsTrigger value='typography' className='cursor-pointer'>
              Typography
            </TabsTrigger>
            <TabsTrigger value='other' className='cursor-pointer'>
              Other
            </TabsTrigger>
          </TabsList>

          <TabsContent value='colors'>
            {/* CSS Variables Section */}
            <ThemeColorPanel />
          </TabsContent>

          {/* Text Selection */}
          <TabsContent value='typography'>
            <div className='mb-4'>
              <Label htmlFor='font-sans' className='mb-1.5 block text-xs'>
                Sans-Serif Font
              </Label>
              <ThemeFontSelect
                fonts={sansSerifFonts}
                defaultValue={DEFAULT_FONT_SANS}
                currentFont={getAppliedThemeFont(
                  settings.theme.styles?.[settings.mode as Mode],
                  'font-sans'
                )}
                onFontChange={(value) => handleFontChange('font-sans', value)}
              />
            </div>

            <div className='mb-4'>
              <Label htmlFor='font-serif' className='mb-1.5 block text-xs'>
                Serif Font
              </Label>
              <ThemeFontSelect
                fonts={serifFonts}
                defaultValue={DEFAULT_FONT_SERIF}
                currentFont={getAppliedThemeFont(
                  settings.theme.styles?.[settings.mode as Mode],
                  'font-serif'
                )}
                onFontChange={(value) => handleFontChange('font-serif', value)}
              />
            </div>

            <div>
              <Label htmlFor='font-mono' className='mb-1.5 block text-xs'>
                Monospace Font
              </Label>
              <ThemeFontSelect
                fonts={monoFonts}
                defaultValue={DEFAULT_FONT_MONO}
                currentFont={getAppliedThemeFont(
                  settings.theme.styles?.[settings.mode as Mode],
                  'font-mono'
                )}
                onFontChange={(value) => handleFontChange('font-mono', value)}
              />
            </div>

            <div className='mt-6'>
              <SliderWithInput
                value={parseFloat(
                  settings.theme.styles?.[settings.mode as Mode]?.[
                    'letter-spacing'
                  ]?.replace('em', '') || '0'
                )}
                onChange={handleLetterSpacingChange}
                min={-0.25}
                max={0.25}
                step={0.025}
                unit='em'
                label='Letter Spacing'
              />
            </div>
          </TabsContent>

          <TabsContent value='other'>
            {/* Radius Selection */}
            <div className='flex flex-col gap-4'>
              <SliderWithInput
                value={parseFloat(
                  currentStyles.radius?.replace('rem', '') || '0'
                )}
                onChange={handleRadiusChange}
                min={0}
                max={2.5}
                step={0.025}
                unit='rem'
                label='Radius'
              />
            </div>

            <div className='mt-6'>
              <SliderWithInput
                value={parseFloat(
                  settings.theme.styles?.[
                    settings.mode as Mode
                  ]?.spacing?.replace('rem', '') || '0.25'
                )}
                onChange={handleSpacingChange}
                min={0.15}
                max={0.35}
                step={0.01}
                unit='rem'
                label='Spacing'
              />
            </div>

            <div className='mt-6'>
              <ShadowControl
                shadowColor={currentStyles['shadow-color'] || '#000000'}
                shadowOpacity={parseFloat(
                  currentStyles['shadow-opacity'] || '0.1'
                )}
                shadowBlur={parseFloat(
                  currentStyles['shadow-blur']?.replace('px', '') || '0'
                )}
                shadowSpread={parseFloat(
                  currentStyles['shadow-spread']?.replace('px', '') || '0'
                )}
                shadowOffsetX={parseFloat(
                  currentStyles['shadow-offset-x']?.replace('px', '') || '0'
                )}
                shadowOffsetY={parseFloat(
                  currentStyles['shadow-offset-y']?.replace('px', '') || '0'
                )}
                onChange={(key, value) => {
                  if (key === 'shadow-color') {
                    handleStyleChange(
                      key as keyof ThemeStyleProps,
                      value as string
                    );
                  } else if (
                    key === 'shadow-opacity' ||
                    key === 'shadow-depth' ||
                    key === 'shadow-noise'
                  ) {
                    handleStyleChange(
                      key as keyof ThemeStyleProps,
                      value.toString()
                    );
                  } else {
                    handleStyleChange(
                      key as keyof ThemeStyleProps,
                      `${value}px`
                    );
                  }
                }}
              />
            </div>
          </TabsContent>
        </Tabs>
        <HoldToSaveTheme />
      </div>
    </ScrollArea>
  );
};

export default ThemeControlPanel;
