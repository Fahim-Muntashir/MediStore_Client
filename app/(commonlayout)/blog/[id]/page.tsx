"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Calendar, User, ArrowLeft, Clock, Share2, Facebook, Twitter, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { blogService } from "@/services/blog.service";
import Link from "next/link";

const BlogDetailPage = () => {
  const params = useParams();
  const id = params.id as string;
  const [blog, setBlog] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      const { data } = await blogService.getSingleBlog(id);
      if (data) setBlog(data);
      setIsLoading(false);
    };
    if (id) fetchBlog();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center">
        <div className="animate-pulse space-y-8 w-full max-w-4xl">
          <div className="h-10 bg-secondary rounded-full w-3/4 mx-auto" />
          <div className="h-6 bg-secondary rounded-full w-1/4 mx-auto" />
          <div className="aspect-video bg-secondary rounded-[2.5rem] w-full" />
          <div className="space-y-4">
            <div className="h-4 bg-secondary rounded-full w-full" />
            <div className="h-4 bg-secondary rounded-full w-full" />
            <div className="h-4 bg-secondary rounded-full w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
        <Button asChild>
          <Link href="/blog">Back to Blog</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-20">
      <div className="container px-4 mx-auto pt-10">
        <Button variant="ghost" asChild className="mb-8 gap-2 hover:bg-transparent -ml-2 text-muted-foreground hover:text-primary transition-colors">
          <Link href="/blog">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        <article className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wider uppercase mb-6">
              Health & Wellness
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground font-medium">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>8 min read</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border mb-16"
          >
            <Image 
              src={blog.image} 
              alt={blog.title} 
              fill 
              className="object-cover"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="prose prose-lg dark:prose-invert max-w-none"
          >
            <p className="text-xl font-medium leading-relaxed text-muted-foreground italic mb-10 border-l-4 border-primary pl-6">
              {blog.excerpt}
            </p>
            
            <div className="text-lg leading-relaxed space-y-6 text-foreground/80">
              {blog.content.split('\n').map((para: string, i: number) => (
                <p key={i}>{para}</p>
              ))}
              
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              
              <h3 className="text-2xl font-bold pt-6">The Path to Better Health</h3>
              <p>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.
              </p>
              
              <div className="bg-secondary/30 p-8 rounded-3xl border border-secondary my-12">
                <h4 className="text-xl font-bold mb-4">Key Takeaways:</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Maintain a balanced diet rich in micronutrients.</li>
                  <li>Schedule regular check-ups with your healthcare provider.</li>
                  <li>Stay hydrated and prioritize 7-9 hours of sleep.</li>
                  <li>Consult a pharmacist before mixing over-the-counter medications.</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <footer className="mt-20 pt-10 border-t flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="font-bold">Share this article:</span>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all">
                  <LinkIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex gap-2">
              {["Health", "Wellness", "Medicine"].map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-secondary text-xs font-bold text-muted-foreground">
                  #{tag}
                </span>
              ))}
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
};

export default BlogDetailPage;
