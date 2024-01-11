"use server"

import { createRave } from "@/lib/raves"
import { RavePayload } from "@/types"

export const createRaveAction = async (payload: RavePayload) => {
        await createRave(payload)
}