import type { PropsWithChildren } from "react"

import { cn } from "@workspace/ui/lib/utils"

import { Container } from "@/shared/ui"

interface BaseLayoutProps {
  className?: string
}

export const BaseLayout = ({
  children,
  className,
}: PropsWithChildren<BaseLayoutProps>) => {
  return (
    <div className="flex flex-1 pt-10 sm:pt-20">
      <Container>
        {/* Main content */}
        <main className={cn("relative flex-1", className)}>
          {children}
        </main>
      </Container>
    </div>
  )
}
