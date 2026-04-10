"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, User, ArrowRight, Search, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { blogService } from "@/services/blog.service";
import Link from "next/link";

const BlogPage = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      const { data } = await blogService.getAllBlogs();
      if (data) setArticles(data);
      setIsLoading(false);
    };
    fetchArticles();
  }, []);

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-background min-h-screen">
      {/* Blog Hero */}
      <section className="bg-secondary/30 py-20 border-b">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h1 className="text-5xl font-black mb-4">Health <span className="text-primary">Blog</span></h1>
              <p className="text-xl text-muted-foreground">
                Expert advice, health tips, and medical news to help you live your healthiest life.
              </p>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search articles..." 
                className="pl-10 h-12 bg-background border-none shadow-sm rounded-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container px-4 mx-auto py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="aspect-video bg-secondary rounded-3xl" />
                  <div className="space-y-4 pt-4">
                    <div className="h-4 bg-secondary rounded w-1/4" />
                    <div className="h-8 bg-secondary rounded w-full" />
                    <div className="h-20 bg-secondary rounded w-full" />
                  </div>
                </div>
              ))
            ) : filteredArticles.length > 0 ? (
              filteredArticles.map((article, i) => (
                <motion.article 
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
                >
                  <Link href={`/blog/${article.id}`} className="relative aspect-video md:aspect-[4/3] rounded-3xl overflow-hidden border shadow-sm group-hover:shadow-md transition-shadow">
                    <Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-bold shadow-sm text-primary">
                        {article.category || "Health"}
                      </span>
                    </div>
                  </Link>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(article.createdAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {article.author}
                      </span>
                    </div>
                    <Link href={`/blog/${article.id}`}>
                      <h2 className="text-3xl font-bold group-hover:text-primary transition-colors leading-tight cursor-pointer">
                        {article.title}
                      </h2>
                    </Link>
                    <p className="text-muted-foreground leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                    <Button variant="ghost" asChild className="p-0 h-auto hover:bg-transparent text-primary font-bold gap-2 group/btn">
                      <Link href={`/blog/${article.id}`}>
                        Read Full Article
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </motion.article>
              ))
            ) : (
              <div className="text-center py-20 text-muted-foreground">
                No articles found matching your search.
              </div>
            )}

            {filteredArticles.length > 0 && (
              <div className="flex justify-center pt-10">
                <Button variant="outline" size="lg" className="rounded-2xl px-12 font-bold h-14">
                  Load More Articles
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-12">
            <div className="p-8 rounded-3xl bg-secondary/30 border border-secondary space-y-6">
              <h3 className="font-bold text-xl">Top Categories</h3>
              <div className="flex flex-wrap gap-2">
                {["Nutrition", "Mental Health", "Fitness", "Skincare", "Medicine", "Lifestyle"].map(tag => (
                  <button key={tag} className="px-4 py-2 rounded-xl bg-background border text-sm font-medium hover:border-primary hover:text-primary transition-all">
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-primary text-primary-foreground space-y-6 shadow-xl shadow-primary/20">
              <h3 className="font-bold text-2xl">Health Newsletter</h3>
              <p className="opacity-80">Get the latest health tips and pharmacy updates delivered directly to your inbox.</p>
              <div className="space-y-3">
                <Input placeholder="Your email address" className="bg-white/20 border-white/30 placeholder:text-white/60 text-white h-12 rounded-xl" />
                <Button className="w-full h-12 bg-white text-primary hover:bg-white/90 font-bold rounded-xl">
                  Subscribe Now
                </Button>
              </div>
            </div>

            <div className="p-8 rounded-3xl border border-secondary space-y-6">
              <h3 className="font-bold text-xl">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {["Wellness", "Tips", "Research", "Pharmacy", "Diet", "Vitamins", "Care", "Life"].map(tag => (
                  <span key={tag} className="flex items-center gap-1 text-xs font-semibold text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-lg border border-secondary">
                    <Tag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
