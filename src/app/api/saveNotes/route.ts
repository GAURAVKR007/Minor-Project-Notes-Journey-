import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try {
        const body = await req.json();
        let {noteId,editorState} = body
        if(!editorState || !noteId){
            return new NextResponse("Missing editorState or NoteId",{
                status: 400
            })
        }
        console.log(editorState, noteId);
        console.log("Hit");
        
        noteId = parseInt(noteId)
        const notes = await db.select().from($notes).where(
            eq($notes.id, noteId)
        )

        if(notes.length != 1){
            return new NextResponse("Failed to Update",{status: 500})
        }

        const note = notes[0]

        if(note.editorState !== editorState){
            await db.update($notes).set({
                editorState
            }).where(
                eq($notes.id,noteId)
            )
        }
        return NextResponse.json({
            success: true,
        },{status: 200})
    }catch(error){
        console.error(error);
        return NextResponse.json({
            success: false,
        },{status: 500})
    }
}