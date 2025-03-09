import Image from "next/image";
import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

import { StartupTypeCard } from "@/components/StartupCard";
import { auth } from "@/auth";

export default async function Home( { searchParams }: { 
    searchParams: Promise<{ query?: string}>
}) {
    const query = (await searchParams).query;
    const params = {search: query || null};

    const session = await auth();

    
    const {data: posts} = await sanityFetch({query:STARTUPS_QUERY, params})

    

    // const posts = [{
    //   _createdAt: new Date(),
    //   views: 55,
    //   author: {_id: 1, name: 'Adrian'},
    //   _id: 1,
    //   description: 'This is a description.',
    //   image: 'https://media.istockphoto.com/id/1225051355/photo/abstract-art-backgrounds.jpg?s=612x612&w=0&k=20&c=Na64CkmYeOMedixA14Ck7VWhqZawnJYACgQUp6W4eao=',
    //   category: 'Robots',
    //   title: 'We Robots',
    //   pitch: 'Hello'
    // }]

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">PITCH YOUR STARTUP, <br /> Connect with entrepreneurs
        
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit ideas, vote on pitches, and get noticed in virtual competitions.
        </p>

        <SearchForm query={query}/>
      </section>

      <section className="section_container">
          <p className="text-30-semibold">
            {query ? `Search results for "${query}"` : 'All startups'}
          </p>

          <ul className="mt-7 card_grid">
            {posts?.length > 0 ? (
                posts.map((post: StartupTypeCard, index: number) => (
                  <StartupCard key = {post?._id} post={post} />
                ))
            ) : (
              <p className="no-results">No startups found</p>
            )}
          </ul>
      </section>
      
      <SanityLive />
    </>
  );
}
