import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { uploadFileToFirebase } from "@/lib/firebase";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try {
        const {noteId} = await req.json();
        const notes = await db.select().from($notes).where(
            eq($notes.id,parseInt(noteId))
        )

        if(!notes[0].imageUrl){
            return new NextResponse('No image Url',{status: 400})
        }

        const firebase_url = await uploadFileToFirebase(notes[0].imageUrl,notes[0].name)
        await db.update($notes).set({
            imageUrl: firebase_url
        }).where(
            eq($notes.id,parseInt(noteId))
        )

        return new NextResponse('ok',{status: 200})
    }catch(error){
        return new NextResponse("error",{status: 500})
    }
}