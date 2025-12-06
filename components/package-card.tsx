"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface PackageCardProps {
  id: string
  title: string
  description: string
  grade?: string
  subject?: string
  language?: string
  price?: string
  thumbnail?: string
}

export function PackageCard({ id, title, description, grade, subject, language, price, thumbnail }: PackageCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden">
      {thumbnail ? (
        <img src={thumbnail} alt={title} className="h-40 w-full object-cover" />
      ) : null}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {(grade || subject || language) && (
          <div className="flex flex-wrap gap-2">
            {grade ? <Badge variant="outline">{grade}</Badge> : null}
            {subject ? <Badge variant="outline">{subject}</Badge> : null}
            {language ? <Badge variant="outline">{language}</Badge> : null}
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <CardDescription>{description}</CardDescription>
        {price ? <p className="text-sm font-semibold text-primary">{price}</p> : null}
      </CardContent>
      <CardFooter>
        <Link href={`/packages/${id}`} className="w-full">
          <Button className="w-full">View Package</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}