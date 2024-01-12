"use server"

import { createRave, deleteRave } from "@/lib/raves"
import { RavePayload } from "@/types"
import { revalidatePath } from "next/cache"

export const createRaveAction = async (payload: RavePayload) => {
        await createRave(payload)
        revalidatePath('/raves')
}

export const deleteRaveAction = async (id: string) => {
        await deleteRave(id)
        revalidatePath('/raves')
}