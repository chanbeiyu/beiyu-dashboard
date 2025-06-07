'use client'

import { useCallback, useEffect, useState } from 'react'

import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useDebounce } from '@/hooks/use-debounce'

// Simulated API call
const fetchSuggestions = async (query: string): Promise<string[]> => {
   await new Promise((resolve) => setTimeout(resolve, 300)) // Simulate network delay
   const allSuggestions = [
      'React',
      'Redux',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Node.js',
      'Express',
      'MongoDB',
      'PostgreSQL',
      'GraphQL',
      'Vue.js',
      'Angular',
      'Svelte',
      'Tailwind CSS',
      'Sass',
      'Webpack',
      'Babel',
      'ESLint',
      'Jest',
      'Cypress',
   ]
   return allSuggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(query.toLowerCase()),
   )
}

interface AutoCompleteProps {
   value?: string
   onChange?: (value: string) => void
}

export default function Autocomplete({ value = '', onChange }: AutoCompleteProps) {
   const [query, setQuery] = useState(value)
   const [debouncedQuery] = useDebounce(query, 300)
   const [suggestions, setSuggestions] = useState<string[]>([])
   const [selectedIndex, setSelectedIndex] = useState(-1)
   const [isLoading, setIsLoading] = useState(false)
   const [isFocused, setIsFocused] = useState(false)

   const fetchSuggestionsCallback = useCallback(async (q: string) => {
      if (q.trim() === '') {
         setSuggestions([])
         return
      }
      setIsLoading(true)
      const results = await fetchSuggestions(q)
      setSuggestions(results)
      setIsLoading(false)
   }, [])

   useEffect(() => {
      if (debouncedQuery && isFocused) {
         fetchSuggestionsCallback(debouncedQuery)
      }
      else {
         setSuggestions([])
      }
   }, [debouncedQuery, fetchSuggestionsCallback, isFocused])

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setQuery(newValue)
      onChange?.(newValue)
      setSelectedIndex(-1)
   }

   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowDown') {
         e.preventDefault()
         setSelectedIndex((prev) =>
            prev < suggestions.length - 1 ? prev + 1 : prev,
         )
      }
      else if (e.key === 'ArrowUp') {
         e.preventDefault()
         setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
      }
      else if (e.key === 'Enter' && selectedIndex >= 0) {
         setQuery(suggestions[selectedIndex])
         setSuggestions([])
         setSelectedIndex(-1)
      }
      else if (e.key === 'Escape') {
         setSuggestions([])
         setSelectedIndex(-1)
      }
   }

   const handleSuggestionClick = (suggestion: string) => {
      setQuery(suggestion)
      onChange?.(suggestion)
      setSuggestions([])
      setSelectedIndex(-1)
   }

   const handleFocus = () => {
      setIsFocused(true)
   }

   const handleBlur = () => {
      // Delay hiding suggestions to allow for click events on suggestions
      setTimeout(() => {
         setIsFocused(false)
         setSuggestions([])
         setSelectedIndex(-1)
      }, 200)
   }

   return (
      <div className="w-full max-w-xs mx-auto">
         <div className="relative">
            <Input
               aria-autocomplete="list"
               aria-controls="suggestions-list"
               aria-expanded={suggestions.length > 0}
               aria-label="Search input"
               className="pr-10"
               onBlur={handleBlur}
               onChange={handleInputChange}
               onFocus={handleFocus}
               onKeyDown={handleKeyDown}
               placeholder="Search..."
               type="text"
               value={query}
            />
            <Button
               aria-label="Search"
               className="absolute right-0 top-0 h-full"
               size="icon"
               variant="ghost"
            >
               <Search className="h-4 w-4" />
            </Button>
         </div>
         {isLoading && isFocused && (
            <div
               aria-live="polite"
               className="mt-2 p-2 bg-background border rounded-md shadow-sm absolute z-10"
            >
               Loading...
            </div>
         )}
         {suggestions.length > 0 && !isLoading && isFocused && (
            <ul
               className="mt-2 bg-background border rounded-md shadow-sm absolute z-10"
               id="suggestions-list"
               role="listbox"
            >
               {suggestions.map((suggestion, index) => (
                  <li
                     aria-selected={index === selectedIndex}
                     className={`px-4 py-2 cursor-pointer hover:bg-muted ${
                        index === selectedIndex ? 'bg-muted' : ''
                     }`}
                     key={suggestion}
                     onClick={() => handleSuggestionClick(suggestion)}
                     role="option"
                  >
                     {suggestion}
                  </li>
               ))}
            </ul>
         )}
      </div>
   )
}
