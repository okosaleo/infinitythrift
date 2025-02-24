import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { createUserSchema } from '@/lib/schemas';
import { prisma } from '@/lib/prisma';


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = createUserSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: 'Validation error', errors: validation.error.errors },
        { status: 400 }
      );
    }

    const { name, email, password, role } = validation.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user and account
    const user = await prisma.user.create({
      data: {
        name,
        email,
        role,
        accounts: {
          create: {
            providerId: 'credentials',
            accountId: email,
            password: hashedPassword,
          },
        },
      },
      include: {
        accounts: true,
      },
    });

    return NextResponse.json(
      { message: 'User created successfully', user },
      { status: 201 }
    );

  } catch (error) {
    console.error('User creation error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}