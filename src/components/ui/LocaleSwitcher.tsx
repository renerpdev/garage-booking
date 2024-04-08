import { useLocale } from "next-intl"
import { locales } from "@/src/intl.config"
import { Button } from "@/src/components/ui/button"
import { useTransition } from "react"
import { useRouter, usePathname } from "@/src/navigation"
import { useParams } from "next/navigation"

export default function LocaleSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const [isPending, startTransition] = useTransition()

  const handleLocaleChange = () => {
    startTransition(() => {
      const nextLocale = locales.find((l) => l !== locale)

      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      )
    })
  }

  return (
    <Button
      variant={"link"}
      type={"button"}
      className={"inline-flex items-center uppercase font-bold p-1 -mr-1 -mb-1"}
      disabled={isPending}
      onClick={handleLocaleChange}>
      {locale}
    </Button>
  )
}
