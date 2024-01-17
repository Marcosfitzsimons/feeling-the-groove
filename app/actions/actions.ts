"use server"

import { createRave, deleteRave, updateRave, updateRaveMemories } from "@/lib/raves"
import { RavePayload, UpdateRaveMemoriesPayload, UpdateRavePayload } from "@/types"
import { revalidatePath } from "next/cache"

export const createRaveAction = async (payload: RavePayload) => {
        await createRave(payload)
        revalidatePath('/raves')
}

export const updateRaveAction = async (id: string, payload: UpdateRavePayload) => {
        await updateRave(id, payload)
        revalidatePath(`/raves/${id}`)
}

export const updateRaveMemoriesAction = async (id: string, payload: UpdateRaveMemoriesPayload) => {
        await updateRaveMemories(id, payload)
        revalidatePath(`/raves/${id}`)
}

export const deleteRaveAction = async (id: string) => {
        await deleteRave(id)
        revalidatePath('/raves')
}