"use client"

import {
  useState,
  useCallback,
} from "react"

import {
  CheckIcon,
  XIcon,
} from "lucide-react"

import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"

interface EditTodoProps {
  defaultValue: string
  onChange: (title: string) => void
  onSave: (title: string) => void
  onReset: () => void
}

export const EditTodo = ({
  defaultValue,
  onChange,
  onSave,
  onReset,
}: EditTodoProps) => {
  const [title, setTitle] = useState(defaultValue)

  const handleSave = useCallback(() => {
    onSave(title)
  }, [onSave, title])

  const handleTitleChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
    onChange(event.currentTarget.value)
  }, [onChange])

  const handleEnterKeyPress = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSave(title)
    }
  }, [onSave, title])

  return (
    <div className="flex items-center gap-2">
      <Input
        value={title}
        onInput={handleTitleChange}
        onKeyDown={handleEnterKeyPress}
        autoFocus
        data-testid="edit-todo-input"
      />
      <Button onClick={handleSave} className="cursor-pointer" data-testid="save-todo-button">
        <CheckIcon />
      </Button>
      <Button onClick={onReset} className="cursor-pointer" data-testid="cancel-todo-button">
        <XIcon />
      </Button>
    </div>
  )
}
