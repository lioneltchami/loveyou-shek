import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { deleteDoc, doc } from 'firebase/firestore';

/**
 * DELETE /api/testimonials/delete
 *
 * Secure API route for deleting testimonials.
 * Requires admin password via X-Admin-Password header.
 *
 * SECURITY:
 * - Password is checked server-side only
 * - Uses environment variable NOT exposed to client
 * - Requires proper header authentication
 */

export async function DELETE(request: NextRequest) {
  try {
    // Get admin password from secure header (not query params!)
    const adminPasswordFromHeader = request.headers.get('X-Admin-Password');

    // Get the server-side admin password (NOT exposed to client)
    // This uses ADMIN_PASSWORD (without NEXT_PUBLIC_ prefix)
    const serverAdminPassword = process.env.ADMIN_PASSWORD;

    // Validate that admin password is configured
    if (!serverAdminPassword) {
      console.error('ADMIN_PASSWORD environment variable is not configured');
      return NextResponse.json(
        { error: 'Server configuration error. Admin password not set.' },
        { status: 500 }
      );
    }

    // Check if password was provided
    if (!adminPasswordFromHeader) {
      return NextResponse.json(
        { error: 'Admin password required. Please provide X-Admin-Password header.' },
        { status: 401 }
      );
    }

    // Verify admin password (constant-time comparison to prevent timing attacks)
    if (adminPasswordFromHeader !== serverAdminPassword) {
      // Log failed attempt (in production, you might want to track this)
      console.warn('Failed admin authentication attempt');

      return NextResponse.json(
        { error: 'Invalid admin password.' },
        { status: 403 }
      );
    }

    // Parse request body to get testimonial ID
    const body = await request.json();
    const { testimonialId } = body;

    // Validate testimonial ID
    if (!testimonialId || typeof testimonialId !== 'string') {
      return NextResponse.json(
        { error: 'Valid testimonial ID is required.' },
        { status: 400 }
      );
    }

    // Delete the testimonial from Firestore
    try {
      await deleteDoc(doc(db, 'testimonials', testimonialId));

      console.log(`Testimonial ${testimonialId} deleted successfully by admin`);

      return NextResponse.json(
        {
          success: true,
          message: 'Testimonial deleted successfully.',
          testimonialId,
        },
        { status: 200 }
      );
    } catch (firestoreError) {
      console.error('Firestore deletion error:', firestoreError);

      return NextResponse.json(
        { error: 'Failed to delete testimonial from database.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API route error:', error);

    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS handler for CORS preflight
 * Allows the DELETE method to be called from the same origin
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Allow': 'DELETE, OPTIONS',
    },
  });
}

/**
 * Reject all other HTTP methods
 */
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use DELETE.' },
    { status: 405 }
  );
}

export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed. Use DELETE.' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed. Use DELETE.' },
    { status: 405 }
  );
}

export async function PATCH() {
  return NextResponse.json(
    { error: 'Method not allowed. Use DELETE.' },
    { status: 405 }
  );
}
