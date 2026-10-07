import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays } from "lucide-react";
import { ContactBlock } from "@/components/sections/ContactBlock";
import { PageHero } from "@/components/sections/PageHero";
import { formatDate, getPost, posts, vieScolaireEnabled } from "@/lib/vie-scolaire";

export function generateStaticParams() {
  return vieScolaireEnabled ? posts.map((p) => ({ slug: p.slug })) : [];
}

export async function generateMetadata(props: PageProps<"/vie-scolaire/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post || !vieScolaireEnabled) return {};
  return { title: post.title, description: post.excerpt, alternates: { canonical: `/vie-scolaire/${post.slug}` } };
}

export default async function PostPage(props: PageProps<"/vie-scolaire/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post || !vieScolaireEnabled) notFound();

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Vie scolaire", href: "/vie-scolaire" },
          { label: post.title, href: `/vie-scolaire/${post.slug}` },
        ]}
        eyebrow={post.theme}
        title={post.title}
        intro={
          <p className="flex items-center gap-2">
            <CalendarDays className="size-5 text-cyan-700" aria-hidden />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </p>
        }
      />
      <article className="section">
        <div className="container-site max-w-3xl">
          {post.media && (
            <figure className="mb-10 overflow-hidden rounded-3xl">
              <Image src={post.media.src} alt={post.media.alt} width={post.media.width} height={post.media.height} className="h-auto w-full" />
              <figcaption className="mt-3 text-sm text-muted">{post.media.description}</figcaption>
            </figure>
          )}
          <div className="prose-site">
            {post.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>
      <ContactBlock primary={{ href: "/admissions#demande", label: "Consulter les admissions" }} />
    </>
  );
}
