'use client'

import { useRouter } from 'next/navigation'
import { goals } from '@/data/profiles'
import { Button } from '@/components/ui/button'
import { LikeButton } from '@/components/LikeButton'
import { ArrowLeft, CheckCircle2, Zap } from 'lucide-react'

export default function GoalsPage() {
  const router = useRouter()

  return (
    <div className="p-4 md:p-8">
      Goals page
    </div>
  )
}
