import type { PropsWithChildren } from "react"

export const Container = ({
  children,
}: PropsWithChildren) => {
  return (
    <div className="mx-auto w-full max-w-4xl p-4 flex flex-col flex-1 gap-6 sm:gap-12">
      {children}
    </div>
  )
}
