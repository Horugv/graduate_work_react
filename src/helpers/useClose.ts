import { useEffect, RefObject, Ref } from 'react'

export interface ICloseHookExcludeTarget<T> {
  innerRef?: Ref<T>
}

interface ICloseHook {
  ref: RefObject<HTMLElement> | RefObject<HTMLElement>[]
  onClose: () => void
}

export const useClose = ({ ref, onClose }: ICloseHook) => {
  useEffect(() => {
    const listener = (event: any): void => {
      const isRefContainTarget = (function () {
        if (!ref || !event.target) return false
        if (Array.isArray(ref)) {
          return ref.some((refItem) => {
            return (
              refItem.current?.contains?.(event.target) ??
              (refItem.current as any)?.node?.contains?.(event.target)
            )
          })
        }
        return ref?.current?.contains(event.target)
      })()

      if (isRefContainTarget) {
        return
      } else {
        onClose()
      }
    }

    document.addEventListener('mousedown', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
    }
  }, [ref, onClose])
}
