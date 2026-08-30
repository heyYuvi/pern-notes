import { title } from "node:process";
import prisma from "../config/db.js";
import { getNoteSchema, noteSchema, updateNoteSchema, type NoteInput, type UpdateNoteInput } from "../validations/note.validations.js"
import type { Request, Response } from "express";

// Create Note

export const createNote = async (req: Request, res: Response) => {
    try {

        const { success, data, error } = noteSchema.safeParse(req.body);
        if (!success) {
            return res.status(400).json({
                success: false,
                error: error.issues
            });
        }

        const body: NoteInput = data;

        const uesrId = req.user.id;

        const note = await prisma.note.create({
            data: {
                title: body.title,
                description: body.description ? body.description : null,
                status: body.status,
                priority: body.priority,
                authorId: uesrId
            }
        });

        return res.status(201).json({
            success: true,
            message: "Note Created",
            note
        });
    } catch (error) {
        console.error("Create Note error: ", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

// Get all the notes

export const getAllNotes = async (req: Request, res: Response) => {
    try{
        
    const { search, page, limit } = req.query;

    const { success, data, error } = getNoteSchema.safeParse(req.query);
    if (!success) {
        return res.status(400).json({
            success: false,
            error: error.issues
        });
    }

    const { status, priority } = data;

    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 4;
    const skip = (pageNumber - 1) * limitNumber;

    const userId = req.user.id;

    const notes = await prisma.note.findMany({
        where: {
            authorId: userId,
            ...(typeof search === "string" && {
                OR: [
                    {
                        title: {
                            contains: search,
                            mode: "insensitive"
                        }
                    },
                    {
                        description: {
                            contains: search,
                            mode: "insensitive"
                        }
                    }
                ]
            }),

            ...(status && {
                status: status
            }),

            ...(priority && {
                priority: priority
            })
        },
        skip,
        take: limitNumber
    });

    const totalNotes = await prisma.note.count({
        where: {
            authorId: userId,

            ...(typeof search === "string" && {
                OR: [
                    {
                        title: {
                            contains: search,
                            mode: "insensitive"
                        }
                    },
                    {
                        description: {
                            contains: search,
                            mode: "insensitive"
                        }
                    }
                ]
            }),

            ...(status && {
                status: status
            }),

            ...(priority && {
                priority: priority
            })
        }
    });

    return res.json({
        success: true,
        pagination: {
            page: pageNumber,
            limit: limitNumber,
            skip: skip,
            total: totalNotes,
            totalPage: Math.ceil(totalNotes / limitNumber)
        },
        data: notes.map((note) =>({
            id: note.id,
            title: note.title,
            description: note.description,
            status: note.status,
            priority: note.priority,
            date: note.date,
            updatedAt: note.updatedAt
        }))
    });
    }catch(error){
        console.error("Get All Notes error: ", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}


// Update Note

export const updateNote = async (req: Request, res: Response) =>{
    try{
        
    const id = Number(req.params.id);

    const { success, data, error } = updateNoteSchema.safeParse(req.body);
    if(!success){
        return res.status(400).json({
            success: false,
            error: error.issues
        });
    }

    const body: UpdateNoteInput = data;

    const note = await prisma.note.update({
        where: {
            id: id,
            authorId: req.user.id 
        },
        data: {
            ...(body.title !== undefined && { title: body.title }),
            ...(body.description !== undefined && { description: body.description }),
            ...(body.status !== undefined && { status: body.status }),
            ...(body.priority !== undefined && { priority: body.priority })
        }
    });

    return res.json({
        success: true,
        data: {
            id: note.id,
            title: note.title,
            description: note.description,
            status: note.status,
            priority: note.priority,
            date: note.date
        }
    });
    }catch(error){
        console.error("Update Note error: ", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

// Delete Note

export const deleteNote = async (req: Request, res: Response) =>{
    try{
        
    const id = Number(req.params.id);

    const note = await prisma.note.delete({
        where: {
            id: id,
            authorId: req.user.id
        }
    });

    return res.json({
        success: true,
        message: "Note Deleted"
    });
    }catch(error){
        console.error("Delete error: ", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

//  Get Single Note

export const getSingleNote = async (req: Request, res: Response) =>{

    const id = Number(req.params.id);

    const note = await prisma.note.findUnique({
        where: {
            id: id,
            authorId: req.user.id
        }
    });

    return res.json({
        success: false,
        data: {
            id: note?.id,
            title: note?.title,
            description: note?.description,
            status: note?.status,
            priority: note?.priority,
            createdAt: note?.date
        }
    });
}