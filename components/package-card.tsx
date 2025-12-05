"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface PackageCardProps {
  id: string
  title: string
  description: string
  // Add any other props you need, like imageUrl, price, etc.
}

export function PackageCard({ id, title, description }: PackageCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Link href={`/packages/${id}`} className="w-full">
          <Button className="w-full">View Package</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}