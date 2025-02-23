// app/api/profile/change-password/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/session"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    
    // Verify current password
    const existingUser = await prisma.user.findUnique({
      where: { id: user.id }
    })

    if (!existingUser?.password || 
        !await bcrypt.compare(body.currentPassword, existingUser.password)) {
      return NextResponse.json({ error: "Invalid current password" }, { status: 400 })
    }

    // Update password
    const hashedPassword = await bcrypt.hash(body.newPassword, 10)
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword }
    })

    return NextResponse.json({ message: "Password updated successfully" })

  } catch (error) {
    console.error("Password change error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}