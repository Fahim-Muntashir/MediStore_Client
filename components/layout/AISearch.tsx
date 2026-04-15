"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Loader2, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function AISearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [originalQuery, setOriginalQuery] = useState("");
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 700); // Increased for rate-limit safety
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    console.log("Debounced Query Changed:", debouncedQuery);
    if (debouncedQuery.length > 1 && debouncedQuery !== (selectedIndex >= 0 ? suggestions[selectedIndex] : "")) {
      fetchSuggestions(debouncedQuery);
    } else if (debouncedQuery.length <= 1) {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSuggestions = async (q: string) => {
    if (!q || q.length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    console.log("Fetching suggestions for:", q);
    setIsLoading(true);
    setIsOpen(true); // Open early to show loading state
    
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
      const apiUrl = `${baseUrl}/ai/search-suggestions?query=${encodeURIComponent(q)}`;
      
      console.log("API URL used:", apiUrl);
      const res = await fetch(apiUrl);
      
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      
      const data = await res.json();
      console.log("API Response:", data);
      
      if (data.success && data.data && data.data.length > 0) {
        setSuggestions(data.data);
        setSelectedIndex(-1);
        setOriginalQuery(q);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      // Don't close so we can show "Error" or "No results"
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e?: React.FormEvent, selectedQuery?: string) => {
    e?.preventDefault();
    const finalQuery = selectedQuery || query;
    if (finalQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(finalQuery)}`);
      setQuery(finalQuery);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = selectedIndex < suggestions.length - 1 ? selectedIndex + 1 : selectedIndex;
      setSelectedIndex(nextIndex);
      if (nextIndex >= 0) setQuery(suggestions[nextIndex]);
      setIsOpen(true);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const nextIndex = selectedIndex > -1 ? selectedIndex - 1 : -1;
      setSelectedIndex(nextIndex);
      if (nextIndex === -1) {
        setQuery(originalQuery);
      } else {
        setQuery(suggestions[nextIndex]);
      }
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0) {
        e.preventDefault();
        handleSearch(undefined, suggestions[selectedIndex]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setQuery(originalQuery);
    }
  };

  return (
    <div className="relative flex-1 max-w-md w-full" ref={containerRef}>
      <form onSubmit={handleSearch} className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        
        <Input
          placeholder="Search medicines, health products..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen && e.target.value.length > 1) setIsOpen(true);
          }}
          onFocus={() => query.length > 1 && suggestions.length > 0 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className={cn(
            "pl-10 pr-24 h-11 bg-secondary/30 border-none transition-all duration-300",
            "focus-visible:ring-2 focus-visible:ring-primary/40 focus:bg-secondary/50",
            "rounded-2xl text-base",
            isOpen && suggestions.length > 0 && "rounded-b-none"
          )}
        />
        
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
          ) : (
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-primary/5 border border-primary/10">
              <Sparkles className="h-3 w-3 text-primary" />
              <span className="text-[10px] font-medium text-primary uppercase">AI</span>
            </div>
          )}
        </div>
      </form>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full w-full bg-card border border-t-0 rounded-b-2xl shadow-2xl overflow-hidden z-[100] backdrop-blur-xl bg-card/98"
          >
            <div className="py-2">
              {suggestions.length > 0 ? (
                <ul className="space-y-0.5">
                  {suggestions.map((suggestion, index) => (
                    <li key={index}>
                      <button
                        type="button"
                        onMouseEnter={() => setSelectedIndex(index)}
                        onClick={() => {
                          setQuery(suggestion);
                          handleSearch(undefined, suggestion);
                        }}
                        className={cn(
                          "w-full text-left px-4 py-2.5 text-sm transition-all flex items-center gap-3 group",
                          selectedIndex === index ? "bg-primary/10 text-primary" : "hover:bg-secondary/50"
                        )}
                      >
                        <Search className={cn(
                          "h-4 w-4 transition-colors",
                          selectedIndex === index ? "text-primary" : "text-muted-foreground"
                        )} />
                        <span className="flex-1 truncate font-medium">{suggestion}</span>
                        {selectedIndex === index && (
                          <motion.span 
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-[10px] text-primary/60 font-mono"
                          >
                            ⏎
                          </motion.span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : query.length > 1 && !isLoading ? (
                <div className="px-4 py-6 text-center">
                  <p className="text-sm text-muted-foreground">No suggestions found for "{query}"</p>
                  <p className="text-[10px] text-muted-foreground/60 mt-1">Try searching for generic names or symptoms</p>
                </div>
              ) : null}
            </div>
            <div className="bg-secondary/10 px-4 py-2 text-[10px] text-muted-foreground/60 border-t flex justify-between items-center">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded border bg-background font-sans text-[9px]">↑↓</kbd>
                to navigate
              </span>
              <span className="flex items-center gap-1 italic">
                Powered by MediAI
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
