import getUserPosts from '@/lib/getUserPosts'
import getUser from '@/lib/getUser'
import { Suspense } from 'react'
import UserPosts from './components/UserPosts';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react'

type Params = {
    params: {
        userId: string
    }
}

export async function generateMetadata({params: {userId}}: Params): Promise<Metadata>{
    const userData: Promise<User> = getUser(userId);
    const user: User = await userData

    return {
        title: user.name,
        description: `This is the page of ${user.name}`
    }
}

export default async function UserPage({params: {userId}}: Params) {

    //fetching two pieces of data at once - Promise key word means to fetch data immediately and not wait
    const userData: Promise<User> = getUser(userId); 
    const userPostsData: Promise<Post[]> = getUserPosts(userId)

    // const [user, userPosts] = await Promise.all([userData, userPostsData])

    const user = await userData
  return (
    <>
    <Link href={"/users"}>Back To Users</Link>
    <br />
    <h2>{user.name}</h2>
    <br />
    {/* supense used to progressively render a page */}
    <Suspense fallback= {<h2>Loading...</h2>}>
        {/* @ts-expect-error Server Component */}
    <UserPosts promise = {userPostsData} />
    </Suspense>
    </>
  )
}
