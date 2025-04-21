"use client"

import {
  useState,
  useCallback,
} from "react"

import { PlusIcon } from "lucide-react"
import { Result } from "neverthrow"

import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"

import { checkTodoTitle } from "@/entities/todo"

interface CreateTodoProps {
  onCreate: (title: string) => void
}

export const CreateTodo = ({
  onCreate,
}: CreateTodoProps) => {
  const [title, setTitle] = useState("")
  const [error, setError] = useState<string | null>(null)

  const validateTitle = useCallback((title: string) => {
    return Result.fromThrowable(
      () => {
        checkTodoTitle({ title })
        return title
      },
      (error) => error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다."
    )()
  }, [])

  const handleCreate = useCallback(() => {
    validateTitle(title).match(
      (validTitle) => {
        onCreate(validTitle)
        setTitle("")
        setError(null)
      },
      (errorMessage) => {
        setError(errorMessage)
      }
    )
  }, [onCreate, title, validateTitle])

  const handleTitleChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
    setError(null)
  }, [])

  const handleEnterKeyPress = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleCreate()
    }
  }, [handleCreate])

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-2">
        <Input
          value={title}
          placeholder="할 일을 입력하세요."
          onInput={handleTitleChange}
          onKeyDown={handleEnterKeyPress}
        />
        <Button onClick={handleCreate} className="cursor-pointer">
          <PlusIcon />
        </Button>
      </div>
      {error &&
        <p className="text-sm text-destructive mt-1">
          {error}
        </p>
      }
    </div>
  )
}
