"use client"
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Loader2, Plus } from 'lucide-react'
import axios from 'axios'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

type Props = {}

const CreateNotDialog = (props: Props) => {

    const [input,setInput] = useState('');
    const router = useRouter()

    const createNotebook = useMutation({
        mutationFn: async () => {
            const response = await axios.post('/api/createNoteBook',{
                name : input
            });
            return response.data
        }
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(input === ''){
            window.alert('Please enter a name for your Notebook')
            return
        }
        createNotebook.mutate(undefined,{
            onSuccess: ({note_id}) => {
                console.log("Created new note:",{note_id});
                router.push(`/notebook/${note_id}`)
            },
            onError: (error) => {
                console.log(error);
                window.alert("Failed to create a notebook")
            }
        })
    }

  return (
    <Dialog>
        <DialogTrigger>
            <div className=' border-dashed border-2 flex border-green-600 h-full rounded-lg items-center justify-center sm:flex-col hover:shadow-xl transition hover:-translate-y-1 flex-row p-4'>
                <Plus className=' w-6 h-6 text-green-600' strokeWidth={3} />
                <h2 className='font-semibold text-green-600 sm:mt-2'>New Note book</h2>
            </div>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    New Note Book
                </DialogTitle>
                <DialogDescription>
                You can Create a new Note by clicking the button below.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
                <Input value={input} onChange={(e)=> setInput(e.target.value)} placeholder='Name...' />
                <div className='h-4'></div>
                <div className='flex items-center gap-2'>
                    <Button type='reset' variant={'secondary'}>Cancel</Button>
                    <Button type='submit' className='bg-green-600' 
                    disabled={createNotebook.isPending}>
                        {createNotebook.isPending && (
                            <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                        )}
                        Create
                    </Button>
                </div>
            </form>
        </DialogContent>
    </Dialog>
  )
}

export default CreateNotDialog